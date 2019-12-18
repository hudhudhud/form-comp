<template>
<section class="cell-field">
    <div class="cell-title">
        <span class="cell-text">{{item.label}}</span>
    </div>
    <div class="cell-value">
        <input type="text" v-model='inputValue' @click="openPicker" v-bind="$attrs" readonly>
        <mt-datetime-picker ref="picker" 
            :type="pickerType" 
            v-model="pickerValue"
            :startDate='startData'
            :endDate='endData'
            @confirm="handleConfirm"
        ></mt-datetime-picker>
    </div>
</section>
</template>

<script>
 import moment from 'moment'
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
                this.inputValue=val
            },
            immediate:true,
        },
        inputValue:{
            handler(val){
                this.$emit('input',val)
            }
        },
    },
    data(){
        return {
            inputValue:this.value,
            pickerValue:'',
            startData:this.item.startDate?new Date(this.item.startDate):undefined,//默认十年前的1月1日
            endData:this.item.endData?new Date(this.item.endData):undefined,//默认十年后的12-31日
            pickerType:this.item.pickerType?this.item.pickerType:'datetime',//'datetime', 'date', 'time'
        }
    },
    mounted(){
        //初始值传入格式是否合法
        if(this.pickerType!='time'&&!moment(this.value).isValid()){
            let vaild = moment(this.value,this.item.formatStr).isValid()
            this.pickerValue=vaild?new Date(moment(this.value,this.item.formatStr)):''
        }
        else{
            this.pickerValue=this.value
        }
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
    }
  };
</script>