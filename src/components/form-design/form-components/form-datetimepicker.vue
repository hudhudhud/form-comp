<template>
<section class="cell-field">
    <div class="cell-title" :class="{required:item.require}">
        <span class="cell-text">{{item.label}}</span>
    </div>
    <div class="cell-value">
        <template v-if='!onlyShowIn'>
            <input type="text" v-model='inputValue' @click="openPicker" v-bind="$attrs" v-on="listeners" readonly :data-key='item.key' @focus="focus" ref="formInput">
            <div class="mint-field-clear" style="" v-if='!item.disableClear&&inputValue' @click='inputValue=""'>
                <i class="mintui mintui-field-error"></i>
            </div>
            <p class="error-info">{{errorInfo}}</p>
            <div @touchmove.prevent>
                <mt-datetime-picker ref="picker" 
                    :type="pickerType" 
                    v-model="pickerValue"
                    :startDate='startData'
                    :endDate='endData'
                    @confirm="handleConfirm"
                ></mt-datetime-picker>
            </div>
        </template>
        <p v-else class='p-only-show'>{{inputValue}}</p>
    </div>
</section>
</template>

<script>
import moment from 'moment'
import {DatetimePicker} from 'mint-ui'
import {isEmpty} from '@/utils/index.js'
export default {
    components:{
        [DatetimePicker.name]:DatetimePicker,
    },
    props:{
        value:{
            type:String,
        },
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
                this.inputValue=val
                //初始值传入格式是否合法
                if(val){
                    if(this.pickerType!='time'){
                        if(moment(val).isValid()){//输入日期有效
                            // let vaild = moment(val,this.formatStr).isValid()
                            this.pickerValue=new Date(moment(val))
                        }
                        else{//默认选中当天
                            this.pickerValue=moment()._d
                        }
                    }
                    else{//时间类型则直接给值
                        this.pickerValue=val
                    }
                }
                else if(this.pickerType!='time'){//默认选中当天
                    this.pickerValue=moment()._d
                }
            },
            immediate:true,
        },
        inputValue:{
            handler(val){
                if(this.item.require&&isEmpty(val)){
                    this.errorInfo='请输入'+this.item.label
                    this.$emit('input',val)
                    return
                }
                else{
                    this.errorInfo=''
                }
                this.$emit('input',val)
            }
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
            inputValue:this.value,
            pickerValue:'',
            startData:this.item.startDate?new Date(this.item.startDate):undefined,//默认十年前的1月1日
            endData:this.item.endData?new Date(this.item.endData):undefined,//默认十年后的12-31日
            pickerType:this.item.pickerType?this.item.pickerType:'date',//'datetime', 'date', 'time'
            formatStr:this.item.formatStr?this.item.formatStr:'YYYY-MM-DD',
            errorInfo:'',
            onlyShowIn:false,
        }
    },
    mounted(){
        
    },
    methods: {
      openPicker() {
        this.$refs.picker.open();
      },
      handleConfirm(val){
        if(this.pickerType!='time'){
            let formatStr=this.pickerType==='date'?'YYYY-MM-DD':'YYYY-MM-DD HH:mm'
            if(this.item.formatStr){
                formatStr=this.item.formatStr
            }
            this.inputValue=moment(val).format(formatStr)
        }
        else if (this.pickerType==='time'){
           this.inputValue=val
        }
      },
        //解决部分ios的readonly无效问题
        focus(){
            this.$refs['formInput'].blur()
        }
    }
  };
</script>