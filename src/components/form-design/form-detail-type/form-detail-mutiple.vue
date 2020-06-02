<template>
    <section>
         <mt-cell :title="item.title">
            <i class="fa fa-plus-circle" aria-hidden="true" @click='addDetail' v-if='!onlyShowIn'></i>
        </mt-cell>
        <el-collapse v-model="activeNames">
            <div v-for='(det,i) of list' :key='i' class="form-detail form-detail-mutiple">
                <el-collapse-item :title="item.title+(i+1)" :name="i+1">
                    <template slot="title">
                        <div  class="form-detail-title">
                            <span class="title">{{item.title+(i+1)}}</span>
                            <span class="del-btn" @click.stop='delDetail(i)' v-if='!onlyShowIn'>删除</span>
                        </div>
                    </template>
                    <FormMenu  :params="item.params" :item='det' :onlyShow="onlyShowIn"/>
                </el-collapse-item>
            </div>
        </el-collapse>
    </section>
</template>
<script>
// import {Cell} from 'mint-ui'
// import {Collapse,CollapseItem} from 'element-ui'
import FormMenu from '../form-struct/form-menu'
import commonFunc from '../common.js'
export default {
    components:{
        // [Cell.name]:Cell,
        // [Collapse.name]:Collapse,
        // [CollapseItem.name]:CollapseItem,
        FormMenu,
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
        "item.params":{
            handler(val){
                //没有默认值时，默认给一行
                if(!this.list.length){
                    if(!this.item.defaultValue||!this.item.defaultValue.length){
                        this.list.push({componentList:[]})
                        this.activeNames.push(this.list.length)
                    }
                }
                else{
                    //重置params
                    this.list.forEach((comp,i)=>{
                        comp.componentList.forEach(compItem=>{
                            let changeParam = val.find(it=>it.key===compItem.item.key)
                            if(changeParam){
                                commonFunc.setParamForEventAtt(changeParam,compItem)//事件和属性按值赋
                                Object.assign(compItem.item,changeParam)//item赋值
                                this.$set(this.list,i,{componentList:comp.componentList})
                            }
                        })
                    })
                }
            },
            deep:true,
            immediate:true,
        },
        "item.defaultValue":{
            handler(val){  
              if(val&&val.length){
                  val.forEach(it=>{
                    let newItem={componentList:[]}
                    this.list.push(newItem)
                   // 有默认值就不展开
                   // this.activeNames.push(this.list.length)
                    this.$nextTick(()=>{
                        if(newItem.componentList.length){
                            Object.keys(it).forEach(key=>{
                                let com=newItem.componentList.find(comp=>comp.item.key===key)
                                if(com){
                                    if(typeof it[key] === 'object'){
                                        this.$set(com.item,"value",JSON.parse(JSON.stringify(it[key])))
                                    }
                                    else{
                                        this.$set(com.item,"value",it[key])
                                    }
                                }
                            })
                        }
                    })
                  })
              }
            },
            deep:true,
            immediate:true,
        },
        list:{
            handler(val){
               let res=[]
                val.map(comp=>{
                    let obj={}
                    comp.componentList.forEach(comp=>{
                        obj[comp.item['key']]=comp.item['value']
                    })
                    res.push(obj)
                })
                this.$emit('input',res)
            },
            deep:true,
            immediate:true,
        },
        onlyShow:{
            handler(val){
                this.onlyShowIn=val
                if(val){
                    this.activeNames=[]
                }
            },
            immediate:true,
        }
    },
    data(){
        return {
            list:[],
            activeNames:[],
            onlyShowIn:false,
        }
    },
    methods:{
        addDetail(){
            let newItem={componentList:[]}
            this.list.push(newItem)
            this.activeNames.push(this.list.length)
            setTimeout(()=>{
                let eles =  document.getElementsByClassName('form-detail-mutiple')
                if(eles.length){
                    this.activeNames=[eles.length]
                    window.scrollTo(0,eles[eles.length-1].getBoundingClientRect().top)
                }
            },200)
        },
        delDetail(i){
            this.list.splice(i,1)
        },
    }
}
</script>
<style scoped lang='scss'>
.form-detail{
    background-color:#FBFBFB;
    padding:0 20px;
    /deep/.mint-cell{
        background-color:#FBFBFB;
    }
    /deep/.el-collapse-item__header{
        min-height :48px;
        height: auto;
    }
    /deep/.el-collapse-item__content{
        padding-bottom:0;
    }
    /deep/ .el-collapse-item__header,/deep/.el-collapse-item__wrap{
        background-color:unset;
    }
    /deep/.el-collapse-item{
        border-bottom: 1px solid #ebeef5;
    }
    .form-detail-title{
        display: flex;
        justify-content: space-between;
        width: 55%;
        line-height :1.2;
        padding:5px 0;
        .title{
           width:80%;
        }
        .del-btn{
            text-align: center;
            font-size:12px;
            color:blue;
        }
    }
}
</style>