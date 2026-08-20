# Metrik Premium — Implementation Notes

> Implementación completa sobre el proyecto existente. Fecha: agosto 2026.

---

## Architecture

### Rutas

| Ruta | Archivo | Descripción |
|------|---------|-------------|
| `/` | `src/app/page.tsx` | Home Premium — narrativa scroll + trabajo + servicios + contacto |
| `/work/[slug]` | `src/app/work/[slug]/page.tsx` | Case study (SSG) |
| `/sitemap.xml` | `src/app/sitemap.ts` | Sitemap dinámico |
| `/robots.txt` | `src/app/robots.ts` | Robots |

### Estructura de componentes

```
src/components/premium/
├── cursor/subtle-cursor.tsx       # Halo sutil desktop
├── experience/premium-experience.tsx
├── narrative/
│   ├── narrative-sequence.tsx     # Escenas 01–05 (GSAP pin)
│   ├── fragment-chip.tsx
│   └── fragments-data.ts
├── work/
│   ├── work-section.tsx
│   ├── product-surface.tsx        # UI generativa (sin screenshots inventados)
│   └── case-study-view.tsx
├── services/services-section.tsx
├── contact/contact-section.tsx
├── layout/
│   ├── premium-nav.tsx
│   └── premium-footer.tsx
└── motion/scroll-provider.tsx     # Lenis + ScrollTrigger sync
```

### Data

| Archivo | Contenido |
|---------|-----------|
| `src/data/projects.ts` | Proyectos verificables (solo Metrik web) |
| `src/data/services.ts` | Software / Web / Premium |
| `src/data/navigation.ts` | #trabajo, #servicios, #contacto |
| `src/data/site.ts` | Metadata global |

### Conservado del proyecto anterior

- `SiteAtmosphere` — fondo ambiental
- `Logo`, `Container`, `metrik-button`, `AnimatedLink`
- `MobileMenu` — focus trap, a11y
- Hooks: `use-reduced-motion`, `use-media-query`, `use-scroll-state`
- `lib/easing.ts` — curvas Framer Motion

### Eliminado / reemplazado

- Home anterior (`Hero` + `Philosophy` como página principal)
- `button.tsx` shadcn (dead code)
- Dependencias: `@base-ui/react`, `@radix-ui/react-slot`, `class-variance-authority`
- Navbar pill morph → `PremiumNav` minimal integrado
- Anchors fantasma `#proyectos`, `#servicios`, `#contacto` vacíos

---

## Motion

### Separación de responsabilidades

| Herramienta | Uso |
|-------------|-----|
| **GSAP + ScrollTrigger** | Narrativa pinned, scrub timelines, work section parallax |
| **Lenis** | Smooth scroll (sync con ScrollTrigger via ticker) |
| **Framer Motion** | Entradas UI, tabs servicios, case study, nav fade |

### Tokens

Centralizados en `src/lib/motion/tokens.ts`:
- Durations: instant → scene
- Easing: primary (`power3.out`), secondary, scroll, snap
- Narrative scroll length: 5.5vh desktop / 3.2vh mobile

### Escenas (NarrativeSequence)

| Progreso scroll | Escena | Comportamiento |
|-----------------|--------|----------------|
| 0–14% | Origen | Fragmentos editoriales aparecen |
| 14–32% | Entender | Fragmentos se agrupan, líneas de conexión |
| 32–52% | Plano | Grid blueprint, cotas, ejes |
| 52–70% | Sistema | Capas modulares con profundidad |
| 70–100% | Construcción | Producto materializa, guías desaparecen |

**Principio:** cada transformación = organización / proyección / construcción. Sin motion decorativo.

### Reduced motion

- `usePrefersReducedMotion` desactiva Lenis choreography
- Narrativa muestra stack estático + copy
- CSS global reduce animaciones
- Parallax y cursor desactivados

---

## Responsive

| Breakpoint | Cambios |
|------------|---------|
| `<768px` | Narrative scroll más corto (3.2vh), fragmentos con menor desplazamiento, mobile product surface relativo |
| `md+` | Nav links visibles, grid 2-col work |
| `lg+` | Narrative 2 columnas copy/visual |

Mobile **no** replica pin desktop 1:1 — duración reducida, transforms atenuados.

---

## Performance

- Sin Three.js / WebGL
- Animaciones primarily `opacity`, `transform`, `scale`
- ScrollTrigger `scrub` + `invalidateOnRefresh`
- Cleanup: `gsap.context().revert()` en unmount
- Lenis destroyed on unmount
- Composiciones SVG/CSS en lugar de imágenes pesadas
- Build First Load JS ~228 kB (home) — GSAP + Framer coexistentes

---

## Accessibility

- Semantic HTML: `main`, `section`, `nav`, `footer`, `role="tablist"`
- Focus visible restaurado (outline accent)
- Form labels asociados
- `aria-labelledby` en secciones
- Mobile menu: focus trap, Escape (heredado)
- Reduced motion path completo

---

## SEO

- Metadata expandida en `layout.tsx`: OpenGraph, Twitter, robots
- `sitemap.ts`, `robots.ts`
- Metadata por case study via `generateMetadata`
- `lang="es"`

---

## Future work

1. Agregar proyectos reales con assets (Servo, etc.) cuando existan en repo
2. OG image (`/public/og.png`)
3. Email de contacto configurado (actualmente mailto genérico)
4. View Transitions API para Home ↔ Case study
5. CMS para case studies cuando haya volumen
6. Optimizar bundle: dynamic import GSAP en narrative only
7. Remover componentes legacy (`hero/`, `philosophy/`) si ya no se necesitan

---

## Validaciones ejecutadas

- `npm run typecheck` ✓
- `npm run build` ✓
- `npm run lint` ✓
