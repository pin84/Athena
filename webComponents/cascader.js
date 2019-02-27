/**
 * 级联选择
 */
let data = {
  'aaa': [{ 'a1': ['a11', 'a22'] }, { 'a2': ['a33', 'a44'] }],
  'bbb': ['b1', 'b2'],
  'c': 1
}

class Cascader extends HTMLElement {
  constructor() {
    super() //必须首先调用super方法
    let shadow = this.attachShadow({ mode: 'open' })

    let input = document.createElement('input')
    input.setAttribute('id', 'input-box')
    input.setAttribute('placeholder', 'Please select')

    //css
    const style = document.createElement('style')
    console.log(style.isConnected);
    style.textContent = `
         #input-box{
           width:300px;
           box-sizing: border-box;
           display: inline-block;
           height: 32px;
           padding: 4px 11px;
           border: 1px solid #ccc;
           border-radius:4px;
           outline:none;
         }
         #input-box:hover{
           border:1px solid #1890ff;
           cursor:pointer;
         }
         #input-box:focus{
           border-color:#40a9ff;
           box-shadow:0 0 0 2px rgba(24,144,255,0.2);
         }
       
       `
    shadow.appendChild(style);
    console.log(style.isConnected);

    shadow.appendChild(input)

    this.addListItem = this.addListItem.bind(this)

    this.showSelect = true
  }

  addListItem(e) {
    // console.log(Object.values(data))



    if (this.showSelect) {
      let fragment = document.createElement('div')
      let innerHTML = `
        <ul>
        ${Object.keys(data).map(item => `
          <li class='selectItem' >${item}</li>
        `).join('')}
        </ul>
        `
      fragment.innerHTML = innerHTML
      this.shadowRoot.appendChild(fragment)



      this.showSelect = false
    } else {

      this.showSelect = true
    }


    
    // this.abc()

  }


  handleData(data){

  }


  abc(){
    let allLi = this.shadowRoot.querySelectorAll('.selectItem')
    allLi.forEach(item => {
      item.addEventListener('click',()=>{
        console.log(item.innerText);
        
      })
    })
    
    
  }

  connectedCallback() {
    let inputBox = this.shadowRoot.querySelector('#input-box')
    inputBox.addEventListener('click', this.addListItem, false)
    
  }

  attributeChangedCallback() {
    console.log('attributeChangedCallback');
  }

  adoptedCallback() {
    console.log('adoptedCallback');
  }
  disconnectedCallback() {
    console.log('disconnectedCallback');
  }

}

// Define the new element
customElements.define('my-cascader', Cascader);


