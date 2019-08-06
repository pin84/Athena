import axios from 'axios'
import api from '../../api/api'

export default {


  toStr: () => {

    return 'a'
  },

  async  showDetail(item_id, token) {
    let res = await axios
      .get(`${api.detailContent}${item_id}/`, {
        params: {
          token
        }
      })

      if (res.data.message === false) {
        // this.isShowDetail = "limit";
        return false
      } else {
        // this.detailData = item;
        // this.isShowDetail = "detail";
        let reg = /class=".*?"|id=".*?"/g;
        let content = res.data.BidsContent[0].replace(reg, "");
        
        


      return content
    }
  },


  searchKeyword(keyword) {
    let hs = localStorage.getItem("historySearch");
    if (hs === null) {
      localStorage.setItem("historySearch", keyword);
    } else {
      let tem = hs.split(",");

      tem.unshift(keyword);
      let set = new Set(tem)
      let arr = Array.from(set)
      if(arr.length > 8 ){
        arr.pop()
      }
     
      console.log(`===arr====`,arr );


      localStorage.setItem("historySearch", arr.join());
    }

  },

}