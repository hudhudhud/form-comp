<template>
    <section>
        <FormDetailSimple v-if='item.mode=="simple"' :item='item' v-model="detailList" :onlyShow="onlyShowIn"/>
        <FormDetailMutiple v-else-if='item.mode=="mutiple"' :item='item' v-model="detailList" :onlyShow="onlyShowIn"/>
        <FormDetailPop v-else-if='item.mode=="pop"' :item='item' v-model="detailList" :onlyShow="onlyShowIn"/>
    </section>
</template>
<script>
import FormDetailSimple from '../form-detail-type/form-detail-simple'
import FormDetailMutiple from '../form-detail-type/form-detail-mutiple'
import FormDetailPop from '../form-detail-type/form-detail-pop'
export default {
    components:{
        FormDetailSimple,
        FormDetailMutiple,
        FormDetailPop
    },
    props:{
        value:'',
        item:{
            type:Object,
            default(){
                return {}
            }
        },
        onlyShow:{
            type:Boolean,
            default:false
        }
    },
    watch:{
        value:{
            handler(v){
                this.detailList=v
            },
            deep:true,
            immediate:true,
        },
        detailList:{
            handler(v){
                // console.log('9999999999',v)
                this.$emit('input',v)
            },
            deep:true,
            immediate:true,
        },
        onlyShow:{
            handler(val){
                this.onlyShowIn=val
            },
            immediate:true,
        }
    },
    data(){
        return {
            detailList:[],
            onlyShowIn:false,
        }
    }
}
</script>