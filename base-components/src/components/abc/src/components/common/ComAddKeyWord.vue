<template>
  <section id="com-add-keyword">
    <div class="btn">
      <input
        class="input-text"
        type="text"
        :placeholder="placeHolder"
        :maxlength="maxLength==null?null:maxLength"
        v-model="personTag"
      />
      <button class="btn-add" @click="addTag">+添加</button>
    </div>

    <ul class="list">
      <li
        class="item item-person"
        :class="classList[classListNum[idx]]"
        v-for="(tag,idx) in personTags"
        :key="idx"
        @touchstart="touchstar"
        @touchend="touchend"
      >
        {{tag}}
        <em class="del" @click="delPersonTag(tag,idx)"></em>
      </li>
    </ul>
  </section>
</template>

<script>

export default {
    name:'ComAddKeyWord',
    
    props:{
        initTagList:{
            type:Array,
            default:function () {
                return [];
            },
        },
        placeHolder:{
            type:String,
            default:'输入关键词，2-6个中文字',
        },
        checkFunc:{
            type:Function,
            default:()=>{return true},
        },

        maxLength:{
            type:Number,
            default:null,
        },

        maxTagNum:{
            type:Number,
            default:null,
        },


    },

    data() {
        return {
            classList: ["a", "b", "c", "d", "e", "f"],
            classListNum: [],
            personTags: [],
            personTag: "", //当前的输入的个人标签
        }
    },

    computed:{
        
    },
    created(){
        
    },
    watch:{
        initTagList:{
            handler(newVal){
                this.personTags = newVal;
            },
            deep:true,
            immediate:true,
        },
        /*
        personTags:{
            handler(){

                this.$emit('getTagLiST',this.personTags);
            },
            deep:true,
        }
        */
    },
    methods:{
        addTag() {
            if(!this.checkFunc(this.personTag)){return}
            if(this.maxTagNum !== null && typeof this.maxTagNum == 'number'){
                if(this.personTags.length >= 5){
                    this.$toast("标签数量不可以大于5个");
                    return
                }
            }
            if (!this.personTag.trim()) {
                this.personTag = "";
                this.$toast("请输入标签");
                return;
            }

            if (this.personTag.indexOf("|") !== -1) {
                this.$toast("请输入正确的标签");
                return;
            }
            
            this.personTags.unshift(this.personTag);
            this.personTag = "";
        },
        delPersonTag(tag, index) {
            this.personTags.splice(index, 1);
        },

        touchstar() {
            this.timer = setTimeout(() => {
                this.isShowDel = true;
            }, 1000);
        },

        touchend() {
            clearTimeout(this.timer);
        },

    },

}

</script>
<style lang="scss">
#com-add-keyword{

    padding-bottom: 0.1rem;
    
    .btn {
        width: 100%;
        position: relative;
        margin-top: 0.2rem;

        .input-text, .btn-add {
        width: 100%;
        height: 1rem;
        padding: 0 0.2rem;
        box-sizing: border-box;
        font-size: 0.32rem;
        border: 1px solid #23b2b3;
        border-radius: 0.5rem;
        }

        .btn-add {
        position: absolute;
        right: 0;
        top: 1px;
        width: 1.6rem;
        border: 0;
        font-weight: 200;
        background-color: #23b2b3;
        color: #fff;
        font-size: 0.28rem;
        }

        .input-text::placeholder {
        color: #cccccc;
        font-size: 0.3rem;
        }
    }

    .list {
        max-height: 4.5rem;
        box-sizing: border-box;
        overflow-y: auto;
        margin-top: 0.1rem;
        font-size: 0.28rem;

        .item {
            position: relative;
            display: inline-block;
            padding: 0.15rem 0.3rem;
            border-radius: 0.6rem;
            margin-right: 0.2rem;
            margin-top: 0.2rem;

            &.item-person, &.item-company {
                background-color: #d6f2f0;
                color: black;
                font-size: 0.28rem;
                font-weight: 200;
            }

            &.a {
                color: #fff;
                background-color: #ed8014;
            }

            &.b {
                color: #fff;
                background-color: #1F85DE;
            }

            &.c {
                color: #fff;
                background-color: #194133;
            }

            &.d {
                color: #fff;
                background-color: #1D96A7;
            }

            &.e {
                color: #ffffff;
                background-color: #D93A14;
            }

            &.f {
                background-color: #611DA7;
                color: #fff;
            }

            .del {
                position: absolute;
                width: 0.3rem;
                height: 0.3rem;
                top: -0.1rem;
                right: -0.1rem;
                background: url('../../assets/icon/11.png') center no-repeat;
                background-size: contain;
            }
        }
    }

}

</style>
