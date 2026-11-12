# Milena Gauchat Estudio

Sitio de una sola página para la campaña de maquillaje de novias de **Milena Gauchat** (maquilladora profesional desde 2011, Instagram [@milenagauchatestudio](https://www.instagram.com/milenagauchatestudio)). Trabajo práctico de Publicidad.

Hecho con HTML, CSS y JavaScript simples, más GSAP y ScrollTrigger desde cdnjs. No necesita instalar nada: se abre `index.html` en el navegador.

## Archivos

- `index.html`: estructura de la página.
- `styles.css`: estilos.
- `app.js`: interacciones. Arriba de todo están los datos que hay que completar.

## Ya cargado

- WhatsApp de Milena: `5493624240260` (el de su bio de Instagram), en la constante `WA_NUMERO` de `app.js`.
- Retrato de Milena: `img/milena.jpg`, en la constante `RETRATO` de `app.js`.
- Portfolio: 23 fotos en `img/portfolio/`, en el arreglo `TRABAJOS` de `app.js`. Cada trabajo tiene solo `tipo` (estilo) y `archivo`: no se muestran nombres, edades ni eventos.
- Logo MG: `img/logo-mg.png` (sacado de su perfil, 150 px). Conviene pedirle el archivo original en alta calidad y reemplazarlo con el mismo nombre.

## Qué falta completar (todo en `app.js`)

| Qué | Dónde |
| --- | --- |
| Fotos o clips de los avatares | arreglo `AVATARES`, campos `foto` y `video` |
| Confirmar con Milena los 5 tipos de novia | arreglo `ESTILOS` |
| Reemplazar los textos de ejemplo de Consejos | arreglo `ARTICULOS` |

Las imágenes van en una carpeta `img/` y se referencian así: `'img/novia-01.jpg'`.

### Portada

En el arco de la portada pasan solas fotos reales del portfolio (arreglo `PORTADA` en `app.js`), una cada 4 segundos. Para cambiar cuáles aparecen, editá ese arreglo con archivos de `img/portfolio/`.

### Avatares

Los avatares de "¿A quién te parecés?" definen los colores iniciales de la ilustración de "Así se arma tu look".

### Capas de "Así se arma tu look"

Las capas se recortan de la misma foto con máscaras en `styles.css` (`.capa--piel`, `.capa--cejas`, etc.). Cuando pongas las fotos reales de los avatares, hay que ajustar las posiciones de esas máscaras para que coincidan con el rostro de la modelo.

## Reseñas

Las reseñas se guardan en Supabase (proyecto `Milena-Gauchat-Estudio`) y se publican solas, sin aprobación.

- **Tabla:** se crea una sola vez con [`sql/resenas.sql`](sql/resenas.sql) (Supabase → SQL Editor → pegar → Run).
- **Conexión:** URL y clave pública (`anon` / publishable) en `RESENAS_BACKEND`, dentro de `app.js`. Esa clave es pública por diseño: la seguridad la dan las políticas de la tabla.
- **Moderar:** en Supabase → Table Editor → `resenas`, borrá la fila o poné `aprobada` en `false` para ocultarla.
- **Spam:** el formulario tiene un campo trampa oculto y límites de largo, también controlados por la base de datos.
- **Que no se pause:** el plan gratis de Supabase pausa los proyectos sin actividad. La tarea automática `.github/workflows/supabase-activa.yml` consulta la base de datos cada dos días para mantenerla despierta. GitHub desactiva las tareas programadas si el repositorio pasa 60 días sin cambios: con las actualizaciones de fotos alcanza, y si llega un mail de aviso de GitHub, se reactiva con un clic en la pestaña Actions.

Mientras `anonKey` esté vacía, las reseñas se guardan solo en el navegador de quien las escribe (modo prueba).

## Publicar en GitHub Pages

1. En el repositorio, ir a **Configuración** (la pestaña del engranaje) → **Pages**.
2. En **Build and deployment**, elegir **Deploy from a branch**, rama `main` y carpeta `/ (root)`.
3. En unos minutos queda en `https://lozamateo.github.io/Milena-Gauchat-Estudio/`.

## Subir los archivos con Git

```bash
git init -b main
git add .
git commit -m "Primera versión del sitio"
git remote add origin https://github.com/Lozamateo/Milena-Gauchat-Estudio.git
git push -u origin main
```
