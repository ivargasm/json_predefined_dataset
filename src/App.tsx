// src/App.tsx
import { useState, useEffect } from 'react';
import { Download, Copy, Lightbulb, CheckCircle, Database, AlertCircle } from 'lucide-react';
import { useConfigStore } from './store/configStore';
import { AVAILABLE_VARIABLES, DATASET_TYPES } from './constants';
import { LandingPage } from './components/LandingPage';
import {
  Section,
  InputField,
  SelectField,
  ColumnCard,
  RadioCard,
  QueryTextarea,
  ActionButton,
  ThemeToggleButton,
  Spinner,
  VariableCard
} from './components/ui-components';

export default function App() {
  // Hooks de estado local para la retroalimentación de copiado
  const [showTool, setShowTool] = useState(false);
  const [copyJsonSuccess, setCopyJsonSuccess] = useState(false);
  const [copySqlSuccess, setCopySqlSuccess] = useState(false);

  // Obtenemos todo el store de Zustand
  const store = useConfigStore();

  // Hook para manejar el cambio de tema (claro/oscuro)
  useEffect(() => {
    document.body.classList.toggle('dark', store.theme === 'dark');
  }, [store.theme]);

  // Función genérica para descargar contenido como archivo
  const handleDownload = (content: string, filename: string, type: string) => {
    if (!content) return;
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Función genérica para copiar texto al portapapeles
  const handleCopyToClipboard = (content: string, setSuccess: (s: boolean) => void) => {
    if (!content) return;
    const textArea = document.createElement("textarea");
    textArea.value = content;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch (err) {
      console.error('Error al copiar:', err);
    }
    document.body.removeChild(textArea);
  };

  if (!showTool) {
    return (
      <div className={`${store.theme} font-sans`}>
        {/* La prop onStart cambiará el estado para mostrar la herramienta */}
        <LandingPage onStart={() => setShowTool(true)} />
      </div>
    );
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen font-sans text-slate-800 dark:text-slate-200 transition-colors duration-300">
      <div className="container mx-auto p-4 md:p-8 md:max-w-3xl lg:max-w-4xl xl:max-w-5xl">
        <header className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Generador de Configuración</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">Construye archivos de configuración de forma intuitiva.</p>
          </div>
          <ThemeToggleButton theme={store.theme} onToggle={store.toggleTheme} />
        </header>

        <main className="grid grid-cols-1 gap-8">
          {/* --- Sección 1: Entradas Principales --- */}
          <Section title="1. Entradas Principales">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InputField label="Nombre del Reporte" value={store.reportName} onChange={e => store.setReportName(e.target.value)} placeholder="ej: exhibition" />
              <InputField label="Nombre del Proyecto" value={store.projectName} onChange={e => store.setProjectName(e.target.value)} placeholder="ej: project9519" />
              <SelectField
                label="Tipo de Configuración"
                value={store.configType}
                onChange={e => store.setConfigType(e.target.value as 'adhoc' | 'preset')}
              >
                <option value="adhoc">Adhoc</option>
                <option value="preset">Preset</option>
              </SelectField>
            </div>
            <div className="mt-6">
              <label htmlFor="main-sql" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Consulta SQL Principal</label>
              <textarea id="main-sql" rows={8} className="w-full p-3 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm text-slate-800 dark:text-slate-200" value={store.mainSql} onChange={e => store.setMainSql(e.target.value)} />
              <button onClick={store.analyzeSql} disabled={store.isAnalyzing} className="mt-4 inline-flex items-center justify-center px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed">
                {store.isAnalyzing ? <><Spinner /> Analizando...</> : 'Analizar SQL y Extraer Columnas'}
              </button>
              {store.analysisError && (
                <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 dark:border-red-600 text-red-800 dark:text-red-300 rounded-r-lg" role="alert">
                  <div className="flex">
                    <div className="py-1"><AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400 mr-3" /></div>
                    <div>
                      <p className="font-bold">Error en el Análisis</p>
                      <p className="text-sm">{store.analysisError}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Section>

          {/* --- Sección 2: Configuración de Columnas (condicional) --- */}
          {store.columns.length > 0 && (
            <Section title="2. Configuración de Columnas">
              <div className="space-y-4">
                {store.columns.map((col, index) => (
                  <ColumnCard key={index} column={col} index={index} onDataTypeChange={store.handleDataTypeChange} onCustomMessageChange={store.handleCustomMessageChange} />
                ))}
              </div>
            </Section>
          )}

          {/* --- Secciones 3 y 4 --- */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Section title="3. Selección de Variables (Opcional)">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {AVAILABLE_VARIABLES.map(variable => {
                  const isSelected = store.selectedVariables[variable.var] !== undefined;
                  const alias = store.selectedVariables[variable.var] || '';
                  return (
                    <VariableCard
                      key={variable.var}
                      variable={variable}
                      isSelected={isSelected}
                      alias={alias}
                      onToggle={() => store.handleVariableToggle(variable.var)}
                      onAliasChange={(e) => store.handleAliasChange(variable.var, e.target.value)}
                    />
                  );
                })}
              </div>
            </Section>
            <Section title="4. Selección de Tipo de Dataset (Obligatorio)">
              <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
                {DATASET_TYPES.map(type => (
                  <RadioCard key={type.id} id={`type-${type.id}`} name="datasetType" label={type.dsci18n.split('.').pop()!.replace(/^\w/, c => c.toUpperCase())} description={type.description} checked={store.selectedDatasetType === type.id} onChange={() => store.setSelectedDatasetType(type.id)} />
                ))}
              </div>
            </Section>
          </div>

          {/* --- Sección 5 --- */}
          <Section title="5. Consultas Adicionales (Opcional)">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <QueryTextarea id="pre-queries" label="Pre-Queries (separadas por ';')" value={store.preQueries} onChange={e => store.setPreQueries(e.target.value)} />
              <QueryTextarea id="post-queries" label="Post-Queries (separadas por ';')" value={store.postQueries} onChange={e => store.setPostQueries(e.target.value)} />
            </div>
          </Section>

          {/* --- Sección 6: Botón de Generación --- */}
          <Section title="6. Generación de Outputs">
            <button onClick={store.generateOutputs} disabled={store.columns.length === 0} className="w-full md:w-auto inline-flex items-center justify-center px-8 py-3 border border-transparent text-lg font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed">
              <Database className="mr-3 h-6 w-6" />
              Generar JSON y Script SQL
            </button>
          </Section>

          {/* --- Sección 7: Visualización de Resultados (condicional) --- */}
          {(store.generatedJson || store.generatedSql) && (
            <Section title="7. Resultados Generados">
              {/* Visualizador de JSON */}
              {store.generatedJson && (
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-100">Archivo JSON</h3>
                  <pre className="bg-slate-900 text-white p-4 rounded-lg shadow-inner overflow-x-auto max-h-[500px]">
                    <code>{store.generatedJson}</code>
                  </pre>
                  <div className="mt-4 flex flex-wrap gap-4">
                    <ActionButton icon={<Download size={20} />} text="Descargar JSON" onClick={() => handleDownload(store.generatedJson, `${store.projectName}_${store.reportName}_config.json`, 'application/json')} />
                    <ActionButton icon={copyJsonSuccess ? <CheckCircle size={20} /> : <Copy size={20} />} text={copyJsonSuccess ? "¡Copiado!" : "Copiar JSON"} onClick={() => handleCopyToClipboard(store.generatedJson, setCopyJsonSuccess)} className={copyJsonSuccess ? "bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100" : ""} />
                  </div>
                </div>
              )}

              {/* Visualizador de SQL */}
              {store.generatedSql && (
                <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
                  <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-100">Script SQL de Internacionalización</h3>
                  <pre className="bg-slate-900 text-white p-4 rounded-lg shadow-inner overflow-x-auto max-h-[500px]">
                    <code>{store.generatedSql}</code>
                  </pre>
                  <div className="mt-4 flex flex-wrap gap-4">
                    <ActionButton icon={<Download size={20} />} text="Descargar SQL" onClick={() => handleDownload(store.generatedSql, `${store.projectName}_${store.reportName}_i18n.sql`, 'text/sql')} />
                    <ActionButton icon={copySqlSuccess ? <CheckCircle size={20} /> : <Copy size={20} />} text={copySqlSuccess ? "¡Copiado!" : "Copiar SQL"} onClick={() => handleCopyToClipboard(store.generatedSql, setCopySqlSuccess)} className={copySqlSuccess ? "bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100" : ""} />
                  </div>
                </div>
              )}
            </Section>
          )}

          {/* Mensaje de Siguientes Pasos (condicional) */}
          {store.columns.length === 0 && !store.generatedJson && (
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 dark:border-blue-600 text-blue-800 dark:text-blue-300 rounded-r-lg">
              <div className="flex">
                <div className="py-1"><Lightbulb className="h-5 w-5 text-blue-500 dark:text-blue-400 mr-3" /></div>
                <div>
                  <p className="font-bold">Siguientes pasos</p>
                  <p className="text-sm">Introduce tu consulta SQL y haz clic en "Analizar SQL" para empezar.</p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
