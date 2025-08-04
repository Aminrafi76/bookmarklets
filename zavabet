javascript:(function(){
  function x(t){
    var d=document.createElement('div');
    d.style.position='fixed';
    d.style.bottom='40px';
    d.style.left='100px';
    d.style.color='#000';
    d.style.fontSize='13px';
    d.style.fontFamily='Tahoma,sans-serif';
    d.style.opacity='1';
    d.style.transition='opacity 1s ease';
    d.style.zIndex=9999;
    d.textContent=t;
    document.body.appendChild(d);
    setTimeout(function(){
      d.style.opacity='0';
      setTimeout(function(){document.body.removeChild(d);},1000);
    },2000);
  }

  var s=document.getElementById('mogheiatmelk');
  if(s){
    for(var i=0; i<s.options.length; i++){
      if(s.options[i].text.trim() === 'مرکز'){
        s.selectedIndex=i;
        s.dispatchEvent(new Event('change',{bubbles:true}));
        break;
      }
    }
  }

  function y(i,v,c){
    var e=document.getElementById(i);
    if(!e) return c && c();
    e.value=v;
    e.dispatchEvent(new Event('input',{bubbles:true}));
    e.dispatchEvent(new Event('change',{bubbles:true}));
    if(c) setTimeout(c,2);
  }

  var z=document.querySelectorAll('td'), a=0;
  for(var j=0; j<z.length; j++){
    if(z[j].textContent.trim() === 'مسکونی - مسکونی'){
      var n=z[j+1];
      if(n){
        var p=parseFloat(n.textContent.trim());
        if(!isNaN(p)) a=p;
      }
      break;
    }
  }

  var t=60;
  if(a >= 201 && a < 301) t=50;
  else if(a >= 300 && a < 501) t=40;
  else if(a >= 500 && a <= 601) t=30;
  else if(a > 600) t=25;

  y('maxaghab','0', function(){
    y('maxtabaghe','2', function(){
      y('maxtarakom', String(t), function(){
        y('maxheight','9', function(){
          y('maxvahed','1', function(){
            y('kaf','0', function(){
              y('height_floors','3', function(){
                y('parking','0', function(){
                  x('Create By AminRafiAkrami');
                });
              });
            });
          });
        });
      });
    });
  });
})();
