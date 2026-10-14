/* Carrito Soda La Bomba, Pollos La Bomba y Papea. Un solo archivo: lo que se cambia aquí aplica a todos.
   Expone window.Carrito: fm, toast, copy, flash, sheet. */
(function(w){
  var d=document,tt,cfg=null,last=null;
  function mk(id,cls,role){var e=d.getElementById(id);if(!e){e=d.createElement('div');e.id=id;e.className=cls;if(role)e.setAttribute('role',role);e.hidden=true;d.body.appendChild(e)}return e}
  function fm(n){return '₡'+String(n).replace(/\B(?=(\d{3})+(?!\d))/g,'.')}
  function toast(m){var el=mk('toast','toast','status');el.textContent=m;el.hidden=false;clearTimeout(tt);tt=setTimeout(function(){el.hidden=true},2200)}
  function copy(txt,done){
    function fb(){var a=d.createElement('textarea');a.value=txt;d.body.appendChild(a);a.select();try{d.execCommand('copy');if(done)done()}catch(x){}d.body.removeChild(a)}
    if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(txt).then(function(){if(done)done()},function(){});else fb()}
  function flash(btn,doneText,backText){btn.textContent=doneText;setTimeout(function(){btn.textContent=backText},1800)}
  var sheet={
    /* c: {render():html, click(btn), restore(lastBtn):element, onClose()} */
    open:function(c,btn,fs){cfg=c;last=btn;var w=mk('shw','shw');w.hidden=false;d.body.classList.add('shopen');sheet.draw(fs||'.x')},
    draw:function(fs){if(!cfg)return;var s=mk('shw','shw');s.innerHTML=cfg.render();if(fs){var e=s.querySelector(fs);if(e)e.focus()}},
    close:function(){if(!cfg)return;var c=cfg,b=last,s=mk('shw','shw');cfg=null;s.hidden=true;s.innerHTML='';d.body.classList.remove('shopen');
      if(c.onClose)c.onClose();
      if(b&&d.body.contains(b))b.focus();else if(c.restore){var e=c.restore(b);if(e)e.focus()}},
    isOpen:function(){return !!cfg}
  };
  function boot(){
    var s=mk('shw','shw');mk('toast','toast','status');
    s.addEventListener('click',function(e){
      if(e.target===s){sheet.close();return}
      var b=e.target.closest('button');if(!b||!cfg)return;
      if(b.dataset.x){sheet.close();return}
      cfg.click(b)});
    d.addEventListener('keydown',function(e){if(!cfg)return;
      if(e.key==='Escape'){sheet.close();return}
      if(e.key==='Tab'){var f=[].slice.call(s.querySelectorAll('button')),i=f.indexOf(d.activeElement);
        if(e.shiftKey&&i<=0){e.preventDefault();f[f.length-1].focus()}else if(!e.shiftKey&&i===f.length-1){e.preventDefault();f[0].focus()}}});
  }
  if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',boot);else boot();
  w.Carrito={fm:fm,toast:toast,copy:copy,flash:flash,sheet:sheet,version:'1'};
})(window);
