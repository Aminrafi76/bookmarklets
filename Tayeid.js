javascript:(function(){
  const d = ms => new Promise(r => setTimeout(r, ms));

  // گرفتن نام
  let fullName = '';
  try {
    const match = document.documentElement.innerHTML.match(/name:\s*'([^']+)'/);
    if (match && match[1]) fullName = match[1].trim();
  } catch(e) { console.error("خطا در گرفتن نام:", e); }
  let firstName = fullName ? fullName.split(' ')[0] : 'کاربر';

  // --- استایل کلی + تم پاییزی
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
      border-right: 3px solid #ffb347;
      animation: typing 3s steps(30,end) infinite alternate;
    }
    .progress-glow {
      background: linear-gradient(90deg, #ff7b00, #ffb347, #ffcc33);
      background-size: 300% 300%;
      animation: moveGlow 4s infinite linear;
    }
    @keyframes moveGlow {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    /* برگ‌ریزان پاییزی */
    .leaf {
      position: fixed;
      top: -10%;
      pointer-events: none;
      font-size: 20px;
      opacity: 0.95;
      color: #ff9933;
      animation: fall linear forwards;
      z-index: 10000 !important; /* جلوی همه‌چیز */
      text-shadow: 0 0 5px rgba(255,180,80,0.8);
    }
    @keyframes fall {
      0% { transform: translateY(0) rotate(0deg); opacity: 1; }
      100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
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
  o.style.background = 'linear-gradient(to bottom, rgba(50,20,0,0.8), rgba(0,0,0,0.85))';
  o.style.display = 'flex';
  o.style.flexDirection = 'column';
  o.style.justifyContent = 'center';
  o.style.alignItems = 'center';
  o.style.zIndex = '9998';
  o.style.color = 'white';
  o.style.fontSize = '22px';
  o.style.backdropFilter = 'blur(5px)';
  o.style.fontFamily = 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif';
  o.style.overflow = 'hidden';

  // --- لودینگ Glow
  const s = document.createElement('div');
  s.style.border = '6px solid rgba(255,255,255,0.2)';
  s.style.borderTop = '6px solid #ffb347';
  s.style.borderRadius = '50%';
  s.style.width = '70px';
  s.style.height = '70px';
  s.style.animation = 'spinPulse 1.5s linear infinite';
  s.style.boxShadow = '0 0 25px #ff7b00, 0 0 50px #ffcc33';
  o.appendChild(s);

  // --- متن تایپینگ
  const t = document.createElement('div');
  t.innerHTML = `<span class="typing">${firstName} عزیز، لطفاً صبر کنید...</span>`;
  t.style.marginTop = '25px';
  t.style.fontSize = '20px';
  t.style.fontWeight = '600';
  t.style.textShadow = '0 0 10px #ffb347';
  o.appendChild(t);

  // --- Progress Bar نئونی
  const progressContainer = document.createElement('div');
  progressContainer.style.marginTop = '30px';
  progressContainer.style.width = '320px';
  progressContainer.style.height = '22px';
  progressContainer.style.backgroundColor = 'rgba(255,255,255,0.15)';
  progressContainer.style.borderRadius = '15px';
  progressContainer.style.overflow = 'hidden';
  progressContainer.style.boxShadow = '0 0 15px rgba(255,150,0,0.7) inset';

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
  sig.textContent = '🍂 Powered By AminRafiAkrami 🍁';
  sig.style.position = 'fixed';
  sig.style.bottom = '30px';
  sig.style.left = '20px';
  sig.style.color = '#ffcc66';
  sig.style.textShadow = '0 0 10px #ff7b00, 0 0 20px #ffb347';
  sig.style.fontSize = '14px';
  sig.style.fontWeight = 'bold';
  o.appendChild(sig);

  document.body.appendChild(o);

  // --- برگ‌ریزان پاییزی (جلوتر از همه)
  const leafEmojis = ['🍁','🍂','🍃','🌰'];
  function createLeaf(){
    const leaf = document.createElement('div');
    leaf.classList.add('leaf');
    leaf.textContent = leafEmojis[Math.floor(Math.random()*leafEmojis.length)];
    leaf.style.left = Math.random()*100 + 'vw';
    leaf.style.animationDuration = (5 + Math.random()*5) + 's';
    leaf.style.fontSize = (16 + Math.random()*14) + 'px';
    leaf.style.zIndex = '10001';
    document.body.appendChild(leaf);
    setTimeout(()=>leaf.remove(), 10000);
  }
  setInterval(createLeaf, 400);

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
