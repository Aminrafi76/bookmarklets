javascript:(function(){
  const d = ms => new Promise(r => setTimeout(r, ms));

  // گرفتن نام
  let fullName = '';
  try {
    const match = document.documentElement.innerHTML.match(/name:\s*'([^']+)'/);
    if (match && match[1]) {
      fullName = match[1].trim();
    }
  } catch(e) { console.error("خطا در گرفتن نام:", e); }
  let firstName = fullName ? fullName.split(' ')[0] : 'کاربر';

  // --- استایل کلی
  const st = document.createElement('style');
  st.textContent = `
    @keyframes spinPulse {
      0% { transform: rotate(0deg) scale(1); }
      50% { transform: rotate(180deg) scale(1.2); }
      100% { transform: rotate(360deg) scale(1); }
    }
    @keyframes typing {
      from { width: 0 }
      to { width: 100% }
    }
    .typing {
      overflow: hidden;
      white-space: nowrap;
      border-right: 3px solid #00ffcc;
      animation: typing 3s steps(30,end) infinite alternate;
    }
    .progress-glow {
      background: linear-gradient(90deg, #00ffcc, #ff00cc, #00aaff);
      background-size: 300% 300%;
      animation: moveGlow 4s infinite linear;
    }
    @keyframes moveGlow {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
  `;
  document.head.appendChild(st);

  // --- پوشش اصلی
  const o = document.createElement('div');
  o.style.position = 'fixed';
  o.style.top = '0';
  o.style.left = '0';
  o.style.width = '100%';
  o.style.height = '100%';
  o.style.backgroundColor = 'rgba(0,0,0,0.8)';
  o.style.display = 'flex';
  o.style.flexDirection = 'column';
  o.style.justifyContent = 'center';
  o.style.alignItems = 'center';
  o.style.zIndex = '9999';
  o.style.color = 'white';
  o.style.fontSize = '22px';
  o.style.backdropFilter = 'blur(5px)';
  o.style.fontFamily = 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif';

  // --- لودینگ سه بعدی Glow
  const s = document.createElement('div');
  s.style.border = '6px solid rgba(255,255,255,0.2)';
  s.style.borderTop = '6px solid #00ffcc';
  s.style.borderRadius = '50%';
  s.style.width = '70px';
  s.style.height = '70px';
  s.style.animation = 'spinPulse 1.5s linear infinite';
  s.style.boxShadow = '0 0 25px #00ffcc, 0 0 50px #00ffcc';
  o.appendChild(s);

  // --- متن با افکت تایپینگ
  const t = document.createElement('div');
  t.innerHTML = `<span class="typing">${firstName} عزیز، لطفاً صبر کنید...</span>`;
  t.style.marginTop = '25px';
  t.style.fontSize = '20px';
  t.style.fontWeight = '600';
  t.style.textShadow = '0 0 10px #00ffcc';
  o.appendChild(t);

  // --- Progress Bar نئونی
  const progressContainer = document.createElement('div');
  progressContainer.style.marginTop = '30px';
  progressContainer.style.width = '320px';
  progressContainer.style.height = '22px';
  progressContainer.style.backgroundColor = 'rgba(255,255,255,0.15)';
  progressContainer.style.borderRadius = '15px';
  progressContainer.style.overflow = 'hidden';
  progressContainer.style.boxShadow = '0 0 15px rgba(0,255,204,0.7) inset';

  const progressBar = document.createElement('div');
  progressBar.style.width = '0%';
  progressBar.style.height = '100%';
  progressBar.classList.add('progress-glow');
  progressBar.style.borderRadius = '15px';
  progressBar.style.transition = 'width 0.4s ease';
  progressContainer.appendChild(progressBar);
  o.appendChild(progressContainer);

  // --- امضا
  const sig = document.createElement('div');
  sig.textContent = '⚡ Powered By AminRafiAkrami';
  sig.style.position = 'fixed';
  sig.style.bottom = '30px';
  sig.style.left = '20px';
  sig.style.color = '#fff';
  sig.style.textShadow = '0 0 10px #00ffcc, 0 0 20px #ff00cc';
  sig.style.fontSize = '14px';
  sig.style.fontWeight = 'bold';
  o.appendChild(sig);

  document.body.appendChild(o);

  // --- اجرای اصلی
  async function a() {
    try {
      let rows = [...document.querySelectorAll('tbody tr')].filter(tr => {
        if (tr.querySelector('td span.label-success')) return false;
        if (tr.querySelector('a[onclick^="LoadAutoCad("]')) return false;
        return true;
      });
      rows = rows.filter(tr => {
        const sp = tr.querySelector('span.updstatus');
        return sp && sp.getAttribute('data-row');
      });
      const total = rows.length;
      if (total === 0) {
        o.remove();
        alert('مدرکی برای تایید یافت نشد.');
        return;
      }
      let done = 0;
      for (const tr of rows) {
        const sp = tr.querySelector('span.updstatus');
        const id = sp.getAttribute('data-row');
        const p = new URLSearchParams();
        p.append('action[0][action]', 'active');
        p.append('action[0][active]', '1');
        p.append('id', id);
        try {
          await fetch('/vbms/plugins/member/moteghazi_peivastlist.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
              'X-Requested-With': 'XMLHttpRequest'
            },
            body: p.toString(),
            credentials: 'same-origin'
          });
        } catch (e) { console.error('خطا در مدرک:', id, e); }
        done++;
        const percent = Math.round((done / total) * 100);
        progressBar.style.width = percent + '%';
        t.innerHTML = `<span class="typing">${firstName} عزیز، در حال پردازش... ${percent}%</span>`;
        await d(70);
      }
      location.reload();
    } catch (err) {
      console.error('خطا در اجرای اسکریپت:', err);
      o.remove();
    }
  }
  a();
})();
