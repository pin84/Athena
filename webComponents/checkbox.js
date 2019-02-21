class CheckBox extends HTMLElement {
  constructor() {
    super() //必须首先调用super方法

    let shadow = this.attachShadow({ mode: 'open' })

    let checkbox = document.createElement('input')
    checkbox.setAttribute('class','checkbox')
    checkbox.setAttribute('type','checkbox')


    //css
    const style = document.createElement('style')
    console.log(style.isConnected);
    style.textContent = `
      .checkbox{
        border:1px solid red;
      }
    
    `

    shadow.appendChild(style);
    console.log(style.isConnected);

    shadow.appendChild(checkbox)
  }
}


// Define the new element
customElements.define('my-checkbox', CheckBox);
