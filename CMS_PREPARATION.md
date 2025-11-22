# Preparación para Headless CMS

## Índice

1. [Introducción](#introducción)
2. [¿Por qué un Headless CMS?](#por-qué-un-headless-cms)
3. [CMS Recomendados](#cms-recomendados)
4. [Arquitectura Actual](#arquitectura-actual)
5. [Contenido Gestionable](#contenido-gestionable)
6. [Plan de Migración](#plan-de-migración)
7. [Código Preparado](#código-preparado)
8. [Próximos Pasos](#próximos-pasos)

---

## Introducción

Este documento describe cómo preparar **Farrays Center** para integración con un **Headless CMS**, permitiendo que el equipo de marketing gestione contenido sin tocar código.

### Estado Actual

- ✅ Contenido hardcodeado en componentes React
- ✅ i18n con archivos TypeScript estáticos (`i18n/locales/`)
- ✅ Imágenes gestionadas manualmente en `/public/images/`
- ❌ Sin CMS (todo requiere despliegue para cambios)

---

## ¿Por qué un Headless CMS?

### Ventajas

1. **Autonomía del equipo de marketing**: Editar textos, imágenes, horarios sin desarrolladores
2. **Multilenguaje simplificado**: Gestionar ES/EN/CA/FR desde interfaz visual
3. **Contenido dinámico**: Cambiar promociones, precios, horarios en tiempo real
4. **Preview de cambios**: Ver contenido antes de publicar
5. **Workflow editorial**: Aprobaciones, drafts, scheduling de publicaciones
6. **Assets organizados**: Librería de imágenes/videos centralizada
7. **SEO mejorado**: Meta tags, Open Graph editables sin código

### Casos de Uso

- Actualizar horarios de clases semanalmente
- Crear/editar landing pages de nuevos estilos de baile
- Gestionar testimonios y reviews
- Cambiar CTAs y ofertas promocionales
- Añadir nuevos profesores sin tocar código

---

## CMS Recomendados

### 1. **Sanity.io** (Recomendado) ⭐

**Pros:**

- Excelente DX (Developer Experience)
- Real-time collaboration
- GROQ (query language potente)
- Imagen CDN incluido
- Pricing generoso (100k requests/mes gratis)
- Portable Text (contenido enriquecido)

**Cons:**

- Requiere aprender GROQ
- Más configuración inicial

**Precio:** Gratis hasta 3 usuarios + 100k requests/mes

---

### 2. **Contentful**

**Pros:**

- UI intuitiva para editores
- GraphQL + REST API
- Gran ecosistema de plugins
- Excelente documentación

**Cons:**

- Límite de 25k entries en plan gratuito
- Más costoso al escalar

**Precio:** Gratis hasta 5 usuarios + 25k entries

---

### 3. **Strapi** (Self-hosted)

**Pros:**

- Open source
- Control total (self-hosted)
- Sin límites de contenido
- Customizable

**Cons:**

- Requiere servidor propio
- Más mantenimiento
- Hosting adicional

**Precio:** Gratis (solo costes de hosting)

---

### 4. **Payload CMS**

**Pros:**

- TypeScript nativo
- Next.js friendly
- Autenticación incluida
- Moderna y rápida

**Cons:**

- Menor comunidad
- Self-hosted

**Precio:** Gratis (open source)

---

## Arquitectura Actual

### Estructura de Contenido

```
web-local/
├── components/               # Componentes React
│   ├── AboutPage.tsx        # Contenido hardcodeado
│   ├── ContactPage.tsx      # Contenido hardcodeado
│   └── DanceClassesPage.tsx # Contenido hardcodeado
├── i18n/
│   └── locales/
│       ├── es.ts            # 2500+ traducciones
│       ├── en.ts
│       ├── ca.ts
│       └── fr.ts
├── constants/
│   └── config.ts            # URLs, emails, business info
└── public/
    └── images/              # Imágenes estáticas
```

### Sistema i18n Actual

```typescript
// i18n/locales/es.ts
export const es = {
  home_hero_title: "Escuela de Baile en Barcelona",
  home_hero_subtitle: "Clases de Dancehall, Hip Hop, Twerk...",
  // 2500+ keys más
}

// Uso en componentes
import { useTranslation } from '@/i18n/client'

export default function HomePage() {
  const { t } = useTranslation()
  return <h1>{t('home_hero_title')}</h1>
}
```

---

## Contenido Gestionable

### Prioridad Alta (Cambios frecuentes)

1. **Horarios de clases** (`DanceScheduleSection`)
   - Días de la semana
   - Horarios
   - Niveles
   - Profesores

2. **Textos promocionales** (Hero sections)
   - Títulos principales
   - Subtítulos
   - CTAs

3. **Testimonios** (`DanceTestimonialsFAQSection`)
   - Nombre del alumno
   - Texto del testimonio
   - Avatar/foto

4. **FAQs** (`DanceTestimonialsFAQSection`)
   - Preguntas frecuentes
   - Respuestas

### Prioridad Media

5. **Páginas de clases** (`DancePageTemplate`)
   - Descripciones de estilos de baile
   - Beneficios
   - Identificación (¿Es para ti?)
   - Videos de YouTube

6. **Profesores** (Bio sections)
   - Nombre
   - Bio
   - Foto
   - Especialidades

7. **Imágenes/Videos**
   - Galería de clases
   - Videos hero
   - Imágenes de estudio

### Prioridad Baja (Cambios ocasionales)

8. **SEO Metadata**
   - Meta titles
   - Meta descriptions
   - Open Graph images

9. **Configuración global**
   - Emails de contacto
   - Redes sociales
   - Información de negocio

---

## Plan de Migración

### Fase 1: Setup CMS (1-2 semanas)

1. **Elegir CMS** (recomendado: Sanity)
2. **Crear cuenta** y proyecto
3. **Diseñar schemas** (tipos de contenido)
4. **Configurar entorno local**

#### Ejemplo Schema - Clase de Baile (Sanity)

```javascript
// schemas/danceClass.js
export default {
  name: 'danceClass',
  title: 'Clase de Baile',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Nombre del Estilo',
      type: 'object',
      fields: [
        { name: 'es', type: 'string', title: 'Español' },
        { name: 'en', type: 'string', title: 'English' },
        { name: 'ca', type: 'string', title: 'Català' },
        { name: 'fr', type: 'string', title: 'Français' },
      ]
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: { source: 'title.es' }
    },
    {
      name: 'description',
      title: 'Descripción',
      type: 'object',
      fields: [
        { name: 'es', type: 'text', title: 'Español' },
        { name: 'en', type: 'text', title: 'English' },
        { name: 'ca', type: 'text', title: 'Català' },
        { name: 'fr', type: 'text', title: 'Français' },
      ]
    },
    {
      name: 'videoId',
      title: 'YouTube Video ID',
      type: 'string'
    },
    {
      name: 'benefits',
      title: 'Beneficios',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'object', fields: [...] },
            { name: 'description', type: 'object', fields: [...] },
            { name: 'icon', type: 'string' }
          ]
        }
      ]
    },
    {
      name: 'schedule',
      title: 'Horarios',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'day', type: 'string', options: { list: ['lunes', 'martes', ...] } },
            { name: 'time', type: 'string' },
            { name: 'level', type: 'string' },
            { name: 'teacher', type: 'reference', to: [{ type: 'teacher' }] }
          ]
        }
      ]
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        { name: 'metaTitle', type: 'object', fields: [...] },
        { name: 'metaDescription', type: 'object', fields: [...] },
        { name: 'ogImage', type: 'image' }
      ]
    }
  ]
}
```

---

### Fase 2: Migración de Contenido (2-3 semanas)

1. **Exportar contenido actual** de archivos TypeScript
2. **Importar a CMS** (manual o script)
3. **Crear scripts de importación** para contenido masivo

#### Script Ejemplo - Importar i18n a Sanity

```typescript
// scripts/migrate-to-sanity.ts
import { createClient } from '@sanity/client';
import { es } from '../i18n/locales/es';

const client = createClient({
  projectId: 'xxx',
  dataset: 'production',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

async function migrateTranslations() {
  // Crear documentos de traducción
  const translations = Object.entries(es).map(([key, value]) => ({
    _type: 'translation',
    key,
    value: {
      es: value,
      en: en[key],
      ca: ca[key],
      fr: fr[key],
    },
  }));

  // Importar en lotes
  for (const translation of translations) {
    await client.create(translation);
  }
}
```

---

### Fase 3: Integración Frontend (2-3 semanas)

1. **Instalar SDK del CMS** (`npm install @sanity/client`)
2. **Crear API layer** para fetching
3. **Actualizar componentes** para usar CMS data
4. **Implementar ISR/SSG** (Incremental Static Regeneration)

#### Ejemplo - Fetching desde Sanity

```typescript
// lib/sanity.ts
import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true, // para producción
});

// Queries
export async function getDanceClass(slug: string, lang: string) {
  return sanityClient.fetch(
    `*[_type == "danceClass" && slug.current == $slug][0]{
      title,
      description,
      videoId,
      benefits,
      schedule,
      seo
    }`,
    { slug }
  );
}
```

#### Ejemplo - Componente actualizado

```typescript
// components/DancehallPage.tsx (antes)
export default function DancehallPage() {
  const { t } = useTranslation()
  return (
    <DancePageTemplate
      style="Dancehall"
      title={t('dancehall_title')}
      // ... contenido hardcodeado
    />
  )
}

// components/DancehallPage.tsx (después)
export default function DancehallPage({ data }) {
  return (
    <DancePageTemplate
      style={data.title.es}
      title={data.title}
      description={data.description}
      benefits={data.benefits}
      schedule={data.schedule}
      // ... contenido dinámico desde CMS
    />
  )
}

// Fetch en getStaticProps (Next.js)
export async function getStaticProps({ locale }) {
  const data = await getDanceClass('dancehall', locale)
  return {
    props: { data },
    revalidate: 60 // ISR: regenerar cada 60s
  }
}
```

---

### Fase 4: Testing y Rollout (1-2 semanas)

1. **Testing en staging** con contenido CMS
2. **Capacitación equipo** (workshop de 2h)
3. **Documentación editorial** (guía de uso)
4. **Deploy gradual** (1-2 páginas primero)

---

## Código Preparado

### ✅ Ya Compatible con CMS

1. **DancePageTemplate** ([components/templates/DancePageTemplate.tsx](components/templates/DancePageTemplate.tsx))
   - Props claramente definidos
   - Fácil pasar data desde CMS

   ```typescript
   interface DancePageTemplateProps {
     style: string;
     title: Record<string, string>; // Multi-idioma
     description: Record<string, string>;
     benefits: Benefit[];
     schedule: ScheduleItem[];
     // ... ya preparado para data externa
   }
   ```

2. **Constants centralizados** ([constants/config.ts](constants/config.ts))
   - URLs, emails, business info
   - Fácil migrar a CMS como "Settings globales"

3. **Componentes genéricos reutilizables**
   - `DanceHeroSection`
   - `DanceBenefitsSection`
   - `DanceScheduleSection`
   - `DanceTestimonialsFAQSection`
   - Todos aceptan props → listos para data dinámica

### ⚠️ Requiere Refactor Menor

1. **Sistema i18n** ([i18n/locales/](i18n/locales/))
   - Actualmente archivos TypeScript estáticos
   - Necesita wrapper para fetchear desde CMS

   ```typescript
   // lib/i18n-cms.ts
   export async function getTranslations(locale: string) {
     // Fetch desde CMS en lugar de import estático
     const translations = await sanityClient.fetch(
       `*[_type == "translation"]{key, "value": value.${locale}}`
     );
     return Object.fromEntries(translations.map(t => [t.key, t.value]));
   }
   ```

2. **Páginas estáticas** (algunas aún tienen contenido hardcodeado)
   - [AboutPage.tsx](components/AboutPage.tsx)
   - [ContactPage.tsx](components/ContactPage.tsx)
   - Necesitan migrar JSX a props dinámicos

---

## Próximos Pasos

### Inmediato (esta semana)

- [ ] Decidir CMS (recomendación: **Sanity.io**)
- [ ] Crear cuenta y proyecto de prueba
- [ ] Definir schemas iniciales (DanceClass, Teacher, Testimonial)

### Corto plazo (1 mes)

- [ ] Implementar 1 página piloto (ej: Dancehall) con CMS
- [ ] Crear scripts de migración de contenido
- [ ] Testing en staging

### Medio plazo (2-3 meses)

- [ ] Migrar todas las páginas de clases
- [ ] Migrar sistema i18n completo
- [ ] Capacitar equipo de marketing

### Largo plazo (6 meses)

- [ ] Workflow editorial completo
- [ ] Preview de cambios
- [ ] Scheduled publishing
- [ ] Analytics de contenido

---

## Recursos

### Documentación Recomendada

- [Sanity + Next.js Guide](https://www.sanity.io/guides/sanity-nextjs-guide)
- [Contentful + React](https://www.contentful.com/developers/docs/javascript/tutorials/integrate-contentful-with-react/)
- [Strapi Documentation](https://docs.strapi.io/)

### Ejemplos de Código

- [Sanity Studio Templates](https://www.sanity.io/templates)
- [Next.js + Sanity Starter](https://github.com/sanity-io/nextjs-sanity-starter)

### Tools

- [Sanity Migration Tool](https://www.sanity.io/docs/migrating-data)
- [Contentful Import](https://github.com/contentful/contentful-import)

---

## Conclusión

El código actual de **Farrays Center** está **bien preparado** para integración con CMS gracias a:

- ✅ Componentes genéricos reutilizables
- ✅ DancePageTemplate centralizado
- ✅ Constants extraídas
- ✅ Props claramente definidos

La migración es **viable en 6-8 semanas** con mínimo refactor. El mayor beneficio será **autonomía del equipo de marketing** para gestionar contenido sin tocar código.

**Recomendación final:** Empezar con **Sanity.io** + 1 página piloto (Dancehall) y escalar progresivamente.
