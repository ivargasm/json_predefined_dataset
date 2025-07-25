import React from 'react';
import { Play, DatabaseZap, Settings2, FileJson } from 'lucide-react';

// Este es un componente funcional que puedes usar como tu página de bienvenida.
// Recibe una prop 'onStart' que es una función para cambiar a la vista principal de la aplicación.
export const LandingPage: React.FC<{ onStart: () => void }> = ({ onStart }) => {
    return (
        <div className="bg-slate-50 dark:bg-slate-900 min-h-screen text-slate-800 dark:text-slate-200 transition-colors duration-300">
            <div className="container mx-auto px-6 py-12 md:py-20 text-center">

                {/* Hero Section */}
                <header className="mb-16">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight mb-4">
                        Generador de Configuración JSON
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                        Transforma complejas consultas SQL en archivos de configuración listos para usar, de forma rápida, visual e intuitiva.
                    </p>
                    <div className="mt-8">
                        <button
                            onClick={onStart}
                            className="inline-flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 transition-transform transform hover:scale-105"
                        >
                            <Play size={20} />
                            Empezar a Configurar
                        </button>
                    </div>
                </header>

                {/* Features Section */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md border border-slate-200 dark:border-slate-700">
                        <DatabaseZap size={40} className="text-indigo-500 mb-4" />
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Análisis SQL Inteligente</h3>
                        <p className="text-slate-600 dark:text-slate-400">
                            Pega tu consulta y la herramienta extraerá automáticamente las columnas, sirviendo de base para la configuración.
                        </p>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md border border-slate-200 dark:border-slate-700">
                        <Settings2 size={40} className="text-indigo-500 mb-4" />
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Interfaz Guiada</h3>
                        <p className="text-slate-600 dark:text-slate-400">
                            Define tipos de datos, variables y queries adicionales a través de componentes visuales fáciles de usar.
                        </p>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md border border-slate-200 dark:border-slate-700">
                        <FileJson size={40} className="text-indigo-500 mb-4" />
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Exportación Instantánea</h3>
                        <p className="text-slate-600 dark:text-slate-400">
                            Genera el archivo JSON final y el script SQL de i18n con un solo clic, listos para copiar o descargar.
                        </p>
                    </div>
                </section>

            </div>
            {/* Footer */}
            <footer className="text-center py-8 mt-12 border-t border-slate-200 dark:border-slate-800">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    Creado para agilizar el flujo de trabajo de configuración de datasets.
                </p>
            </footer>
        </div>
    );
};
