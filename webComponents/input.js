class Input extends HTMLElement {
  constructor() {
    super() //必须首先调用super方法


    let shadow = this.attachShadow({ mode: 'open' })


    let input = document.createElement('input')
    input.setAttribute('class','input')
    input.setAttribute('placeholder', '请输入关键字搜索')



    //css
    const style = document.createElement('style')
    console.log(style.isConnected);
    style.textContent = `
      .input{
        outline:none;
        padding:2px 5px;
      }
    
    `


    shadow.appendChild(style);
    console.log(style.isConnected);

    shadow.appendChild(input)
  }


}


// Define the new element
customElements.define('my-input', Input);
