class Button extends HTMLElement {
  constructor() {
    super() //必须首先调用super方法


    let shadow = this.attachShadow({ mode: 'open' })


    let button = document.createElement('button')
    button.setAttribute('class','search')

    button.innerText = 'search'


    //css
    const style = document.createElement('style')
    console.log(style.isConnected);
    style.textContent = `
      .search{
        padding:4px;
        border:none;
        color:#fff;
        background:#000
      }
      .search:hover{
        cursor:pointer;
        color:#FF6666;
      }
    
    `


    shadow.appendChild(style);
    console.log(style.isConnected);

    shadow.appendChild(button)
  }


}


// Define the new element
customElements.define('my-button', Button);
