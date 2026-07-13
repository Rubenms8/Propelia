# Agency Propelia — Web oficial

Web premium de **Agency Propelia**, agencia de desarrollo web. Sitio estático (HTML + CSS + JavaScript vanilla), sin framework ni proceso de build. Listo para desplegar en cualquier hosting estático (Vercel, Netlify, Hostinger, etc.).

## Estructura

```
.
├── index.html              Página principal
├── aviso-legal.html        Páginas legales
├── privacidad.html
├── cookies.html
├── condiciones.html
├── styles.css              Estilos (un único archivo)
├── main.js                 Interactividad (vanilla JS, patrón IIFE)
├── robots.txt · sitemap.xml   SEO
├── vercel.json             Cabeceras de caché para Vercel
├── .htaccess               Caché + HTTPS para hosts Apache (ignorado por Vercel)
├── lib/                    GSAP, ScrollTrigger y datos de marca (manifest.js)
└── assets/
    ├── img/                Logos, favicon, imagen social y fotos del portfolio (mock/)
    └── video/              Vídeos animados del logotipo
```

> Las carpetas `.claude/` y `tools/` son solo de desarrollo local y están excluidas del repositorio (ver `.gitignore`).

## Vista previa en local

No requiere build. Puedes abrir `index.html` directamente, o servir la carpeta con cualquier servidor estático, por ejemplo:

```bash
npx serve .
```

## Desplegar en Vercel

1. Sube el proyecto a un repositorio de GitHub.
2. En [vercel.com](https://vercel.com) → **Add New… → Project** → importa el repositorio.
3. Framework Preset: **Other**. Build Command: *(vacío)*. Output Directory: *(vacío / raíz)*.
4. **Deploy**. Vercel detecta el sitio estático y lo publica automáticamente.
5. (Opcional) En **Settings → Domains** añade tu dominio `agencypropelia.com`.

## Subir a GitHub (primera vez)

```bash
git init
git add .
git commit -m "Web Agency Propelia"
git branch -M main
git remote add origin https://github.com/<usuario>/<repo>.git
git push -u origin main
```

## Notas de mantenimiento

- **Caché:** al actualizar `styles.css` o `main.js`, sube el parámetro `?v=YYYYMMDD` en las referencias de los `.html` para forzar la recarga.
- **Datos legales:** revisa `aviso-legal.html` y `privacidad.html` y completa los datos fiscales del titular cuando los tengas.
- **Imágenes:** las fotos del portfolio (`assets/img/mock/`) son de stock con licencia; la atribución está en `assets/img/mock/credits.json`. Puedes sustituirlas por proyectos reales. Para máxima velocidad, conviene convertirlas a WebP antes de producción.
