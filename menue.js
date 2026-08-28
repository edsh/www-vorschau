// Klappmenü und Anfrage-Dropdown für schmale Schirme bzw. die Kopfzeile.
// Ohne JavaScript bleibt die Seite nutzbar: die Fußzeile führt zu allen
// Bereichen; nur der Dropdown-Schalter selbst bleibt dann inert, statt
// wie ein normaler Link ins Leere zu springen.
(function () {
  var schalter = document.querySelector('.menue-schalter');
  var menue = document.getElementById('klappmenue');
  if (schalter && menue) {
    var setzenMenue = function (offen) {
      menue.hidden = !offen;
      schalter.setAttribute('aria-expanded', String(offen));
      schalter.setAttribute('aria-label', offen ? 'Menü schließen' : 'Menü öffnen');
    };
    schalter.addEventListener('click', function () {
      setzenMenue(menue.hidden);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !menue.hidden) {
        setzenMenue(false);
        schalter.focus();
      }
    });
  }

  // Anfrage-Dropdowns: pro Kopfzeile kann mehr als eines im DOM stehen
  // (Desktop- und Tablet/Telefon-Version), je nach Breite ist nur eines
  // sichtbar. Jedes bekommt sein eigenes Verhalten.
  var dropdowns = Array.prototype.map.call(
    document.querySelectorAll('.anfrage'),
    function (wrapper) {
      var knopf = wrapper.querySelector('.anfrage-schalter');
      var liste = wrapper.querySelector('.anfrage-menue');
      return { wrapper: wrapper, knopf: knopf, liste: liste };
    }
  ).filter(function (d) { return d.knopf && d.liste; });

  function alleSchliessen(ausser) {
    dropdowns.forEach(function (d) {
      if (d === ausser || d.liste.hidden) return;
      d.liste.hidden = true;
      d.knopf.setAttribute('aria-expanded', 'false');
    });
  }

  dropdowns.forEach(function (d) {
    d.knopf.addEventListener('click', function () {
      var offen = d.liste.hidden;
      alleSchliessen(d);
      d.liste.hidden = !offen;
      d.knopf.setAttribute('aria-expanded', String(offen));
      if (offen) {
        var ersterEintrag = d.liste.querySelector('a');
        if (ersterEintrag) ersterEintrag.focus();
      }
    });
  });

  if (dropdowns.length) {
    document.addEventListener('click', function (e) {
      var innerhalb = dropdowns.some(function (d) { return d.wrapper.contains(e.target); });
      if (!innerhalb) alleSchliessen(null);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      dropdowns.forEach(function (d) {
        if (!d.liste.hidden) {
          d.liste.hidden = true;
          d.knopf.setAttribute('aria-expanded', 'false');
          d.knopf.focus();
        }
      });
    });
  }
})();
