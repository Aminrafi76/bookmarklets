javascript:(function(){
  try {
    // تبدیل تاریخ میلادی به شمسی
    function toShamsi(gy, gm, gd) {
      var g_d_m = [0,31,59,90,120,151,181,212,243,273,304,334];
      var gy2 = (gm > 2) ? 1 : 0;
      var days = 355666 + (365 * gy) + parseInt((gy + gy2) / 4) - parseInt((gy + gy2) / 100) + parseInt((gy + gy2) / 400) + gd + g_d_m[gm - 1];
      var jy = -1595 + (33 * parseInt(days / 12053));
      days %= 12053;
      jy += 4 * parseInt(days / 1461);
      days %= 1461;
      if (days > 365) {
        jy += parseInt((days - 1) / 365);
        days = (days - 1) % 365;
      }
      var jm = (days < 186) ? 1 + parseInt(days / 31) : 7 + parseInt((days - 186) / 30);
      var jd = 1 + ((days < 186) ? days % 31 : (days - 186) % 30);
      return [jy, jm, jd];
    }

    function pad(n) {
      return n < 10 ? '0' + n : n;
    }

    // مقداردهی به فیلد تاریخ
    var d = new Date();
    var sh = toShamsi(d.getFullYear(), d.getMonth() + 1, d.getDate());
    var shamsiDate = sh[0] + '/' + pad(sh[1]) + '/' + pad(sh[2]);

    var visitdateEl = document.getElementById('visitdate');
    if (visitdateEl) {
      visitdateEl.value = shamsiDate;
    }

    // مقداردهی به فیلد توضیحات
    var text = decodeURIComponent(
      'با توجه به بررسی‌های انجام‌شده، علی‌رغم اطلاع‌رسانی‌ لازم، متقاضی تاکنون نسبت به اصلاح نواقص مدارک خود هیچ‌گونه اقدام مؤثری انجام نداده و پیگیری لازم از سوی ایشان صورت نگرفته است. بنابراین، با عنایت به عدم همکاری و عدم پیگیری متقاضی در مهلت مقرر، ارائه هرگونه پاسخ یا اقدام اداری در این مرحله فاقد وجاهت است. ضمناً مستندات ارائه‌شده فاقد اعتبار لازم برای رسیدگی می‌باشند و صرفاً شامل تصاویر و توضیحات ناقص یا بدون مستند است که قابلیت استناد و بررسی حقوقی یا فنی را ندارند.'
    );

    if (window.CKEDITOR) {
      var editor = CKEDITOR.instances['tozihat'];
      if (editor) {
        editor.setData(text);
      } else {
        var tozihatEl = document.getElementById('tozihat');
        if (tozihatEl) {
          tozihatEl.value = text;
        }
      }
    } else {
      var tozihatEl = document.getElementById('tozihat');
      if (tozihatEl) {
        tozihatEl.value = text;
      }
    }

    // انتخاب گزینه "فاقد بنا" از select
    var sel = document.getElementById('hododstatus');
    if (sel) {
      for (var i = 0; i < sel.options.length; i++) {
        if (sel.options[i].text.includes('فاقد بنا')) {
          sel.selectedIndex = i;
          break;
        }
      }
    }

    // کلیک روی دکمه
    var btn = document.getElementById('kt_insert2');
    if (btn) {
      btn.click();
    }

  } catch (e) {
    console.error(e);
  }
})();
