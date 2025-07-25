# Generador de Configuración JSON para Datasets

Este proyecto es una herramienta web interna diseñada para simplificar y acelerar la creación de archivos de configuración JSON complejos, que se utilizan para definir datasets a partir de consultas SQL.

La aplicación cuenta con una interfaz de usuario moderna y guiada que permite a los usuarios transformar una consulta SQL en una estructura JSON completa, generando también los scripts de internacionalización (i18n) necesarios, todo desde un único lugar.

## ✨ Características Principales

- **Análisis de SQL Inteligente:** Pega una consulta SQL y la aplicación extrae automáticamente las columnas del `SELECT` principal.
- **Configuración Visual:** Define tipos de datos, variables, pre-queries y post-queries a través de una interfaz intuitiva.
- **Alias de Tabla Dinámicos:** Asigna alias de tabla personalizados para las variables, haciendo la configuración más flexible y compatible con cualquier estructura de consulta.
- **Generación de Artefactos:** Con un solo clic, genera tanto el archivo de configuración `JSON` final como un script `SQL` para insertar las etiquetas de internacionalización (i18n).
- **Interfaz Moderna:**
  - Diseño limpio y responsivo.
  - Modo claro y oscuro para mayor comodidad visual.
  - Componentes interactivos que mejoran la experiencia de usuario.
- **Página de Bienvenida:** Una landing page introductoria que explica el propósito de la herramienta.

## 🚀 Stack Tecnológico

La aplicación está construida con un stack moderno y desacoplado, separando el frontend de la lógica del backend.

-   **Frontend:**
    -   **Framework:** [React](https://reactjs.org/) (con Vite)
    -   **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
    -   **Manejo de Estado:** [Zustand](https://github.com/pmndrs/zustand)
    -   **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
    -   **Iconos:** [Lucide React](https://lucide.dev/)

-   **Backend:**
    -   **Framework:** [FastAPI](https://fastapi.tiangolo.com/)
    -   **Lenguaje:** [Python](https://www.python.org/)
    -   **Análisis de SQL:** [sqlglot](https://github.com/tobymao/sqlglot)

## 📋 Prerrequisitos

Asegúrate de tener instaladas las siguientes herramientas en tu sistema:

-   [Node.js](https://nodejs.org/en/) (v16 o superior) y npm
-   [Python](https://www.python.org/downloads/) (v3.8 o superior) y pip

## 🛠️ Instalación y Puesta en Marcha

Sigue estos pasos para poner en funcionamiento el proyecto en tu máquina local.

### 1. Backend (Servidor FastAPI)

Primero, configura y ejecuta el servidor que se encargará de analizar las consultas SQL.

```bash
# 1. Clona el repositorio (si aún no lo has hecho)
git clone <tu-repositorio-url>
cd <nombre-del-repositorio>

# 2. Navega a la carpeta del backend
cd backend/

# 3. Crea y activa un entorno virtual
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate

# 4. Instala las dependencias de Python
pip install -r requirements.txt

# 5. Inicia el servidor de FastAPI
uvicorn main:app --reload
```

El backend ahora estará corriendo en `http://localhost:8000`.

### 2. Frontend (Aplicación React)

En una nueva terminal, configura y ejecuta la aplicación de React.

```bash
# 1. Navega a la carpeta del frontend
cd frontend/

# 2. Instala las dependencias de Node.js
npm install

# 3. Inicia el servidor de desarrollo de Vite
npm run dev
```

La aplicación frontend ahora estará disponible en `http://localhost:5173` (o el puerto que indique Vite).

## 📖 Uso

1.  Abre tu navegador y ve a `http://localhost:5173`.
2.  Serás recibido por la página de bienvenida. Haz clic en "Empezar a Configurar".
3.  Sigue los pasos en la interfaz:
    -   Completa la información base (nombre del reporte, proyecto, etc.).
    -   Pega tu consulta SQL principal y haz clic en "Analizar".
    -   Configura los tipos de datos y mensajes para cada columna detectada.
    -   Selecciona las variables opcionales y define sus alias.
    -   Elige el tipo de dataset.
    -   Añade pre-queries o post-queries si es necesario.
4.  Haz clic en "Generar" para ver el JSON y el SQL resultantes.
5.  Usa los botones para copiar el contenido al portapapeles o descargarlo como archivo.

## 📂 Estructura del Proyecto (Frontend)

El frontend está organizado de manera modular para facilitar el mantenimiento y la escalabilidad:

```
src/
├── components/   # Componentes reutilizables de la UI
├── constants/    # Datos estáticos (variables, tipos de datos)
├── store/        # Lógica de estado con Zustand (configStore.ts)
├── types/        # Definiciones de interfaces de TypeScript
├── App.tsx       # Componente principal que ensambla la app
