
const gsmtcContactSubmit = async (event) => {
  event.preventDefault();
  
  let alerta = event.target.querySelector("#gsmtc-alerta");

    alerta.className = "gsmtc-contact-alerta-precaucion"
    alerta.innerHTML = "Enviando la información espere por favor"

    const headers = new Headers({
      'X-WP-Nonce': gsmtcContactApi.nonce
    });
    let dataForm = new FormData();

    let inputs = Array.from(event.target.querySelectorAll("input"))
    let textareas = Array.from(event.target.querySelectorAll("textarea"));
  
    inputs.forEach(input => {
        switch (input.name){
            case 'nombre':
                dataForm.append('nombre',input.value);
                break;
            case 'email':
                dataForm.append('email',input.value);
                break;
            case 'aceptacion':
                dataForm.append('aceptacion',input.value);
        }    
    });
  
    textareas.forEach( textarea => {
        dataForm.append(textarea.name,textarea.value)
//      console.log (textarea,textarea.value);
    })

    const respQuery = await fetch(gsmtcContactApi.restUrl,{
      method: 'POST',
      headers: headers,
      body: dataForm
    }); 

    if (respQuery.ok){
      let resultQuery = await respQuery.json();
      if (resultQuery > 0){
        alerta.className = "gsmtc-contact-alerta-exito"
        alerta.innerHTML = "La información se ha enviado con exito, GRACIAS !!!"
        setTimeout((alerta) => {
          alerta.className = "gsmtc-contact-alerta-apagada";
          alerta.innerHTML = "";
        },6000);
      } else {
        alerta.className = "gsmtc-contact-alerta-error"
        alerta.innerHTML = "Disculpe, la información no podido ser envida, intentelo de nuevo por favor"
      }
//      console.log(resultQuery);
    }  
  }

  const gsmtcContactToggleAccordeon = ( event ) => {
    let contenido = event.target.nextSibling;

    if (event.target.innerHTML.includes('ver')){
        event.target.innerHTML = event.target.innerHTML.replace('ver','ocultar');
        contenido.style.display='';
    }
    else{
        event.target.innerHTML = event.target.innerHTML.replace('ocultar','ver');
        contenido.style.display='none';
    }
  }

  window.addEventListener('load',() => {
//    console.log('Script "gsmtc-contact" cargado');
    let gsmtcSubmit = document.getElementsByClassName("gsmtc-contact-form");
    let gsmtcAccordeonButon = document.getElementsByClassName("gsmtc-contact-accordeon-button");
    let gsmtcAccordeonContent = document.getElementsByClassName("gsmtc-contact-accordeon-content");

    Array.prototype.forEach.call(gsmtcSubmit, (submit) => {
      submit.addEventListener('submit',gsmtcContactSubmit);
    });

    Array.prototype.forEach.call(gsmtcAccordeonButon, (button) => {
        button.addEventListener('click',gsmtcContactToggleAccordeon);
      });
            
    Array.prototype.forEach.call(gsmtcAccordeonContent, (accordeonContent) => {
        accordeonContent.style.display = 'none';
    });

  //  console.log(JSON.stringify(gsmtcContactApi));
    // submit.addEventListener('submit',gsmtcContactSubmitLocal);
  
});
  