<template>
  <div>
    <!-- v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
    infinite-scroll-distance="10"-->
    a
    <ul class="search-CompanyListItemdatalist">
      <CompanyListItem
        v-for="dataItem in searchDateList"
        :key="dataItem.enterprises"
        :getDataItem="dataItem"
        @click.native="toSearchCompany(dataItem)"
      ></CompanyListItem>
    </ul>
  </div>
</template>

<script>
import CompanyListItem from "@/components/shangLian/CompanyListItem";
export default {
  data() {
    return {
      loading: false,
      searchDateList: []
    };
  },
  components: {
    CompanyListItem
  },
  async created() {
    let { logo, industryid, province, industryName } = this.$route.params;
    let companyLsData = await this.$ajax.getCompanyListData({
      industryid,
      provinces: province,
      logo,
      up_industry: industryName
    });

    try {
      let { code, enterprises_data } = companyLsData;
      // let enterprises_data
      // enterprises_data.forEach(ele=>{

      // })
      // this.searchDateList = enterprises_data
      // debugger
    } catch (e) {
      this.$toast("数据加载错误");
    }
  },

  methods: {
    async loadMore() {
      this.loading = true;
      // let { searchProvince, searchCity,searchIndustryid, searchId} = this,
      // name = this.nameInputConfig.changeText,
      // business = this.businessInputConfig.changeText,
      // newResult = [];
      // if( [searchProvince, searchIndustryid,searchId].some( ele=>[undefined,false,'',null].includes(ele) ) ){return}

      // newResult = await this.specialDataSearch(searchProvince, undefined , searchIndustryid , searchId, name, business, );
      // // this.searchDateList.concat(newResult);
      // if(!newResult){
      //     this.loading = true;
      //     return;
      // }

      // this.searchDateList.push(...newResult)
      // this.contentFix(this.searchDateList);
      this.loading = false;
    }
  }
};
</script>

<style lang="scss" scoped>

</style>