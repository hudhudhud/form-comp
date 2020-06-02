<template>
    <section class="form-detail-pop">
         <mt-cell :title="item.title">
            <i class="fa fa-plus-circle" aria-hidden="true" @click='addDetail' v-if='!onlyShowIn'></i>
        </mt-cell>
        <el-collapse v-model="activeNames">
            <div v-for='(det,i) of list' :key='i' class="form-detail">
                <el-collapse-item :title="item.title+(i+1)" :name="i+1">
                    <template slot="title">
                        <div  class="form-detail-title">
                            <span class="title">{{item.title+(i+1)}}</span>
                            <span @click.stop='editDetail(i)' class="edit-btn" v-if='!onlyShowIn'>编辑</span>
                        </div>
                    </template>
                    <table class="table-detail" >
                        <template v-for='(comp,i) of det.componentList'>
                            <tr :key='i' v-if='comp.item.show!==false'>
                                <td class="label">{{comp.item.label}}:</td>
                                <!-- 单个checkbox -->
                                <td v-if='comp.type=="form-checkbox"'>
                                    <span>{{comp.item.value?'是':'否'}}</span>
                                </td>
                                <td v-else-if='comp.type=="form-fileupload"'>
                                    <template v-if='comp.item.showValue'>
                                        <el-tag v-for="(filename,i) in comp.item.showValue.split(',')" :key="i" effect="plain">
                                            {{filename}}
                                        </el-tag>
                                    </template>
                                    <span v-else >无</span>
                                </td>
                                <!-- 有数据源需要匹配值取到显示文本显示 -->
                                <td v-else-if='comp.item.options||comp.type=="form-addressbook"'>
                                    {{comp.item.showValue}}
                                </td>
                                <td v-else>{{comp.item.value}}</td>
                            </tr>
                        </template>
                    </table>
                </el-collapse-item>
            </div>
        </el-collapse>
        <mt-popup v-model="popVisible" position="right" :modal='false'>
            <div class="top-header">   
                <div class="pop-back-position" @click='popVisible=false'></div>
                <!-- <span @click="popVisible=false">取消</span> -->
                <span></span>
                <span v-if='isAdd'>{{item.title}}</span>
                <span v-else>编辑{{item.title}}</span>
                <span></span>
                <!-- <span v-if='isAdd'  @click='saveDetail'>保存</span> -->
                <!-- <span v-else></span> -->
            </div>
            <div class="content">
                <FormMenu  :item='tempDetail' :params='item.params' ref='formMenu'/>
            </div>
            <div class="btns">
                <template v-if='!isAdd'>
                    <mt-button type="danger" @click='confirmDialogVisible=true' class="del">删除</mt-button>
                    <mt-button  @click='popVisible=false' class="commit">取消</mt-button>
                    <mt-button type="primary" @click='editDetailSave' class="commit">完成</mt-button>
                </template>
                <template v-else>
                    <mt-button  @click='popVisible=false' class="commit">取消</mt-button>
                    <mt-button type="primary" @click='saveDetail' class="commit">保存</mt-button>
                </template>
            </div>
        </mt-popup>
        <el-dialog title="提示" :visible.sync="confirmDialogVisible" width="70%" :append-to-body="true" :modal='false'
        custom-class='form-detail-pop-confirm-pop'> 
            <span>确认删除？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="confirmDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="delDetail">确 定</el-button>
            </span>
        </el-dialog>
        <div v-show='false'>
            <FormMenu  :item='det' :params='item.params' v-for='(det,i) of list' :key='i' />
        </div>
        <div class="pop-bg" v-if='popVisible'></div>
    </section>
</template>
<script>
// import {Cell,Popup,Button} from 'mint-ui'
// import {Collapse,CollapseItem,Tag,Dialog,Button as ELButton} from 'element-ui'
import FormMenu from '../form-struct/form-menu'
import {isEmpty} from '@/utils/index.js'
export default {
    components:{
        // [Cell.name]:Cell,
        // [Popup.name]:Popup,
        // [Button.name]:Button,
        // [Collapse.name]:Collapse,
        // [CollapseItem.name]:CollapseItem,
        // [Tag.name]:Tag,
        FormMenu,
        // [ELButton.name]:ELButton,
        // [Dialog.name]:Dialog
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
                    //this.activeNames.push(this.list.length)
                    this.$nextTick(()=>{
                        this.$refs['formMenu'].formBuild(newItem)
                        if(newItem.componentList.length){
                            Object.keys(it).forEach(key=>{
                                let com=newItem.componentList.find(comp=>comp.item.key===key)
                                if(com){
                                    this.$set(com.item,"value",it[key])
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
        popVisible(val){
            if(val){
                document.body.style.overflow='hidden'
            }
            else{
                document.body.style.overflow=''
            }
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
            currentDetailIndex:-1,
            popVisible:false,
            isAdd:false,
            tempDetail:{},
            confirmDialogVisible:false,
            onlyShowIn:false,
        }
    },
    methods:{
        addDetail(){
            this.tempDetail={componentList:[]}
            this.$refs["formMenu"].formBuild(this.tempDetail)
            this.popVisible=true
            this.isAdd=true
        },
        saveDetail(){
            if(!this.saveValid())return
            //文件不能json.parse
            //let newItem=JSON.parse(JSON.stringify(this.tempDetail))
            this.list.push(this.tempDetail)
            this.activeNames.push(this.list.length)
            this.popVisible=false
        },
        async delDetail(){
            this.list.splice(this.currentDetailIndex,1)
            this.confirmDialogVisible=false
            this.popVisible=false
        },
        editDetail(i){
            this.isAdd=false
            this.popVisible=true
            this.currentDetailIndex=i
            //文件不能json.parse
            this.tempDetail=this.copy(this.list[this.currentDetailIndex])//JSON.parse(JSON.stringify(this.list[this.currentDetailIndex]))
            this.$refs["formMenu"].formBuild(this.tempDetail)
        },
        editDetailSave(){
            if(!this.saveValid())return
            //文件不能json.parse
            //this.$set(this.list,this.currentDetailIndex,JSON.parse(JSON.stringify(this.tempDetail)))
            this.$set(this.list,this.currentDetailIndex,this.copy(this.tempDetail))
            this.popVisible=false
        },
        saveValid(){
           //明细必填校验
           for(let comp of this.tempDetail.componentList){
                if(comp.item.show!==false&&comp.item.require&&isEmpty(comp.item.value)){
                    console.log('submit...error',this.tempDetail)
                    this.$toast('请输入'+comp.item.label)
                    return false
                }
                //正则校验
                if(comp.item.show!==false&&comp.item.rules&&comp.item.rules.length){
                    for(let rule of comp.item.rules){
                        if(rule.regexp&&comp.item.value){
                            let reg = new RegExp(rule.regexp,'gm')
                            if(!reg.test(comp.item.value)){
                                console.log('submit...error',this.tempDetail)
                                this.$toast(rule.message?rule.message:(comp.item.label+'输入格式有误'))
                                return false
                            }
                        }
                    }
                }
           }
           //beforeSave check
            let isGoSave=true
            if(this.item.beforeSave && typeof window[this.item.beforeSave] === 'function'){
                isGoSave=window[this.item.beforeSave]()
            }
            return isGoSave
        },
        copy(aObject) {
            if (!aObject) {
                return aObject;
            }
            let v;
            let bObject = Array.isArray(aObject) ? [] : {};
            for (const k in aObject) {
                v = aObject[k];
                bObject[k] = (typeof v === "object") ? this.copy(v) : v;
            }
            return bObject;
        }
    }
}
</script>
<style scoped lang='scss'>
.form-detail-pop{
    .form-detail{
        background-color:#FBFBFB;
        padding:0 20px;
    }
    /deep/.mint-cell{
        background-color:#FBFBFB;
    }
    /deep/.el-collapse-item__header{
        min-height: 48px;
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
        line-height: 1.2;
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
    .table-detail{
        width:100%;
        box-sizing: border-box;
        padding:0 10px;
        td{
            word-break: break-all;
        }
        td.label{
            width:25%;
            vertical-align: top;
            // white-space: nowrap;
            text-align: right;
            padding-right: 6px;
        }
        line-height: 1.8;
        /deep/.el-tag{
            text-overflow: ellipsis;
            width: 250px;
            overflow: hidden;
        }
    }
    .mint-popup{
        .top-header{
            position: fixed;
            top:0;
            left:0;
            right:0;
            height:45px;
            background-color: #fff;
            z-index: 999;
            // border-bottom:1px solid #999;
            display:flex;
            justify-content: space-between;
            align-items: center;
            padding:0 5px;
            font-size:16px;
            i{
                font-size:20px;
            }
        }
        .content{
            padding:45px 0 50px 0;
            overflow-y: scroll;
            height: 100vh;
            box-sizing: border-box;
        }
        .btns{
            position: fixed;
            background-color: #fff;
            bottom:0;
            left:0;
            right:0;
            z-index: 999;
            height: 45px;
            width:100%;
            box-sizing: border-box;
            padding:0 10px;
            display: flex;
            justify-content: space-between;
            .del{
                width:30%;
            }
            .commit{
                width:65%;
            }
        }
    }
    .mint-popup-right{
        width:95%;
        height:100%;
        // top:0;
        // bottom:0;
        // left:0;
        // right:0;
    }
    .mint-cell:last-child{
        background-image: unset !important;
    }
    .pop-back-position{
        position: absolute;
        left:0;
        top:0;
        width:50px;
        height:45px;
    }
    input[type="checkbox"]{
        background-color: initial;
        cursor: default;
        -webkit-appearance: checkbox;
        box-sizing: border-box;
        margin: 3px 3px 3px 4px;
        padding: initial;
        border: initial;
    }
}
.pop-bg{
    width:100vh;
    height:100vh;
    position: fixed;
    left: 0px;
    top: 0px;
    opacity: 0.5;
    background: rgb(0, 0, 0);
    z-index:99;
}
</style>
<style lang='scss'>
.el-dialog__wrapper{
    z-index: 999998 !important;
}
.form-detail-pop-confirm-pop{
    position:fixed;
    top:50%;
    left:50%;
    width:80%;
    border-radius:5px;
    height:200px;
    transform:translateX(-50%) translateY(-50%);
    margin-top:0 !important;
    z-index: 999999;
}
</style>