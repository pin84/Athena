
const abc = ['a','b','c']

class CheckBox extends HTMLElement {
  constructor() {
    super() //必须首先调用super方法

    let shadow = this.attachShadow({ mode: 'open' })

    var input = document.createElement('input')
    input.setAttribute('id', 'checkbox')
    input.setAttribute('class', 'checkbox')
    input.setAttribute('type', 'checkbox')

    var label = document.createElement('label')
    label.setAttribute('for', 'checkbox')


    abc.forEach((item,index)=>{
      
    })


    //

    //css
    const style = document.createElement('style')
    console.log(style.isConnected);
    style.textContent = `
      .checkbox{
        display:none;
      }

      .checkbox+label{
        display:block;
        width:19px;
        height:19px;
        cursor:pointer;
        border:1px solid #ccc;
        border-radius:5px;
        transition:all 0.3s;
      }

       .checkbox+label:hover{
        border:1px solid #66CCFF;
       }
      .checkbox:checked+label::after{
        display: block;
        content: '\\2714';
        text-align: center;
        font-size: 14px;
        color: white;
        background:#66CCFF;
        border-radius:5px;
      }
    `

    shadow.appendChild(style);
    console.log(style.isConnected);

    shadow.appendChild(input)
    shadow.appendChild(label)
    
    shadow.appendChild(input)
    shadow.appendChild(label)
  }
}





// Define the new element
customElements.define('my-checkbox', CheckBox);
