// Klappmenü für schmale Schirme. Ohne JavaScript bleibt die Kopfzeile
// benutzbar: der PPR-Knopf ist ein normaler Link, die Fußzeile führt
// zu allen Bereichen.
(function () {
  var schalter = document.querySelector('.menue-schalter');
  var menue = document.getElementById('klappmenue');
  if (!schalter || !menue) return;

  function setzen(offen) {
    menue.hidden = !offen;
    schalter.setAttribute('aria-expanded', String(offen));
    schalter.setAttribute('aria-label', offen ? 'Menü schließen' : 'Menü öffnen');
  }

  schalter.addEventListener('click', function () {
    setzen(menue.hidden);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !menue.hidden) {
      setzen(false);
      schalter.focus();
    }
  });
})();
