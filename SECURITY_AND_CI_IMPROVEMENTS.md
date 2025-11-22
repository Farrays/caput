# Mejoras de Seguridad y CI/CD Implementadas

**Fecha:** 2025-11-22

## 1. Centralización de Constantes ✅

Se creó el archivo [constants/config.ts](constants/config.ts) que centraliza:

- **URLs del sitio:** `SITE_URL`, `LOGO_URL`
- **Emails de contacto:** `CONTACT_EMAIL`, `SUPPORT_EMAIL`
- **Schemas:** `SCHEMA_CONTEXT`, `SCHEMA_AVAILABILITY`
- **Recursos externos:** URLs de texturas, Google Maps, imágenes de Unsplash
- **Información de negocio:** `BUSINESS_INFO` para Schema.org
- **Videos:** URLs de videos del sitio

### Archivos actualizados:
- [components/ContactPage.tsx](components/ContactPage.tsx)
- [components/AboutPage.tsx](components/AboutPage.tsx)

### Beneficios:
- ✅ Mantenimiento más fácil (cambiar una URL en un solo lugar)
- ✅ Reduce errores de tipeo
- ✅ Mejora la consistencia del código
- ✅ Facilita cambios de configuración

---

## 2. GitHub Actions CI/CD Mejorado ✅

Se actualizó [.github/workflows/ci.yml](.github/workflows/ci.yml) con:

### Cambios:
1. **Soporte para rama `master`** (además de `main` y `develop`)
2. **Job de Lighthouse CI** añadido para análisis de performance automático

### Jobs del pipeline:
1. ✅ **typecheck** - Verificación de tipos TypeScript
2. ✅ **lint** - ESLint para calidad de código
3. ✅ **test** - Tests unitarios con Vitest + cobertura
4. ✅ **build** - Build de producción + verificación de páginas prerenderizadas
5. ✅ **security** - Auditoría de dependencias npm
6. ✅ **lighthouse** - Análisis de performance web (NUEVO)

### Beneficios:
- ✅ Detección temprana de errores
- ✅ Análisis de performance automatizado
- ✅ Verificación de build antes de merge
- ✅ Codecov integration lista (requiere token)

---

## 3. Content Security Policy (CSP) Mejorado ✅

### Cambios Implementados:

#### a) Eliminación de inline styles de Tailwind
- **Problema:** 32 instancias de `bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]`
- **Solución:** Creada clase `.texture-stardust` en [index.css](index.css)
- **Archivos actualizados:** 18 componentes

#### b) CSP más estricto en [vercel.json](vercel.json)

**Antes:**
```
style-src 'self' 'unsafe-inline';
frame-src https://www.youtube.com https://www.youtube-nocookie.com;
```

**Después:**
```
style-src 'self' 'unsafe-inline' https://www.transparenttextures.com;
frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://www.google.com;
connect-src 'self' https://*.sentry.io https://www.google-analytics.com https://o4508206192009216.ingest.de.sentry.io;
+ upgrade-insecure-requests
+ block-all-mixed-content
```

#### c) Nuevas directivas de seguridad:
- ✅ **upgrade-insecure-requests** - Convierte HTTP a HTTPS automáticamente
- ✅ **block-all-mixed-content** - Bloquea contenido mixto HTTP/HTTPS
- ✅ **frame-src** incluye Google Maps
- ✅ **connect-src** incluye Sentry endpoints específicos

### Limitación conocida:
`'unsafe-inline'` en `style-src` sigue siendo necesario para:
- Estilos dinámicos en `AnimateOnScroll` (transitionDelay)
- Otros componentes con estilos dinámicos

**Nota:** Eliminar completamente `'unsafe-inline'` requeriría implementar nonces con SSR, lo cual está fuera del scope actual.

---

## Puntos Pendientes (Opcional)

- [ ] Configurar token de Codecov en GitHub Secrets
- [ ] Revisar resultados de Lighthouse CI y optimizar si necesario
- [ ] Considerar implementar nonces para CSP si se migra a SSR
- [ ] Añadir E2E tests con Playwright/Cypress

---

## Verificación

Para verificar las mejoras:

```bash
# 1. Verificar que el build funciona
npm run build

# 2. Verificar types
npm run typecheck

# 3. Verificar tests
npm run test:run

# 4. Verificar que no hay inline styles de Tailwind bg-[url(...)]
grep -r "bg-\[url(" components/
# Resultado esperado: Sin coincidencias

# 5. Verificar constantes centralizadas
grep -r "https://www.farrayscenter.com" components/ | grep -v "config"
# Resultado esperado: Solo usos legítimos (no hardcoded URLs)
```

---

## Resumen de Archivos Modificados

### Nuevos archivos:
- `constants/config.ts` - Constantes centralizadas

### Archivos modificados:
- `.github/workflows/ci.yml` - CI/CD mejorado
- `vercel.json` - CSP mejorado
- `index.css` - Nueva clase `.texture-stardust`
- 18 componentes - Reemplazo de bg-[url(...)] por clase CSS
- 2 componentes - Importación de constantes (ContactPage, AboutPage)

### Total de cambios:
- ✅ **22 archivos modificados/creados**
- ✅ **32 reemplazos de inline styles**
- ✅ **6 jobs de CI/CD activos**
- ✅ **10+ directivas CSP mejoradas**
