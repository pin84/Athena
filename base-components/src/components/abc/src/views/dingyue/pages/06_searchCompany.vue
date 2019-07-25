<template>
  <div class="index-search">
    <div class="accurateSearchBox-s2 pos_res">
      <div class="accurateSearchBox-s2-search pos_res">
        <input
          class="search-input"
          type="search"
          v-model="index_search"
          ref="sbox"
          @blur="showPlaceHolder(1)"
          @input="searchCompany"
          id="sbox"
          @compositionstart="fnCompositionstart"
          @compositionend="fnCompositionend"
          @keydown="searchEnter"
        />
        <p
          class="index-search-wrapper"
          v-show="isShowPlaceHolder"
          @click="showPlaceHolder(0)"
        ><i class="iconfont mar_10 input-icon">&#xe600; </i>输入企业名称</p>
      </div>
    </div>

    <!-- 搜索框搜索后获取相关搜索结果 -->
    <div
      class="accurateSearchBox-s2-res search-res"
      ref="wrapper"
      v-show="isShowResult"
      v-cloak
    >
      <ul class="w accurateSearchBox-s2-res.-wrapper search-res-bg">
        <li
          class="res-item"
          v-for="(item) of searchResultList"
          :key="item.ID"
          @click="changeCompany(item.company_id,item.company_name,item.industriesid)"
        >
          <p>{{item.company_name}}</p>
        </li>
      </ul>
      <div
        class="loading"
        v-show="isShowLoading"
      >
        <span class="main_color_ffffff mar_r_20">数据</span>
        <p style="width:0.6rem;height:0.6rem">

          <img
            src="../../../assets/icon/ajax-loader.gif"
            class="w"
          />
        </p>
        <span class="main_color_ffffff mar_l_20">中...</span>
      </div>
      <div
        class="unData"
        v-if="isEmptyData"
        v-cloak
      >xi
        <p
          class="iconfont main_color_ffffff"
          style="font-size:64px"
        >&#xe626; </p>
        <p class="main_color_ffffff mar_r_20">暂无数据，建议换个关键词搜索</p>
      </div>
    </div>

  </div>
</template>

<style lang="scss">
.input-icon{
  font-size:0.28rem;
}
.search-res-bg{
  background-color:rgba(255,255,255,0.85);
  border-radius: 10px;

}

.res-item{
  padding: 0.05rem 0 0.05rem 0.6rem;
  border-bottom:1px solid black;
  position: relative;

  &::before{
    font-family:'iconfont';
    content:'\e607';
    position: absolute;
    z-index: 1;
    left:2%;
    // top: 50%;
    color: #08a3a2;
    font-size:0.30rem;
    width:0.30rem;
    height:0.30rem;

  }
}

.accurateSearchBox-s2-search{
  position: relative;
}
.accurateSearchBox-s2-search{
  &::before{
    font-family:'iconfont';
    content:'\e607';
    position: absolute;
    z-index: 1;
    left:0.6rem;
    top: 0.17rem;
    color: #08a3a2;
    font-size:0.30rem;
  }
}
.search-res{
  padding: 0 0.35rem 0.17rem 0.35rem;
  font-size:0.28rem;
  color:#695d5d;
}
</style>

<script>
import BScroll from "better-scroll";
import axios from "axios";
/* eslint-disable */
export default {
  data() {
    return {
      index_search: "", //存储搜索输入框的值 双向绑定
      isShowPlaceHolder: true,
      isShowResult: false,
      //s搜索结果
      searchResultList: [],
      isShowLoading: false,
      PageSize: 20,
      PageIndex: 1,
      isEmptyData: false, //无数据提示框
      searchOnoff: true,
      //搜索
      isLock: false
    };
  },

  methods: {
    getAjaxResponse(obj, fn1, fn2) {
      var _this = this;
      var CancelToken = axios.CancelToken;
      obj.cancelToken = new CancelToken(function executor(c) {
        _this.source = c;
      });
      axios(obj)
        .then(function(response) {
          fn1(response);
        })
        .catch(function(error) {
          fn2(error);
          console.log(error);
        });
    },
    showPlaceHolder(n) {
      if (n == 0) {
        this.$refs.sbox.focus();

        this.isShowPlaceHolder = false;
      } else {
        //   this.isShowResult = false;
        this.isShowPlaceHolder = this.index_search == "" ? true : false;
      }
    },
    fnCompositionstart() {
      this.isLock = true;
    },
    fnCompositionend() {
      this.isLock = false;
    },

    //python后台搜索接口
    searchCompany() {
      if (this.isLock) return;

      // python 后台
      if (this.index_search.length) {
        
        this.$axios.get(this.$api.indexSearch,{
          params:{
            company_name:this.index_search,
            page_size:10
          }
        }).then(res=>{
          let result = res.data.results
            this.searchResultList = result;
        })
        .catch(rej=>{
          console.log(rej)
        })

      }

      if (this.index_search) {
        this.isShowResult = true;
      } else {
        this.searchResultList = [];
        this.isShowResult = false;
      }

    },

    //net后台搜索接口 废弃
  /*
    searchResFn() {
      if (this.isLock) return;

      var _this = this;
      var index_search = this.index_search;
      _this.PageIndex = 1;
      _this.searchResultList = [];

      if (index_search.length >= 1) {
        _this.isLoadMore = false;
        _this.isShowResult = true;
        _this.isEmptyData = false;
        _this.isShowLoading = true;
        var para = {
          method: "post",
          url: _this.$api.GetEnterpriseSearch,
          data: {
            pInfo: {
              PageIndex: 1,
              PageSize: _this.PageSize,
              Where: [
                {
                  name: "enterprisename",
                  value: index_search
                }
              ]
            }
          }
        };
        _this.getAjaxResponse(
          para,
          function(successBack) {
            console.log("aaaaaaaaaaa");

            if (successBack.data.IsResult) {
              var res = successBack.data.Result;
              if (res.rows.length) {
                _this.isShowLoading = false;
                _this.isEmptyData = false;
                _this.searchResultList = res.rows;
              } else {
                _this.searchResultList = [];
                _this.isShowLoading = false;
                _this.isEmptyData = true;
                setTimeout(() => {
                  _this.isEmptyData = false;
                }, 2000);
              }
              //计算当前是否为最后一页，设置
              //所占总页数
              var page =
                Math.floor(res.total / _this.PageSize) +
                (res.total % res.PageSize !== 0 ? 1 : 0);
              if (res.PageIndex >= page || res.total <= _this.PageSize) {
                _this.isLoadMore = false;
              } else {
                _this.isLoadMore = true;
              }
              //    _this.searchOnoff = true
            } else {
              _this.isLoadMore = false;
            }
          },
          function(errorBack) {
            console.log(errorBack);
            //   _this.searchOnoff = true;
            _this.isShowLoading = false;
          }
        );
      } else {
        _this.isShowResult = false;
      }
    },
  */

    //获取首页上链数据
    geChartList(id, name) {
      this.$root.bus.$emit("changesearchlist", id);
      // 发送id至ChartItem组件 代码对应码 #$chart
      this.isShowResult = false;
      this.index_search = name;
    },

    // 点击不同公司后 改变公司
    changeCompany(companyId,companyName,industriesId){
      console.log(companyId,companyName,industriesId);
      this.index_search = companyName;

      // this.companyInfo = companyInfo;
      this.bus.$emit('changeCompany',companyId,companyName,industriesId)
      this.isShowResult = false;
      // this.index_search = name;
    },

    //加载更多
    loadMoreData() {
      var _this = this;
      if (!_this.isLoadMore) return;
      var index_search = this.index_search;
      _this.isLoadMore = false;
      _this.PageIndex++;
      _this.isShowLoading = true;
      var para = {
        method: "post",
        url: _this.$api.GetEnterpriseSearch,
        data: {
          pInfo: {
            PageIndex: _this.PageIndex,
            PageSize: _this.PageSize,
            Where: [
              {
                name: "enterprisename",
                value: index_search
              }
            ]
          }
        }
      };
      _this.getAjaxResponse(
        para,
        function(successBack) {
          console.log(successBack);
          if (successBack.data.IsResult) {
            var res = successBack.data.Result;
            _this.isShowLoading = false;
            if (res.rows.length) {
              _this.isShowResult = true;
              _this.searchResultList = _this.searchResultList.concat(res.rows);
            } else {
            }
            //计算当前是否为最后一页，设置
            //所占总页数
            var page =
              Math.floor(res.total / res.PageSize) +
              (res.total % res.PageSize !== 0 ? 1 : 0);
            console.log(page);
            if (res.PageIndex < page || res.total <= _this.PageSize) {
              _this.isLoadMore = true;
            }
          }
        },
        function(errorBack) {
          console.log(errorBack);
        }
      );
    },

    // 这是用于搜索框的下拉加载更多
    scrollFn() {
      var _this = this;
      var wrapper = this.$refs.wrapper; //获取搜索关键字后部分结果弹出框的节点
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(wrapper, {
            click: true,
            scrollY: true,
            probeType: 3
          });
        } else {
          this.scroll.refresh();
        }
        this.scroll.on("scroll", pos => {
          //    console.log(pos.y, this.dropDown)
          //如果下拉超过50px 就显示下拉刷新的文字
          if (pos.y > 100) {
            //  this.dropDown = true
          } else {
            //  this.dropDown = false
          }
        });
        // 搜索框查得的结果加载更多
        //touchEnd（手指离开以后触发） 通过这个方法来监听下拉刷新
        this.scroll.on("touchEnd", pos => {
          // 下拉动作
          if (pos.y > 100) {
            console.log("下拉刷新成功");
            //  this.dropDown = false
          }
          //上拉加载 总高度>下拉的高度-100 触发加载更多
          if (this.scroll.maxScrollY > pos.y - 100) {
            console.log("加载更多");
            //使用refresh 方法 来更新scroll  解决无法滚动的问题
            if (_this.isLoadMore) {
              _this.loadMoreData();
            }
            //  this.scroll.refresh()
          }
        });
      });
    },
    searchEnter(e){
      if(e.keyCode == 13){
        if(this.searchResultList.length==0){
          console.log(this.searchResultList);
          
          this.$store.commit('showPop',{
            popName:'tips',
            config:{
              text:'上下链大数据暂未收录到该企业信息 ,可查询其他企业或添加并认证为我的企业。',
              confirmText:'添加并认证为我的企业',
              confirm:()=>{
                this.$store.commit('showPop',{
                  popName:'AutConfig',
                })
              }
            }
          });
        }
      }
    }
  },
  mounted() {
    var _this = this;
    this.scrollFn();
    this.$root.bus.$on("focusSearch", function() {
      _this.$refs.sbox.focus();

      _this.isShowPlaceHolder = false;
    });

    //     document.getElementById('sbox').onKeydown = function(e){
    // 　　　　if(e.keyCode == 13){
    //         alert('13')
    //   　　 　　 e.preventDefault();//禁止键盘默认事件
    //   //  　　　　 bindSearchFn()
    // 　　　　}
    // 　　}
  },
  destroyed(){
    this.bus.$off('focusSearch');
    
  },
};
</script>

