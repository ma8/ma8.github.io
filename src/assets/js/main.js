//import './utils.js';


var cMore = function (e) {
      // var classes = e.target.className.split(/\s/);
      // console.log(classes);
      var currentTarget = e.length ? e : e.target;
      var bar = currentTarget.closest('.bar');
      var more = currentTarget.closest('body').querySelector('.more__wrap');
      var morelist = currentTarget.closest('body').querySelector('.more__list');
      var btn_open = currentTarget.closest('body').querySelector('.more-grid');
      var btn_close = currentTarget.closest('body').querySelector('.more-plus');

      // console.log(morelist);
      if(more.classList.contains('more__close')){
        btn_open.style.display = 'none';
        btn_close.style.display = 'block';
        more.classList.remove('more__close');
        more.classList.add('more__open');
        bar.classList.add('bar--open');
        morelist.classList.remove('more__list--hide');
        morelist.classList.add('more__list--show');
      }else{
        btn_open.style.display = 'block';
        btn_close.style.display = 'none';
        more.classList.remove('more__open');
        more.classList.add('more__close');
        morelist.classList.remove('more__list--show');
        morelist.classList.add('more__list--hide');
        bar.classList.remove('bar--open');
      }
}

function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

function getCookie(name) {
  return document.cookie.split('; ').find(row => row.startsWith(name + '='))?.split('=')[1];
}


  
document.addEventListener("DOMContentLoaded", () => {

    console.log("Hola, mot: !!!");

    /* topbar desplegable més webs */
    var topbar = document.querySelector('.bar');
    if (topbar) {
      var btn = document.querySelectorAll('.more__btn');
      /* hi ha 2 botons: obrir i tancar */
      btn.forEach(function(elm,index){
      elm.addEventListener("click",cMore);

      });
    }


    /* accordions */
    // const accordions = document.querySelectorAll(".accordion input[type='checkbox']");
    // accordions.forEach((accordion) => {
    // accordion.addEventListener("change", function () {
    //     if (!this.checked) {
    //       // Guardar la posición de desplazamiento antes de cerrar el acordeón
    //       const scrollPosition = window.scrollY;

    //       // Esperar a que el acordeón colapse completamente y restaurar la posición
    //       setTimeout(() => {
    //         window.scrollTo({
    //           top: scrollPosition,
    //           behavior: "auto",
    //         });
    //       }, 0);
    //     }
    //   });
    // });

    const banner = document.getElementById("cookie-banner");
    const modal = document.getElementById("cookie-modal");

    const acceptBtn = document.getElementById("cookie-accept");
    const rejectBtn = document.getElementById("cookie-reject");
    const configBtn = document.getElementById("cookie-configure");
    const openSettings = document.getElementById("open-cookie-settings");
    const saveBtn = document.getElementById("cookie-save");
    const cancelBtn = document.getElementById("cookie-cancel");
    const analyticsCheckbox = document.getElementById("analytics-cookies");


    // Mostrar el banner si no hi ha consentiment
    if (!localStorage.getItem("cookieConsent")) {
      banner.classList.add('active');
    }

    acceptBtn.onclick = () => {
      localStorage.setItem("cookieConsent", "accepted");
      setCookie('cookieConsent', 'true', 180); // 180 dies

      loadGTM(); // carrega GTM si cal
      banner.style.display = "none";
    };

    rejectBtn.onclick = () => {
      localStorage.setItem("cookieConsent", "rejected");
      setCookie('cookieConsent', 'false', 180);
      banner.style.display = "none";
      removeGTM();
    };

    configBtn.onclick = () => {
      modal.style.display = "block";
    };

    cancelBtn.onclick = () => {
      modal.style.display = "none";
    };

    saveBtn.onclick = () => {
      const analytics = document.getElementById("analytics-cookies").checked;
      localStorage.setItem("cookieConsent", analytics ? "accepted" : "rejected");
      setCookie('cookieConsent', analytics, 180);

      if (analytics){ 
         loadGTM();
       }else{
        removeGTM();
       }

      modal.style.display = "none";
      banner.style.display = "none";
    };

    openSettings.onclick = () => {
      modal.style.display = "block";
      console.log('btn-settings');
    };

    function loadGTM() {
      // Exemple: carrega Google Tag Manager només si hi ha consentiment
      analyticsCheckbox.checked = true;
      if (!document.getElementById("gtm-script")) {

          var gtmId="GTM-NFW674FN";
          // Afegeix el <script> al <head>
          const script = document.createElement("script");
          script.id = "gtm-script";
          script.innerHTML = `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `;
          document.head.appendChild(script);

          // Afegeix el <noscript> al <body> NOTA: funciona sempre  ( amn JS desactivat)
          // const noscript = document.createElement("noscript");
          // noscript.innerHTML = `
          //   <iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}"
          //   height="0" width="0" style="display:none;visibility:hidden"></iframe>
          // `;
          // document.body.appendChild(noscript);
      }
    }
    function removeGTM() {
      analyticsCheckbox.checked = false;

      const gtmAsync = document.querySelectorAll('script[src*="googletagmanager.com/gtm.js"]');
      gtmAsync.forEach(script => script.remove());

      // Elimina el <script> amb id="gtm-script"
      const gtmScript = document.getElementById("gtm-script");
      console.log(gtmScript);
      if (gtmScript) gtmScript.remove();

      // Elimina l’iframe de <noscript> si s’ha afegit per JS no funciona
      // perquè el navegador ignora el contingut de <noscript> si JavaScript està habilitat
      // const iframes = document.querySelectorAll('iframe[src*="googletagmanager.com/ns.html"]');
      // iframes.forEach(iframe => iframe.parentElement?.remove());

      // Buida el dataLayer si s'ha carregat
      if (window.dataLayer) {
        window.dataLayer.length = 0;
        delete window.dataLayer;
      }

      // Opcional: eliminar cookies creades per GTM
      // (no totes són eliminables per JS, però pots provar amb noms comuns)
      document.cookie = "_ga=; Max-Age=0; path=/";
      document.cookie = "_gid=; Max-Age=0; path=/";
    }

    /* carregar gtm if accepted */
    if (localStorage.getItem("cookieConsent") === "accepted") {
      loadGTM();
    }
   
    if(getCookie('cookieConsent')){ 
    //console.log('load cookie GTM');
    }


});
