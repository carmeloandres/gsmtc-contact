
const gsmtcContactSubmit = async (event) => {
    event.preventDefault();
    console.log('"contact-submit" pulsado');
  
    let inputs = Array.from(event.target.querySelectorAll("input"))
    let textareas = Array.from(event.target.querySelectorAll("textarea"));
    const headers = new Headers({
      'X-WP-Nonce': gsmtcContactApi.nonce
    });
    let dataForm = new FormData();
  
    inputs.forEach(input => {
        switch (input.name){
            case 'nombre':
                dataForm.append('nombre',input.value);
                break;
            case 'email':
                dataForm.append('email',input.value);

        }
      
      console.log (input.name,input.value);
    });
  
    textareas.forEach( textarea => {
        dataForm.append(textarea.name,textarea.value)
      console.log (textarea,textarea.value);
    })

    const respQuery = await fetch(gsmtcContactApi.restUrl,{
      method: 'POST',
      headers: headers,
      body: dataForm
    }); 

    if (respQuery.ok){
      let resultQuery = await respQuery.json();
      console.log(resultQuery);
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
    console.log('Script "gsmtc-contact" cargado');
    let gsmtcSubmit = document.getElementsByClassName("gsmtc-contact-form");
    let gsmtcNotice = document.getElementsByClassName("gsmtc-contact-notice");
    let gsmtcAccordeonButon = document.getElementsByClassName("gsmtc-contact-accordeon-button");
    let gsmtcAccordeonContent = document.getElementsByClassName("gsmtc-contact-accordeon-content");
    Array.prototype.forEach.call(gsmtcSubmit, (submit) => {
      submit.addEventListener('submit',gsmtcContactSubmit);
    });

    Array.prototype.forEach.call(gsmtcAccordeonButon, (button) => {
        button.addEventListener('click',gsmtcContactToggleAccordeon);
      });
      
    Array.prototype.forEach.call(gsmtcNotice, (notice) => {
        notice.style.display = 'none';
    });
      
    Array.prototype.forEach.call(gsmtcAccordeonContent, (accordeonContent) => {
        accordeonContent.style.display = 'none';
    });

    console.log(JSON.stringify(gsmtcContactApi));
    // submit.addEventListener('submit',gsmtcContactSubmitLocal);
  
});
  