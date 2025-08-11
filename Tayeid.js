javascript:(function(){
  const d = ms => new Promise(r => setTimeout(r, ms));

  // --- پیدا کردن نام از کد صفحه ---
  let fullName = '';
  try {
    // جستجو در کل کد HTML برای name: '...'
    const match = document.documentElement.innerHTML.match(/name:\s*'([^']+)'/);
    if (match && match[1]) {
      fullName = match[1].trim();
    }
  } catch(e) {
    console.error("خطا در گرفتن نام:", e);
  }

  // گرفتن اسم کوچک (اولین کلمه)
  let firstName = fullName ? fullName.split(' ')[0] : 'کاربر';

  const o = document.createElement('div');
  o.style.position = 'fixed';
  o.style.top = '0';
  o.style.left = '0';
  o.style.width = '100%';
  o.style.height = '100%';
  o.style.backgroundColor = 'rgba(0,0,0,0.7)';
  o.style.display = 'flex';
  o.style.flexDirection = 'column';
  o.style.justifyContent = 'center';
  o.style.alignItems = 'center';
  o.style.zIndex = '9999';
  o.style.color = 'white';
  o.style.fontSize = '22px';
  o.style.backdropFilter = 'blur(3px)';
  o.style.fontFamily = 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif';

  const s = document.createElement('div');
  s.style.border = '6px solid rgba(255,255,255,0.3)';
  s.style.borderRadius = '50%';
  s.style.borderTop = '6px solid #00ffcc';
  s.style.width = '60px';
  s.style.height = '60px';
  s.style.animation = 'spin 1.2s linear infinite';
  o.appendChild(s);

  const st = document.createElement('style');
  st.textContent = '@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}';
  document.head.appendChild(st);

  const t = document.createElement('div');
  t.textContent = `${firstName} عزیز، لطفاً صبر کنید...`;
  t.style.marginTop = '20px';
  o.appendChild(t);

  const progressContainer = document.createElement('div');
  progressContainer.style.marginTop = '25px';
  progressContainer.style.width = '300px';
  progressContainer.style.height = '20px';
  progressContainer.style.backgroundColor = 'rgba(255,255,255,0.2)';
  progressContainer.style.borderRadius = '10px';
  progressContainer.style.overflow = 'hidden';
  progressContainer.style.boxShadow = '0 0 10px rgba(0,255,204,0.5) inset';

  const progressBar = document.createElement('div');
  progressBar.style.width = '0%';
  progressBar.style.height = '100%';
  progressBar.style.backgroundColor = '#00ffcc';
  progressBar.style.borderRadius = '10px 0 0 10px';
  progressBar.style.transition = 'width 0.3s ease';

  progressContainer.appendChild(progressBar);
  o.appendChild(progressContainer);

  const sig = document.createElement('div');
  sig.textContent = 'Create By AminRafiAkrami';
  sig.style.position = 'fixed';
  sig.style.bottom = '40px';
  sig.style.left = '10px';
  sig.style.color = 'black';
  sig.style.backgroundColor = 'rgba(255,255,255,0.7)';
  sig.style.padding = '3px 7px';
  sig.style.borderRadius = '4px';
  sig.style.fontSize = '12px';
  sig.style.zIndex = '10000';
  sig.style.fontWeight = '600';

  document.body.appendChild(o);
  document.body.appendChild(sig);

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
        sig.remove();
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
          const res = await fetch('/vbms/plugins/member/moteghazi_peivastlist.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
              'X-Requested-With': 'XMLHttpRequest'
            },
            body: p.toString(),
            credentials: 'same-origin'
          });
          if (!res.ok) {
            console.error('خطا در تایید مدرک:', id);
          } else {
            console.log('تایید شد:', id);
          }
        } catch (e) {
          console.error('خطا در درخواست برای مدرک:', id, e);
        }
        done++;
        const percent = Math.round((done / total) * 100);
        progressBar.style.width = percent + '%';
        t.textContent = `${firstName} عزیز، لطفاً صبر کنید... ${percent}%`;
        await d(50);
      }
      location.reload();
    } catch (err) {
      console.error('خطا در اجرای اسکریپت:', err);
      o.remove();
      sig.remove();
    }
  }
  a();
})();
