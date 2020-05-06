<template>
    <section :class="moduleClass">
        <el-collapse v-model="activeNames">
            <template v-for='(item,i) in modules'>
                <el-collapse-item :title="item.module" :name="item.module" v-if='item.module' :key='i' :class="item.class">
                    <FormMenu :params='item.params' :item='item.compObj' :init='init' />
                </el-collapse-item>
                <FormMenu :params='item.params' :item='item.compObj' v-else :key='i' :init='init'/>
            </template>
        </el-collapse>
    </section>
</template>
<script>
import FormMenu from './form-menu'
import {Collapse,CollapseItem} from 'element-ui'
export default {
    components:{
        FormMenu,
        [Collapse.name]:Collapse,
        [CollapseItem.name]:CollapseItem,
    },
    props:{
        modules:{
            type:Array,
            default(){
                return []
            }
        },
        moduleClass:{
            type:String,
            default:''
        },
        init:{
            type:[String,Function],
        }
    },
    watch:{
        modules:{
            handler(val){
                this.activeNames=val.filter(item=>item.active&&item.module).map(item=>item.module)
            },
            deep:true,
            immediate:true,
        }
    },
    data(){
        return {
            activeNames:[]
        }
    },
}
</script>
<style scoped lang='scss'>
/deep/.el-collapse-item{
    padding:10px;
    box-sizing: border-box;
}
/deep/.el-collapse-item__header{
    padding: 0 10px;
    box-sizing: border-box;
    font-size: 16px;
    font-weight:bold;
    background-color:#E5E3E0;
    // margin-bottom:15px;
    border-radius:5px;
}
/deep/.el-collapse-item__content{
    padding-bottom:0px;
    .cell-field:first-child{
        border-top:none;
    }
}
</style>