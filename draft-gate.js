// CCC BOYS draft access gate. Client-side PIN. Bank-style 4-box entry.
// Session-scoped: PIN asked once per browser session.
(function () {
  if (sessionStorage.getItem('ccc-draft-access') === '1933') return;

  var style = document.createElement('style');
  style.textContent =
    '#ccc-draft-gate{position:fixed;inset:0;background:#1d160e;z-index:99999;' +
    'display:flex;align-items:center;justify-content:center;' +
    'font-family:Georgia,serif;color:#f6ecd4;}' +
    '.ccc-pin-digit{width:68px;height:84px;background:transparent;' +
    'border:2px solid #f6ecd4;color:#f6ecd4;font-size:40px;font-weight:700;' +
    'text-align:center;font-family:Georgia,serif;outline:none;border-radius:6px;' +
    'caret-color:#9c2a23;' +
    'transition:border-color 0.15s,background 0.15s,transform 0.1s;}' +
    '.ccc-pin-digit:focus{border-color:#9c2a23;background:rgba(156,42,35,0.10);}' +
    '.ccc-pin-digit.filled{background:rgba(246,236,212,0.08);}' +
    '.ccc-pin-digit.wrong{border-color:#9c2a23;background:rgba(156,42,35,0.22);' +
    'animation:cccShake 0.4s;}' +
    '@keyframes cccShake{0%,100%{transform:translateX(0);}' +
    '20%,60%{transform:translateX(-6px);}40%,80%{transform:translateX(6px);}}' +
    '@media(max-width:500px){' +
    '.ccc-pin-digit{width:54px;height:70px;font-size:30px;}' +
    '#ccc-pin-boxes{gap:10px !important;}}';
  document.head.appendChild(style);

  var overlay = document.createElement('div');
  overlay.id = 'ccc-draft-gate';
  overlay.innerHTML =
    '<div style="text-align:center;padding:40px;max-width:520px;width:90%;">' +
    '<div style="font-family:\'Alfa Slab One\',Georgia,serif;font-size:56px;letter-spacing:0.12em;line-height:1;margin-bottom:8px;color:#9c2a23;">DRAFT</div>' +
    '<div style="font-size:13px;letter-spacing:0.28em;text-transform:uppercase;margin-bottom:36px;opacity:0.75;">CCC&middot;BOYS &middot; internal review only</div>' +
    '<form id="ccc-pin-form" autocomplete="off">' +
    '<div id="ccc-pin-boxes" style="display:flex;justify-content:center;gap:14px;margin-bottom:18px;">' +
    '<input class="ccc-pin-digit" type="text" inputmode="numeric" maxlength="1" data-i="0" aria-label="PIN digit 1" />' +
    '<input class="ccc-pin-digit" type="text" inputmode="numeric" maxlength="1" data-i="1" aria-label="PIN digit 2" />' +
    '<input class="ccc-pin-digit" type="text" inputmode="numeric" maxlength="1" data-i="2" aria-label="PIN digit 3" />' +
    '<input class="ccc-pin-digit" type="text" inputmode="numeric" maxlength="1" data-i="3" aria-label="PIN digit 4" />' +
    '</div>' +
    '<div id="ccc-pin-error" style="font-size:12px;color:#fcd34d;letter-spacing:0.22em;text-transform:uppercase;min-height:14px;opacity:0;transition:opacity 0.15s;">incorrect pin</div>' +
    '</form>' +
    '<div style="margin-top:32px;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;opacity:0.5;">' +
    '<a href="/" style="color:inherit;text-decoration:underline;">return to cccboys.com</a>' +
    '</div>' +
    '</div>';

  function attach() {
    document.body.appendChild(overlay);
    var inputs = overlay.querySelectorAll('.ccc-pin-digit');
    var err = overlay.querySelector('#ccc-pin-error');
    var form = overlay.querySelector('#ccc-pin-form');

    setTimeout(function () { inputs[0].focus(); }, 80);

    function getValue() {
      var v = '';
      for (var k = 0; k < inputs.length; k++) v += inputs[k].value;
      return v;
    }

    function clearAll() {
      for (var k = 0; k < inputs.length; k++) {
        inputs[k].value = '';
        inputs[k].classList.remove('filled');
      }
    }

    function tryUnlock() {
      var pin = getValue();
      if (pin.length !== 4) return;
      if (pin === '1933') {
        sessionStorage.setItem('ccc-draft-access', '1933');
        overlay.remove();
      } else {
        for (var k = 0; k < inputs.length; k++) inputs[k].classList.add('wrong');
        err.style.opacity = '1';
        setTimeout(function () {
          for (var k = 0; k < inputs.length; k++) inputs[k].classList.remove('wrong');
          clearAll();
          inputs[0].focus();
        }, 500);
      }
    }

    function bindInput(inp, i) {
      inp.addEventListener('input', function () {
        var v = inp.value.replace(/[^0-9]/g, '');
        inp.value = v.slice(0, 1);
        err.style.opacity = '0';
        if (inp.value) inp.classList.add('filled');
        else inp.classList.remove('filled');
        if (inp.value && i < inputs.length - 1) {
          inputs[i + 1].focus();
        }
        if (i === inputs.length - 1 && inp.value) {
          tryUnlock();
        }
      });
      inp.addEventListener('keydown', function (e) {
        if (e.key === 'Backspace' && !inp.value && i > 0) {
          inputs[i - 1].focus();
          inputs[i - 1].value = '';
          inputs[i - 1].classList.remove('filled');
          e.preventDefault();
        } else if (e.key === 'ArrowLeft' && i > 0) {
          inputs[i - 1].focus();
          e.preventDefault();
        } else if (e.key === 'ArrowRight' && i < inputs.length - 1) {
          inputs[i + 1].focus();
          e.preventDefault();
        } else if (e.key === 'Enter') {
          tryUnlock();
          e.preventDefault();
        }
      });
      inp.addEventListener('paste', function (e) {
        e.preventDefault();
        var paste = (e.clipboardData || window.clipboardData).getData('text');
        var digits = paste.replace(/[^0-9]/g, '').slice(0, 4);
        for (var j = 0; j < digits.length && j < inputs.length; j++) {
          inputs[j].value = digits[j];
          inputs[j].classList.add('filled');
        }
        if (digits.length === 4) {
          tryUnlock();
        } else if (digits.length > 0) {
          inputs[Math.min(digits.length, inputs.length - 1)].focus();
        }
      });
      inp.addEventListener('focus', function () { inp.select(); });
    }

    for (var i = 0; i < inputs.length; i++) bindInput(inputs[i], i);

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      tryUnlock();
    });
  }

  if (document.body) {
    attach();
  } else {
    document.addEventListener('DOMContentLoaded', attach);
  }
})();
