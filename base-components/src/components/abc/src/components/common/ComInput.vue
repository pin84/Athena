<template>
    <div class="com-input">
        <input class="input" type="text" v-model="config.changeText" :placeholder="config.inputPH"/>
    </div>
</template>


<script>
export default {
    props:{
        placeHolder:{
            default:'请输入内容',
            type:String,
        },
        config:{
            default:()=>{ 
                return {
                    inputPH:'请输入内容',
                    changeText:'',
                }
            },
            type:Object,
        }
        

        
    },
    data(){
        return{
            // changeText:'',

        }
    },
    // isClearInput: false

    // val: ''
  // },
  data() {
    return {
      changeText: ""
    };
  },
  created() {
  console.log(`===input val====`,this.val);
    // this.val === "" ? (this.changeText = "") : (this.changeText = this.val);
  },

  

  methods: {
    change() {
      this.$listeners.inputText({
        text: this.changeText,
        fn: () => {  //fn 不用了
          this.changeText = "";
        }
      });
    }
  },
  // watch: {
  //   val:{
  //     handler(newVal){
  //       this.changeText = newVal
  //     }
  //   },
    watch:{
        'config.changeText':{
            handler(text){
                this.$emit('change',text);
            },
            // deep:true,
        }
    }
  // }
};
</script>

<style lang="scss">
.com-input{
    $comBgColor:#f3f3f3;
    width: 100%;
    background: $comBgColor;
    padding: 0 10px;
    box-sizing: border-box;

    .input{
        $placeHolderColor:#a1a1a1;
        width:100%;
        height: 100%;
        background: $comBgColor;
        border:none;

        &::-webkit-input-placeholder{
            color:$placeHolderColor;
        }
        &::-moz-placeholder{  /* Mozilla Firefox 19+ */
            color:$placeHolderColor;
        }
        &::-moz-placeholder{  /* Mozilla Firefox 4 to 18 */
            color:$placeHolderColor;
        }
        &::-ms-input-placeholder{  /* Internet Explorer 10-11 */ 
            color:$placeHolderColor;
        }

    }
}
</style>