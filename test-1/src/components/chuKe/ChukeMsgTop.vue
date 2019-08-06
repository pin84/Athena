<template>
    <div id="main-body">
      <ul class="select-list">
        <li
          class="item"
          @click="selectIndustry"
        >
          <span class="text">行业</span>
          <span class="ri">{{industry.name || '请选择行业'}}</span>
        </li>
        <li
          class="item"
          @click="selectProvince"
        >
          <span class="text">省份</span>
          <span class="ri">{{selectedProvince || '请选择省份'}}</span>
        </li>
        <span
          class="area-box"
          ref="areaBox"
        >
          <AreaSelect
            @selectArea='selectArea'
            v-show="isShowMask"
          />
        </span>
        <li class="item">
          <span class="text">主营产品/业务</span>
          <input
            class="item-input"
            :placeholder="inputPlaceholder"
            v-model="business"
            @focus="onFocus"
            @blur="onBlur"
          >
        </li>
      </ul>

      <button
        class="searchBtn"
        @click="search"
      >搜索</button>
    </div>
</template>

<script>
import AreaSelect from "@/components/common/AreaSelect";
export default {
    components:{
        AreaSelect,
    },
    data(){
        return{
            isShowNoResultTips: false,
            selectedProvince: "", //当前选择的省份
            isShowMask: false, //
            comNum: "" || 0, //搜索到的企业数
            comPhoneNum: "" || 0, //搜索到的手机数
            inputPlaceholder: "请输入主营产品/业务",
            business: "", //主营

            industry: {
                //当前选择的行业
                id: "",
                name: ""
            },
            industryList: [], //保存后台取回来的行业列表
            resultList: [],
            curPageNum: 1, //当前页面
            //当选择全国时。把这组数据传给后台
            allArea:
                "北京市,天津市,上海市,重庆市,河北省,山西省,辽宁省,吉林省,黑龙江省,江苏省,浙江省,安徽省,福建省,江西省,山东省,河南省,湖北省,湖南省,广东省,海南省,四川省,贵州省,云南省,陕西省,甘肃省,青海省,台湾省,内蒙古自治区,广西壮族自治区,西藏自治区,宁夏回族自治区,新疆维吾尔自治区",
            topNum:0,
            botNum:0,
        }
    },
    created(){
        this.getIndustry();

    },
    methods: {
        async getIndustry() {
            try {
                let { data } = await this.$axios.get(this.$api.selectIndustry);
                this.industryList = data.map((ele, index) => {
                return {
                    label: ele.industry,
                    value: index,
                    id: ele.id
                };
                });
            } catch (err) {
                this.$toast(err);
            }
        },

        selectIndustry() {
            this.$weui.picker(this.industryList, {
                className: "custom-classname",
                container: "body",
                defaultValue: [3],
                onChange: function(result) {
                console.log(result);
                },
                onConfirm: result => {
                this.industry.name = result[0].label;
                this.industry.id = result[0].id;
                },
                id: "singleLinePicker"
            });
        },

        selectProvince() {
            let box = this.$refs.areaBox;
            box.style.transform === ""
                ? (box.style.transform = "scaleY(1)")
                : (box.style.transform = "");

            this.isShowMask = true;
        },

        selectArea(area) {
            this.selectedProvince = area.join();

            let box = this.$refs.areaBox;
            box.style.transform = "";
            setTimeout(() => {
                this.isShowMask = false;
            }, 200);
        },

        async search() {
            let postData = {
                provinces: this.selectedProvince,
                industryid: this.industry.id,
                business: this.business,
                page: 1
            };

            if (!postData.industryid) {
                return this.$toast("请选择行业");
            }
            if (!postData.provinces) {
                return this.$toast("请选择省份");
            }

            let { data } = await this.getData(postData);

            if (data.message) {
                return this.$toast(data.message);
            }

            this.resultList = data.contacts;
            this.comNum = data.all_count;
            this.comPhoneNum = data.count;
        },

        onFocus() {
            this.inputPlaceholder = "";
        },
        onBlur() {
            this.inputPlaceholder = "请输入主营产品/业务";
        }

    },
}
</script>

<style lang="scss">

</style>
