/* ============================================================
   FORMAT-LOGO — dezentes Host-Broadcast-Logo
   Ein kleines, klares Format-Badge, das nicht in die Spielflaeche
   ragt. Bestehende, ausgearbeitete Formatlogos bleiben unveraendert.
   ============================================================ */
(function(){
  'use strict';

  var CONFIG = {
    chatduell:  { name:'CHATDUELL',       icon:'chat'  },
    higherlower:{ name:'HIGHER OR LOWER', icon:'higher'},
    emoji:      { name:'EMOJI-RÄTSEL',    icon:'emoji' },
    weristdas:  { name:'WER IST DAS?',    icon:'person'},
    hotzone:    { name:'HOTZONE',         icon:'hot'   },
    imposter:   { name:'IMPOSTER',        icon:'mask'  },
    morph:      { name:'MORPH',            icon:'morph' },
    quizduell:  { name:'QUIZ DUELL',       icon:'quiz' },
    'bluff-quiz':{ name:'BLUFF-QUIZ',      icon:'bluff' },
    millionaer: { name:'WWM',              icon:'quiz' },
    blackstories:{ name:'BLACK STORIES',   icon:'web' },
    ausreden:   { name:'AUSREDENKÖNIG',    icon:'crown' }
  };

  function keyFromPath(){
    var p = location.pathname.toLowerCase().replace(/\\/g,'/');
    var m = p.match(/\/([^/]+)\/host\.html$/);
    if(m) return m[1];
    if(/\/quizduell\/index\.html$/.test(p)) return 'quizduell';
    return '';
  }

  function iconSvg(kind){
    var common = 'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"';
    var body = '';
    if(kind === 'higher'){
      body = '<path d="M7 17V5"/><path d="m4 8 3-3 3 3"/><path d="M17 7v12"/><path d="m14 16 3 3 3-3"/>';
    } else if(kind === 'hot'){
      body = '<path d="M12 21c4.2 0 7-2.6 7-6.3 0-3.2-1.9-5.4-4.5-7.7.1 2.4-1 3.9-2.4 4.7.1-3.2-1.3-6-4.3-8.7.3 4.2-2.3 6.2-2.3 9.8C5.5 17.8 8.3 21 12 21Z"/>';
    } else if(kind === 'emoji'){
      body = '<circle cx="12" cy="12" r="8.5"/><path d="M8.5 10h.01M15.5 10h.01"/><path d="M8.5 14c1.1 1.5 2.2 2.2 3.5 2.2s2.4-.7 3.5-2.2"/>';
    } else if(kind === 'person'){
      body = '<circle cx="12" cy="8" r="3.2"/><path d="M5.5 19c.8-3.3 3-5 6.5-5s5.7 1.7 6.5 5"/><path d="M5 5.5 3.5 4M19 5.5 20.5 4"/>';
    } else if(kind === 'mask'){
      body = '<path d="M5 6.5c2.1-1.4 4.4-2.1 7-2.1s4.9.7 7 2.1v5.2c0 4-2.8 6.8-7 8.4-4.2-1.6-7-4.4-7-8.4V6.5Z"/><path d="M8 10.5c1.1-.7 2.4-1 4-1s2.9.3 4 1"/><path d="M9 14h.01M15 14h.01"/>';
    } else if(kind === 'morph'){
      body = '<path d="M5 6h14M5 12h10M5 18h14"/><path d="M17 9v6M14 12h6"/>';
    } else if(kind === 'chat'){
      body = '<path d="M5 6.5h14v9H9l-4 3v-12Z"/><path d="M8 10h8M8 13h5"/>';
    } else if(kind === 'quiz'){
      body = '<path d="M8.5 4.5h7l4 4v11H8.5A2.5 2.5 0 0 1 6 17V7a2.5 2.5 0 0 1 2.5-2.5Z"/><path d="M15 4.5V9h4.5"/><path d="m9.5 13 1.8 1.8 3.8-4"/>';
    } else {
      body = '<circle cx="12" cy="12" r="8.5"/>';
    }
    return '<svg '+common+'>'+body+'</svg>';
  }

  function add(){
    var key = keyFromPath();
    var cfg = CONFIG[key];
    if(!cfg || document.querySelector('.ka-format-logo')) return;

    // Quiz Duell hat eine gemeinsame index.html fuer Host, Spielleiter und Buzzer.
    // Das Host-Logo erscheint dort erst, sobald wirklich die Host-Ansicht aktiv ist.
    if(key === 'quizduell'){
      var hostView = document.getElementById('hostView');
      if(hostView && hostView.classList.contains('hidden')){
        var mo = new MutationObserver(function(){
          if(!hostView.classList.contains('hidden')){
            mo.disconnect();
            add();
          }
        });
        mo.observe(hostView,{attributes:true,attributeFilter:['class']});
        return;
      }
    }

    var style = document.createElement('style');
    style.textContent = [
      '.ka-format-logo{',
        'position:fixed;left:68px;top:14px;z-index:500;pointer-events:none;',
        'display:flex;align-items:center;gap:8px;height:32px;padding:0 11px 0 8px;',
        'border:1px solid rgba(255,255,255,.12);border-radius:9px;',
        'background:rgba(10,14,26,.78);color:#eef1f8;',
        'box-shadow:0 8px 24px -14px rgba(0,0,0,.95);',
        'backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);',
      '}',
      '.ka-format-logo .mark{',
        'width:20px;height:20px;display:grid;place-items:center;',
        'border:1px solid rgba(255,255,255,.14);border-radius:6px;',
        'color:rgba(255,255,255,.9);background:rgba(255,255,255,.035);',
      '}',
      '.ka-format-logo svg{width:14px;height:14px;}',
      '.ka-format-logo .name{',
        'font:800 10px/1 Inter,system-ui,sans-serif;letter-spacing:1.35px;',
        'white-space:nowrap;color:rgba(238,241,248,.9);',
      '}',
      '@media (max-width:700px){',
        '.ka-format-logo{left:60px;top:10px;height:28px;padding-right:9px;}',
        '.ka-format-logo .name{font-size:9px;letter-spacing:1px;}',
        '.ka-format-logo .mark{width:18px;height:18px;}',
      '}',
      '.ka-format-logo.ka-format-logo-higherlower{left:auto;right:330px;transform:none;}',
      '.ka-format-logo-millionaer{top:96px;}',
      '.ka-format-logo-blackstories{top:70px;}',
      '@media (max-width:1100px){',
        '.ka-format-logo.ka-format-logo-higherlower{right:230px;}',
      '}'
    ].join('');
    document.head.appendChild(style);

    var el = document.createElement('div');
    el.className = 'ka-format-logo ka-format-logo-'+key;
    el.innerHTML = '<span class="mark">'+iconSvg(cfg.icon)+'</span><span class="name">'+cfg.name+'</span>';
    document.body.appendChild(el);
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', add);
  else add();
})();
