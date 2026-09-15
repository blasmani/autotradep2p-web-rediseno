# AutoTrade P2P — sitio web actual y propuesta de rediseño

Este repositorio es una **copia exacta del sitio público <https://autotradep2p.com/>** tal como
está en producción el 2026-09-12, más este documento. Existe para una sola cosa: que se pueda
proponer un **diseño premium nuevo** de la página con toda la información delante, sin tocar
el sitio que está en vivo.

La decisión de adoptar o no la propuesta la toma el dueño después, viéndola. **Nada de lo que
se haga aquí se publica solo.**

## La propuesta: `propuesta/` («Marino sobre hielo», 2026-09-14)

Las dos versiones conviven en este repositorio y se ven en GitHub Pages:

| | Dónde |
|---|---|
| Sitio actual (copia) | <https://blasmani.github.io/autotradep2p-web-rediseno/> |
| **Propuesta nueva** | <https://blasmani.github.io/autotradep2p-web-rediseno/propuesta/> |

`propuesta/` es un sitio completo y autónomo —portada, política de privacidad, términos, 404,
su CSS y su JS— con **el mismo contenido** que el actual (las dos páginas legales tienen el
`<main>` idéntico, comprobado con `diff`) y un diseño distinto de arriba abajo:

- **Lienzo claro gris frío (`#eef1f5`), tinta azul marino (`#0f1729`) y UN solo acento azul
  (`#2f63e6`)**, que aparece solo donde se pulsa: botón primario, pastilla «Tuyo», riel de la
  banda y anillo de foco. Ni el negro ni el amarillo de Binance del sitio actual.
- **Islas blancas de radio grande** (36 px en escritorio, 20 px en móvil) sobre el lienzo, y
  **una sola isla oscura** (`#0b1220`), la del motor de precios, para que el contraste ocurra
  una vez.
- **Instrument Sans + Geist Mono** (Google Fonts, dos familias): titular de 72 px en
  escritorio y 40 px en móvil; rótulos mono de 12 px como suelo.
- **La imagen es el producto**: la ilustración del robot se retira y la portada lleva dos
  maquetas en HTML/CSS (el ranking con la banda de puestos y el chat de una orden). Hay
  maquetas también del historial, de los disparadores, de la regla del motor, de tres
  instantes del ranking y de los cuatro pasos. Todas se traducen con el conmutador, pesan cero
  bytes y llevan el rótulo «Ilustración · datos de ejemplo». Los datos son ficticios: apodos
  inventados, iniciales, métodos de pago genéricos, sin bancos ni nombres.
- Secciones: portada → 01 Qué hace → 02 Motor de precios (isla oscura) → 03 Cómo funciona
  (cuatro filas de libro mayor) → 04 Dos versiones → 05 Tres nunca, dos siempre → 06 Precio
  (ficha tipo contrato) → 07 FAQ → cierre → pie.
- **Nada rebota, nada se levanta al pasar el ratón, nada late en bucle.** El revelado al
  hacer scroll es CSS puro (`animation-timeline: view()`), dentro de `@supports` y de
  `prefers-reduced-motion`; el JS son 30 líneas (el filete de la cabecera al hacer scroll y
  «solo una pregunta abierta» en el FAQ).
- Móvil comprobado a 390 px en los dos idiomas: sin scroll lateral, dianas de 44 px, texto
  mínimo 12 px; las anclas de la cabecera se van y quedan el conmutador EN/ES y el botón.

Salió de un panel de tres direcciones de diseño (clara estilo Apple, marino oscuro tipo
silver5ai.com y editorial sobre papel) juzgadas por tres revisores independientes, con las
mejores ideas de las otras dos injertadas en la ganadora; después pasó una revisión adversaria
de contenido, idiomas, accesibilidad, técnica y diseño.

Las reglas del encargo de abajo siguen valiendo para cualquier cambio en `propuesta/`.

## Qué hay dentro

| Fichero | Qué es |
|---|---|
| `index.html` | La portada, tal cual está en vivo. Todo el texto en inglés y español dentro del mismo fichero (`data-en` / `data-es`) |
| `privacy.html` | Política de privacidad (EN/ES) |
| `terms.html` | Términos y condiciones (EN/ES) |
| `404.html` | Página de no encontrado |
| `assets/styles.css` | Los estilos actuales, con la paleta medida sobre el Portal del Comerciante de Binance |
| `assets/idioma.js` | El conmutador EN/ES: pinta `data-en` o `data-es` en cada elemento y recuerda la elección |
| `assets/hero.jpg` | La ilustración de la portada (1066×896) |
| `assets/icono.png` | El icono de la app: favicon y pie. **En la cabecera ya no va** |
| `README-original.md` | El README del repositorio de producción, con las reglas de diseño y las trampas que ya costaron horas |
| `robots.txt`, `.nojekyll` | Del despliegue en GitHub Pages |

Lo que NO se copió, a propósito: `CNAME` y el fichero de verificación de Google Search Console,
que pertenecen al dominio en vivo, y `prueba/`, un banco de pruebas técnico que no es parte del
producto.

## El producto, en dos párrafos

**AutoTrade P2P** es un asistente para comerciantes de **Binance P2P** (la gente que compra y
vende cripto por transferencia bancaria, con órdenes y chat dentro de Binance). Hace tres
cosas: **responde el chat de cada orden** con las plantillas que escribe el propio comerciante,
**lleva un historial de órdenes descargable a Excel** con el nombre verificado de cada
contraparte y su método de pago, y **mueve el precio de los anuncios** solo cuando se salen de
la banda de puestos que el comerciante fija. Nunca libera cripto, nunca compra ni vende, nunca
da consejo de inversión: cada decisión con dinero la toma una persona.

Hay **dos versiones del mismo producto, y conviven**: la **app web** (<https://app.autotradep2p.com/>,
entra con Google, disponible ya) y la **app de Windows** (Microsoft Store, todo en el PC del
usuario, todavía en certificación). Precio: **30 USDT al mes**, con siete días de prueba. Soporte
por Telegram (`t.me/AutoTradeP2P`).

## Qué se pide a quien haga la propuesta

Un **diseño nuevo, premium, de la portada** (`index.html`) y, si quiere, de las dos páginas
legales, entregado como lo que ya es este sitio: **HTML, CSS y JavaScript estáticos, sin
proceso de build**, que se puedan servir tal cual desde GitHub Pages. Idealmente en este mismo
repositorio, en una rama o carpeta aparte (`propuesta/`), sin borrar la versión actual, para
poder compararlas.

### Lo que hay que conservar

1. **Todo el contenido y las afirmaciones.** Los textos describen lo que la app hace de verdad,
   y varias correcciones de este sitio salieron de prometer algo que la app no hacía. Se puede
   reordenar, acortar o reescribir con mejor ritmo, pero **no inventar funciones ni cambiar
   qué versión hace qué**. En particular:
   - Las dos versiones **conviven**; ninguna sustituye a la otra. Toda frase que valga solo
     para una tiene que decir para cuál.
   - La versión de Windows **sigue en certificación** en Microsoft Store: su botón y las notas
     que lo dicen se quedan hasta que la aprueben.
   - Lo que **nunca** hace: liberar cripto, comprar/vender/transferir, dar consejo de
     inversión, usar otra cosa que la API oficial de Binance.
   - Precio: 30 USDT al mes, siete días de prueba.
2. **Los dos idiomas en el mismo fichero**, con `data-en` / `data-es` y el conmutador de
   `assets/idioma.js`. Inglés por defecto. Regla técnica que ya rompió el sitio una vez: un
   `<svg>` dentro de un elemento traducido desaparece al cambiar de idioma; los iconos van
   como **hermanos** del `<span>` traducido, nunca dentro.
3. **Los enlaces**: `https://app.autotradep2p.com/`, `https://apps.microsoft.com/detail/9PL6F67SSZV8`,
   `https://t.me/AutoTradeP2P`, `privacy.html`, `terms.html`.
4. **Las dos páginas legales con su texto íntegro.** Se puede cambiar su aspecto; no su
   contenido.
5. **La marca**: solo el nombre «AutoTrade P2P». No aparece ningún nombre de persona en
   ninguna parte, y así debe seguir.

### Lo que el dueño valora (y lo que rechaza)

- **Premium, estilo Apple: precisión, no espectáculo.** Nada rebota, nada late en bucle, nada
  se levanta al pasar el ratón. Animaciones de revelado sí, sutiles y con
  `prefers-reduced-motion` respetado.
- **Cero emojis.** Iconos SVG de trazo, finos, consistentes. Un emoji en la interfaz le parece
  «algo muy simple».
- **La paleta de Binance** como base (está en `assets/styles.css` con cada contraste medido):
  fondo `#07090c`, superficies `#14171c` / `#1b1f26`, texto `#eaecef`, acento amarillo
  `#fcd535` / `#f0b90b`. Se puede proponer otra, pero que se entienda por qué.
- **Móvil de verdad**: el sitio se mira desde el teléfono tanto como desde el PC. Textos de
  12 px mínimo, dianas táctiles de 44 px.
- **Rendimiento**: una página, tipografía de Google Fonts (Inter + IBM Plex Mono hoy) y una
  ilustración. Nada de frameworks pesados ni de dependencias que exijan build.
- Lo que rechaza: efectos llamativos, gradientes chillones, texto genérico de «revoluciona tu
  negocio», capturas falsas de la app (la ilustración actual lleva su pie «Not a screenshot
  of the app» a propósito).

### La ilustración

`assets/hero.jpg` es un robot amable con un ranking de anunciantes al lado. Se puede sustituir
por otra ilustración o por una composición nueva, pero **nunca por una captura inventada de la
app**. Proporción cómoda: entre 4:3 y 1:1. Si se cambia, ajustar `width`/`height` del `<img>`
al archivo nuevo (ver `README-original.md`, «Si cambias la ilustración»).

## Cómo verlo

Es estático: abrir `index.html` en el navegador basta. O servir la carpeta con cualquier
servidor de ficheros (`python -m http.server 8000` y abrir `http://localhost:8000/`).
