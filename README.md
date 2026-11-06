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

Mientras `RESENAS_BACKEND` esté vacío, las reseñas se guardan solo en el navegador de quien las escribe (modo prueba). Para que se guarden de verdad y las vea todo el mundo hay que conectar una base de datos. Con [Supabase](https://supabase.com) (plan gratis):

1. Crear un proyecto y, en el editor SQL, ejecutar:

```sql
create table resenas (
  id bigint generated always as identity primary key,
  nombre text not null check (char_length(nombre) <= 60),
  estrellas int not null check (estrellas between 1 and 5),
  comentario text not null check (char_length(comentario) <= 500),
  aprobada boolean not null default false,
  creada timestamptz not null default now()
);
alter table resenas enable row level security;
create policy "leer aprobadas" on resenas for select using (aprobada);
create policy "enviar" on resenas for insert with check (aprobada = false);
```

2. Copiar la URL del proyecto y la clave `anon` en `RESENAS_BACKEND` dentro de `app.js`. Esa clave es pública por diseño: la seguridad la dan las políticas de arriba.
3. Las reseñas nuevas quedan ocultas hasta que Milena las apruebe (cambiando `aprobada` a verdadero en el panel de Supabase).

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
