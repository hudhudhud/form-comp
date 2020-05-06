<template>
    <input type="hidden" v-model='txt' :data-key="item.key">
</template>
<script>
export default {
    props:{
        value:'',
        item:{
            type:Object,
            default(){
                return {}
            }
        },
    },
    watch:{
        value:{
            handler(val){
                this.txt=val
            },
            immediate:true,
        },
        txt(val){
            this.$emit('input',val)
        }
    },
    data(){
        return {
            txt:this.value,
        }
    },
}
</script>