<template>
<section class="cell-field" >
    <div class="cell-title" :class="{required:item.require}">
        <span class="cell-text">{{item.label}}</span>
    </div>
    <div class="cell-value">
        <template v-if='!onlyShowIn'>
            <input type="text" v-model='showValue' @click="popupVisible=true" v-bind="$attrs" readonly v-on="listeners" :data-key='item.key' @focus="focus" ref="formInput">
            <div class="mint-field-clear" style="" v-if='!item.disableClear&&showValue' @click='showValue=""'>
                <i class="mintui mintui-field-error"></i>
            </div>
            <input type="hidden" v-model='realValue'>
        </template>
        <p v-else class='p-only-show'>{{showValue}}</p>
    </div>
    <p class="error-info">{{errorInfo}}</p>
    <div @touchmove.prevent>
        <!-- <mt-popup v-model="popupVisible" position="bottom"> -->
            <section class="pop-bg" v-show="popupVisible" @click='popupVisible=false'>
                <div class="pop-content">
                    <mt-picker ref='picker' :slots="slots" @change="onValuesChange" showToolbar :valueKey='labelKey' >
                        <div class="btns">
                            <mt-button @click="popupVisible=false">取消</mt-button>
                            <mt-button @click="handleConfirm">确认</mt-button>
                        </div>
                    </mt-picker>
                </div>
            </section>
        <!-- </mt-popup> -->
    </div>
</section>
</template>
<script>
import moment from 'moment'
import {Popup,Picker,Button} from 'mint-ui'
import {isEmpty} from '@/utils/index.js'
export default {
    components:{
        [Popup.name]:Popup,
        [Picker.name]:Picker,
        [Button.name]:Button,
    },
    props:{
        value:'',
        item:{
            type:Object,
            default(){
                return {}
            }
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
        realValue:{
            handler(val){
                let res = val
                if(val!==this.showValue){
                    res = {value:val,showValue:this.showValue}
                }
                this.$emit('input',res)
            }
        },
        showValue(val){
            if(!val){
                this.realValue=''
                delete this.item.selectItems
            }
            if(this.item.require&&isEmpty(val)){
                this.errorInfo='请选择'+this.item.label
                this.$emit('input',val)
                return
            }
            else{
                this.errorInfo=''
            }
        },
        popupVisible(v){
            if(v){
                document.body.style.overflow='hidden'
                if(!this.firstLoad)return
                this.init(this.item.options)
            }
            else{
                document.body.style.overflow=''
            }
        },
        "item.resetOptions":{
            handler(opts){
                if(opts){
                    this.init(opts)
                }
            },
            deep:true
        },
        // "item.options":{
        //     handler(opt){
        //          //如果有初始值，下拉项初始化
        //         if(this.item.value&&opt){
        //             if(this.firstLoad){
        //                 //初始化
        //                 this.init()
        //             }
        //             else{//重置值时触发
        //                 if(this.slots[0]&&this.slots[0].values.length){
        //                     let item = this.slots[0].values.find(it=>{
        //                         if(this.valueKey){
        //                           return it[this.valueKey]==this.item.value
        //                         }
        //                         else{
        //                             return it==this.item.value
        //                         }
        //                     })
        //                     if(item){
        //                         if(this.labelKey){
        //                             this.showValue=item[this.labelKey]
        //                             this.item.showValue=this.showValue
        //                         }
        //                         else{
        //                             this.showValue=item
        //                             this.item.showValue=this.showValue
        //                         }
        //                     }
        //                 }
        //             }
        //         }
        //     },
        //     deep:true,
        //     immediate:true,
        // },
        // //如果有初始值，js加载完成后初始化下拉项
        // jsCompleted(val){
        //     if(val){
        //         if(this.item.value
        //         && this.item.options
        //         && typeof this.item.options ==='string' 
        //         && typeof window[this.item.options] === 'function'){
        //             this.init()
        //         }
        //     }
        // },
        onlyShow:{
            handler(val){
                this.onlyShowIn=val
            },
            immediate:true,
        }
    },
    data(){
        return {
            popupVisible:false,
            showValue:'',
            realValue:'',
            pickerValue:'',
            errorInfo:'',
            slots:[],
            labelKey:undefined,
            valueKey:undefined,
            firstLoad:true,
            timeoutId:'',
            onlyShowIn:false,
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
    mounted(){
        
    },
    methods: {
        openPicker() {
            this.$refs.picker.open();
        },
        onValuesChange(picker, values) {
            // if (values[0] > values[1]) {
            //     picker.setSlotValue(1, values[0]);
            // }
            // console.log(values)

        },
        handleConfirm(){
            let val= this.$refs.picker.getValues()
            if(typeof val[0] !== 'object'){
                this.showValue=val[0]
                this.realValue=val[0]
            }
            else{
                this.showValue=val[0][this.labelKey]
                this.realValue=val[0][this.valueKey]
                //为callback时提供整个对象
                this.item.selectItems=JSON.parse(JSON.stringify(val[0]))
            }
            this.item.showValue=this.showValue
            this.popupVisible=false
        },
        init(opt){
            if(Array.isArray(opt)){
                this.firstLoad=false
                this.slots=[{ flex:1, values:opt }]
                if(opt.length){
                    //初始化showValue
                    if(typeof opt[0] === 'object'){
                        this.labelKey=this.item.labelKey?this.item.labelKey:'label'
                        this.valueKey=this.item.valueKey?this.item.valueKey:'value'
                        if(this.realValue){
                            let op = opt.find(it=>it[this.valueKey]==this.realValue)
                            if(op){
                                this.showValue=op[this.labelKey]
                                this.item.showValue=this.showValue
                                //this.$refs.picker.setValues([op])
                            }
                        }
                    }
                    else{
                        this.showValue=this.realValue
                        this.item.showValue=this.showValue
                    }
                }
                return
            }
            else if(typeof opt ==='string' && typeof window[opt] === 'function'){
                this.$Indicator.open()
                window[opt]((res)=>{
                    this.$Indicator.close()
                    this.firstLoad=false
                    this.slots=[{ flex:1, values:res}]
                    if(res && res.length){
                        //初始化showValue
                        if(typeof res[0] === 'object'){
                            this.labelKey=this.item.labelKey?this.item.labelKey:'label'
                            this.valueKey=this.item.valueKey?this.item.valueKey:'value'
                            if(this.realValue){
                                let op = res.find(it=>it[this.valueKey]==this.realValue)
                                if(op){
                                    this.showValue=op[this.labelKey]
                                    this.item.showValue=this.showValue
                                    //this.$refs.picker.setValues([op])
                                }
                            }
                        }
                        else{
                            this.showValue=this.realValue
                            this.item.showValue=this.showValue
                        }
                    }
                })
            }
        },
        //解决部分ios的readonly无效问题
        focus(){
            this.$refs['formInput'].blur()
        }
    }
  };
</script>
<style lang='scss' scoped>
.mint-popup-bottom{
    left:0;
    transform: translate3d(0,0,0);
    right:0;
}
.btns{
    display: flex;
    justify-content: space-between;
    button{
        background-color: transparent;
        border:none;
        outline: none;
    }
}
.pop-bg{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color:rgba(0,0,0,0.5);
    z-index:9999;
    .pop-content{
        position:absolute;
        right: 0;
        bottom: 0;
        left: 0;
        background-color:#fff;
        z-index:10000;
    }
}
</style>