// src/store/configStore.ts
import { create } from 'zustand';
import type { ConfigState, Column } from '../types';
import { AVAILABLE_VARIABLES, DATASET_TYPES } from '../constants';

export const useConfigStore = create<ConfigState>((set, get) => ({
    // Estado Inicial
    theme: 'dark',
    reportName: 'exhibition',
    projectName: 'project9519',
    configType: 'adhoc',
    mainSql: 'SELECT\n    v.visit_id,\n    v.year_nbr,\n    v.photo_url,\n    p.store_name AS alias_tienda\nFROM\n    stoiii.temporary_tables.project1335_exhibition_soriana v\nJOIN\n    places p on v.place_id = p.id\nWHERE\n    $datePeriod $roleIds $placeIds;',
    columns: [],
    selectedVariables: {}, // { varName: alias }
    selectedDatasetType: DATASET_TYPES[0].id,
    preQueries: 'CREATE TABLE stoiii.temporary_tables.project1335_exhibition_soriana(visit_id int8, year_nbr int, photo_url varchar, place_id int);',
    postQueries: 'DROP TABLE IF EXISTS stoiii.temporary_tables.project1335_exhibition_soriana;',
    generatedJson: '',
    generatedSql: '',
    isAnalyzing: false,
    analysisError: null, // Estado inicial del error

    // Implementación de Acciones
    toggleTheme: () => set(state => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
    setReportName: (name) => set({ reportName: name }),
    setProjectName: (name) => set({ projectName: name }),
    setConfigType: (type) => set({ configType: type }),
    setMainSql: (sql) => set({ mainSql: sql }),
    setPreQueries: (queries) => set({ preQueries: queries }),
    setPostQueries: (queries) => set({ postQueries: queries }),
    
    handleDataTypeChange: (index, newType) => set(state => ({
        columns: state.columns.map((col, i) => i === index ? { ...col, dataType: newType } : col)
    })),

    // Nueva acción para el mensaje personalizado
    handleCustomMessageChange: (index, message) => set(state => ({
        columns: state.columns.map((col, i) => i === index ? { ...col, customMessage: message } : col)
    })),

    handleVariableToggle: (varName: string) => {
        set(state => {
            const newSelectedVariables = { ...state.selectedVariables };
            if (newSelectedVariables[varName]) {
                delete newSelectedVariables[varName]; // Si ya existe, lo quitamos
            } else {
                // Si no existe, lo añadimos con su alias por defecto
                const variableTemplate = AVAILABLE_VARIABLES.find(v => v.var === varName);
                newSelectedVariables[varName] = variableTemplate?.defaultAlias || 'v';
            }
            return { selectedVariables: newSelectedVariables };
        });
    },

    handleAliasChange: (varName: string, alias: string) => {
        set(state => ({
            selectedVariables: {
                ...state.selectedVariables,
                [varName]: alias,
            },
        }));
    },
    
    setSelectedDatasetType: (id) => set({ selectedDatasetType: id }),

    analyzeSql: async () => {
        set({ isAnalyzing: true, generatedJson: '', generatedSql: '', analysisError: null });
        const { mainSql, reportName, projectName, configType } = get();
        // const API_URL = 'http://localhost:8000/columns/predefined_dataset';
        const API_URL = 'https://json-report-backend.onrender.com/columns/predefined_dataset';

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query: mainSql, component_type:"table" }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `Error en la API: ${response.statusText}`);
            }

            const data: { columns?: { originalName: string }[], error?: string } = await response.json();
            
            if (data.error) {
                throw new Error(data.error);
            }

            if (data.columns) {
                const newColumns: Column[] = data.columns.map(col => ({
                    originalName: col.originalName,
                    name: `predefined.dataset.column.${reportName || 'report'}.${configType}.${projectName || 'project'}.${col.originalName}`,
                    dataType: 'varchar',
                    customMessage: '',
                }));
                set({ columns: newColumns });
            }

        } catch (error) {
            console.error("Error al analizar el SQL:", error);
            // Guardamos el mensaje de error en el estado para mostrarlo en la UI
            set({ analysisError: (error as Error).message });
        } finally {
            set({ isAnalyzing: false });
        }
    },
    
    generateOutputs: () => {
        const { columns, mainSql, selectedVariables, selectedDatasetType, preQueries, postQueries } = get();
        if (columns.length === 0) {
            console.error("Primero debes analizar el SQL.");
            return;
        }

        const finalVariables = Object.entries(selectedVariables).map(([varName, alias]) => {
            const template = AVAILABLE_VARIABLES.find(v => v.var === varName);
            if (!template) return null;
            return {
                var: template.var,
                dsc: template.dsc,
                filterType: template.filterType,
                sql_include: template.sql_include.replace('{alias}', alias),
                sql_exclude: template.sql_exclude.replace('{alias}', alias),
            };
        }).filter(Boolean);

        // --- 1. Generación del JSON (lógica existente) ---
        const finalJson = {
            columns: columns.map(({ name, dataType }) => ({ name, dataType })),
            variables: finalVariables,
            sql: mainSql.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim(),
            type: DATASET_TYPES.find(t => t.id === selectedDatasetType) || {},
            preQuery: preQueries.split(';').map(q => q.trim()).filter(Boolean),
            postQuery: postQueries.split(';').map(q => q.trim()).filter(Boolean),
        };

        // --- 2. Generación del Script SQL ---
        const locales = ['es', 'en', 'pt'];
        let sqlInserts = `--- Script de Internacionalización (i18n) ---\n\n`;
        let sqlValues = '';

        sqlInserts += `INSERT INTO stoiii_config.i18n (id, version, date_created, last_updated, code, locale, message) VALUES\n`
        columns.forEach(column => {
            locales.forEach(locale => {
                const code = column.name; // ej: column.exhibition.adhoc.soriana.visit_id
                // Usamos el mensaje personalizado si existe, si no, el nombre original
                const message = column.customMessage || column.originalName;
                
                // Escapamos apóstrofes en el mensaje si existieran
                const escapedMessage = message.replace(/'/g, "''");

                const insertValues = `(nextval('stoiii_config.seq_i18n'), 0, now(), now(), '${code}', '${locale}', '${escapedMessage}'),\n`;
                sqlValues += insertValues;
            });
        });

        // --- 3. Actualización del estado con ambos resultados ---
        set({ 
            generatedJson: JSON.stringify(finalJson, null, 4),
            generatedSql: `${sqlInserts}${sqlValues.slice(0, -2)};`
        });
    }
}));
