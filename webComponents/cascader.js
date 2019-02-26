/**
 * 级联选择
 */
class Cascader extends HTMLElement {
  constructor() {
    super() //必须首先调用super方法
    let shadow = this.attachShadow({ mode: 'open' })

    // let input  = document.createElement('input')
    // input.setAttribute('id','box')
    // input.setAttribute('placeholder','aaa')

    let input = document.createElement('input')
    input.setAttribute('id','box')
    input.setAttribute('placeholder', 'Please select')

   


    //css
    const style = document.createElement('style')
    console.log(style.isConnected);
    style.textContent = `
      #box{
        width:250px;
        height:20px;
      }
      .search:hover{
        cursor:pointer;
        color:#FF6666;
      }
    
    `


    shadow.appendChild(style);
    console.log(style.isConnected);

    shadow.appendChild(input)
  }


}


// Define the new element
customElements.define('my-cascader', Cascader);
