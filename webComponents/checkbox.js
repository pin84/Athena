
const items = ['aaa', 'bbb', 'ccc']

class CheckBox extends HTMLElement {
  constructor() {
    super() //必须首先调用super方法

    let shadow = this.attachShadow({ mode: 'open' })

    //top
    let selectAll = document.createElement('input')
    selectAll.setAttribute('id', 'checkbox')
    selectAll.setAttribute('class', 'checkbox')
    selectAll.setAttribute('type', 'checkbox')

    let label = document.createElement('label')
    label.setAttribute('for', 'checkbox')
    // label.setAttribute('class','checked')
    let span = document.createElement('span')
    span.innerText = 'Check all'


    let hr = document.createElement('hr')

    let div = document.createElement('div')
    div.appendChild(selectAll)
    div.appendChild(label)
    div.appendChild(span)
    div.appendChild(hr)


    //item
    let fragment = new DocumentFragment()
    items.forEach((item, index) => {
      let input = document.createElement('input')
      input.setAttribute('id', `checkbox_${index}`)
      input.setAttribute('class', 'checkbox')
      input.setAttribute('type', 'checkbox')

      let label = document.createElement('label')
      label.setAttribute('for', `checkbox_${index}`)

      let span = document.createElement('span')
      span.innerText = `${item}`

      fragment.appendChild(input)
      fragment.appendChild(label)
      fragment.appendChild(span)
    })


    //css
    const style = document.createElement('style')
    // console.log(style.isConnected);
    style.textContent = `
      /**
       * top
      */
      #checkbox+label{
        position:relative;
      }
      #checkbox+label::after{
        visibility:hidden;
        position:absolute;
        top:50%;
        left:50%;
        transform: translate(-50%, -50%);
        content:' ';
        width:60%;
        height:60%;
        background-color:#1890ff;
      }
      #checkbox+label.checked::after{
        visibility:visible;
        position:absolute;
        top:50%;
        left:50%;
        transform: translate(-50%, -50%);
        content:' ';
        width:60%;
        height:60%;
        background-color:#1890ff;
      }

      hr{
        margin:3px 0 10px 0;
      }

      /**
       * item
      */
      .checkbox{
        display:none;
      }
      .checkbox+label{
        display:inline-block;
        width:16px;
        height:16px;
        border:1px solid #ccc;
        border-radius:2px;
        transition:all 0.3s;
        vertical-align:top;
        margin:0 5px 0 15px;
        user-select:none;
      }
      .checkbox+label:hover{
        border:1px solid #1890ff;
       }
      .checkbox:checked+label::before{
        display: block;
        content: '\\2714';
        text-align: center;
        font-size: 12px;
        color: white;
        background:#1890ff;
        border-radius:2px;
      }
      span{
        font-size:14px;
      }


     label:first-of-type{
       margin: 0 5px 0 0;
     }
    `
    shadow.appendChild(style);
    // console.log(style.isConnected);

    //top and item
    shadow.appendChild(div)
    shadow.appendChild(fragment)

    let allInput = Array.from(shadow.childNodes).filter((ele) => {
      return ele.nodeName === 'INPUT'
    })


    let obj = {} //保存勾选的label的状态个数
    let index = 0
    allInput.forEach(item => {
      item.addEventListener('change', () => {
        item.checked ? obj.true = ++index : obj.true = --index
        modLabel()
      })
    })

    selectAll.addEventListener('change', () => {
      if (selectAll.checked) {
        label.removeAttribute('class')
        obj.true = index = 3
        allInput.forEach(item => {
          item.checked = true
        })
      } else {
        obj.true = index = 0
        allInput.forEach(item => {
          item.checked = false
        })
      }
    })

    function modLabel() {
      if (obj.true && obj.true < items.length) {
        selectAll.checked = false
        label.setAttribute('class', 'checked')
      }

      if (obj.true && obj.true === items.length) {
        selectAll.checked = true
        label.removeAttribute('class')
      }

      if (obj.true === 0) {
        label.removeAttribute('class')
      }
    }

    //外面按钮的点击事件
    let btn = document.getElementById('btn')
    btn.addEventListener('click', () => {
      let checkedInput = allInput.filter((item) => {
        return item.checked === true
      })

      
      

      console.log(checkedInput[0].id);
      

    })

  }
}

// Define the new element
customElements.define('my-checkbox', CheckBox);


