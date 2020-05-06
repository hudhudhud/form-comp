<template>
<section class="cell-field">
    <div class="cell-title" :class="{required:item.require}">
        <span class="cell-text">{{item.label}}</span>
    </div>
    <div class="cell-value">
        <template v-if='!onlyShowIn'>
            <input type="text" v-model='showValue' v-bind="$attrs" v-on="listeners" readonly @click='showBook' :data-key='item.key' @focus="focus" ref="formInput">
            <div class="mint-field-clear" style="" v-if='!item.disableClear&&showValue' @click='showValue=""'>
                <i class="mintui mintui-field-error"></i>
            </div>
        </template>
        <p v-else class='p-only-show'>{{showValue}}</p>
    </div>
    <p class="error-info">{{errorInfo}}</p>
</section>
</template>
<script>
import {Field} from 'mint-ui'
export default {
    components:{
        [Field.name]:Field
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
            handler(val){
                if(typeof val ==='object'&&val.hasOwnProperty('value')&&val.hasOwnProperty('showValue')){
                    this.realValue=val.value
                    this.showValue=val.showValue
                    this.item.showValue=this.showValue
                }
                else{
                    this.realValue=val
                    this.showValue=val
                    this.item.showValue=this.showValue
                }
            },
            immediate:true,
        },
        showValue(val){
            if(this.item.require&&!val){
                this.errorInfo='请选择'+this.item.label
            }
            else{
                this.errorInfo=''
            }
            if(!val){
                this.realValue=''
                delete this.item.selectItems
                this.$emit('input','')
                this.selectedUserIds=[]
                this.selectedDepartmentIds=[]
            }
        },
        realValue:{
            handler(val){
                let res=val
                if(val!==this.showValue){
                    res = {value:val,showValue:this.showValue}
                }
                this.$emit('input',res)
                if(val){
                    if(this.item.chooseType&&this.item.chooseType.indexOf('user')>-1){
                        this.selectedUserIds=val.split(',')
                    }
                    if(this.item.chooseType&&this.item.chooseType.indexOf('department')>-1){
                        this.selectedDepartmentIds=val.split(',')
                    }
                }
            },
            immediate:true,
        },
        onlyShow:{
            handler(val){
                this.onlyShowIn=val
            },
            immediate:true,
        }
    },
    computed: {
        listeners: function () {
            var vm = this
            return Object.assign({},
                this.$listeners,
                {
                    input: function (event) {
                        //vm.$emit('input', event.target.value)
                    }
                }
            )
        }
    },
    data(){
        return {
            errorInfo:'',
            realValue:'',
            showValue:'',
            selectedUserIds:this.item.selectedUserIds,
            selectedDepartmentIds:this.item.selectedDepartmentIds,
            onlyShowIn:false,
        }
    },
    methods:{
        showBook(){
            let self = this
            wx.invoke("selectEnterpriseContact", {
                        "fromDepartmentId": self.item.fromDepartmentId,// 必填，表示打开的通讯录从指定的部门开始展示，-1表示自己所在部门开始, 0表示从最上层开始
                        "mode": self.item.mode,// 必填，选择模式，single表示单选，multi表示多选
                        "type": self.item.chooseType,//["department", "user"],// 必填，选择限制类型，指定department、user中的一个或者多个
                        "selectedDepartmentIds":self.selectedDepartmentIds,// ["2","3"],// 非必填，已选部门ID列表。用于多次选人时可重入，single模式下请勿填入多个id
                        "selectedUserIds":self.selectedUserIds//["lisi","lisi2"]// 非必填，已选用户ID列表。用于多次选人时可重入，single模式下请勿填入多个id
                    },function(res){
                        try{
                            if (res.err_msg == "selectEnterpriseContact:ok"){
                                if(typeof res.result == 'string'){
                                    res.result = JSON.parse(res.result) //由于目前各个终端尚未完全兼容，需要开发者额外判断result类型以保证在各个终端的兼容性
                                }
                                //let selectedDepartmentList = res.result.departmentList;// 已选的部门列表
                                // for (let i = 0; i < selectedDepartmentList.length; i++){
                                //     let department = selectedDepartmentList[i];
                                //     let departmentId = department.id;// 已选的单个部门ID
                                //     let departemntName = department.name;// 已选的单个部门名称
                                // }
                                // let selectedUserList = res.result.userList; // 已选的成员列表
                                // for (let i = 0; i < selectedUserList.length; i++){
                                //     let user = selectedUserList[i];
                                //     let userId = user.id; // 已选的单个成员ID
                                //     let userName = user.name;// 已选的单个成员名称
                                //     let userAvatar= user.avatar;// 已选的单个成员头像
                                // }
                                self.item.selectItems={
                                    departmentList:res.result.departmentList,
                                    userList:res.result.userList
                                }    
                                self.selectedDepartmentIds=res.result.departmentList.map(it=>it.id)
                                self.selectedUserIds=res.result.userList.map(it=>it.id)
                                self.$emit('input',self.item.selectItems)     
                            }
                        }
                        catch(e){
                            alert("error:"+e)
                        }
                    }
            );
        },
        //解决部分ios的readonly无效问题
        focus(){
            this.$refs['formInput'].blur()
        }
    }
}
</script>