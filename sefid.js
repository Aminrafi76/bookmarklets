javascript:(function () {
  function selectOption(selectId, targetText) {
    const select = document.getElementById(selectId);
    if (!select) return false;
    targetText = decodeURIComponent(targetText);
    for (let i = 0; i < select.options.length; i++) {
      if (select.options[i].text.trim() === targetText) {
        select.selectedIndex = i;
        select.dispatchEvent(new Event('change', { bubbles: true }));
        return true;
      }
    }
    return false;
  }

  function mainAction() {
    try {
      // حالت ۱: وجود گزینه karbarivazemojod
      if (document.getElementById('karbarivazemojod')) {
        const selected1 = selectOption('karbarivazemojod', 'بایر و مخروبه');
        if (selected1) {
          setTimeout(() => {
            selectOption('subnoekarbarivazemojod', 'اراضی فاقد کاربری');
            setTimeout(() => {
              const tdList = document.querySelectorAll('tr.text-center td');
              if (tdList.length >= 3) {
                const text = tdList[2].innerText.trim();
                const number = text.replace(/[^\d.]/g, '');
                const metr = document.getElementById('metr');
                if (metr) {
                  metr.value = number;
                  metr.dispatchEvent(new Event('input', { bubbles: true }));
                }
              }
              const btn = document.getElementById('KT_Insert9');
              if (btn) {
                setTimeout(() => btn.click(), 200);
              }
            }, 500);
          }, 500);
        }

      // حالت ۲: وجود گزینه noekarbari
      } else if (document.getElementById('noekarbari')) {
        const selected1 = selectOption('noekarbari', 'بایر و مخروبه');
        if (selected1) {
          setTimeout(() => {
            selectOption('subnoekarbari', 'اراضی فاقد کاربری');
            setTimeout(() => {
              const table = document.getElementById('melkTable');
              if (table) {
                const rows = table.querySelectorAll('tbody tr');
                if (rows.length > 0) {
                  const lastTd = rows[0].querySelectorAll('td:last-child');
                  if (lastTd.length > 0) {
                    const text2 = lastTd[0].innerText.trim();
                    const number2 = text2.replace(/[^\d.]/g, '');
                    const metr2 = document.getElementById('metr');
                    if (metr2) {
                      metr2.value = number2;
                      metr2.dispatchEvent(new Event('input', { bubbles: true }));
                    }
                  }
                }
              }
              const btn2 = document.getElementById('KT_Insert1');
              if (btn2) {
                setTimeout(() => btn2.click(), 200);
              }
            }, 500);
          }, 500);
        }
      }

    } catch (e) {
      console.error('Error:', e);
    }
  }

  mainAction();

  // آپلود عکس سفید به فیلدهای kroki و janamei
  setTimeout(() => {
    const c = document.createElement('canvas');
    c.width = 100;
    c.height = 100;
    const e = c.getContext('2d');
    e.fillStyle = '#ffffff';
    e.fillRect(0, 0, c.width, c.height);

    c.toBlob(function (b) {
      const f = new File([b], "white.png", { type: "image/png" });
      const d = new DataTransfer();
      d.items.add(f);
      const k = document.getElementById('kroki');
      if (k) {
        k.files = d.files;
        k.dispatchEvent(new Event('change', { bubbles: true }));
        const u = document.querySelector('#uniform-kroki');
        if (u) {
          const n = u.querySelector('.filename');
          if (n) n.textContent = 'white.png';
        }

        setTimeout(() => {
          c.toBlob(function (b2) {
            const f2 = new File([b2], "white.png", { type: "image/png" });
            const d2 = new DataTransfer();
            d2.items.add(f2);
            const j = document.getElementById('janamei');
            if (j) {
              j.files = d2.files;
              j.dispatchEvent(new Event('change', { bubbles: true }));
              const u2 = document.querySelector('#uniform-janamei');
              if (u2) {
                const n2 = u2.querySelector('.filename');
                if (n2) n2.textContent = 'white.png';
              }
            }
          }, 'image/png');
        }, 1500);
      }
    }, 'image/png');
  }, 1500);
})();
