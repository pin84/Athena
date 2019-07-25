<template>
  <!-- 列表弹窗 自画像 s -->
  <div
    class="info-poplist"
    :class="{'pop-show':popShow.self}"
  >

    <!-- 弹窗左侧按钮 s -->
    <!-- <div class="pop-btn" @click="infoPop">
                    企业基本信息
                    <div class="arrows-icon">
                        <i class="iconfont-mask">&#xe600;</i>
                    </div>
                </div> -->
    <!-- 弹窗左侧按钮 e -->

    <!-- 背景蒙版 s -->

    <div class="info-mask">
    </div>
    <!-- 背景蒙版 e -->

    <!-- 右侧弹窗内容 s -->
    <div class="pop-content">
      <!-- 内容主标题 -->
      <div class="content-title">
        企业基本信息 <img
          @click="infoPop('self')"
          class="u-close"
          src="../../../assets/icon/11.png"
        >
      </div>
      <!-- popIsShow('self-'+index) 这是调用弹窗的方法 -->
      <!-- 企业自画像 列表内容s -->
      <div class="content-list">
        <!-- 列表副标题 -->
        <div class="list-subtitle">基础信息:</div>
        <!-- 列表s -->
        <a
          v-for="(item,index) in baseInfo"
          @click="popIsShow('self-'+index)"
          class="weui-cell weui-cell_access"
          :key="index"
        >
          <!-- maskShow(item), -->

          <div class="weui-cell__hd cell-imgblock">
            <img
              class="icon"
              src="../../../assets/icon/selfPic/1.png"
            >
          </div>
          <div class="weui-cell__bd">
            <p>{{item.name}}</p>
          </div>
          <div class="weui-cell__ft"></div>

          <!-- gs- 工商信息 s -->
          <!-- <com-pop v-if="index==0" :is-show="item.isShow" @close="maskShow(item)" :class="{fullscreen:item.isFull,'g-pop-show':item.isShow}" @closefull="fullScreen(item)"> -->
          <com-pop
            v-if="index==0"
            :my-index="'self-'+index"
          >
            <!-- @close="maskShow(item)" -->
            <template v-slot:pop-content>
              <!-- 这里是中间内容插槽 -->
              <!-- main-header s -->
              <com-head :get-company="company"></com-head>
              <!-- main-header e -->

              <!-- gs-info s -->
              <com-content-layout
                :get-info-list="infoList"
                :get-info-title="item.name"
                :my-index="'self-'+index"
              >
              </com-content-layout>
              <!-- gs-info e -->
            </template>

            <template v-slot:flex-left>
              <!-- <com-foot @fs="fullScreen(item)"> -->
              <!-- </com-foot> -->
            </template>
            <template v-slot:flex-right>
            </template>
          </com-pop>

          <!-- 工商信息 e -->

          <!-- gd- 股东信息 s -->
          <com-pop
            v-if="index==1"
            :my-index="'self-'+index"
          >
            <!-- @close="maskShow(item)" -->
            <template v-slot:pop-content>

              <!-- main-header s -->
              <com-head :get-company="company"></com-head>
              <!-- main-header e -->

              <!-- gs-info s -->
              <com-content-layout
                :get-info-title="item"
                :my-index="'self-'+index"
              >
                <template v-slot:layout-content>
                  <div
                    class="gd-content info-list"
                    v-for="(gditem,index) in getGdList"
                    :key="index"
                  >
                    <div class="item-single sp">
                      {{gditem.Name}}
                    </div>
                    <div class="info-item item-single">
                      <div class="item-name">
                        持股比例
                      </div>
                      <div class="item-value">
                        {{gditem.Stake}}%
                      </div>
                    </div>

                    <div class="info-item item-single">
                      <div class="item-name">
                        认缴率（万元）
                      </div>
                      <div class="item-value">
                        <!-- {{gditem.Stake}} -->
                        {{gditem.SpandingMoney}}万元
                      </div>
                    </div>
                  </div>
                </template>
              </com-content-layout>

              <!-- gs-info e -->
            </template>

            <!-- <template v-slot:pop-footer> -->
            <!-- 这里是尾部内容插槽 -->
            <!-- <com-foot @fs="fullScreen(item)"> -->
            <!-- </com-foot> -->
            <!-- </template> -->
          </com-pop>

          <!-- 股东信息 e -->

          <!-- zr- 主要人员信息 s -->
          <com-pop
            v-if="index==2"
            :my-index="'self-'+index"
          >
            <!-- @close="maskShow(item)" -->
            <template v-slot:pop-content>
              <!-- main-header s -->
              <com-head :get-company="company"></com-head>
              <!-- main-header e -->
              <!-- gs-info s -->
              <com-content-layout
                :get-info-list="infoList"
                :get-info-title="item.name"
                :my-index="'self-'+index"
              >
              </com-content-layout>
              <!-- gs-info e -->
            </template>

            <!-- <template v-slot:pop-footer> -->
            <!-- 这里是尾部内容插槽 -->
            <!-- <com-foot @fs="fullScreen(item)"> -->
            <!-- </com-foot> -->
            <!-- </template> -->
          </com-pop>

          <!-- 主要人员信息信息 e -->

          <!-- xg- 行政许可（工商局）信息 s -->
          <com-pop
            v-if="index==3"
            :my-index="'self-'+index"
          >
            <!-- @close="maskShow(item)" -->
            <template v-slot:pop-content>

              <!-- main-header s -->
              <com-head :get-company="company"></com-head>
              <!-- main-header e -->

              <!-- gs-info s -->
              <com-content-layout
                :get-info-title="item"
                :my-index="'self-'+index"
              >
                <template v-slot:layout-content>
                  <div
                    class="info-list"
                    v-for="(gsitem,index) of gslist"
                    :key="index"
                  >
                    <div class="info-item">
                      <div class="item-name">
                        许可文件编号
                      </div>
                      <div class="item-value">
                        {{gsitem.LicenseNo}}
                      </div>
                    </div>

                    <div class="info-item">
                      <div class="item-name">
                        许可文件名称
                      </div>
                      <div class="item-value">
                        {{gsitem.LicenseName}}
                      </div>
                    </div>

                    <div class="info-item">
                      <div class="item-name">
                        有效期自
                      </div>
                      <div class="item-value">
                        {{gsitem.StartTime}}
                      </div>
                    </div>

                    <div class="info-item">
                      <div class="item-name">
                        有效期至
                      </div>
                      <div class="item-value">
                        {{gsitem.EndTime}}
                      </div>
                    </div>

                    <div class="info-item">
                      <div class="item-name">
                        许可机关
                      </div>
                      <div class="item-value">
                        {{gsitem.PerAgency}}
                      </div>
                    </div>

                    <div class="info-item">
                      <div class="item-name">
                        许可内容
                      </div>
                      <div class="item-value">
                        {{gsitem.PerContent}}
                      </div>
                    </div>
                  </div>
                </template>
              </com-content-layout>
              <!-- gs-info e -->
            </template>

            <!-- <template v-slot:pop-footer> -->
            <!-- 这里是尾部内容插槽 -->
            <!-- <com-foot @fs="fullScreen(item)"> -->
            <!-- </com-foot> -->
            <!-- </template> -->
          </com-pop>

          <!-- 行政许可（工商局）信息 e -->

          <!-- xx- 行政许可（信用中国）信息 s -->
          <com-pop
            v-if="index==4"
            :my-index="'self-'+index"
          >
            <!-- @close="maskShow(item)" -->
            <template v-slot:pop-content>

              <!-- main-header s -->
              <!-- <com-head-empty :get-company="company" v-if="company == null"></com-head-empty> -->
              <com-head :get-company="company"></com-head>
              <!-- main-header e -->

              <!-- gs-info s -->
              <com-content-layout
                :get-info-list="infoList"
                :get-info-title="item.name"
                :my-index="'self-'+index"
              >
              </com-content-layout>
              <!-- gs-info e -->
            </template>

            <!-- <template v-slot:pop-footer> -->
            <!-- 这里是尾部内容插槽 -->
            <!-- <com-foot @fs="fullScreen(item)"> -->
            <!-- </com-foot> -->
            <!-- </template> -->
          </com-pop>

          <!-- 行政许可（信用中国）信息 e -->

          <!-- xc- 行政处罚信息 s -->
          <com-pop
            v-if="index==5"
            :my-index="'self-'+index"
          >
            <!-- @close="maskShow(item)" -->
            <template v-slot:pop-content>

              <!-- main-header s -->
              <com-head :get-company="company"></com-head>
              <!-- main-header e -->

              <!-- gs-info s -->
              <com-content-layout
                :get-info-list="infoList"
                :get-info-title="item.name"
                :my-index="'self-'+index"
              >
              </com-content-layout>
              <!-- gs-info e -->
            </template>

            <!-- <template v-slot:pop-footer> -->
            <!-- 这里是尾部内容插槽 -->
            <!-- <com-foot @fs="fullScreen(item)"> -->
            <!-- </com-foot> -->
            <!-- </template> -->
          </com-pop>

          <!-- 行政处罚信息 e -->

          <!-- sw- 税务信用 s -->
          <com-pop
            v-if="index==6"
            :my-index="'self-'+index"
          >
            <!-- @close="maskShow(item)" -->
            <template v-slot:pop-content>

              <!-- main-header s -->
              <com-head :get-company="company"></com-head>
              <!-- main-header e -->

              <!-- gs-info s -->
              <com-content-layout
                :get-info-list="infoList"
                :get-info-title="item.name"
                :my-index="'self-'+index"
              >
              </com-content-layout>
              <!-- gs-info e -->
            </template>

            <!-- <template v-slot:pop-footer> -->
            <!-- 这里是尾部内容插槽 -->
            <!-- <com-foot @fs="fullScreen(item)"> -->
            <!-- </com-foot> -->
            <!-- </template> -->
          </com-pop>

          <!-- 税务信用 e -->

          <!-- yc- 列入经营异常名录信息 s -->
          <com-pop
            v-if="index==7"
            :my-index="'self-'+index"
          >
            <!-- @close="maskShow(item)" -->
            <template v-slot:pop-content>

              <!-- main-header s -->
              <com-head :get-company="company"></com-head>
              <!-- main-header e -->

              <!-- gs-info s -->
              <com-content-layout
                :get-info-list="infoList"
                :get-info-title="item.name"
                :my-index="'self-'+index"
              >
              </com-content-layout>
              <!-- gs-info e -->
            </template>

            <!-- <template v-slot:pop-footer> -->
            <!-- 这里是尾部内容插槽 -->
            <!-- <com-foot @fs="fullScreen(item)"> -->
            <!-- </com-foot> -->
            <!-- </template> -->
          </com-pop>

          <!-- 列入经营异常名录信息 e -->

          <!-- bl- 黑名单 s -->

          <com-pop
            v-if="index==8"
            :my-index="'self-'+index"
          >
            <!-- @close="maskShow(item)" -->
            <template v-slot:pop-content>

              <!-- main-header s -->
              <com-head :get-company="company"></com-head>
              <!-- main-header e -->

              <!-- gs-info s -->
              <com-content-layout
                :get-info-list="infoList"
                :get-info-title="item.name"
                :my-index="'self-'+index"
              >
              </com-content-layout>
              <!-- gs-info e -->
            </template>

            <!-- <template v-slot:pop-footer> -->
            <!-- 这里是尾部内容插槽 -->
            <!-- <com-foot @fs="fullScreen(item)"> -->
            <!-- </com-foot> -->
            <!-- </template> -->
          </com-pop>

          <!-- 黑名单 e -->

        </a>

        <!-- 列表容器e -->

        <!-- 下箭头s -->
        <div class="down-arrow">
          <div class="arrow-block">
            <i class="iconfont-mask">&#xe600;</i>
          </div>
        </div>
        <!-- 下箭头e -->

      </div>
      <!-- 列表内容e -->

    </div>
    <!-- 右侧弹窗内容 e -->

  </div>
  <!-- 列表弹窗 自画像 e -->
</template>

<script>
import ComPop from "../../common/ComPop";
import ComHead from "../../common/ComHead";
import ComContentLayout from "../../common/ComContentLayout";
export default {
  data() {
    return {
      gslist:[],
      getGdList:[],
      infoList:[],
      company: {},
      baseInfo: [
        {name:'工商信息'},
        {name:'股东信息'},
        {name:'主要人员信息'},
        {name:'行政许可(工商局)信息'},
        {name:'行政许可(信用中国)信息'},
        {name:'行政处罚信息'},
        {name:'税务信用'},
        {name:'列入经营异常名录信息'},
        {name:'黑名单'},
      ],
      popShow: {
        self: true
      }
    };
  },
  components: {
    comPop: ComPop,
    comHead: ComHead,
    comContentLayout:ComContentLayout
  },
  methods: {
    infoPop(){},
    popIsShow(){}
  }
};
</script>
