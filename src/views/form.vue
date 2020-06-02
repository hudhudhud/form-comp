<template>
    <section class="work-flow-form">
        <div class="form-content" v-if='initCompleted'>
            <div v-if='formStruct.descHtml' v-html='formStruct.descHtml'>
                {{formStruct.descHtml}}
            </div>
            <FormMenuModule  v-if='showAsModule' :modules='modules' :class="formStruct.class" :init='initFun' :jsCompleted='jsCompleted' :onlyShow='isEdit&&!hasEditPermission'/>
            <FormMenu v-else :params='formStruct.params' :item='compObj'  :init='initFun' :jsCompleted='jsCompleted' :onlyShow='isEdit&&!hasEditPermission'/>
        </div>
        <div class="btns" v-if='initCompleted'>
            <el-button type="primary" @click='submit' v-if='!isEdit||hasEditPermission' :loading="btnLoading">提交</el-button>
            <el-button type="default" @click='goBack'>返回</el-button>
        </div> 
    </section>
</template>
<script>
// import {Button} from 'mint-ui'
import {storage,setDocumentTitle} from '@/utils'
// import Request from '@/utils/request'
// import { WORK_FLOW_FORM,WORK_FLOW_FORM_SAVE,WORK_FLOW_GET_FORMDATA } from '../api'
import FormMenu from '../components/form-design/form-struct/form-menu'
import FormMenuModule from '../components/form-design/form-struct/form-menu-module'
import {isEmpty} from '@/utils/index.js'
// import {Button} from 'element-ui'

export default {
    components:{
        // [Button.name]:Button,
        FormMenu,
        FormMenuModule,
    },
    data(){
        return {
            btnLoading:false,
            initFun:'',
            compObj:{},
            jsCode:"",
            cssCode:"",
            formStruct11:
            {
                "modules":[
                    {
                        module:'基础信息',
                        active:true,//默认展开项
                        "class":'cls-cols',
                        "params":[
                            {
                                "type":"input",
                                "key":"name",
                                "label":"姓名",
                                "require":true,
                                "callback":'test',
                            },
                            {
                                "type":"input",
                                "key":"age",
                                "label":"年龄" ,
                                "require":true
                            },
                            {
                                "type": "radio",
                                "label":'性别',
                                // "value":1,
                                "key":'sex',
                                // "require":true,
                                "options":[
                                    {value:0,'label':'男'},
                                    {value:1,'label':'女'},
                                ],
                                "labelKey":'label',//默认label
                                "valueKey":'value',//默认value
                                "direction":"row", //row,column 默认row
                                "callback":'change'
                            },
                            {
                                "type": "checkboxGroup",
                                "label":'兴趣爱好',
                                "value":[0,1],
                                "key":'love',
                                // "require":true,
                                "options":[ {value:0,name:'足球'},
                                            {value:1,name:'篮球'},
                                            {value:2,name:'羽毛球'},
                                            {value:3,name:'毛球'},],
                                "labelKey":'name',//默认label
                                "valueKey":'value',//默认value
                                "direction":"column", //row,column 默认row
                                "callback":'change',
                            },
                            {
                                "type":"detail",
                                "key":"oneDetail",
                                "title":"1个字段",
                                "mode":"simple",// simple:1个字段，mutiple:多个字段，pop:弹出页面,
                                "params":[{
                                    "key":"school",
                                    "type":"input" ,
                                    "label":"学校",
                                    // "require":true,
                                    "value":''
                                }],
                                // "defaultValue":[
                                //     {
                                //         "school":1,
                                //     },
                                //     {
                                //         "school":2,
                                //     }
                                // ]
                            },]
                    },
                    {
                        module:'其他信息',
                        active:false,
                        "params":[
                            {
                                "type":"input",
                                "key":"name11",
                                "label":"姓名11",
                            },
                            {
                                "type":"input",
                                "key":"age11",
                                "label":"年龄11" ,
                            }]
                    },
                    {
                        module:'',
                        "params":[
                            {
                                "type":"input",
                                "key":"name11333",
                                "label":"姓名113333",
                            }]
                    }
                ],
                "class":'modu-class',
                "init":'init',
                "beforeSubmit":function(res,submit){
                    console.log('i m submiting...',res)
                    setTimeout(()=>{
                        submit()
                    },1000)
                },
            },
            formStruct:{},
            modules:[],
            showAsModule:false,
            formInfo:{},
            userId:'',
            userInfo:{},
            initCompleted:false,//保证数据都组装完成才开始加载组件，否则因进入页面组件先初始化而找不到js函数等问题
            elements:{}, //动态追加的元素
            jsCompleted:false,
            isEdit:false,
            hasEditPermission:false,
            editDataObj:{}   
        }
    },
    beforeRouteEnter(to, from, next) {
        next(async (vm) => {
            // vm.$Indicator.open()
            // vm.userInfo=storage.get('user-info')
            // vm.userId=vm.userInfo?vm.userInfo.userId:''
            //预览文件返回，不需要重新加载
            if(from.name==='work-flow-file'){
                return
            }
            if(to.name==='form'){
                vm.formStruct=require('./test.json')
                vm.isEdit=false
                vm.dataInit()
            }
            else if(to.name==='form-edit'){
                vm.isEdit=true
               // await vm.getEditData()
               // await vm.dataInit()
            }
        });
    },
    watch:{   
    },
    methods:{
        async dataInit(){
            this.initCompleted=false
            this.initFun=''
            // this.formStruct={}
            this.compObj={}
            this.modules=[]
            this.elements={}

            // this.$Indicator.open();
            // try{
            //     let params = {orunid:this.$route.params.orunid,empNumber:this.userId}
            //     if(this.isEdit){
            //         let systemId = this.$route.params.systemId
            //         let workFlowId = this.$route.params.workFlowId
            //         params = {systemId,workFlowId,empNumber:this.userId}
            //     }
            //     let res = await Request.post(WORK_FLOW_FORM,params)
            //     if(res.success){
            //         let temp = JSON.parse(res.data.form)
            //         this.formStruct=temp
            //         this.jsCode=res.data.js
            //         this.cssCode=res.data.css
            //         this.formInfo=res.data
            //         setDocumentTitle(this.formInfo.title)
            //     }
            //     else{
            //         this.$toast(res.message)
            //     }
            // }
            // // catch(e){
            // //     this.$toast("异常："+e)
            // // }
            // finally{
            //     this.$Indicator.close()
            // }
            
        
            //是模块类型结构，需要组装每个模块的组件数据
            if(this.formStruct.modules){
                this.showAsModule=true
                this.modules=this.formStruct.modules.map(item=>{
                    item.compObj={componentList:[]}
                    return item
                })
            }
            else{//否则为单个数据
                this.compObj={componentList:[]}
            }

            if(this.isEdit){this.editDataInit()}

            this.initCompleted=true
            
            //让界面先渲染再加载js，否则js有问题会影响整个界面渲染失败，白屏
            if(this.cssCode){
                let ele = document.createElement('style')
                ele.type = "text/css";
                ele.innerHTML=this.cssCode
                document.documentElement.appendChild(ele)
                this.elements.css=ele
            }
            if(this.jsCode){
                //默认加载jquery
                let eleJq = document.createElement('script')
                eleJq.src='jquery-3.1.0.js'
                document.documentElement.appendChild(eleJq)
                await (new Promise((res,rej)=>{
                    eleJq.onload=()=>{
                        this.elements.jquery=eleJq
                        res()
                    }
                }))
                //jquery加载成功才加载js
                let ele = document.createElement('script')
                ele.type = "text/javascript";
                ele.innerHTML=this.jsCode
                document.documentElement.appendChild(ele)
                this.jsCompleted=true
                this.elements.js=ele
            }

            //有注入初始js则直接setParam
            if(this.formStruct.init&&!this.isEdit){
                sessionStorage.setItem('workFlowId',this.formInfo.workFlowId)
                this.initFun=this.formStruct.init
                // let func=this.setParam.bind(this)
                // let payload={userId:this.userId,state:1000020,code:this.userInfo?this.userInfo.userTicket:''}
                // if(typeof this.formStruct.init=='function'){
                //     this.formStruct.init(func,payload)
                // }
                // else if(typeof this.formStruct.init=='string'&&typeof window[this.formStruct.init]=='function'){
                //     window[this.formStruct.init](func,payload)
                // }
            }
         
        },
        async getEditData(){
            let docId = this.$route.params.docId
            let systemId = this.$route.params.systemId
            let workFlowId = this.$route.params.workFlowId
            // this.$Indicator.open();
            // try{
                // let res = await Request.post(WORK_FLOW_GET_FORMDATA,{docId,systemId,workFlowId,empNumber:this.userId})
                // if(res.success){
                //    this.editDataObj=res.data
                //    if(res.currentEmpNumber){
                //        this.hasEditPermission = res.currentEmpNumber.toLocaleLowerCase().indexOf(this.userId)>-1
                //    }
                // }
                // else{
                //     this.$toast(res.message)
                // }
            // }
            // catch(e){
            //     this.$toast("获取数据异常："+e)
            // }
            // finally{
            //     this.$Indicator.close()
            // }
        },
        submit(){
            let res={}
            if(this.showAsModule){
                for(let mod of this.modules){
                    let result = this.submitValid(mod.compObj.componentList,res)
                    if(!result)return
                }
                console.log('compObj',this.modules)
            }
            else{
                let result = this.submitValid(this.compObj.componentList,res)
                if(!result)return
                console.log('compObj',this.compObj.componentList)
               
            }
            //提交前是否需要执行注入的提交函数
            let isGoSubmit=true
            if(this.formStruct.beforeSubmit){
                if(typeof this.formStruct.beforeSubmit=='function'){
                    isGoSubmit=this.formStruct.beforeSubmit(res)
                }
                else if(typeof this.formStruct.beforeSubmit=='string'&&typeof window[this.formStruct.beforeSubmit]=='function'){
                    isGoSubmit=window[this.formStruct.beforeSubmit](res)
                }
            }
            console.log('submit',res)
            // return
            if(!this.userId){
                this.$toast('请先登录！','','middle', 2500)
                return
            }
            if(!isGoSubmit) return

            //改成formData
            let formData= new FormData()
            formData.append('systemId',this.formInfo.systemId)
            formData.append('workFlowId',this.formInfo.workFlowId)
            formData.append('empNumber',this.userId)
            if(this.isEdit){
                if(this.$route.params.docId){
                    formData.append('docId',this.$route.params.docId)
                }
                else{
                    this.$toast("参数错误，docId为空！")
                    return
                }
            }
            //append文件
            for(let key in res){
                let item=res[key]
                if(Array.isArray(item)&&item.length){
                    let files = item.filter(it=>Object.prototype.toString.call(it)==='[object File]')
                    if(files.length){
                        files.forEach(it=>{
                            formData.append(key,it)
                            item.splice(item.indexOf(it),1)
                        })
                        //避免data参数里还有文件key值
                        if(item.length==0){
                            delete res[key]
                        }
                    }
                }
            }            
            formData.append('data',JSON.stringify(res))

            // this.$Indicator.open();
            this.btnLoading=true
            let config = {
                headers: {'Content-Type': 'multipart/form-data'}
            }
            // Request.post(WORK_FLOW_FORM_SAVE,formData,config)
            // .then(res=>{
            //     if(res.success){
            //         this.$toast('保存成功！','','middle', 1500)
            //         setTimeout(()=>{
            //             window.history.go(-1)
            //             this.btnLoading=false
            //         },1500)
            //     }
            //     else{
            //         this.$toast(res.message)
            //     }
            // })
            // .catch(e=>{
            //    this.btnLoading=false
            // })
            // .finally(()=>{
            //     this.$Indicator.close();
            // })                       
        },
        submitValid(list,res){
            for(let comp of list){
                if(comp.item.show===false){
                   continue
                }
                res[comp.item.key]=comp.item.value
                //是undefined的赋值空字符串，后端要求
                if(res[comp.item.key]==undefined){
                    res[comp.item.key]=''
                }
                //过滤数组里的空对象
                if(Array.isArray(res[comp.item.key])&&res[comp.item.key].length){
                    if(typeof res[comp.item.key][0] == 'object'){
                        res[comp.item.key]=res[comp.item.key].filter(it=>
                        (Object.prototype.toString.call(it)==='[object File]')||Object.keys(it).length>0)
                    }
                }
                if(comp.item.type!=='detail'){
                    if(comp.item.require&&isEmpty(comp.item.value)){
                        console.log('submit...error',res)
                        this.$toast('请输入'+comp.item.label)
                        return false
                    }     
                }
                else{
                    //明细必填校验
                    if(res[comp.item.key]&&res[comp.item.key].length){
                        let temp=res[comp.item.key]//供文件用
                        res[comp.item.key]=JSON.parse(JSON.stringify(res[comp.item.key]))//新上传的文件对象丢失
                        for(let obj of res[comp.item.key]){
                            for(let para of comp.item.params){
                                if(para.show===false){
                                    delete obj[para.key];
                                    continue
                                }
                                //是undefined的赋值空字符串，后端要求
                                if(obj[para.key]==undefined){
                                    obj[para.key]=''
                                }
                                //过滤数组里的空对象
                                if(Array.isArray(obj[para.key])&&obj[para.key].length){
                                    if(typeof obj[para.key][0] == 'object'){
                                        obj[para.key]=obj[para.key].filter(it=>
                                        (Object.prototype.toString.call(it)==='[object File]')||Object.keys(it).length>0)
                                    }
                                }
                                //必填检查
                                if(para.require&&isEmpty(obj[para.key])){
                                    console.log('submit...error',res)
                                    this.$toast('请输入'+para.label)
                                    return false
                                }
                            }
                        }
                        //检查文件
                        let i=0;
                        for(let obj of temp){
                            i++
                            for(let para of comp.item.params){
                                if(para.type.toLocaleLowerCase()==='fileupload'){
                                    if(Array.isArray(obj[para.key])&&obj[para.key].length){
                                        //detailKey_fileKey_num
                                        let files = obj[para.key].filter(it=>Object.prototype.toString.call(it)==='[object File]')
                                        if(files.length){
                                            res[comp.item.key+'_'+para.key+'_'+i]=files
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                //正则校验
                if(comp.item.show!==false&&comp.item.rules&&comp.item.rules.length){
                    for(let rule of comp.item.rules){
                        if(rule.regexp&&comp.item.value){
                            let reg = new RegExp(rule.regexp,'gm')
                            if(!reg.test(comp.item.value)){
                                console.log('submit...error',res)
                                this.$toast(rule.message?rule.message:(comp.item.label+'输入格式有误'))
                                return false
                            }
                        }
                    }
                }
            }
            return true
        },
        editDataInit(){
            let editObj = this.editDataObj
            if(!this.showAsModule){
                let params = this.formStruct.params
                Object.keys(editObj).forEach(key=>{
                    let findItem = params.find(it=>it.key===key)
                    if(findItem){
                        let compType = findItem.type.toLocaleLowerCase()
                        if(compType!=='detail'){
                            findItem.value=editObj[key]
                        }
                        else{//明细类型赋初始值
                            findItem.defaultValue=editObj[key]
                        }
                    }
                })
            }
            else{
                this.formStruct.modules.forEach(mod=>{
                    let params = mod.params
                    Object.keys(editObj).forEach(key=>{
                        let findItem = params.find(it=>it.key===key)
                        if(findItem){
                            let compType = findItem.type.toLocaleLowerCase()
                            if(compType!=='detail'){
                                findItem.value=editObj[key]
                            }
                            else{//明细类型赋初始值
                                findItem.defaultValue=editObj[key]
                            }
                        }
                    })
                })
            }
        },
        goBack(){
            window.history.go(-1)
        },
        setParam(paramsAry){
            console.log('init setParam.........')
            paramsAry.forEach(rejs=>{
                if(this.showAsModule){
                    this.formStruct.modules.forEach(mod=>{
                        let changeCompItem=mod.params.find(item=>item.key===rejs.key)
                        if(changeCompItem){
                            this.setParamCommon(rejs,changeCompItem)
                        }
                    })
                }
                else{
                    let changeCompItem=this.formStruct.params.find(item=>item.key===rejs.key)
                    if(changeCompItem){
                       this.setParamCommon(rejs,changeCompItem)
                    }
                }
            })
        },
        //初始化直接重置formStruct
        setParamCommon(rejs,changeComp){
            //属性和事件按值覆盖
            if(rejs.attributes&&rejs.attributes.length){
                changeComp.attributes=changeComp.attributes?changeComp.attributes:[]
                rejs.attributes.forEach(at=>{
                    let item=changeComp.attributes.find(it=>it.name==at.name)
                    if(item){
                        item.value=at.value
                    }
                    else{
                        changeComp.attributes.push(at)
                    }
                })
                delete rejs.attributes
            }
            if(rejs.events&&rejs.events.length){
                changeComp.events=changeComp.events?changeComp.events:[]
                rejs.events.forEach(ev=>{
                    let item=changeComp.events.find(it=>it.name==ev.name)
                    if(item){
                        item.handler=ev.handler
                    }
                    else{
                        changeComp.events.push(ev)
                    }
                })
                delete rejs.events
            }
            Object.assign(changeComp,rejs)
        }
    },
    beforeRouteLeave(to,from,next){
        //移除所有动态添加的元素
        Object.keys(this.elements).forEach(key=>{
            if(this.elements[key]){
                this.elements[key].remove()
            }
        })
        next()
        //移除所有禁止滚动的类
        if(document.body.classList.contains('overflow-hidden')){
            document.body.classList.remove('overflow-hidden')
        }
        if(document.body.style&&document.body.style.overflow=='hidden'){
            document.body.style.overflow=''
        }
    }
}
</script>

<style scoped lang='scss'>
.work-flow-form{
    width: 100%;
    padding-bottom:60px;
    .btns{
        position:fixed;
        left:0;
        right:0;
        bottom:0;
        height:50px;
        box-shadow: 0 -5px 10px rgba(0,0,0,0.1);
        display:flex;
        justify-content: space-around;
        align-items: center;
        background-color:#fff;
    }
}
</style>