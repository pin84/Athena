<template>
<!-- 这是企业认证提示的页面 s -->
<com-pop :my-index="'autExplain'">
<!-- @close="maskShow(item)" -->
<template v-slot:pop-content>
    <!-- 这里是中间内容插槽 -->                                        
    <div class="con-title">企业认证</div>    
    
    <div class="con-content cert-content">
        <div class="cert-tips">设为我的企业需要认证</div>
        <div class="cert-sub">认证后可获得功能：</div>
        <p class="cert-des">
                1、入驻成为供应商家（上链），面向几千万企业资源，
                通过算法获得推荐。<br>
                2、每天新发布几万条采购招标信息，精准匹配免费推
                送到手机微信。<br>
                3、系统辅助算法可进行精准营销推送，包括邮件、短
                信。<br>
                4、不限量浏览上下链企业自画像。<br>
                5、发布企业动态、关注重点企业为链圈。<br>
                6、发布采购选型报价公告。<br>
                7、邀请同事同步管理。<br>
        </p>
    </div>
</template>
<template v-slot:flex-left>
</template>
<template v-slot:flex-right>
    <foot-btn>
        <div class="radiusBtn" @click="popIsShow('cert'),popIsShow('cert-ing')">
            去认证
        </div>
    </foot-btn>
</template>
</com-pop>
<!-- 这是企业认证提示的页面 e -->

</template>

<script>

import ComPop from '../../../components/common/ComPop'
import FootBtn from '../../../components/common/FootBtn'

export default {

    components:{
        ComPop,
        FootBtn,

    }
}
</script>