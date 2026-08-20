# Metrik Premium — Auditoría Profunda del Proyecto Actual

> **Fecha:** 19 de agosto de 2026  
> **Alcance:** Repositorio `/metrik` — inspección completa del código fuente (excluyendo `node_modules`, `.next`, builds)  
> **Restricción cumplida:** Solo análisis. Sin modificaciones de código, UI ni dependencias.

---

## 1. Executive Summary

Metrik es hoy un **MVP de landing page de una sola ruta** construido con Next.js 15 App Router, React 19, Tailwind CSS 4 y Framer Motion. La implementación actual es **técnicamente sólida para su tamaño** — tipado estricto, hooks reutilizables, respeto a `prefers-reduced-motion`, accesibilidad parcial en el menú móvil — pero la web **no representa aún una agencia premium ni un portfolio inmersivo**.

**Estado real:** 2 secciones visibles (Hero + Filosofía/Proceso), navbar con 4 links, **3 de los cuales apuntan a anchors vacíos** (`#proyectos`, `#servicios`, `#contacto` son `<div className="sr-only">` sin contenido). No hay footer, formulario, casos de estudio, imágenes de proyectos, videos, páginas secundarias, analytics ni backend.

**Posicionamiento actual del copy:** ingeniería de sistemas, procesos, automatización, CRM, IA — más cercano a **integrador/dev studio B2B** que a **experiencias digitales premium**.

**Fortalezas reales:**
- Atmósfera visual oscura coherente (`SiteAtmosphere`, paleta `#050505` + acento `#7C5CFF`)
- Hero con visualización interactiva única (`ProcessNetwork`: caos → sistema organizado)
- Motion foundation con Framer Motion bien aplicado en micro-interacciones
- Navbar que morph a pill al scroll — patrón moderno y funcional
- Bundle liviano (solo SVGs, sin assets pesados)

**Brecha principal hacia Premium:**
- Ausencia total de portfolio, casos, prueba social y conversión real
- Tipografía Geist (identidad Vercel/genérica SaaS)
- Sin narrativa scroll-driven, secciones pinned, transiciones entre escenas
- Navegación promete contenido que no existe
- Una sola página que termina abruptamente después de 3 pasos de filosofía

**Veredicto:** La base técnica y algunos componentes (atmósfera, hooks, navbar, ProcessNetwork) son **evolucionables**. La arquitectura de información, el storytelling, el portfolio y la identidad tipográfica requieren **transformación significativa**. No conviene tirar todo — conviene **expandir sobre cimientos selectivos**.

---

## 2. Stack Actual

| Capa | Tecnología | Versión | Archivo de referencia |
|------|-----------|---------|----------------------|
| Framework | Next.js (App Router, Turbopack en dev) | 15.5.22 | `package.json`, `next.config.ts` |
| Runtime UI | React | 19.1.0 | `package.json` |
| Lenguaje | TypeScript (strict) | ^5 | `tsconfig.json` |
| Estilos | Tailwind CSS v4 + `@theme inline` | ^4 | `src/app/globals.css`, `postcss.config.mjs` |
| UI base | shadcn (style: `base-nova`) | ^4.16.1 | `components.json` |
| Primitives | @base-ui/react | ^1.7.0 | `src/components/ui/button.tsx` (no usado) |
| Iconos | lucide-react | ^1.28.0 | `philosophy-steps.ts`, `navbar.tsx`, `metrik-button.tsx` |
| Animación | framer-motion | ^12.43.0 | Hero, ProcessNetwork, Philosophy, Navbar, MobileMenu |
| Fuentes | Geist Sans + Geist Mono via `next/font/google` | — | `src/app/layout.tsx` |
| Utilidades | clsx, tailwind-merge, cva | — | `src/lib/utils.ts`, `button.tsx` |
| Lint | ESLint + next/core-web-vitals | ^9 | `eslint.config.mjs` |
| Deploy | Vercel-ready (default create-next-app) | — | `README.md`, `.gitignore` |

**Dependencias instaladas pero no usadas en runtime:**
- `@radix-ui/react-slot` — sin imports en `src/`
- `src/components/ui/button.tsx` (shadcn/base-ui) — ningún componente lo importa; se usa `metrik-button.tsx` custom
- `tw-animate-css` — importado en CSS, sin clases de animación detectadas en componentes

**No presentes:** GSAP, ScrollTrigger, Lenis, Three.js, React Three Fiber, Lenis, analytics (GA, Plausible, etc.), CMS, formularios, API routes, estado global (Zustand, Redux, Context).

---

## 3. Arquitectura

### 3.1 Estructura de directorios

```
metrik/
├── public/
│   └── brand/          # logo-horizontal.svg, logo-mark.svg, favicon.svg
│   └── *.svg           # file.svg, globe.svg, next.svg, vercel.svg, window.svg (placeholders Next.js)
├── src/
│   ├── app/
│   │   ├── layout.tsx  # Root layout, metadata, fonts
│   │   ├── page.tsx    # Home (única página)
│   │   └── globals.css # Design tokens + Tailwind
│   ├── components/
│   │   ├── background/ # site-atmosphere.tsx
│   │   ├── hero/       # hero, process-network, process-node, connection-line, data-pulse
│   │   ├── layout/     # navbar, mobile-menu
│   │   ├── philosophy/ # philosophy, philosophy-step, philosophy-connection
│   │   └── ui/         # container, logo, buttons, links, section-label, button (unused)
│   ├── data/           # navigation.ts, philosophy-steps.ts, process-nodes.ts
│   ├── hooks/          # use-reduced-motion, use-mouse-parallax, use-scroll-state, use-media-query
│   └── lib/            # utils.ts, easing.ts
├── components.json     # shadcn config
├── next.config.ts      # vacío (sin opciones)
├── package.json
├── tsconfig.json
├── eslint.config.mjs
├── postcss.config.mjs
└── README.md           # template default create-next-app (desactualizado)
```

### 3.2 Routing

| Ruta | Archivo | Tipo |
|------|---------|------|
| `/` | `src/app/page.tsx` | Server Component wrapper |
| — | — | **No existen más rutas** |

No hay `pages/`, no hay rutas dinámicas `[slug]`, no hay route groups, no hay loading/error boundaries custom.

### 3.3 Composición de la Home (`page.tsx`)

```tsx
<>
  <SiteAtmosphere />   // fixed background, -z-10
  <Navbar />           // fixed top, z-50
  <main>
    <Hero />           // min-h-[100svh]
    <Philosophy />     // id="proceso"
  </main>
</>
```

**Observación crítica:** `Philosophy` incluye anchors fantasma:

```tsx
// src/components/philosophy/philosophy.tsx:147-150
<div id="proyectos" className="sr-only" aria-hidden />
<div id="servicios" className="sr-only" aria-hidden />
<div id="contacto" className="sr-only" aria-hidden />
```

Comentario en código: *"Anchor targets for navbar links without new sections"* — deuda explícita.

### 3.4 Patrones arquitectónicos

- **Server vs Client:** `layout.tsx` y `page.tsx` son Server Components; toda la interactividad vive en `"use client"` components.
- **Datos:** estáticos en `src/data/*.ts` — sin CMS, sin fetch, sin API.
- **Separación:** buena entre data (`process-nodes.ts`, `philosophy-steps.ts`), UI primitivos (`Container`, `SectionLabel`), y secciones compuestas.
- **Motion:** acoplado a componentes individuales; no hay capa de motion centralizada ni orchestrator scroll.

### 3.5 Mantenibilidad

| Aspecto | Evaluación |
|---------|-----------|
| Tamaño de componentes | Aceptable; `process-network.tsx` (~260 líneas) es el más complejo |
| Duplicación | Baja; easing centralizado en `lib/easing.ts` |
| Naming | Consistente, descriptivo |
| TypeScript | Strict, tipos en data files |
| Reutilización | `Container`, hooks, `SectionLabel`, botones custom — buena base |
| Escalabilidad motion | Framer Motion por componente escalará mal para scroll narratives complejas |

---

## 4. Sitemap

### Rutas públicas actuales

| URL | Existe | Objetivo declarado | Realidad |
|-----|--------|-------------------|----------|
| `/` | ✅ | Home / landing agencia | Hero + Filosofía únicamente |
| `#proceso` | ✅ | Mostrar metodología | Sección Philosophy — funcional |
| `#proyectos` | ⚠️ | Portfolio | **Anchor vacío, sin contenido** |
| `#servicios` | ⚠️ | Servicios | **Anchor vacío, sin contenido** |
| `#contacto` | ⚠️ | Contacto / CTA | **Anchor vacío, sin contenido** |
| `/proyectos/[slug]` | ❌ | Case studies | No existe |
| `/servicios` | ❌ | — | No existe |
| `/contacto` | ❌ | — | No existe |

**Impacto UX:** Un usuario que clickea "Proyectos" en navbar llega a un div invisible al final de Philosophy. Misma experiencia rota para Servicios y Contacto.

---

## 5. Home Actual — Sección por Sección

Experiencia real del usuario, de arriba a abajo:

### 5.0 Pre-carga / Layout global

- **HTML:** `lang="es"`, `className="dark"` forzado — solo dark mode, sin toggle.
- **Fuentes:** Geist Sans (body) + Geist Mono (disponible via CSS var, usado en números de filosofía).
- **Metadata:** title `"Metrik — Sistemas que mejoran procesos"`, description sobre sistemas/automatización. Sin Open Graph, Twitter cards, canonical, sitemap.
- **Body:** `min-h-screen`, antialiased, overflow-x hidden en CSS global.

### 5.1 SiteAtmosphere (fondo fijo permanente)

**Archivo:** `src/components/background/site-atmosphere.tsx`

**Qué ve el usuario:** Capas superpuestas fijas:
1. Fondo sólido `#050505`
2. Gradiente radial púrpura sutil arriba-centro (`rgba(124,92,255,0.08)`)
3. Gradiente radial secundario esquina superior derecha
4. Grid de líneas blancas 72×72px con `maskImage` radial (fade hacia bordes)
5. Textura noise SVG inline (`opacity: 0.035`, `mix-blend-overlay`)

**Interacción:** Ninguna (`pointer-events-none`, `aria-hidden`).

**Sensación:** Ambiente tech/minimal oscuro. Sutil y bien ejecutado — **uno de los elementos más premium del sitio actual**.

### 5.2 Navbar (fixed, morph al scroll)

**Archivo:** `src/components/layout/navbar.tsx` + `mobile-menu.tsx`

**Estado inicial (top):**
- Ancho max `6xl`, sin borde, transparente
- Logo Metrik (mark SVG inline + wordmark) → `#`
- Links desktop: Proyectos, Proceso, Servicios, Contacto (`src/data/navigation.ts`)
- CTA: "Agendar una llamada" → `#contacto`
- Hamburger en mobile

**Al scroll (>18px, `useScrollState`):**
- Navbar se contrae a pill `max-w-3xl`, `rounded-full`
- Fondo `bg-background/70`, `backdrop-blur-xl`, borde, sombra
- Altura reduce de ~4.25rem a 3.5rem
- Transición CSS 500ms

**Entrada:** fade + slide down (`opacity 0→1`, `y -10→0`, 0.55s, `easeOutExpo`).

**Mobile menu:** overlay blur, panel slide, focus trap, Escape cierra, body scroll lock.

**Problema conversión:** Links Proyectos/Servicios/Contacto llevan a nowhere visible.

### 5.3 Hero (viewport completo)

**Archivo:** `src/components/hero/hero.tsx`

**Layout:** Grid 2 columnas en lg+ (`1.08fr / 0.92fr`), stack en mobile. `min-h-[100svh]`, padding top ~7rem (compensa navbar fixed).

**Columna izquierda — Copy:**

| Elemento | Contenido |
|----------|-----------|
| Label | "Ingeniería de sistemas" (`SectionLabel`) |
| H1 línea 1 | "Tu empresa ya tiene **procesos**." (gris `#C8C8C8` en "procesos") |
| H1 línea 2 | "Nosotros construimos los **sistemas** que los hacen **mejores**." (accent en "sistemas") |
| Párrafo | Conectar herramientas, automatizar, visibilidad — ingeniería clara |
| CTAs | Primary: "Agendar una llamada" → `#contacto` / Secondary: "Ver proceso" → `#proceso` |

**Tipografía H1:** `2.35rem` mobile → `4.1rem` lg, `font-medium`, tracking `-0.045em`, leading `1.05`.

**Entrada (Reveal):** Cada bloque entra con stagger: opacity 0→1, y 18→0, blur 6px→0, delays 0.05–0.52s, duration 0.75s.

**Scroll behavior:** Al scrollear fuera del hero, contenido izquierdo sube 36px y opacity baja a 0.2 (Framer `useScroll` + `useTransform`). Progreso de scroll alimenta `ProcessNetwork`.

**Columna derecha — ProcessNetwork:**

Visualización SVG interactiva del flujo: Cliente → CRM → Automatización → IA → Reportes.

- **Estado inicial:** nodos desordenados ("caos") con rotaciones/desplazamientos
- **Transición (~1.2s o scroll >8%):** nodos se organizan en columna vertical
- **Mouse parallax (desktop):** tilt 3D (rotateX ±4°, rotateY ±6°), glow sigue cursor
- **Pulses:** círculos de datos animados recorriendo conexiones en loop
- **Caption:** "Solucionando el flujo" → "Sistema estabilizado"

**Sensación:** Metáfora visual de ordenar procesos — **diferenciador real** vs template genérico. Escala modesta (max 400px), no fullscreen/cinematográfico.

### 5.4 Philosophy / Proceso

**Archivo:** `src/components/philosophy/philosophy.tsx`  
**ID:** `#proceso`  
**Separador:** `border-t border-border`

**Header:**
- Label: "Filosofía"
- H2: "No empezamos programando." (`4xl` → `3.4rem` lg)

**3 pasos** (`src/data/philosophy-steps.ts`):

| # | Título | Icono | Detalle |
|---|--------|-------|---------|
| 01 | Entender | Eye | Diagnóstico antes de arquitectura |
| 02 | Diseñar | PenLine | Estructura pensada para escalar |
| 03 | Construir | Boxes | Entrega medible y durable |

**Layout desktop:** grid horizontal 5 columnas (step — connector — step — connector — step)  
**Layout mobile/tablet (<1024px):** stack vertical con conectores verticales

**Interacciones:**
- IntersectionObserver (threshold 0.25) dispara reveal
- Conectores se dibujan en stages (450ms, 950ms)
- Hover/focus en step: activo iluminado, otros dimmed (opacity 0.45)
- Iconos Lucide en círculos con borde accent on hover

**Fin de página:** Los anchors fantasma + **no hay footer, no hay más contenido**. El scroll termina abruptamente.

---

## 6. Inventario de Componentes

| Componente | Archivo | Usado en | Propósito |
|-----------|---------|----------|-----------|
| `SiteAtmosphere` | `background/site-atmosphere.tsx` | `page.tsx` | Fondo ambiental fijo |
| `Navbar` | `layout/navbar.tsx` | `page.tsx` | Nav fixed con morph scroll |
| `MobileMenu` | `layout/mobile-menu.tsx` | `Navbar` | Drawer mobile accesible |
| `Hero` | `hero/hero.tsx` | `page.tsx` | Sección hero principal |
| `ProcessNetwork` | `hero/process-network.tsx` | `Hero` | Visualización interactiva flujo |
| `ProcessNode` | `hero/process-node.tsx` | `ProcessNetwork` | Nodo individual animado |
| `ConnectionLine` | `hero/connection-line.tsx` | `ProcessNetwork` | Línea SVG con pathLength |
| `DataPulse` | `hero/data-pulse.tsx` | `ProcessNetwork` | Pulso animado en path |
| `SparsePulse` | `hero/data-pulse.tsx` | `ProcessNetwork` | Pulso caótico pre-organize |
| `Philosophy` | `philosophy/philosophy.tsx` | `page.tsx` | Sección metodología |
| `PhilosophyStep` | `philosophy/philosophy-step.tsx` | `Philosophy` | Card de paso |
| `PhilosophyConnection` | `philosophy/philosophy-connection.tsx` | `Philosophy` | Línea conectora animada |
| `Container` | `ui/container.tsx` | Hero, Philosophy | Wrapper max-w-6xl px responsive |
| `SectionLabel` | `ui/section-label.tsx` | Hero, Philosophy | Eyebrow uppercase |
| `Logo` | `ui/logo.tsx` | `Navbar` | Mark SVG + wordmark |
| `PrimaryButton` | `ui/metrik-button.tsx` | Hero, Navbar, MobileMenu | CTA pill blanco |
| `SecondaryButton` | `ui/metrik-button.tsx` | `Hero` | CTA outline con flecha |
| `TextLink` | `ui/metrik-button.tsx` | — | **No usado actualmente** |
| `AnimatedLink` | `ui/animated-link.tsx` | Navbar, MobileMenu | Link con underline hover |
| `Button` (shadcn) | `ui/button.tsx` | — | **No usado** |

### Hooks

| Hook | Archivo | Función |
|------|---------|---------|
| `usePrefersReducedMotion` | `hooks/use-reduced-motion.ts` | Detecta `prefers-reduced-motion` |
| `useMouseParallax` | `hooks/use-mouse-parallax.ts` | Parallax mouse con spring |
| `useScrollState` | `hooks/use-scroll-state.ts` | Scroll Y, threshold, progress |
| `useMediaQuery` | `hooks/use-media-query.ts` | Match media queries |

### Data

| Archivo | Contenido |
|---------|-----------|
| `data/navigation.ts` | 4 nav links (hash anchors) |
| `data/philosophy-steps.ts` | 3 pasos metodología |
| `data/process-nodes.ts` | 5 nodos del diagrama hero |

---

## 7. Auditoría Visual

### 7.1 Identidad

| Criterio | Evaluación |
|----------|-----------|
| Personalidad | Oscura, técnica, precisa — "ingeniería de sistemas" |
| Diferenciación | ProcessNetwork aporta identidad propia; resto es convencional dark SaaS |
| Coherencia | Alta dentro de las 2 secciones — paleta, bordes, accent consistentes |
| Percepción premium | **Parcial** — atmósfera y detalle de UI sí; falta escala, tipografía distintiva, contenido visual rico |
| Memorabilidad | ProcessNetwork memorable; copy y layout del hero menos |

**Riesgo de percepción "template/SaaS":**
- Geist es la fuente de Vercel — inmediatamente asociada a startups/dev tools
- Navbar pill-on-scroll es patrón muy extendido en 2024-2026
- Botones pill blanco/negro con accent púrpura = convención shadcn/dark mode
- Grid + eyebrow uppercase + H1 grande = layout de landing genérico

**No es amateur** — hay cuidado en spacing, easing, estados hover, blur sutil. Es **competente pero no distintivo** a escala premium.

### 7.2 Tipografía

| Aspecto | Implementación actual |
|---------|----------------------|
| Familias | Geist Sans (heading + body), Geist Mono (números 01/02/03) |
| Pesos | `font-medium` en headings y botones; sin display weight |
| Escala H1 | `2.35rem` → `4.1rem` (responsive fluido) |
| Escala H2 | `2.25rem` (text-4xl) → `3.4rem` |
| Body | `15px` / `text-base`, `leading-relaxed` |
| Labels | `12px`, `tracking-[0.2em]`, uppercase |
| Line-height | Headings ~1.05–1.08 (apretado, editorial — bien) |
| Tracking | Negativo en headings (`-0.03em` a `-0.045em` — bien) |

**Problema premium:** Una sola familia sans para todo. Sin contraste serif/display + sans body, sin variable font expresiva, sin tipografía como protagonista visual.

### 7.3 Layout

| Aspecto | Implementación |
|---------|---------------|
| Container | `max-w-6xl`, px `5/6/8` responsive |
| Grid Hero | 2 cols lg, gap 14–20 |
| Whitespace | Generoso — py-28 a py-40 en secciones |
| Ritmo | Consistente entre Hero y Philosophy |
| Densidad | Baja-media — respira bien |
| Alineación | Left-aligned copy, visual centrado en mobile |

**Limitación:** Todo vive en el mismo container width. No hay rupturas full-bleed, asymmetric grids, ni composiciones editoriales.

### 7.4 Color

```css
/* globals.css */
--background: #050505;
--foreground: #ffffff;
--surface: #0d0d0d;
--muted-foreground: #9b9b9b;
--accent: #7c5cff;
--border: #1b1b1b;
```

- Paleta monocromática + un accent púrpura
- Contraste WCAG: blanco sobre #050505 = excelente
- Accent usado con moderación (links hover, nodos activos, selection)
- Hardcoded grises en hero copy (`#C8C8C8`, `#D4D4D4`) fuera del sistema de tokens

**Evaluación:** Sofisticada y contenida. Falta profundidad cromática para storytelling (no hay gradientes protagonistas, duotones, ni color coding por servicio/proyecto).

### 7.5 Componentes UI

| Componente | Estado | Notas |
|-----------|--------|-------|
| Botones | Custom `metrik-button` — pill, hover lift | Funcional, genérico premium-dark |
| Cards | No existen como componente | Philosophy steps son artículos sin card container |
| Navbar | Morph pill — **destacable** | Conservar patrón |
| Footer | **No existe** | Gap crítico |
| Formularios | **No existen** | Gap crítico |
| Badges | No existen | — |
| CTAs | 2 variantes + TextLink sin usar | Copy repetido "Agendar una llamada" |
| Project cards | **No existen** | Gap crítico |

---

## 8. Auditoría de Motion

### 8.1 Inventario completo

| # | Archivo | Componente | Tecnología | Trigger | Duración / Easing | Comportamiento |
|---|---------|-----------|-----------|---------|-------------------|----------------|
| 1 | `hero/hero.tsx:37-44` | `Reveal` | Framer Motion | Mount | 0.75s, delay variable, easeOutExpo | opacity + y + blur entrance |
| 2 | `hero/hero.tsx:53-64` | Hero scroll | Framer useScroll/useTransform | Scroll hero section | continuo | contentY -36px, opacity →0.2, networkProgress 0→1 |
| 3 | `hero/process-network.tsx:38-50` | organize timer | setTimeout | Mount / scroll | 1200ms | caos → organized |
| 4 | `hero/process-network.tsx:65-75` | 3D tilt + glow | Framer useTransform + useMotionTemplate | Mouse move | spring (stiffness 120) | rotateX/Y, radial glow sigue cursor |
| 5 | `hero/process-network.tsx:85-100` | activeNode cycle | setInterval | organized + inView | ~4.8–5.4s loop | highlight secuencial nodos |
| 6 | `hero/process-node.tsx:50-73` | node organize | Framer animate | organized flag | 1.05s + stagger, easeOutExpo | chaos offset → centered |
| 7 | `hero/process-node.tsx:35-40` | node parallax | useTransform | Mouse | continuo | ±10px / ±7px por nodo |
| 8 | `hero/connection-line.tsx:38-50` | pathLength | Framer animate | organized | 0.9s + delay, easeOutExpo | línea SVG 0.35→1 |
| 9 | `hero/data-pulse.tsx:25-50` | DataPulse | Framer animate | active loop | 4.8s linear ∞ | círculo recorre path, opacity pulse |
| 10 | `hero/data-pulse.tsx:73-89` | SparsePulse | Framer animate | pre-organized | 1.6s + repeatDelay 1.2s | pulso vertical caótico |
| 11 | `hero/process-network.tsx:252-255` | caption | Framer animate | organized | 0.6s easeOutExpo | opacity caption |
| 12 | `layout/navbar.tsx:24-26` | header entrance | Framer animate | Mount | 0.55s easeOutExpo | opacity + y |
| 13 | `layout/navbar.tsx:28-37` | navbar morph | CSS transition | scroll >18px | 500ms ease-out | width, bg, blur, radius, height |
| 14 | `layout/navbar.tsx:45` | logo hover | CSS transition | hover | 300ms | translateY -1px |
| 15 | `ui/animated-link.tsx:25` | link underline | CSS transition | hover/focus | 300ms ease-out | scaleX 0→1 underline |
| 16 | `ui/metrik-button.tsx:20-36` | button hover | CSS transition | hover | 300ms | translateY, bg, border |
| 17 | `layout/mobile-menu.tsx:73-138` | menu overlay | AnimatePresence + motion | open/close | 0.2–0.35s | fade overlay, slide panel |
| 18 | `philosophy/philosophy.tsx:62-69` | header reveal | Framer animate | IntersectionObserver | 0.7s easeOutExpo | opacity + y |
| 19 | `philosophy/philosophy.tsx:46-49` | connection stages | setTimeout | visible | 450ms, 950ms | activa conectores secuencialmente |
| 20 | `philosophy/philosophy-step.tsx:38-50` | step reveal | Framer animate | visible | 0.65s + stagger | opacity + y |
| 21 | `philosophy/philosophy-step.tsx:52,60-66` | step hover | CSS + Framer | hover/focus | 300ms | dim siblings, accent border, icon lift |
| 22 | `philosophy/philosophy-connection.tsx:46-55` | connector draw | Framer animate | connectionStage | 0.7s easeOutExpo | scaleX/Y 0→1 |
| 23 | `hooks/use-mouse-parallax.ts:19-20` | spring smoothing | useSpring | pointer | stiffness 120, damping 26 | suaviza parallax |
| 24 | `globals.css:66` | scroll-smooth | CSS | navegación hash | nativo | smooth scroll (disabled en reduced-motion) |

### 8.2 Tecnologías NO presentes

| Tecnología | Presente |
|-----------|----------|
| GSAP / ScrollTrigger | ❌ |
| Lenis | ❌ |
| Scroll-driven pinned sections | ❌ |
| Text reveal (split chars/lines) | ❌ |
| Image reveal / masks animados | ❌ (mask estático en atmosphere) |
| clip-path animation | ❌ |
| Horizontal scroll | ❌ |
| Page transitions | ❌ |
| Cursor custom | ❌ |
| Video | ❌ |
| Canvas / WebGL / Three.js | ❌ |

### 8.3 Clasificación motion: mantener / mejorar / reemplazar / eliminar

| Motion | Clasificación | Razón |
|--------|--------------|-------|
| SiteAtmosphere (estático) | **Mantener** | Base premium sólida, costo cero |
| Navbar morph scroll | **Mantener** | Funcional, moderno, performante |
| Navbar/header entrance | **Mejorar** | Integrar en narrativa de carga global |
| Reveal blur (Hero) | **Mejorar** | Patrón genérico — evolucionar a text reveal editorial |
| Hero scroll fade | **Mejorar** | Demasiado sutil — base para pinned hero scene |
| ProcessNetwork completo | **Evolucionar** | Asset único — escalar a escena fullscreen scroll-driven |
| Mouse parallax 3D | **Mantener** (desktop) | Sutil y bien implementado |
| DataPulse loops | **Mejorar** | Funcional pero pequeño — posible sync con scroll |
| Philosophy reveal/hover | **Mantener** | Apropiado para densidad de contenido |
| Philosophy connectors | **Mejorar** | Podrían ser scroll-triggered en vez de timeout |
| Mobile menu transitions | **Mantener** | Limpio y accesible |
| CSS hover transitions | **Mantener** | Correctas para micro-interacciones |
| setTimeout orchestration | **Reemplazar** | Migrar a scroll timeline (GSAP) para sincronía |
| Infinite SVG animations | **Mejorar** | Pausar off-screen (parcialmente hecho con inView) |

---

## 9. Auditoría Técnica

### 9.1 Fortalezas

- TypeScript strict, paths alias `@/*`
- Hooks reutilizables y bien encapsulados
- `usePrefersReducedMotion` aplicado consistentemente en motion
- Mobile menu con focus trap, Escape, scroll lock
- `requestAnimationFrame` en scroll listener (`use-scroll-state`)
- Passive event listeners en scroll y pointer
- Semantic HTML parcial: `<main>`, `<section aria-labelledby>`, `<nav aria-label>`
- Spring physics centralizadas en parallax

### 9.2 Debilidades / Riesgos para motion avanzado

| Issue | Detalle | Impacto |
|-------|---------|---------|
| `useMotionValueEvent` → `setState` en Hero | Cada frame de scroll puede trigger re-render React | Performance con scroll complejo |
| Multiple `useMediaQuery` instances | Cada uno suscribe matchMedia separado | Menor — consolidar si crece |
| `filter: blur()` en Reveal | Anima blur via Framer — GPU cost | Jank en low-end mobile |
| `backdrop-blur-xl` en navbar | Compositing cost | Aceptable hoy, vigilar al agregar layers |
| Sin `next/image` | No hay imágenes aún — cuando las haya, hay que implementar | Futuro |
| Focus outline removido globalmente | `globals.css:79-81` `:focus-visible { outline: none }` | A11y — depende de ring custom |
| Hash navigation a anchors vacíos | UX rota + SEO confuso | Conversión |
| No error/loading boundaries | Una sola page — bajo riesgo hoy | Escalar con rutas |
| `next.config.ts` vacío | Sin image domains, headers, experimental | Configurar al escalar |
| README desactualizado | Dice puerto 3000, no refleja proyecto | Onboarding |

### 9.3 SEO y metadata

**Existe (`layout.tsx`):**
- `title`, `description`, favicon SVG

**No existe:**
- `openGraph`, `twitter`, `robots`, `metadataBase`
- JSON-LD structured data
- `sitemap.xml`, `robots.txt`
- Canonical URLs
- Per-page metadata (solo hay una page)

### 9.4 Accesibilidad

**Bien:**
- `lang="es"`
- aria-labels en nav, botones, ProcessNetwork (`role="img"`)
- Reduced motion respetado
- Mobile focus trap

**Mejorable:**
- Outline global desactivado
- Philosophy steps con `tabIndex={0}` pero sin `aria-current` en activo
- Anchors vacíos confunden screen reader navigation
- Sin skip link

---

## 10. Auditoría Mobile

### 10.1 Breakpoints utilizados

| Breakpoint | Uso principal |
|-----------|---------------|
| default (<640) | Stack layouts, tipografía base |
| `sm:` (640+) | H1 más grande, CTAs row, navbar padding |
| `md:` (768+) | Nav links visible, hamburger hidden |
| `lg:` (1024+) | Hero 2 cols, Philosophy horizontal grid |
| `max-width: 1023px` | `useMediaQuery` — stack philosophy, compact process network |

### 10.2 Evaluación por área

| Área | Mobile actual | Problemas |
|------|--------------|-----------|
| Navegación | Hamburger → drawer | Funcional; links rotos igual que desktop |
| Hero | Stack: copy arriba, visual abajo | H1 `2.35rem` ok; visual max 400px — no domina viewport |
| Tipografía | Escala down razonable | Sin ajuste de tracking/leading específico mobile |
| ProcessNetwork | Parallax **desactivado** en touch (`pointer: coarse`) | Correcto — sin fallback motion alternativo |
| Philosophy | Stack vertical con conectores verticales | Funcional; hover states irrelevantes en touch (solo focus) |
| CTAs | Full width potencial, stack vertical | Bien |
| Performance | Liviano — sin imágenes | Blur reveal puede costear |
| Viewport height | `min-h-[100svh]` en hero | Correcto para mobile browsers |
| Overflow | `overflow-x: hidden` global | Previene horizontal bleed |
| Sticky | Solo navbar fixed | Sin pinned sections |

### 10.3 Mobile como experiencia propia

**Hoy:** Mobile es efectivamente versión reducida — mismo contenido, layout stack, menos parallax. No hay gestos, scroll horizontal, ni momentos diseñados para touch.

**Problemático ya hoy:**
- Usuario mobile clickea "Proyectos" → scroll a div invisible → confusión
- Hero visual pierde impacto (400px diagram vs fullscreen premium expectation)
- Sin footer ni contacto alternativo visible

---

## 11. Performance

### 11.1 Estado actual (favorable)

| Factor | Estado |
|--------|--------|
| Imágenes | Solo SVG — peso mínimo |
| Videos | Ninguno |
| Fuentes | next/font self-hosted — optimizado |
| JS bundle | Framer Motion es el mayor costo — aceptable para una page |
| Lazy loading | No aplicable aún (sin images/dynamic imports) |
| Code splitting | Next.js automático por ruta — una sola ruta = un bundle |
| Listeners | Scroll/pointer con passive + rAF — bien |
| Layout shifts | Minimal — fonts via next/font |
| Infinite animations | DataPulse loops — mitigado con `inView` check |

### 11.2 Riesgos al evolucionar a Premium

| Zona | Riesgo | Margen |
|------|--------|--------|
| Hero pinned + scroll scenes | Alto JS + scroll handlers | Medio — con GSAP + Lenis optimizado |
| Fullscreen video cases | Peso de red | Medio — lazy load + poster + HLS |
| Blur/filter animations | GPU en mobile | Bajo — reducir en mobile |
| Múltiple backdrop-blur | Compositing | Medio — limitar layers |
| Three.js | Bundle + GPU | Solo spot moments — no base |
| Portfolio images | LCP | Alto margen con next/image + WebP/AVIF |
| Page transitions | Jank si mal implementadas | Medio — View Transitions API |

### 11.3 Recomendación performance-first

La ligereza actual es **ventaja competitiva**. Al agregar motion complejo:
1. Mantener `usePrefersReducedMotion` como gate global
2. Code-split GSAP por sección (`dynamic import`)
3. Pausar/destruir timelines off-screen
4. No animar blur en mobile
5. Video: intersection observer + preload none

---

## 12. Conversión

### 12.1 Las 7 preguntas del visitante

| Pregunta | ¿Se responde hoy? | Evidencia |
|----------|-------------------|-----------|
| 1. ¿Qué es Metrik? | Parcial | "Ingeniería de sistemas" — no "agencia premium" |
| 2. ¿Qué hace? | Sí | Automatización, integración, visibilidad |
| 3. ¿Por qué elegirnos? | Débil | Filosofía 3 pasos — genérica, sin diferenciadores duros |
| 4. ¿Qué han construido? | **No** | Sin portfolio |
| 5. ¿Qué nivel de calidad? | Parcial | UI cuidada pero sin prueba (screenshots, cases, logos clientes) |
| 6. ¿Cómo trabajar? | Parcial | Proceso 3 pasos — falta pricing, timeline, contacto real |
| 7. ¿Qué hacer después? | Roto | CTA "Agendar llamada" → `#contacto` vacío |

### 12.2 Auditoría de elementos de conversión

| Elemento | Estado | Archivo |
|----------|--------|---------|
| Hero copy | Claro para B2B systems — no premium experiences | `hero/hero.tsx:84-117` |
| Propuesta de valor | Técnica, no emocional/visual | Hero + Philosophy |
| Prueba social | **Ausente** | — |
| Portfolio | **Ausente** | Nav link a anchor vacío |
| Casos | **Ausentes** | — |
| CTAs | "Agendar una llamada" ×3, "Ver proceso" ×1 | Repetitivo, destino roto |
| Contacto | **Ausente** | `#contacto` = sr-only div |
| Confianza | **Sin logos, testimonios, números** | — |
| Diferenciación | ProcessNetwork es lo más único | Insuficiente para cerrar |

**Score conversión: 3/10** — La web genera interés inicial pero **no cierra ni demuestra**.

---

## 13. Portfolio / Case Studies

### 13.1 Estado actual

**No existe sistema de portfolio.** Búsqueda en codebase:
- Sin `projects.ts`, `cases.ts`, `portfolio/` directory
- Sin componentes ProjectCard, CaseStudy, WorkGrid
- Sin rutas dinámicas `/work/[slug]`
- Sin imágenes de proyectos en `public/` (solo brand SVGs)
- Nav link `#proyectos` → `<div id="proyectos" className="sr-only">`

### 13.2 Distancia a case study cinematográfico

Flujo objetivo: *hero → producto → problema → solución → interfaz → decisiones → resultados → mobile → detalles → CTA*

| Requisito | Gap |
|-----------|-----|
| Data model por proyecto | Crear desde cero (title, slug, hero media, sections[]) |
| Assets per case (video, screenshots) | Sin assets — carpeta `public/projects/` no existe |
| Layout case study | Sin template |
| Scroll-driven storytelling | Sin infra motion para esto |
| Página índice portfolio | Sin sección Work |
| Routing | Sin App Router dynamic routes |
| Reutilización | Philosophy step pattern podría inspirar secciones modulares |

**Score portfolio: 0/10** — Partir de cero con arquitectura pensada.

### 13.3 Propuesta de data model (referencia futura, no implementar)

```typescript
// Conceptual — no existe en repo
type CaseStudy = {
  slug: string;
  title: string;
  tagline: string;
  services: string[];
  heroMedia: { type: 'video' | 'image'; src: string };
  sections: Array<
    | { type: 'fullscreen-media'; ... }
    | { type: 'text-reveal'; ... }
    | { type: 'before-after'; ... }
    | { type: 'metrics'; ... }
  >;
};
```

---

## 14. Qué Conservar

| Elemento | Archivo(s) | Razón |
|----------|-----------|-------|
| Paleta dark + accent `#7C5CFF` | `globals.css` | Sofisticada, coherente |
| SiteAtmosphere | `site-atmosphere.tsx` | Ambiente premium eficiente |
| Hooks motion/a11y | `use-reduced-motion.ts`, `use-mouse-parallax.ts`, `use-scroll-state.ts` | Bien implementados |
| Easing tokens | `lib/easing.ts` | Centralizado |
| Navbar morph | `navbar.tsx` | Patrón maduro |
| Mobile menu a11y | `mobile-menu.tsx` | Focus trap, escape |
| Container / SectionLabel | `ui/container.tsx`, `ui/section-label.tsx` | Primitivos sólidos |
| Metrik buttons | `ui/metrik-button.tsx` | Base CTA — evolucionar estilos |
| AnimatedLink | `ui/animated-link.tsx` | Micro-interacción limpia |
| Logo mark | `ui/logo.tsx` | Identidad visual propia (barras + púrpura) |
| ProcessNetwork concepto | `hero/process-network.tsx` + data | Metáfora de marca única |
| Data separation | `src/data/*` | Escalable para projects |
| Framer Motion (UI level) | Varios | Para componentes, no scroll orchestration |

---

## 15. Qué Evolucionar

| Elemento | Archivo(s) | Qué necesita |
|----------|-----------|-------------|
| Hero | `hero/hero.tsx` | De split layout a escena scroll pinned cinematográfica |
| ProcessNetwork | `hero/*`, `data/process-nodes.ts` | Escalar a fullscreen, sync con scroll timeline |
| Philosophy | `philosophy/*` | De 3 cards estáticas a narrativa visual por paso |
| Tipografía | `layout.tsx`, CSS vars | Reemplazar Geist por sistema display + body |
| Copy / positioning | Hero, metadata | De "sistemas" a "software + webs premium" |
| CTAs | `metrik-button`, nav | Destinos reales, variantes contextuales |
| Reveal pattern | `hero/hero.tsx Reveal` | Text split reveal, no blur genérico |
| Metadata/SEO | `layout.tsx` | OG, structured data, sitemap |
| README | `README.md` | Documentación real del proyecto |
| shadcn setup | `components.json`, `button.tsx` | Decidir: usar o limpiar dead code |

---

## 16. Qué Reemplazar

| Elemento | Razón | Alternativa |
|----------|-------|-------------|
| Anchors fantasma | UX rota, daña confianza | Secciones reales o rutas |
| Orquestación setTimeout | No sincroniza con scroll | GSAP ScrollTrigger timelines |
| Geist como única fuente | Percepción template/Vercel | Par display + sans custom |
| Single-page con todo | No escala para portfolio premium | Multi-route: Home, Work, Case, Contact |
| Hash-only navigation | No funciona para case studies | Next.js Link + App Router |
| README create-next-app | No representa Metrik | Docs propias |

---

## 17. Qué Eliminar

| Elemento | Archivo | Razón |
|----------|---------|-------|
| `button.tsx` (shadcn) | `ui/button.tsx` | Dead code — no importado |
| `@radix-ui/react-slot` | `package.json` | Dependencia sin uso |
| Placeholder SVGs Next.js | `public/file.svg`, `globe.svg`, `next.svg`, `window.svg`, `vercel.svg` | No usados |
| `TextLink` export | `metrik-button.tsx` | Export sin uso (o integrar) |
| Comentario "without new sections" | `philosophy.tsx:147` | Deuda — reemplazar con secciones reales |
| `scroll-smooth` global | `globals.css` | Conflictará con Lenis — reemplazar al migrar |

---

## 18. Gap Analysis

Escala 1–10. **Actual → Objetivo Premium.**

| Categoría | Actual | Objetivo | Gap | Prioridad |
|-----------|--------|----------|-----|-----------|
| Identidad | 5 | 9 | 4 | Alta |
| Diseño | 6 | 9 | 3 | Alta |
| Tipografía | 4 | 9 | 5 | Alta |
| Storytelling | 3 | 9 | 6 | **Crítica** |
| Motion | 5 | 9 | 4 | Alta |
| Portfolio | 0 | 9 | 9 | **Crítica** |
| Conversión | 3 | 8 | 5 | **Crítica** |
| Responsive | 6 | 9 | 3 | Media |
| Performance | 8 | 8 | 0 | Mantener |
| Diferenciación | 4 | 9 | 5 | Alta |
| Percepción de valor | 4 | 9 | 5 | Alta |
| Calidad técnica | 7 | 9 | 2 | Media |

### Lectura del gap

- **Fortaleza a proteger:** Performance (8/10) — no sacrificar al agregar premium motion.
- **Brechas críticas:** Portfolio (0), Storytelling (3), Conversión (3) — sin esto, "premium" es solo estética.
- **Brecha tipográfica grande:** Geist limita percepción premium independientemente del motion.

---

## 19. Visión Metrik Premium

Metrik Premium no es "más animaciones". Es **la web misma como prueba de capacidad** — cada scroll debe demostrar que Metrik puede construir experiencias digitales de alto impacto.

### Dirección conceptual

**De:** Landing dark de integrador de sistemas con diagrama SVG.  
**A:** Experiencia editorial cinematográfica donde el visitante *siente* precisión, escala y dirección artística — y encuentra casos que lo confirman.

### Pilares

1. **Tipografía como escena** — headlines que ocupan viewport, reveal por línea, contraste display + body
2. **Scroll como director** — el scroll no mueve contenido; cuenta una historia (pinned scenes)
3. **Portfolio como protagonista** — no grid de thumbnails; proyectos como transiciones entre secciones de la Home
4. **Motion con propósito** — cada animación justifica una idea (orden, transformación, craft)
5. **Prueba > promesa** — la web ES el primer case study

---

## 20. Propuesta de Experiencias/Animaciones Concretas

Basadas en contenido REAL existente + expansiones necesarias.

### 20.1 Hero → "La transformación del caos"

**Qué existe hoy:** Hero con ProcessNetwork que pasa de caos a organizado en ~1.2s al mount, con scroll fade sutil.

**Qué podría suceder:**
- Hero pinned durante ~2.5–3 viewport heights al scrollear
- Fase 1 (0–30% scroll): headline actual permanece; ProcessNetwork en estado caos con pulses erráticos (SparsePulse ya existe)
- Fase 2 (30–60%): headline palabra "procesos" se desatura; nodos se organizan sync con scroll (reutilizar `organized` flag driven by ScrollTrigger, no timeout)
- Fase 3 (60–100%): diagrama escala de 400px a fullscreen; fondo atmosphere intensifica gradiente púrpura; caption morph "Solucionando el flujo" → "Sistema estabilizado" (ya existe)
- Al soltar pin: transición directa a primer proyecto del portfolio (hoy inexistente — placeholder visual con screenshot/video)

**Conservar:** ProcessNetwork, process-nodes data, atmosphere, copy H1 (posiblemente editar).  
**Cambiar:** Layout 2-col → escena única; scroll orchestration.

### 20.2 Transición Hero → Work

**Qué existe hoy:** Corte seco a Philosophy con `border-t`.

**Propuesta:**
- El nodo "Reportes" (último en `process-nodes.ts`) se expande con mask circular (`clip-path: circle()`) revelando screenshot del Proyecto 1
- Texto overlay: nombre del proyecto + tags de servicio
- Scroll continúa: imagen se convierte en hero del case inline

### 20.3 Sección Servicios (nueva — reemplaza anchor `#servicios`)

**Contenido real sugerido basado en positioning deseado:**
- Software y plataformas
- Webs profesionales  
- Webs Premium / experiencias digitales

**Experiencia:**
- 3 paneles horizontales scroll-driven (sticky container)
- Cada panel: tipografía grande del servicio + loop video corto muted
- Panel "Premium" ocupa más scroll length — señaliza foco estratégico

### 20.4 Philosophy → evolución narrativa

**Qué existe:** 3 pasos Entender/Diseñar/Construir con iconos Lucide.

**Propuesta:**
- Mantener copy actual (es bueno) pero cada paso ocupa 1 viewport pinned
- Número "01" grande como elemento tipográfico de fondo (Geist Mono → future display)
- Conector PhilosophyConnection evoluciona de línea simple a timeline scroll-drawn (reutilizar scaleX animation con ScrollTrigger)
- Hover dimming actual → en desktop; en mobile, step activo = scroll position

### 20.5 Portfolio index (nueva sección `#proyectos`)

**Hoy:** anchor vacío.

**Propuesta:**
- Lista de 3–4 proyectos (data-driven)
- Cada proyecto: thumbnail full-width, hover/scroll reveal título + categoría
- Click → `/work/[slug]` con View Transition API (Next.js 15 soporta experimental)
- Primer proyecto destacado con autoplay video loop en scroll enter

### 20.6 Case study template (ruta nueva)

Estructura por proyecto usando secciones modulares:
1. Hero fullscreen — video del producto
2. Text reveal — problema (copy CMS)
3. Full bleed screenshot — solución
4. Horizontal scroll — galería de interfaces (CSS scroll-snap o GSAP horizontal)
5. Métricas animadas — números count-up on enter
6. Mobile mockup — device frame con parallax (sin Three.js — CSS 3D basta)
7. CTA — "Agendar llamada" con form real

### 20.7 Contacto (reemplaza anchor `#contacto`)

**Hoy:** CTA apunta a div invisible.

**Propuesta:**
- Sección final con tipografía grande "Construyamos algo memorable."
- Form minimal (nombre, email, mensaje, presupuesto) + Calendly embed alternativo
- Background: atmosphere con gradiente máximo — cierre emocional

### 20.8 Navbar durante scroll narrative

**Conservar morph pill.** Agregar: links que indican progreso (opcional) — dot o label de sección activa via IntersectionObserver en futuras secciones.

---

## 21. Stack Recomendado para Premium

| Tecnología | Veredicto | Razón |
|-----------|-----------|-------|
| **GSAP + ScrollTrigger** | ✅ **Usar** | Estándar para scroll-driven pinned scenes; reemplaza setTimeout orchestration; mejor performance que useScroll + setState para timelines complejas |
| **Lenis** | ⚠️ **Considerar** | Smooth scroll mejora percepción premium; integrar con ScrollTrigger (`scrollerProxy`); evaluar impacto mobile y a11y |
| **Framer Motion** | ✅ **Usar** | Ya en stack; ideal para UI (menu, hovers, mounts), AnimatePresence, layout; NO para scroll orchestration pesada |
| **CSS animations/transitions** | ✅ **Usar** | Hovers, underline, navbar morph — ya funciona, costo mínimo |
| **View Transitions API** | ⚠️ **Considerar** | Next.js 15 App Router — transiciones Home ↔ Case study; progressive enhancement |
| **Video (HTML5)** | ✅ **Usar** | Case studies y hero moments; `<video>` con IntersectionObserver, no background autoplay mobile |
| **next/image** | ✅ **Usar** | Portfolio screenshots — WebP/AVIF, lazy, sizes |
| **Three.js / R3F** | ❌ **No usar** (inicialmente) | Sin caso de uso actual; costo bundle/GPU; reconsiderar solo si un case requiere 3D product |
| **Shaders / WebGL** | ❌ **No usar** | Over-engineering para Metrik v1 Premium |
| **Canvas** | ❌ **No usar** | ProcessNetwork SVG es suficiente y más nítido |
| **CMS (Sanity/Contentful)** | ⚠️ **Considerar** | Casos de estudio necesitan editabilidad; no urgente para v1 con 2–3 cases hardcoded |
| **@base-ui / shadcn Button** | ❌ **No usar** | Dead code; mantener metrik-button custom o unificar |

### Arquitectura motion recomendada

```
Lenis (smooth scroll, optional)
  └── GSAP ScrollTrigger (scroll timelines, pin, scrub)
        └── React sections (server components where possible)
              └── Framer Motion (enter/hover/micro)
```

Centralizar en `src/motion/` (futuro):
- `scroll-provider.tsx` — Lenis + ScrollTrigger init
- `use-section-timeline.ts` — hook wrapper
- Respetar `usePrefersReducedMotion` → disable Lenis + kill timelines

---

## 22. Roadmap Propuesto

### Fase 0 — Dirección visual (1–2 semanas)

| | |
|---|---|
| **Objetivo** | Definir identidad Premium: tipografía, escala, moodboards, motion principles |
| **Archivos afectados** | Ninguno aún — design docs, `globals.css` (planning) |
| **Riesgo** | Bajo |
| **Dependencias** | Decisión stakeholders sobre positioning copy |
| **Resultado** | Style guide: fonts, type scale, color extensions, motion do/don't |

### Fase 1 — Design system (1 semana)

| | |
|---|---|
| **Objetivo** | Nuevas fuentes, tokens extendidos, componentes base actualizados |
| **Archivos** | `layout.tsx`, `globals.css`, `section-label.tsx`, `metrik-button.tsx`, `container.tsx` |
| **Riesgo** | Medio — migración Geist |
| **Dependencias** | Fase 0 |
| **Resultado** | Sistema tipográfico dual; tokens para sections fullscreen |

### Fase 2 — Arquitectura de motion (1 semana)

| | |
|---|---|
| **Objetivo** | GSAP + ScrollTrigger (+ Lenis opt); provider global; reduced motion gate |
| **Archivos** | Nuevo `src/motion/*`, `layout.tsx`, refactor `hero.tsx` scroll logic |
| **Riesgo** | Alto — curva integración React 19 + RSC |
| **Dependencias** | Fase 1 |
| **Resultado** | Infraestructura scroll timeline reutilizable |

### Fase 3 — Nueva Home: Hero cinematográfico (2 semanas)

| | |
|---|---|
| **Objetivo** | Hero pinned, ProcessNetwork scroll-driven fullscreen |
| **Archivos** | `hero/*`, `process-network.tsx`, `page.tsx` |
| **Riesgo** | Alto — performance mobile |
| **Dependencias** | Fase 2 |
| **Resultado** | Primera impresión Premium — demo de capacidad |

### Fase 4 — Portfolio section + data model (1–2 semanas)

| | |
|---|---|
| **Objetivo** | Sección `#proyectos` real, 3 projects mínimo, assets |
| **Archivos** | Nuevo `src/data/projects.ts`, `src/components/work/*`, `philosophy.tsx` (remover anchor fantasma), `public/projects/` |
| **Riesgo** | Medio — necesita assets reales del equipo |
| **Dependencias** | Fase 1 |
| **Resultado** | Prueba de trabajo + navegación funcional |

### Fase 5 — Case studies (2–3 semanas)

| | |
|---|---|
| **Objetivo** | Rutas `/work/[slug]`, template modular cinematográfico |
| **Archivos** | Nuevo `src/app/work/[slug]/page.tsx`, `src/components/case/*` |
| **Riesgo** | Alto — scope + assets + motion per case |
| **Dependencias** | Fases 2, 4 |
| **Resultado** | 1–2 cases completos como referencia |

### Fase 6 — Servicios + Contacto (1 semana)

| | |
|---|---|
| **Objetivo** | Reemplazar anchors `#servicios` y `#contacto` |
| **Archivos** | Nuevo `src/components/services/*`, `src/components/contact/*`, `page.tsx`, `navigation.ts` |
| **Riesgo** | Bajo |
| **Dependencias** | Fase 1, form backend (Formspree/Resend/custom) |
| **Resultado** | Conversión funcional |

### Fase 7 — Philosophy evolucionada (1 semana)

| | |
|---|---|
| **Objetivo** | Scroll-driven steps, conservar copy |
| **Archivos** | `philosophy/*` |
| **Riesgo** | Medio |
| **Dependencias** | Fase 2 |
| **Resultado** | Proceso como narrativa, no cards |

### Fase 8 — Mobile dedicado (1 semana)

| | |
|---|---|
| **Objetivo** | Alternatives touch para parallax; simplificar pinned scenes; performance audit |
| **Archivos** | Todos los componentes motion-heavy |
| **Riesgo** | Medio |
| **Dependencias** | Fases 3, 5, 7 |
| **Resultado** | Mobile = experiencia diseñada, no degradada |

### Fase 9 — Performance + SEO (ongoing)

| | |
|---|---|
| **Objetivo** | Lighthouse 90+, OG tags, sitemap, image optimization |
| **Archivos** | `layout.tsx`, `next.config.ts`, nuevo `sitemap.ts`, `robots.ts` |
| **Riesgo** | Bajo |
| **Dependencias** | Contenido final |
| **Resultado** | Premium AND fast |

### Fase 10 — Polish (1 semana)

| | |
|---|---|
| **Objetivo** | Micro-interacciones finales, cursor (opt), sound (opt), page transitions |
| **Archivos** | Global |
| **Riesgo** | Bajo — over-polish |
| **Dependencias** | Todas |
| **Resultado** | Launch Metrik Premium v1 |

---

## 23. Riesgos

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|-------------|---------|-----------|
| Motion excess — "animada pero no premium" | Alta | Alto | Motion principles doc; cada animación requiere justificación narrative |
| Performance degradation mobile | Alta | Alto | Budget FPS; no blur mobile; reduce pinned length |
| Scope creep en case studies | Alta | Alto | Template modular; 1 case perfecto > 4 mediocres |
| Assets no disponibles (video/screenshots) | Media | Alto | Planificar shoots; placeholders temporales de calidad |
| Lenis + a11y conflict | Media | Medio | Disable con reduced-motion; respetar tab navigation |
| GSAP licensing (Club GreenSock para algunos plugins) | Baja | Medio | ScrollTrigger es gratis; verificar plugins antes |
| Posicionamiento mixto (systems vs premium web) | Media | Alto | Unificar copy en Fase 0 — "construimos software y experiencias digitales" |
| Links rotos en producción actual | **Ya ocurre** | Alto | Quick win: deshabilitar links o agregar secciones mínimas ASAP |
| Framer + GSAP coexistence complexity | Media | Medio | Separar responsabilidades claras por capa |
| Mantenimiento motion long-term | Media | Medio | Documentar timelines; preferir configs declarativas |

---

## 24. Quick Wins

Acciones de alto impacto / bajo esfuerzo (cuando se autorice implementación):

1. **Arreglar navegación rota** — Remover links fantasma o agregar secciones placeholder visibles (`#proyectos`, `#servicios`, `#contacto`)
2. **Agregar footer mínimo** — Logo, email, redes, copyright — ancla de confianza
3. **Open Graph metadata** — `layout.tsx` — mejor share preview
4. **Actualizar README** — Puerto 4769, descripción real, scripts
5. **Eliminar dead code** — `button.tsx`, `@radix-ui/react-slot`, SVGs placeholder
6. **Contacto funcional** — `mailto:` o Calendly link real en CTA mientras no hay form
7. **Metadata copy** — Alinear title/description con positioning premium deseado
8. **Pausar DataPulse off-screen** — Ya parcial; asegurar cleanup en unmount
9. **Agregar skip link** — Accesibilidad rápida
10. **1 proyecto showcase estático** — Aunque sea screenshot + párrafo antes del case cinematográfico completo

---

## 25. Conclusión

Metrik hoy es un **embrión bien construido** — código limpio, motion foundation respetuosa, atmósfera visual cuidada, y un hero interactivo (`ProcessNetwork`) que ya comunica algo único sobre la marca. Pero no es aún una web Premium ni un portfolio inmersivo: **es una landing de ~2 secciones con navegación que promete contenido inexistente**.

La distancia hacia "Metrik como primer case Premium" no se cierra con más hover effects. Se cierra con:

1. **Portfolio real** con cases cinematográficos
2. **Storytelling scroll-driven** (GSAP) apoyado en contenido existente (ProcessNetwork, Philosophy)
3. **Identidad tipográfica propia** que escape la estética Geist/SaaS
4. **Conversión funcional** — contacto que funcione
5. **Proteger la performance** que hoy es ventaja

**No recomiendo reescribir desde cero.** Recomiendo evolucionar selectivamente: conservar atmosphere, navbar, hooks, ProcessNetwork concept, data patterns — y reemplazar arquitectura de página, tipografía, orquestación motion, y todo el sistema de portfolio/conversión.

El repositorio está **listo para escalar técnicamente** (Next 15, React 19, TS strict, Framer ya integrado). El gap principal es **producto y diseño**, no infraestructura.

---

## Apéndice A — Assets en `public/`

| Archivo | Uso actual |
|---------|-----------|
| `brand/favicon.svg` | Favicon (`layout.tsx`) |
| `brand/logo-horizontal.svg` | **No referenciado en código** — Logo es inline SVG en `logo.tsx` |
| `brand/logo-mark.svg` | **No referenciado** |
| `file.svg`, `globe.svg`, `next.svg`, `window.svg`, `vercel.svg` | Placeholders Next.js — sin uso en `src/` |

## Apéndice B — Dependencias vs imports

| Paquete | Importado en `src/` |
|---------|---------------------|
| framer-motion | ✅ 10+ archivos |
| lucide-react | ✅ 4 archivos |
| @base-ui/react | ⚠️ Solo `button.tsx` (unused) |
| @radix-ui/react-slot | ❌ |
| class-variance-authority | ⚠️ Solo `button.tsx` (unused) |
| clsx + tailwind-merge | ✅ `utils.ts` |
| shadcn | ⚠️ CSS import only |

## Apéndice C — Archivos inspeccionados

Todos los archivos en `src/` (29 archivos TS/TSX), `public/` (6 SVG), configs (`next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `postcss.config.mjs`, `components.json`, `package.json`, `globals.css`, `README.md`, `.gitignore`).

**Total rutas públicas:** 1 (`/`)  
**Total secciones visibles:** 2 (Hero, Philosophy)  
**Total proyectos en portfolio:** 0  
**Total formularios:** 0  
**Total footers:** 0

---

*Documento generado por auditoría de código — sin modificaciones al repositorio excepto este archivo de entrega.*
