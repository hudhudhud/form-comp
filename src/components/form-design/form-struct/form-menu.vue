<template>
    <section>
        <component
        v-for='(it,i) in item.componentList' 
        :key='i'
        :is='it.comp' 
        v-model='it.item.value' 
        :item='it.item' 
        v-bind="it.attr" 
        v-on='it.events'
        v-show='it.item.show!==false'
        :jsCompleted='jsCompletedIn'
        @input='input($event,it.item)'
        :onlyShow="onlyShowIn">
        </component>
    </section>
</template>
<script>
import commonFunc from '../common.js'
import {storage} from '@/utils'
export default {
    props:{
        params:{
            type:Array,
            default(){
                return []
            }
        },
        item:{
            type:Object,
            default(){
                return {}
            }
        },
        init:{
            type:[String,Function],
        },
        jsCompleted:{
            type:Boolean,
            default:false,
        },
        onlyShow:{
            type:Boolean,
            default:false
        }
    },
    data(){
        return {
          //  compItem:this.item
          jsCompletedIn:false,
          onlyShowIn:false,
          formBuildCompleted:false,
        }
    },
    // activated(){
    //     this.fomrBuild()
    // },
    watch:{
        params:{
            handler(val){
                if(val&&val.length){
                   this.formBuild(this.item)
                }
            },
            deep:true,
            immediate:true,
        },
        init:{
            handler(val){
                if(val){
                    let func = this.setParam.bind(this)
                    let userInfo=storage.get('user-info')
                    let userId=userInfo?userInfo.userId:''
                    let payload={userId:userId,state:1000020,code:userInfo?userInfo.userTicket:'',workFlowId:
                    sessionStorage.getItem('workFlowId')}
                    if(typeof val=='function'){
                        if(!val.do){//初始化函数保证只执行一次
                            val(func,payload)
                            val.do=true
                        }
                    }
                    else if(typeof val=='string'&&typeof window[val]=='function'){
                        if(!window[val].do){//初始化函数保证只执行一次
                            window[val](func,payload)  
                            window[val].do=true
                        }
                    }
                }
            },
            immediate:true,
        },
        jsCompleted:{
            handler(val){
                this.jsCompletedIn=val
                if(val&&this.formBuildCompleted){
                    this.formSetEvents(this.item)
                }
            },
            immediate:true,
        },
        onlyShow:{
            handler(val){
                this.onlyShowIn=val
            },
            immediate:true,
        },
        formBuildCompleted(val){
            if(val&&this.jsCompleted){
                this.formSetEvents(this.item)
            }
        }
    },
    methods:{
        //回调处理
        input(...vals){
            let val=vals[0]
            let item=vals[1]
            if(item.callback){
                let paramObj={value:val,from:item.key,fromParam:item}
                if(typeof item.callback === 'function'){
                    item.callback(this.setParam.bind(this),paramObj)
                }
                else if(typeof window[item.callback]==='function'){
                    window[item.callback](this.setParam.bind(this),paramObj)
                }
            }
        },
        //构建表单
        formBuild(currentItem){
            let componentList=[]
            this.params.forEach((param,i)=>{
                let comp={}
                comp.key=param.key
                comp.type='form-'+param.type.toLowerCase()
                //本身已经有组件生成了的，则用已经生成了的数据，否则会被原来的空数据替换。。
                if(currentItem.componentList&&currentItem.componentList[i]){
                    comp.item=JSON.parse(JSON.stringify(currentItem.componentList[i].item))
                }
                else{
                    comp.item=JSON.parse(JSON.stringify(param))
                }
                //绑定属性和事件
                commonFunc.setParamForEventAtt(param,comp)
                //加载组件
                let mod;
                try{
                    mod = require(`../form-components/${comp.type}`)
                }
                catch(e){
                    mod = require(`../form-components/error`)
                }
                finally{
                    comp.comp=mod.default || mod
                }
                // comp.comp = ()=> {
                //     return new Promise((resolve,reject)=>{
                //         //按需加载，与require的区别是require是赋值过程，同步的
                //         let instance = import(`../form-components/${comp.type}`)
                //         instance.then(res=>{
                //             resolve(res)
                //         })
                //         instance.catch(e=>{
                //             resolve(import(`../form-components/error`))
                //         })
                //     })
                // }
                componentList.push(comp)
            })
            currentItem.componentList=componentList
            this.formBuildCompleted=true
            console.log('reBuild.........form-menu',currentItem)
        },
        //js加载完成后重新绑定属性和事件
        formSetEvents(currentItem){
            this.params.forEach((param,i)=>{
                let comp=currentItem.componentList.find(it=>it.key===param.key)
                if(comp){
                    commonFunc.setParamForEventAtt(param,comp)
                }
            })
        },
        //重置表单属性
        setParam(paramsAry){
            console.log('reSetFormJs.........')
            paramsAry.forEach(rejs=>{
                let changeParam=this.params.find(item=>item.key===rejs.key)
                let changeCompItem = this.item.componentList.find(item=>item.key===rejs.key)
                let newParam={}
                if(changeParam){
                    //明细组件重置
                    if(changeParam.type==='detail'){
                        let tempjs = JSON.parse(JSON.stringify(rejs))
                        delete tempjs['params']
                        Object.keys(tempjs).forEach(key=>{
                            this.$set(changeCompItem.item,key,tempjs[key])
                        })
                        if(rejs.params&&rejs.params.length){
                           this.setDetailParam(rejs.params,changeCompItem)
                        }
                        return
                    }
                    //组件重置
                    else{
                        Object.assign(newParam,JSON.parse(JSON.stringify(changeParam)),rejs)
                    }
                }
                if(changeCompItem){
                    changeCompItem.item=newParam
                    commonFunc.setParamForEventAtt(rejs,changeCompItem)
                    //数据对象太深影响界面更新，需要强制更新
                    this.$forceUpdate();
                }
            })
        },
        //重置表单明细属性
        setDetailParam(paramsAry,comp){
            console.log('reSetFormJs.........detail')
            paramsAry.forEach(rejs=>{
                let changeParam=comp.item.params.find(item=>item.key===rejs.key)
                if(changeParam){
                    Object.keys(rejs).forEach(key=>{
                        this.$set(changeParam,key,rejs[key])
                    })
                }
                commonFunc.setParamForEventAtt(rejs,comp)
            })
        },
    }
}
</script>
<style scoped lang='scss'>
//组件公共样式
*{
    box-sizing: border-box
}
/deep/.cell-field{
    box-sizing: border-box;
    overflow-x: hidden;
    &:last-child{
        border-bottom: none !important;
    }
    display: flex;
    width:100%;
    min-height: 48px;
    line-height: 1;
    padding: 0 10px;
    font-size: 16px;
    align-items: center;
    border-top:1px solid #d9d9d9;
    .cell-title{
        width:80px;
        line-height: 1.3;
        padding: 5px 0;
        text-align: right;
        padding-right:10px;
        font-size: 14px;
        box-sizing: border-box;
        word-break: break-all;
        &.required:before{
            content:"*";
            display: inline-block;
            color:red;
            font-size:12px;
            padding-right:5px;
            font-weight: bold
        }
    }
    .cell-value{
        display: flex;
        flex: 1;
        align-items: center;
        font-size: 14px;
        input[type=text]{
            appearance: none;
            border-radius: 0;
            border: 0;
            box-flex: 1;
            flex: 1;
            outline: 0;
            line-height: 1.6;
            font-size: inherit;
            width: 100%;
            font-size: 14px;
        }
        .p-only-show{
            line-height: 1.5;
            word-break: break-all;
        }
    }
    position:relative
    .error-info{
        position:absolute;
        bottom:0;
        left:115px;
        color:red;
        font-size:10px;
    }
    &:last-child{
        border-bottom:1px solid #d9d9d9;
    }
}

</style>