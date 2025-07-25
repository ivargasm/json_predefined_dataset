// src/types/index.ts

/**
 * Define la estructura de una columna extraída del SQL.
 */
export interface Column {
    originalName: string;
    name: string;
    dataType: string;
    customMessage?: string;
}

/**
 * Define la estructura de una variable de filtro predefinida.
 */
export interface Variable {
    var: string;
    dsc: string;
    filterType: string;
    defaultAlias: string;
    sql_include: string;
    sql_exclude: string;
}

/**
 * Define la estructura de un tipo de dataset.
 */
export interface DatasetType {
    id: number;
    dsci18n: string;
    description: string;
}

/**
 * Define el estado completo y las acciones para el store de Zustand.
 */
export interface ConfigState {
    // Propiedades del estado
    theme: 'light' | 'dark';
    reportName: string;
    projectName: string;
    configType: 'adhoc' | 'preset'
    mainSql: string;
    columns: Column[];
    selectedVariables: Record<string, string>; // { varName: alias }
    selectedDatasetType: number;
    preQueries: string;
    postQueries: string;
    generatedJson: string;
    generatedSql: string;
    isAnalyzing: boolean;
    analysisError: string | null;

    // Acciones para modificar el estado
    toggleTheme: () => void;
    setReportName: (name: string) => void;
    setProjectName: (name: string) => void;
    setConfigType: (type: 'adhoc' | 'preset') => void; // Nueva acción
    setMainSql: (sql: string) => void;
    setPreQueries: (queries: string) => void;
    setPostQueries: (queries: string) => void;
    handleDataTypeChange: (index: number, newType: string) => void;
    handleCustomMessageChange: (index: number, message: string) => void;
    handleVariableToggle: (variableVar: string) => void;
    handleAliasChange: (variableVar: string, alias: string) => void;
    setSelectedDatasetType: (id: number) => void;
    analyzeSql: () => Promise<void>;
    generateOutputs: () => void;
}
