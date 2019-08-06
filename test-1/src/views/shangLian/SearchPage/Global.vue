<template>
    <div id="search_global">
        <chuke-msg />
    </div>
</template>

<script>
import chukeMsg from "@/views/chuke/Chuke-msg2.vue"; // 搜索框
export default {
    name:'searchGlobalPage',

    components:{
        chukeMsg,

    },

    data(){
        return{

        }
    },

    methods:{

    },
}
</script>

<style lang="scss">

#search_global{
    box-sizing: content-box;
    padding: 1%;
}

</style>
