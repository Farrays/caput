# 🧪 Plan de Mejora de Testing - Coverage 70% → 80%

**Fecha:** 22 Noviembre 2025
**Estado Actual:** 50% coverage
**Objetivo:** 80% coverage (profesional)
**Fase 1:** 70% coverage (completado)

---

## 📊 Progreso Actual

### Thresholds Actualizados (Fase 1)

```typescript
// vitest.config.ts
thresholds: {
  lines: 70,       // ✅ Incrementado de 50% → 70%
  functions: 65,   // ✅ Incrementado de 40% → 65%
  branches: 60,    // ✅ Incrementado de 35% → 60%
  statements: 70,  // ✅ Incrementado de 50% → 70%
}
```

### Tests Existentes

```
Total archivos de test: 60+
Tests pasando: 118
Components testeados: ✅
  - HomePage, Header, Footer
  - DancehallPage, HipHopPage, TwerkPage
  - AboutPage, ContactPage, FAQPage
  - SEO, SchemaMarkup, Breadcrumb
  - ErrorBoundary, LoadingSpinner
  - Icon, LazyImage, BackToTop
  - Y muchos más...
```

---

## 🎯 Plan para Alcanzar 80% Coverage

### Fase 2: Tests Adicionales Necesarios

#### 1. **Componentes Sin Tests (Prioridad ALTA)**

```bash
# Crear tests para:
- components/shared/ClassPageHead.tsx
- components/I18nProvider.tsx (tests extendidos)
- utils/sentry.ts (error handling)
- utils/imageConfig.ts (configuración)
```

#### 2. **Tests de Integración (Prioridad MEDIA)**

```bash
# Crear tests E2E con Playwright:
- Navegación multiidioma
- Formulario de contacto
- Cambio de idioma dinámico
```

#### 3. **Tests de Edge Cases (Prioridad MEDIA)**

```typescript
# Añadir tests para:
- useI18n con locale inválido
- LazyImage con errores de carga
- ErrorBoundary con diferentes tipos de errores
- SEO con props faltantes
```

---

## 🔧 Comandos Útiles

```bash
# Ver coverage actual
npm run test:coverage

# Ver coverage en HTML
npm run test:coverage -- --reporter=html
# Abrir: coverage/index.html

# Ejecutar solo tests que fallan
npm run test -- --reporter=verbose --bail

# Ejecutar tests de un archivo específico
npm run test -- components/__tests__/HomePage.test.tsx
```

---

## 📝 Plantilla para Nuevos Tests

```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ComponentName from '../ComponentName';

// Mock de useI18n si es necesario
vi.mock('../../hooks/useI18n', () => ({
  useI18n: () => ({
    locale: 'es',
    t: (key: string) => key,
    setLocale: vi.fn(),
    isLoading: false,
  }),
}));

describe('ComponentName', () => {
  it('renders correctly', () => {
    render(<ComponentName />);
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });

  it('handles user interaction', async () => {
    const { user } = render(<ComponentName />);
    await user.click(screen.getByRole('button'));
    expect(screen.getByText('Expected result')).toBeInTheDocument();
  });

  it('handles edge cases', () => {
    render(<ComponentName invalidProp={null} />);
    // Verificar que no crashea
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
```

---

## 🐛 Problemas Conocidos y Soluciones

### Problema 1: Tests Fallando en components/shared/dance/

**Error:**

```
TypeError: t is not a function
```

**Solución:**

```typescript
// En cada test de componentes dance/, añadir:
vi.mock('../../../hooks/useI18n', () => ({
  useI18n: () => ({
    locale: 'es',
    t: (key: string) => key, // Mock simple que devuelve la key
    setLocale: vi.fn(),
    isLoading: false,
  }),
}));
```

### Problema 2: IntersectionObserver not defined

**Solución:**
Ya está mockeado en `test/setup.ts`:

```typescript
global.IntersectionObserver = class IntersectionObserver {
  /*...*/
};
```

### Problema 3: window.matchMedia not defined

**Solución:**
Ya está mockeado en `test/setup.ts`:

```typescript
Object.defineProperty(window, 'matchMedia', {
  /*...*/
});
```

---

## 📈 Roadmap de Coverage

```
Fase 1 (Completado):     50% → 70% ✅
Fase 2 (1-2 semanas):    70% → 80% 🎯
Fase 3 (1 mes):          80% → 85% (opcional)
Fase 4 (2-3 meses):      85% → 90% (excelencia)
```

---

## ✅ Checklist de Implementación

### Fase 1: Completada ✅

- [x] Actualizar thresholds a 70%
- [x] Verificar que tests existentes pasan
- [x] Documentar plan de mejora

### Fase 2: En Progreso 🚧

- [ ] Arreglar tests fallando en components/shared/dance/
- [ ] Crear tests para ClassPageHead.tsx
- [ ] Crear tests extendidos para I18nProvider
- [ ] Crear tests para utils/sentry.ts
- [ ] Crear tests para utils/imageConfig.ts
- [ ] Ejecutar coverage y verificar >70%
- [ ] Actualizar thresholds a 80%

### Fase 3: Futuro 📅

- [ ] Implementar tests E2E con Playwright
- [ ] Añadir tests de accesibilidad avanzados
- [ ] Implementar snapshot testing
- [ ] Añadir tests de performance

---

## 🎓 Recursos

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Coverage Best Practices](https://martin fowler.com/bliki/TestCoverage.html)

---

**Próxima actualización:** Cuando se alcance 80% coverage
