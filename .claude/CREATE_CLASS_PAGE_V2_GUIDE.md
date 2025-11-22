# 🚀 Class Page Generator v2.0 - Complete Guide

Generador avanzado de páginas de clases con validación exhaustiva, backups automáticos y actualización inteligente de i18n.

## 📋 Índice

- [Características](#-características)
- [Instalación](#-instalación)
- [Uso Básico](#-uso-básico)
- [Opciones Avanzadas](#-opciones-avanzadas)
- [Ejemplos](#-ejemplos)
- [Flujo de Trabajo Recomendado](#-flujo-de-trabajo-recomendado)
- [Plantillas Predefinidas](#-plantillas-predefinidas)
- [Troubleshooting](#-troubleshooting)

---

## ✨ Características

### 🔒 Seguridad y Validación

- ✅ Validación exhaustiva antes de ejecutar
- 📦 Backups automáticos con rollback en caso de error
- 🔍 Detección de conflictos (componentes/rutas existentes)
- 🧪 Verificación de sintaxis post-generación

### 🎯 Funcionalidad Avanzada

- 🎨 Clonación desde cualquier página existente (no solo Dancehall)
- 📝 Actualización automática de archivos i18n (todos los locales)
- 🖼️ Creación de estructura de directorios para imágenes
- 🛣️ Actualización inteligente de rutas en App.tsx
- 📊 Progress logging y modo verbose

### 🔧 Flexibilidad

- 🌵 Dry-run mode para previsualizar cambios
- 🎛️ Flags para personalizar qué se genera
- 📚 Plantillas predefinidas para estilos comunes
- 💬 Modo interactivo si no se pasan argumentos

---

## 🛠 Instalación

El script ya está instalado. Solo necesitas:

```bash
npm install  # Si aún no has instalado las dependencias
```

---

## 🚀 Uso Básico

### Modo Interactivo (Recomendado para principiantes)

```bash
npm run create:class:v2
```

El script te preguntará:

1. Nombre de la clase (ej: `bachata`, `salsa`, `kizomba`)
2. Nombre del instructor (opcional)
3. Especialidad del instructor (opcional)

### Modo Línea de Comandos

```bash
npm run create:class:v2 -- --name=bachata
```

Con opciones adicionales:

```bash
npm run create:class:v2 -- --name=bachata --instructor="Carlos Martínez" --specialty="Bachata Sensual"
```

### Dry-Run (Previsualizar sin ejecutar)

```bash
npm run create:class:v2 -- --name=bachata --dry-run
```

Esto te mostrará **exactamente** qué archivos se crearían/modificarían sin hacer ningún cambio.

---

## 🎛 Opciones Avanzadas

### Flags Disponibles

| Flag            | Descripción                                    | Ejemplo                          |
| --------------- | ---------------------------------------------- | -------------------------------- |
| `--name`        | Nombre de la clase **(obligatorio)**           | `--name=bachata`                 |
| `--from`        | Página base para clonar (default: `dancehall`) | `--from=salsa`                   |
| `--instructor`  | Nombre del instructor                          | `--instructor="Carlos Martínez"` |
| `--specialty`   | Especialidad del instructor                    | `--specialty="Bachata Sensual"`  |
| `--dry-run`     | Previsualizar cambios sin ejecutar             | `--dry-run`                      |
| `--verbose`     | Logs detallados                                | `--verbose`                      |
| `--auto-i18n`   | Actualiza archivos i18n automáticamente        | `--auto-i18n`                    |
| `--force`       | Sobrescribe claves i18n existentes             | `--force`                        |
| `--skip-backup` | No crear backups (¡cuidado!)                   | `--skip-backup`                  |
| `--no-routes`   | No actualizar App.tsx                          | `--no-routes`                    |
| `--no-images`   | No crear estructura de imágenes                | `--no-images`                    |
| `--typecheck`   | Ejecutar typecheck después de generar          | `--typecheck`                    |

### Combinaciones Útiles

#### 1. Generación Completa con Auto-i18n

```bash
npm run create:class:v2 -- --name=salsa --auto-i18n --typecheck
```

**Hace:**

- Crea el componente `SalsaPage.tsx`
- Actualiza `App.tsx` con las rutas
- **Actualiza automáticamente** todos los archivos i18n (es, en, ca, fr)
- Crea estructura de imágenes
- Actualiza `build-images.mjs`
- Ejecuta `npm run typecheck` al final

#### 2. Dry-Run Verbose (Máxima información)

```bash
npm run create:class:v2 -- --name=kizomba --dry-run --verbose
```

**Muestra:**

- Todos los archivos que se crearían
- Preview del contenido generado
- Cambios exactos en App.tsx e i18n
- Sin modificar nada

#### 3. Solo Componente (sin rutas ni imágenes)

```bash
npm run create:class:v2 -- --name=tango --no-routes --no-images
```

**Útil cuando:**

- Quieres crear solo el componente
- Vas a añadir las rutas manualmente
- No necesitas imágenes aún

#### 4. Clonar desde otra página

```bash
npm run create:class:v2 -- --name=rumba --from=salsa
```

**Clona la estructura de `SalsaPage.tsx` en lugar de `DancehallPage.tsx`**

---

## 📚 Ejemplos

### Ejemplo 1: Bachata (con plantilla predefinida)

```bash
npm run create:class:v2 -- --name=bachata --instructor="Isabel López" --specialty="Bachata Sensual" --auto-i18n
```

**Resultado:**

- Componente creado con 7 FAQs específicas de Bachata
- Pilares: Sensualidad, Técnica, Musicalidad
- i18n actualizado automáticamente en los 4 idiomas
- Estructura de imágenes lista
- Rutas configuradas en App.tsx

### Ejemplo 2: Hip Hop (con plantilla)

```bash
npm run create:class:v2 -- --name=hip-hop --instructor="David Chen" --specialty="Old School Hip Hop" --auto-i18n
```

**Resultado:**

- Plantilla con 7 FAQs de Hip Hop
- Pilares: Flow, Técnica, Cultura
- Todo configurado automáticamente

### Ejemplo 3: Tango (sin plantilla predefinida)

```bash
npm run create:class:v2 -- --name=tango --instructor="Roberto García" --specialty="Tango Argentino"
```

**Resultado:**

- Componente creado con plantilla genérica
- Template i18n guardado en `.claude/i18n-tango-template.txt`
- Debes copiar manualmente las claves a los archivos i18n

### Ejemplo 4: Test seguro antes de ejecutar

```bash
# 1. Dry-run para ver qué haría
npm run create:class:v2 -- --name=flamenco --dry-run

# 2. Si todo se ve bien, ejecutar de verdad
npm run create:class:v2 -- --name=flamenco --auto-i18n
```

---

## 🔄 Flujo de Trabajo Recomendado

### 1️⃣ Previsualizar

```bash
npm run create:class:v2 -- --name=NUEVA_CLASE --dry-run --verbose
```

**Revisa la salida** y asegúrate de que todo es correcto.

### 2️⃣ Generar

```bash
npm run create:class:v2 -- --name=NUEVA_CLASE --auto-i18n
```

### 3️⃣ Personalizar

1. **Traducciones i18n**:

   ```bash
   # Abre y personaliza:
   code i18n/locales/es.ts  # Busca las claves de tu clase
   code i18n/locales/en.ts  # Traduce al inglés
   code i18n/locales/ca.ts  # Traduce al catalán
   code i18n/locales/fr.ts  # Traduce al francés
   ```

2. **Componente**:

   ```bash
   code components/NuevaClasePage.tsx  # Personaliza el contenido
   ```

3. **Imágenes**:

   ```bash
   # Sube 3 imágenes JPG a:
   public/images/classes/nueva-clase/raw/
     - nueva-clase-hero.jpg
     - nueva-clase-clase-1.jpg
     - nueva-clase-profesor.jpg

   # Optimiza:
   npm run build:images
   ```

### 4️⃣ Verificar

```bash
npm run dev
# Abre: http://localhost:5173/es/nueva-clase
```

### 5️⃣ Desplegar

```bash
git checkout -b feat/nueva-clase-page
git add .
git commit -m "feat: Add Nueva Clase page"
git push -u origin feat/nueva-clase-page
# Crear PR en GitHub
```

---

## 🎨 Plantillas Predefinidas

El script incluye plantillas optimizadas para:

### 📍 Bachata

- **Pilares**: Sensualidad, Técnica, Musicalidad
- **FAQs**: 7 preguntas específicas sobre Bachata
- **Categoría**: Bailes latinos

### 📍 Salsa

- **Pilares**: Ritmo, Estilo, Shine
- **FAQs**: 7 preguntas sobre On1, On2, Casino
- **Categoría**: Bailes latinos

### 📍 Kizomba

- **Pilares**: Conexión, Movimiento, Musicalidad
- **FAQs**: 7 preguntas sobre Kizomba y Urban Kiz
- **Categoría**: Bailes africanos

### 📍 Hip Hop

- **Pilares**: Flow, Técnica, Cultura
- **FAQs**: 7 preguntas sobre estilos de Hip Hop
- **Categoría**: Urbano

Para clases sin plantilla, se usa una plantilla genérica que puedes personalizar.

---

## 🛡 Seguridad y Backups

### Sistema de Backups

Cada ejecución crea backups automáticos en:

```
.claude/backups/session-2025-01-15T10-30-45-123Z/
├── components/
│   └── BachataPage.tsx  (si existía)
├── App.tsx
├── i18n/
│   └── locales/
│       └── es.ts
└── ...
```

### Rollback Manual

Si algo sale mal, puedes restaurar desde los backups:

```bash
# Los backups están en:
ls .claude/backups/

# Para restaurar un archivo específico:
cp .claude/backups/session-TIMESTAMP/components/BachataPage.tsx components/
```

### Rollback Automático

Si la verificación falla, el script te preguntará:

```
❌ Some verification checks failed
? Rollback changes? (y/n)
```

Responde `y` para deshacer automáticamente todos los cambios.

---

## 🔍 Troubleshooting

### Error: "Component already exists"

**Problema**: El componente ya fue creado.

**Solución**:

```bash
# Opción 1: Usa otro nombre
npm run create:class:v2 -- --name=bachata-avanzada

# Opción 2: Elimina el existente primero
rm components/BachataPage.tsx
npm run create:class:v2 -- --name=bachata
```

### Error: "Source component not found"

**Problema**: La página base especificada en `--from` no existe.

**Solución**:

```bash
# Verifica qué páginas existen:
ls components/*Page.tsx

# Usa una existente:
npm run create:class:v2 -- --name=tango --from=salsa
```

### Warning: "Git working directory is not clean"

**No es un error**, solo una advertencia. Puedes:

1. **Ignorar y continuar** (el script seguirá funcionando)
2. **Commitear cambios pendientes**:
   ```bash
   git add .
   git commit -m "WIP: before generating new class page"
   npm run create:class:v2 -- --name=nueva-clase
   ```

### Error: "Could not find lazy imports section in App.tsx"

**Problema**: La estructura de App.tsx cambió y el script no puede encontrar dónde insertar.

**Solución**:

```bash
# Genera sin actualizar rutas:
npm run create:class:v2 -- --name=nueva-clase --no-routes

# Añade las rutas manualmente en App.tsx:
# 1. Import:
const NuevaClasePage = lazy(() => import('./components/NuevaClasePage'));

# 2. Ruta con locale:
<Route path="/:locale/nueva-clase" element={<><LocaleSync /><NuevaClasePage /></>} />

# 3. Redirect legacy:
<Route path="/nueva-clase" element={<Navigate to={`/${locale}/nueva-clase`} replace />} />
```

### TypeError en i18n

**Problema**: Las claves i18n tienen caracteres especiales o comillas sin escapar.

**Solución**:
El script escapa automáticamente las comillas simples. Si persiste el error:

1. Revisa el archivo `.claude/i18n-CLASE-template.txt`
2. Busca caracteres problemáticos: `'`, `"`, `\`
3. Corrígelos manualmente antes de copiar a los archivos i18n

---

## 📊 Comparación con v1

| Característica                | v1 (create:class) | v2 (create:class:v2) |
| ----------------------------- | ----------------- | -------------------- |
| Validación previa             | ❌                | ✅                   |
| Backups automáticos           | ❌                | ✅                   |
| Dry-run mode                  | ❌                | ✅                   |
| Auto-update i18n              | ❌                | ✅                   |
| Rollback en error             | ❌                | ✅                   |
| Verbose logging               | ❌                | ✅                   |
| Clonar desde cualquier página | ❌                | ✅                   |
| Verificación post-gen         | ❌                | ✅                   |
| Skip flags                    | ❌                | ✅                   |
| Typecheck integrado           | ❌                | ✅                   |

**Recomendación**: Usa siempre v2 para nuevas clases. v1 se mantiene por compatibilidad.

---

## 🎓 Tips Avanzados

### 1. Crear múltiples clases rápidamente

```bash
# Usa un loop:
for class in bachata salsa kizomba; do
  npm run create:class:v2 -- --name=$class --auto-i18n
done
```

### 2. Personalizar plantillas

Edita las plantillas en el script:

```javascript
// scripts/create-class-page-v2.mjs
const classTemplates = {
  'tu-nuevo-estilo': {
    displayName: 'Tu Nuevo Estilo',
    // ... tu configuración
  },
};
```

### 3. Integrar con Git Hooks

```bash
# .husky/pre-push
npm run typecheck  # Se ejecutará antes de cada push
```

### 4. Dry-run con diff visual

```bash
npm run create:class:v2 -- --name=tango --dry-run > preview.txt
code preview.txt  # Revisa en tu editor
```

---

## 📞 Soporte

- **Documentación del proyecto**: `.claude/WORKFLOW_GUIDE.md`
- **Issues**: Reporta problemas en el repositorio
- **Script location**: `scripts/create-class-page-v2.mjs`

---

## 🎉 ¡Listo!

Ya tienes todo para crear páginas de clases de forma profesional, segura y rápida.

```bash
npm run create:class:v2 -- --name=MI_CLASE --auto-i18n
```

**Happy coding!** 🚀
