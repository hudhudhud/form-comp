<template>
<section class="cell-field">
    <div class="cell-title" :class="{required:item.require}">
        <span class="cell-text">{{item.label}}</span>
    </div>
    <div class="cell-value">
        <template v-if='!onlyShowIn'>
            <input type="text" v-model='showValue' v-bind="$attrs" v-on="listeners" readonly @click='deptPopVisible=true' :data-key='item.key' @focus="focus" ref="formInput">
            <div class="mint-field-clear" style="" v-if='!item.disableClear&&showValue' @click='showValue=""'>
                <i class="mintui mintui-field-error"></i>
            </div>
        </template>
        <p v-else class='p-only-show'>{{showValue}}</p>
    </div>
    <p class="error-info">{{errorInfo}}</p>
    <DeptSelectPopupCustomer  @change='deptChange' v-model="deptPopVisible" :chooseMutiple="item.chooseMutiple"
    :optionsFunc='item.options' :labelKey='labelKey' :valueKey='valueKey'/>
</section>
</template>
<script>
import {Field} from 'mint-ui'
import DeptSelectPopupCustomer from './deptSelectPopupCustomer'
export default {
    components:{
        [Field.name]:Field,
        DeptSelectPopupCustomer,
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
            }
        },
        realValue:{
            handler(val){
                let res=val
                if(val!==this.showValue){
                    res = {value:val,showValue:this.showValue}
                }
                this.$emit('input',res)
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
            onlyShowIn:false,
            deptPopVisible:false,
            valueKey:this.item.valueKey?this.item.valueKey:'value',
            labelKey:this.item.labelKey?this.item.labelKey:'label',
        }
    },
    methods:{
        //解决部分ios的readonly无效问题
        focus(){
            this.$refs['formInput'].blur()
        },
        deptChange(values){
            this.item.selectItems=values
            this.$emit('input',values.map(it=>it[this.valueKey]).join())     
        },
    }
}
</script>