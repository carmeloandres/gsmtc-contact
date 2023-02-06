const gsmtcContactSubmit = (event) => {
  event.preventDefault();
  console.log('"contact-submit" pulsado');

  let inputs = Array.from(event.target.querySelectorAll("input"))
  let textareas = Array.from(event.target.querySelectorAll("textarea"));
  let dataForm = new FormData();

  inputs.forEach(input => {
    
          dataForm.append(input.name,input.value);
    console.log (input.name,' - ' ,input.value);
  });

  textareas.forEach( textarea => {
      dataForm.append(textarea.name,textarea.value)
    console.log (textarea,textarea.value);
  })

}

window.addEventListener('load',() => {
  console.log('Script "contact-submit" cargado');
  let gsmtcSubmit = document.getElementsByClassName("gsmtc-contact-form");
  Array.prototype.forEach.call(gsmtcSubmit, (submit) => {
    submit.addEventListener('submit',gsmtcContactSubmit);
  });
    
 // submit.addEventListener('submit',gsmtcContactSubmitLocal);

  });
