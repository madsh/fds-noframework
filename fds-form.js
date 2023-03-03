customElements.define('fds-form',
  class extends HTMLElement {

    errors = [];

    get errors() {
      return this.getAttribute("errors");
    } 
  
    addError(fieldid, text) {
      console.log("adding error with id"+fieldid+":"+text);
      this.errors = [];         
      this.errors.push([fieldid,text]);

      console.log(this.errors);   
    }
  
    constructor() {
      super();      
      this.errors = [];

      //this.errors.push({'ex1' : 'fejl for 1'});
          

      const id = 'fds-form-id-'+this.getAttribute("id");
      const errorLabel = this.querySelector("label.error-alert-heading");
      if (errorLabel) {
        errorLabel.style.display = "none";
      }
      


      let form = document.createElement('form');
      form.setAttribute('id', id);
      form.setAttribute('action', '');
      form.setAttribute('onsubmit', 'return false;');
      form.className = 'wrapper';



      // if the form has validations errors. 

      if (this.errors.length > 0) {

      let alert = document.createElement('div');
      alert.className = 'alert alert-error mt-0 mb-8';
      alert.setAttribute('role', 'alert');
      alert.setAttribute('aria-atomic', 'true');

      let alertHeader = document.createElement('p');
      alertHeader.className = 'alert-heading';      
      alertHeader.innerText = errorLabel?.innerHTML ?? 'Du mangler en label med klassen..';

      alert.appendChild(alertHeader);
 
      let alertList = document.createElement('ul');
      alertList.className = 'alert-text nobullet-list';

      this.errors.forEach((err, i) => { 
         let item = document.createElement('li');
         const elements = Object.entries(err);
         item.innerHTML = `<a class='function-link' href='${elements[0][0]}'>${elements[0][1]}</a>`; // TODO: ask for help
         console.log(Object.entries(err));
         alertList.appendChild(item);
      });

      alert.appendChild(alertList);


      form.appendChild(alert);

      }
    

      // bring all elements inside wrapper

      let children = this.querySelectorAll('*');
      children.forEach((child) => {
        form.appendChild(child);
      });
      

      this.appendChild(form);
    }

   
  }
);
