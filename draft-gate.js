// CCC BOYS draft access gate. Client-side PIN. Not secure, intentionally simple.
// Sessionscoped: PIN asked once per browser session.
(function () {
  if (sessionStorage.getItem('ccc-draft-access') === '1933') return;

  var overlay = document.createElement('div');
  overlay.id = 'ccc-draft-gate';
  overlay.style.cssText =
    'position:fixed;inset:0;background:#1d160e;z-index:99999;' +
    'display:flex;align-items:center;justify-content:center;' +
    'font-family:Georgia,serif;color:#f6ecd4;';
  overlay.innerHTML =
    '<div style="text-align:center;padding:40px;max-width:420px;width:90%;">' +
    '<div style="font-family:\'Alfa Slab One\',Georgia,serif;font-size:56px;letter-spacing:0.12em;line-height:1;margin-bottom:8px;color:#9c2a23;">DRAFT</div>' +
    '<div style="font-size:13px;letter-spacing:0.28em;text-transform:uppercase;margin-bottom:32px;opacity:0.75;">CCC&middot;BOYS &middot; internal review only</div>' +
    '<form id="ccc-pin-form" style="display:flex;flex-direction:column;gap:14px;">' +
    '<input id="ccc-pin-input" type="password" inputmode="numeric" placeholder="PIN" autocomplete="off" autofocus ' +
    'style="background:transparent;border:2px solid #f6ecd4;color:#f6ecd4;padding:14px 16px;font-size:20px;text-align:center;letter-spacing:0.4em;font-family:Georgia,serif;outline:none;border-radius:0;" />' +
    '<button type="submit" ' +
    'style="background:#9c2a23;border:2px solid #9c2a23;color:#f6ecd4;padding:14px 16px;font-family:Georgia,serif;font-weight:700;letter-spacing:0.25em;text-transform:uppercase;cursor:pointer;border-radius:0;">unlock</button>' +
    '<div id="ccc-pin-error" style="font-size:12px;color:#fcd34d;letter-spacing:0.15em;text-transform:uppercase;min-height:14px;opacity:0;transition:opacity 0.15s;">incorrect pin</div>' +
    '</form>' +
    '<div style="margin-top:24px;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;opacity:0.5;">' +
    '<a href="/" style="color:inherit;text-decoration:underline;">return to cccboys.com</a>' +
    '</div>' +
    '</div>';

  function attach() {
    document.body.appendChild(overlay);
    var input = overlay.querySelector('#ccc-pin-input');
    var err = overlay.querySelector('#ccc-pin-error');
    var form = overlay.querySelector('#ccc-pin-form');
    setTimeout(function () { input.focus(); }, 50);
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (input.value === '1933') {
        sessionStorage.setItem('ccc-draft-access', '1933');
        overlay.remove();
      } else {
        err.style.opacity = '1';
        input.value = '';
        input.focus();
      }
    });
  }

  if (document.body) {
    attach();
  } else {
    document.addEventListener('DOMContentLoaded', attach);
  }
})();
