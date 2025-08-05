javascript:(function(){
  const directions = [
    {code:'شمال', name:'شمال', showSignature:true},
    {code:'شرق', name:'شرق', showSignature:false},
    {code:'جنوب', name:'جنوب', showSignature:false},
    {code:'غرب', name:'غرب', showSignature:false}
  ];

  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.7);display:flex;justify-content:center;align-items:center;z-index:9999;font-family:Tahoma,Arial,sans-serif;';

  const container = document.createElement('div');
  container.style.cssText = 'background:white;padding:25px;border-radius:8px;box-shadow:0 5px 15px rgba(0,0,0,0.3);width:350px;max-width:90%;animation:fadeIn 0.3s;';

  const styleElem = document.createElement('style');
  styleElem.textContent = `
    @keyframes fadeIn {
      from {opacity:0; transform:translateY(-20px);}
      to {opacity:1; transform:translateY(0);}
    }
    .input-container {margin-bottom:20px;}
    label {display:block; margin-bottom:8px; font-weight:bold; color:#333;}
    input {
      width:100%; padding:10px; border:1px solid #ddd; border-radius:4px;
      font-size:16px; box-sizing:border-box;
    }
    input:focus {
      border-color:#4CAF50; outline:none;
      box-shadow:0 0 5px rgba(76,175,80,0.5);
    }
    .buttons {
      display:flex; justify-content:space-between; margin-top:20px;
    }
    button {
      padding:10px 15px; border:none; border-radius:4px;
      cursor:pointer; font-size:14px; transition:all 0.3s;
    }
    .submit-btn {
      background:#4CAF50; color:white;
    }
    .submit-btn:hover {
      background:#45a049;
    }
    .cancel-btn {
      background:#f44336; color:white;
    }
    .cancel-btn:hover {
      background:#d32f2f;
    }
    .error {
      color:#f44336; font-size:13px; margin-top:5px; display:none;
    }
    .signature {
      margin-top:15px; font-size:12px; color:#777;
      text-align:center; border-top:1px dashed #ddd; padding-top:10px;
    }
  `;
  document.head.appendChild(styleElem);

  let currentIndex = 0;
  const values = [];

  function showStep(index) {
    if (index >= directions.length) {
      // ذخیره مقادیر در localStorage
      localStorage.setItem('directionsQueue', JSON.stringify(values));
      localStorage.setItem('currentIndex', '0');

      const link = [...document.querySelectorAll('a')].find(a => a.textContent.trim() === 'ثبت حدود ملک');
      if (link) {
        link.click();
      } else {
        alert("✖ لینک 'ثبت حدود ملک' پیدا نشد.");
      }
      overlay.remove();
      return;
    }

    const dir = directions[index];
    container.innerHTML = '';

    const header = document.createElement('h3');
    header.textContent = `محدوده ${dir.name}`;
    header.style.cssText = 'margin-top:0; color:#333; text-align:center;';
    container.appendChild(header);

    const inputContainer = document.createElement('div');
    inputContainer.className = 'input-container';

    const label = document.createElement('label');
    label.textContent = `مقدار ${dir.name} را وارد کنید:`;
    inputContainer.appendChild(label);

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'مثال: 10 یا 5+3+2';
    inputContainer.appendChild(input);

    const errorDiv = document.createElement('div');
    errorDiv.className = 'error';
    errorDiv.textContent = 'لطفاً یک عدد معتبر وارد کنید';
    inputContainer.appendChild(errorDiv);

    container.appendChild(inputContainer);

    if (dir.showSignature) {
      const signature = document.createElement('div');
      signature.className = 'signature';
      signature.textContent = 'Create By AminRafi';
      container.appendChild(signature);
    }

    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'buttons';

    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'cancel-btn';
    cancelBtn.textContent = 'انصراف';
    cancelBtn.onclick = () => {
      overlay.remove();
      alert('✖ عملیات لغو شد.');
    };
    buttonsDiv.appendChild(cancelBtn);

    const submitBtn = document.createElement('button');
    submitBtn.className = 'submit-btn';
    submitBtn.textContent = (index < directions.length - 1) ? 'بعدی' : 'اتمام';
    buttonsDiv.appendChild(submitBtn);

    function submitHandler() {
      const val = input.value.trim();
      if (!val) {
        errorDiv.style.display = 'block';
        input.focus();
        return;
      }

      let sumValue;
      if (val.includes('+')) {
        const parts = val.split('+').map(x => parseFloat(x.trim()));
        if (parts.some(isNaN)) {
          errorDiv.style.display = 'block';
          input.focus();
          return;
        }
        sumValue = parts.reduce((a,b) => a + b, 0);
      } else {
        sumValue = parseFloat(val);
        if (isNaN(sumValue)) {
          errorDiv.style.display = 'block';
          input.focus();
          return;
        }
      }

      errorDiv.style.display = 'none';
      values.push({label: dir.code, value: sumValue});
      showStep(index + 1);
    }

    submitBtn.onclick = submitHandler;
    input.onkeydown = e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        submitHandler();
      }
    };

    container.appendChild(buttonsDiv);
    overlay.appendChild(container);
    document.body.appendChild(overlay);

    // تلاش برای فوکوس و انتخاب متن ورودی
    let attempts = 0;
    const focusInterval = setInterval(() => {
      if (document.activeElement === input || attempts > 10) {
        clearInterval(focusInterval);
        return;
      }
      input.focus();
      input.select();
      attempts++;
    }, 100);
  }

  showStep(0);
})();
