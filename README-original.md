# AutoTrade P2P — sitio web

Pagina estatica para GitHub Pages. Sin build: son ficheros HTML, un CSS y un JS.

## El producto que vende esta web: DOS versiones vivas

Esto es lo primero que hay que saber antes de escribir una sola frase en los HTML, porque
casi todas las correcciones de esta web han salido de olvidarlo:

| Version | Donde corre | Estado |
|---|---|---|
| **Web** — <https://app.autotradep2p.com/> | El motor y los datos, en servidores nuestros | **Disponible ya** |
| **Windows** — Microsoft Store | Todo en la PC del usuario | **En certificacion** |

No es que una sustituyera a la otra: **conviven, y el usuario elige**. Una frase que solo
valga para una tiene que decir para cual —«en la version web» / «en la version de Windows»—,
y esto vale igual para la portada que para los dos legales. La `privacy.html` §12 cuenta el
caso de manual: se publico «todo se queda en tu PC» sin acotar, dejo de ser cierto de la web,
y la correccion se paso de frenada dando por muerta la version de Windows —que es la que
enlaza esa misma pagina desde su ficha de la Store—.

Y lo que la app puede hacer de verdad manda sobre lo que aqui se prometa. Ejemplo medido: la
portada prometio **CSV** hasta el 2026-08-25, y el boton de CSV se habia retirado de la app el
2026-08-21. Hoy hay **dos descargas de Excel** y ninguna otra: la completa y la «Excel F»,
reducida para pegar en el sistema de facturacion.

## Que hay aqui

| Fichero | Que es |
|---|---|
| `index.html` | Portada |
| `privacy.html` | Politica de privacidad |
| `terms.html` | Terminos y condiciones |
| `assets/idioma.js` | El conmutador EN / ES |
| `assets/styles.css` | Los estilos, con la paleta de la propia app |
| `assets/hero.jpg` | La ilustracion de la portada, 1066x896 |
| `assets/icono.png` | El icono de la app, usado como favicon y en el pie. **En la cabecera ya no va** (2026-09-12, el dueno lo quito con la captura delante: solo el nombre) |

### Si cambias la ilustracion de la portada

Dos cosas, y las dos han fallado ya:

1. **Cambia `width` y `height` del `<img>` para que coincidan con el archivo nuevo.** No son
   decoracion: le dicen al navegador la proporcion antes de descargarla, y con ellos mal el
   texto de al lado da un salto al terminar de cargar.
2. **Comprueba que sigue el `height: auto` del CSS.** Sin el, el navegador usa el atributo
   `height` como alto real y la imagen sale estirada. Paso el 2026-08-19: proporcion original
   1,79 y pintada 0,30.

La proporcion comoda aqui esta entre 4:3 y 1:1. El contenedor mide 339 px en movil, **817 px
en tableta —que es el mas ancho—** y 501 px en un escritorio de 1920: una imagen 16:9 se queda
como una tira y una vertical empuja el resto de la pagina fuera de la primera pantalla.
Y guardala en JPEG salvo que necesite transparencia: la actual pasaba de 1.073 KB en PNG a
159 KB en JPEG de calidad 92 sin diferencia visible.

## El diseño: «Mesa de Control»

Rediseñado el 2026-08-20. El dueño pidió **premium estilo Apple**, **cero emojis** e
**iconos premium en toda la página**. La idea que lo sostiene: esto es una herramienta que
toca dinero de verdad, así que lo premium aquí es la **precisión**, no el espectáculo. Nada
rebota, nada se levanta al pasar el ratón, nada late en bucle.

Cuatro reglas que conviene no romper sin querer:

1. **El amarillo relleno aparece UNA vez por pantalla.** Antes estaba a la vez en el botón,
   en el conmutador de idioma y en los cuatro círculos de los pasos. Cuatro acentos a la vez
   no son un acento. El conmutador activo se marca ahora con un subrayado de 2px.
2. **Los paneles separan celdas con `border-top` / `border-left`, nunca con `gap: 1px`.**
   Con `gap` de 1px, en Windows al 125 % o 150 % de escalado unos filetes salen a 1 píxel y
   otros a 2, y el panel se ve descuadrado.
3. **Suelo de 12px** para cualquier texto, y de **44px** para cualquier cosa que se pueda
   pulsar. La única excepción es el enlace `t.me/…` que va dentro de una frase del FAQ: WCAG
   2.5.8 exceptúa expresamente los enlaces en línea.
4. **El revelado al hacer scroll es CSS puro** (`animation-timeline: view()`), metido dentro
   de `@supports` **y** de `prefers-reduced-motion: no-preference`. Con un observador de
   JavaScript, si el observador no arranca el contenido se queda invisible y no hay ningún
   error en consola. Este proyecto ya tiene tres causas documentadas de pantalla en blanco
   silenciosa; no hacía falta una cuarta.

### El icono nunca va dentro de un texto traducido

`idioma.js` hace `n.innerHTML = n.getAttribute('data-' + idioma)` sobre **cada** elemento con
`[data-en]`. Un `<svg>` metido dentro desaparece la primera vez que alguien pulsa ES y ya no
vuelve, **sin dar ningún error**. El SVG va siempre como hermano del `<span>` traducido:

```html
BIEN : <p class="fila"><svg class="i">…</svg><span data-en="…" data-es="…">…</span></p>
MAL  : <p data-en="…" data-es="…"><svg>…</svg>texto</p>
```

Se comprueba contando `document.querySelectorAll('svg').length` antes y después de varios
ciclos EN → ES → EN. Tiene que dar el mismo número.

### Cómo revisar el móvil de verdad

Chrome headless **impone un ancho mínimo de ventana** (~500px): pedir `--window-size=390,…`
da una captura de 390px de una página maquetada a 500, y parece un desborde que no existe.
Para un viewport real de 390 se usa `_movil.html`, un andamio con un `<iframe>` de 390px
dentro de una ventana grande. Está en `.gitignore` a propósito: es una herramienta, no parte
del sitio.

## El idioma

**Ingles por defecto**, espanol a un clic, y la eleccion se recuerda en el navegador.

Cada texto lleva sus DOS versiones en el mismo sitio, en los atributos `data-en` y `data-es`.
Es a proposito: con dos ficheros separados por idioma, alguien corrige una frase en ingles,
se olvida del espanol, y el sitio empieza a prometer cosas distintas segun quien lo lea.

No adivina el idioma del navegador. Un sitio que se pinta distinto segun desde donde se abra
es imposible de compartir: mandas un enlace, lo abren, y ven otra cosa.

## Pendiente de la certificacion

> Esta seccion decia que habia que buscar un comentario **`AVISO TEMPORAL`** y dejar «solo el
> boton de la Store». Las dos cosas son falsas desde el 2026-08-25: ese comentario ya no
> existe —se llama `CANJE-STORE`— y dejar solo el boton de la Store seria borrar el enlace de
> la app web, que es **la version que funciona hoy**. Se deja escrito para que nadie lo
> «restaure».

Mientras dure la certificacion, el enlace `https://apps.microsoft.com/detail/9PL6F67SSZV8`
devuelve **404**. `index.html` tiene los dos puntos afectados marcados con el comentario
**`CANJE-STORE`** (1 de 2 en la portada, 2 de 2 en la ficha de precio); se encuentran
buscando esa palabra.

El dia que Microsoft apruebe la ficha:

- **Se borra** el chip «In Store certification», que va pegado al boton de la Store en la
  portada.
- **Se borran** las dos notas que dicen que la version de Windows sigue en certificacion: la
  de debajo de los botones de la portada y la del pie de la ficha de precio.
- **Se revisa** el «once approved» / «cuando la aprueben» de las filas *Trial*, *Billing* y
  *Cancellation* de la ficha de precio, y el «still in certification» de `terms.html` §2 y de
  `privacy.html` §12.
- **NO se toca nada mas. Los dos botones se quedan**, y el de la app web va primero en el pie:
  la web no es un parche mientras dura la certificacion, es una de las dos versiones del
  producto.

## Dominio: autotradep2p.com

En linea desde el 2026-08-19 en **https://autotradep2p.com**, con certificado HTTPS emitido
por GitHub y redireccion forzada.

DNS en GoDaddy (los nameservers siguen siendo los de GoDaddy, ns27/ns28.domaincontrol.com):

| Tipo | Nombre | Valor |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | blasmani.github.io. |
| TXT | _github-pages-challenge-blasmani | (codigo de verificacion de GitHub) |

**Las cuatro A hacen falta**, no una: son los cuatro servidores de GitHub Pages, y con una
sola la web se cae cuando ese servidor falla.

El fichero `CNAME` de este repositorio es lo que hace que GitHub recuerde el dominio en cada
publicacion. Si se borra, el sitio vuelve a servirse en `blasmani.github.io/...`.

La A que habia antes apuntaba al creador de webs de GoDaddy («WebsiteBuilder Site») y se
sustituyo. El CNAME `www` apuntaba al propio dominio y ahora apunta a GitHub.
