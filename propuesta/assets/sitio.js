/*
 * Dos cosas pequeñas, y nada más.
 *
 * 1. El filete de la cabecera aparece al hacer scroll. Es cosmético: si este script no
 *    arranca, la barra sigue funcionando, solo que sin filete.
 * 2. En el FAQ solo hay una pregunta abierta a la vez, para que la página no se alargue.
 *    `toggle` no burbujea, así que se escucha en captura.
 *
 * Todo lo demás —el revelado al entrar en pantalla, el cheurón, el vidrio— es CSS.
 */
;(function () {
  var cabecera = document.querySelector('.cabecera')
  function mirar() {
    if (!cabecera) return
    cabecera.classList.toggle('cabecera--pegada', window.scrollY > 24)
  }
  window.addEventListener('scroll', mirar, { passive: true })
  mirar()

  var faq = document.querySelector('.faq')
  if (faq) {
    faq.addEventListener(
      'toggle',
      function (e) {
        if (!e.target.open) return
        var abiertas = faq.querySelectorAll('details[open]')
        for (var i = 0; i < abiertas.length; i++) {
          if (abiertas[i] !== e.target) abiertas[i].open = false
        }
      },
      true,
    )
  }
})()
