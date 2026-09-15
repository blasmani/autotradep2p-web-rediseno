/*
 * El conmutador EN / ES.
 *
 * ## Por qué así y no con dos webs
 *
 * Dos ficheros por página —`index.html` y `index-es.html`— se desincronizan al segundo
 * cambio: alguien corrige una frase en inglés, se olvida del español, y el sitio empieza a
 * prometer cosas distintas según el idioma. Aquí cada texto lleva sus dos versiones EN EL
 * MISMO sitio (`data-en` y `data-es`), así que editar uno tiene el otro delante.
 *
 * ## Inglés por defecto, y por qué
 *
 * Lo pidió el dueño: la app se vende en Microsoft Store a cualquier país, y el visitante
 * medio no es peruano. El español está a un clic y se recuerda.
 *
 * ## Lo que NO hace
 *
 * No adivina el idioma del navegador. Un sitio que se pinta en un idioma distinto cada vez
 * según desde dónde se abra es imposible de compartir: mandas un enlace, lo abren y ven otra
 * cosa. Manda lo que el visitante eligió, y si no eligió nada, inglés.
 */
;(function () {
  var CLAVE = 'autotrade-idioma'
  var idiomas = ['en', 'es']

  function guardado() {
    try {
      var v = localStorage.getItem(CLAVE)
      return idiomas.indexOf(v) >= 0 ? v : 'en'
    } catch (e) {
      // Modo privado o cookies bloqueadas: no es motivo para dejar la página sin idioma.
      return 'en'
    }
  }

  function aplicar(idioma) {
    document.documentElement.lang = idioma
    var otro = idioma === 'en' ? 'es' : 'en'

    // Textos.
    var nodos = document.querySelectorAll('[data-en]')
    for (var i = 0; i < nodos.length; i++) {
      var n = nodos[i]
      var texto = n.getAttribute('data-' + idioma)
      if (texto === null) continue
      // `innerHTML` y no `textContent` porque varias frases llevan <b> o <em> dentro. El
      // contenido sale de estos mismos ficheros, nunca de nadie de fuera.
      n.innerHTML = texto
    }

    // Atributos que también cambian: alt de imágenes y aria-label.
    var conAlt = document.querySelectorAll('[data-alt-en]')
    for (var j = 0; j < conAlt.length; j++) {
      conAlt[j].alt = conAlt[j].getAttribute('data-alt-' + idioma) || ''
    }

    // La imagen de portada tiene una versión por idioma: la captura está rotulada.
    var portada = document.querySelector('[data-img-en]')
    if (portada) portada.src = portada.getAttribute('data-img-' + idioma)

    // Los botones del conmutador.
    var botones = document.querySelectorAll('.idioma button')
    for (var k = 0; k < botones.length; k++) {
      var b = botones[k]
      b.setAttribute('aria-pressed', String(b.dataset.idioma === idioma))
    }

    try {
      localStorage.setItem(CLAVE, idioma)
    } catch (e) {
      /* nada que hacer */
    }
    return otro
  }

  function arrancar() {
    aplicar(guardado())
    var botones = document.querySelectorAll('.idioma button')
    for (var i = 0; i < botones.length; i++) {
      botones[i].addEventListener('click', function () {
        aplicar(this.dataset.idioma)
      })
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', arrancar)
  } else {
    arrancar()
  }
})()
