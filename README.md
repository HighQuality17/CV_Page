# Portfolio profesional - Joni Alexander Cuartas Pineda

Sitio estático moderno construido con Astro, React, TypeScript, Tailwind CSS, GSAP ScrollTrigger y Three.js.

## Estructura

```txt
src/
  components/
    ScrollAnimations.tsx
    TechScene.tsx
  data/
    profile.ts
  layouts/
    BaseLayout.astro
  pages/
    index.astro
  styles/
    global.css
public/
  cv/
```

## Personalización

- Edita datos personales, proyectos, tecnologías, formación, estado AWS y ruta del CV en `src/data/profile.ts`.
- Reemplaza el PDF en `public/cv/Joni-Alexander-Cuartas-Pineda-CV.pdf`.
- Si necesitas regenerar el placeholder del CV: `node scripts/create-placeholder-cv.mjs`.
- Cambia colores, tarjetas y botones en `src/styles/global.css`.

## Instalar

```bash
npm install
```

## Ejecutar local

```bash
npm run dev
```

Astro abre normalmente en `http://localhost:4321`.

## Construir producción

```bash
npm run build
```

Salida estática generada en `dist/`.

## Vista previa

```bash
npm run preview
```

## Despliegue

Funciona en Vercel, Netlify, Cloudflare Pages o AWS S3/CloudFront.

- Build command: `npm run build`
- Output directory: `dist`
- Framework preset: Astro
