// Minimal JS: sets current year + handles simple form submit (mailto fallback)
(function(){
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  const form = document.querySelector('form[data-mailto]');
  if (!form) return;

  form.addEventListener('submit', function(e){
    e.preventDefault();
    const to = form.getAttribute('data-mailto');
    const data = new FormData(form);
    const subject = data.get('subject') || 'Free 1-Page Audit Request';
    const lines = [];
    for (const [k,v] of data.entries()) {
      if (!v) continue;
      if (k === 'subject') continue;
      lines.push(`${k}: ${v}`);
    }
    const body = encodeURIComponent(lines.join('\n'));
    const url = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${body}`;
    window.location.href = url;
  });
})();
