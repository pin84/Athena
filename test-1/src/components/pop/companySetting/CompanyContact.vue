<template>
  <com-pop
    my-index="CompanyContact"
    class="top_0"
  >

    <template v-slot:pop-content>
      <div id="companyContact">
        <h3>企业联系信息</h3>
        <div class="main-body">
          <h4>企业联系人：</h4>
          <ul class="iList">
            <li
              class="item"
              v-for='(item,index) in contactList'
              :key='index'
            >
              <div
                v-for='(value,key) in item'
                :key='key'
                class="info"
              >
                <span v-if="key != 'id'">
                  {{key}}
                </span>
                <input
                  v-if="key != 'id'"
                  class="testInput"
                  type="text"
                  :placeholder="thisPageData[0][key]"
                  v-model="contactList[index][key]"
                >
                <!-- <span v-if="key != 'id'">
                {{value}}
              </span> -->
              </div>
              <div class="btn">
                <span
                  class="active"
                  @click="delContact(index)"
                >删除</span>
                <span @click="saveData(item)">保存</span>
              </div>
            </li>
          </ul>
          <ul
            class="iList"
            v-if="isShowAddContact"
          >
            <li
              class="item"
              v-for='(item,index) in thisPageData'
              :key='index'
            >
              <div
                v-for='(value,key,indexa) in item'
                :key='key'
                class="info"
              >
                <span v-if="key != 'id'">
                  {{key}}
                </span>
                <input
                  class="testInput"
                  type="text"
                  :placeholder="value"
                  v-model="postData[indexa]"
                >
              </div>
              <div class="btn">
                <span
                  class="active"
                  @click="cancel"
                >取消</span>
                <span @click="postContact">保存</span>
              </div>
            </li>
          </ul>
        </div>

        <div
          class="addContact"
          @click="addContact"
          v-if="!isShowAddContact"
        >添加企业联系人</div>
      </div>

    </template>

    <template v-slot:flex-left>
      <div class="m-item m-itemcenter">取消</div>
    </template>
    <template v-slot:flex-right>
      <div class="m-item footbtn">
        <div class="radiusBtn">保存</div>
      </div>
    </template>
  </com-pop>

</template>
<script>
const ComPop = resolve => {
  import("@/components/common/ComPop").then(module => {
    resolve(module);
  });
};
export default {
  data() {
    return {
      thisPageData: [
        {
          姓名: "请输入企业联系人名字",
          手机号码: "请输入手机号码",
          邮箱: "请输入邮箱",
          职务: "请输入职务"
        }
      ],
      contactList: [
        {
          id: 1,
          姓名: "张某某a",
          手机号码: 1234567896,
          邮箱: "12344564@qq.com",
          职务: "法人"
        },
        {
          id: 2,
          姓名: "张某某b",
          手机号码: 1234567896,
          邮箱: "12344564@qq.com",
          职务: "法人"
        }
      ],
      isShowAddContact: false, //是否显示增加联系人输入框
      postData: {}
    };
  },
  components: {
    ComPop
  },
  methods: {
    saveData(item) {
      console.log(item);
    },
    delContact(index) {
      this.contactList.splice(index, 1);
    },
    postContact() {
      console.log(this.postData);
      this.isShowAddContact = false;
    },
    addContact() {
      this.isShowAddContact = true;
    },
    cancel() {
      this.isShowAddContact = false;
    }
  }
};
</script>
<style lang="stylus" scoped>
#companyContact
  width 100%
  height 100vh
  background-color #ffffff
  padding 40px 10px 10px 10px
  box-sizing border-box

  h3
    text-align center
  h4
    font-size 16px
    height 30px
    line-height 30px  
  .iList
    width 100%
    .item
      border-radius 5px
      background-color #f3f3f3
      margin-bottom 10px
      padding 10px  
      .info
        display flex
        &>:first-child
          flex-basis 85px
      .btn
        width 100%
        margin-top 10px
        span 
          padding 2px 13px
          border-radius 13px  
          margin-right 10px 
          border 1px solid black
          &.active
            color #eb2727 
            border 1px solid red
      .testInput      
        border 0
        padding 3px 10px
        background-color #f3f3f3

  .addContact
    position  relative
    width 100%
    color  #09a2a3  
    padding 5px 0  0  20px
    box-sizing border-box
    &::before
      display inline-block
      position absolute
      content ''
      width 16px
      height 16px
      margin-right 5px
      background url('../../../assets/icon/add@16.png')     center no-repeat
      left 0
      top 8px
      
</style>
