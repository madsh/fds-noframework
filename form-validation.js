function validateForm(elid) {
  let fdsForm = document.getElementById(elid);
  
  console.log("Starting validation of a form with id="+elid);

  fdsForm.addError('key'+Math.floor(Math.random() * 10),' This is wrong...');
  
  
}