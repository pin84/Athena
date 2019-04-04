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
        ul,li{
          list-style:none;
        }
        *{
          margin:0;
          padding:0;
        }
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
         .list{
           display:inline-block;
           border:1px dotted #ccc;
           user-select:none;
         }
         .list .selectItem{
           padding:3px 5px;
         }
         .list .selectItem:hover{
           background:#f5f5f5;
         }
       
       `
    shadow.appendChild(style);
    console.log(style.isConnected);

    shadow.appendChild(input)

    this.addListItem = this.addListItem.bind(this)
    this.scale = 1
  }

  addListItem(e) {
    // console.log(Object.values(data))
    let ul = this.shadowRoot.querySelector('.list')

    if (ul) {
      this.isShowList(ul)
      return
    }
    let div = document.createElement('div')
    let innerHTML = `
          <ul class='list'>
          ${Object.keys(data).map(item => `
            <li class='selectItem' >${item}</li>
          `).join('')}
          </ul>
          `

    div.innerHTML = innerHTML
    this.shadowRoot.appendChild(div)


    const a = function (data) {
      data.map(item =>{
        
      }) 
    }
  }

  isShowList(ele) {
    ele.style.transform = `scale(${this.scale === 1 ? this.scale = 0 : this.scale = 1})`
  }


  handleData(data) {

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


