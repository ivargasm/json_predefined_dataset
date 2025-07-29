import React from 'react';
import { FileCode, Database, Settings, Wand2, Lightbulb, ArrowRight } from 'lucide-react';

interface LandingPageProps {
    onStart: () => void;
}

const FeatureCard: React.FC<{
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
    isOptional?: boolean;
}> = ({ icon, title, children, isOptional }) => (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 transform transition-transform hover:scale-[1.02]">
        <div className="flex items-center mb-4">
            <div className="bg-indigo-100 dark:bg-indigo-900/40 p-3 rounded-full mr-4">
                {icon}
            </div>
            <div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">{title}</h3>
                {isOptional && (
                    <span className="text-xs font-medium bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-full">Opcional</span>
                )}
            </div>
        </div>
        <div className="text-sm text-slate-600 dark:text-slate-300 space-y-2">
            {children}
        </div>
    </div>
);

const ProTipCard: React.FC = () => (
    <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-xl border-2 border-amber-400 dark:border-amber-600 shadow-lg">
        <div className="flex items-center mb-3">
            <Lightbulb className="text-amber-500 mr-3" size={24} />
            <h4 className="text-lg font-bold text-amber-800 dark:text-amber-200">Consejo Pro: ¿El análisis del SQL falla?</h4>
        </div>
        <div className="text-sm text-amber-700 dark:text-amber-300 space-y-2">
            <p>El analizador es potente, pero los placeholders (ej: <strong>$roleIds</strong>) a veces pueden causar conflictos.</p>
            <p>Si recibes un error, prueba esto:</p>
            <ol className="list-decimal list-inside pl-2 space-y-1">
                <li><strong>Quita temporalmente</strong> los placeholders del <strong>WHERE</strong>.</li>
                <li>Haz clic en <strong>"Analizar Consulta"</strong> para obtener las columnas.</li>
                <li><strong>Vuelve a agregar</strong> los placeholders en el editor de SQL.</li>
            </ol>
            <p className="font-semibold">¡La herramienta recordará las columnas y podrás generar tu JSON sin problemas!</p>
        </div>
    </div>
);


export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl w-full mx-auto space-y-12">
                <header className="text-center">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-800 dark:text-slate-100 mb-4">
                        Generador de Configuración de Datasets
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400">
                        Una guía rápida para construir archivos JSON complejos de forma intuitiva.
                    </p>
                </header>

                <main className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <FeatureCard icon={<FileCode className="text-indigo-600 dark:text-indigo-400" />} title="1. Entradas Principales">
                            <p>Define la base de tu configuración. Elige el <strong>Tipo de JSON</strong>:</p>
                            <ul className="list-disc list-inside pl-2">
                                <li><strong>Normal:</strong> Para datasets estándar.</li>
                                <li><strong>Group By:</strong> Para configuraciones con agregaciones.</li>
                            </ul>
                            <p className="font-bold mt-2">Esta sección es obligatoria.</p>
                        </FeatureCard>

                        <FeatureCard icon={<Database className="text-indigo-600 dark:text-indigo-400" />} title="2. La Consulta Maestra">
                            <p>Pega tu consulta SQL. La herramienta analizará el <strong>SELECT</strong> para extraer las columnas automáticamente.</p>
                            <p className="font-bold mt-2">Este es el corazón de tu dataset.</p>
                        </FeatureCard>
                    </div>

                    <ProTipCard />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <FeatureCard icon={<Settings className="text-indigo-600 dark:text-indigo-400" />} title="3. Configuración de Columnas">
                            <p>Ajusta el <strong>tipo de dato</strong> para cada columna extraída y añade un mensaje personalizado para la internacionalización (i18n).</p>
                            <p className="font-bold mt-2">Revisar los tipos de dato es obligatorio.</p>
                        </FeatureCard>
                        <FeatureCard icon={<Wand2 className="text-indigo-600 dark:text-indigo-400" />} title="4. Ajustes Finales" isOptional>
                            <p>Personaliza tu dataset con filtros dinámicos (<strong>Variables</strong>) y scripts que se ejecutan antes o después de tu consulta principal (<strong>Pre/Post Queries</strong>).</p>
                        </FeatureCard>
                    </div>
                </main>

                <footer className="text-center">
                    <button
                        onClick={onStart}
                        className="inline-flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white font-bold text-lg rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 transition-transform transform hover:scale-105"
                    >
                        ¡Entendido, Empezar a Crear!
                        <ArrowRight />
                    </button>
                </footer>
            </div>
        </div>
    );
};
