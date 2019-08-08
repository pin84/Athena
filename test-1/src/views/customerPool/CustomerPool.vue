<template>
    <div id="customer-pool">

        <div class="g-header">
            <img class="header-img" :src="require('@/assets/icon/customerPoolHeader.png')" alt="">
        </div>

        <div class="g-setting_bar">
            <span>共推荐潜在客户: </span>
            <span class="iconfont">筛选&#xe64a;</span>
        </div>
    </div>    
</template>

<script>
export default {
    name:'CustomerPool'


}
</script>

<style lang="scss">

#customer-pool{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0.98rem;

    color:white;
    overflow: scroll;
    background: black;

    .g-header{
        height: 1.6rem;
        
        text-align: center;
        line-height: 1.6rem;
    }
        .header-img{
            vertical-align: middle;
            height: 0.5rem;
            width: auto;

        }

    .g-setting_bar{
        width:100%;
        text-align: justify;
        // text-align-last: justify;
        &>span{
            display: inline;
        }
        &::after{
            content:'';
            display:inline-block;
            width:100%;

        }
        
    }

}


</style>
