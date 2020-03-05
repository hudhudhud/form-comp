<template>
<section class="cell-field" >
    <div class="cell-title">
        <span class="cell-text">{{item.label}}</span>
    </div>
    <div class="cell-value">
        <input type="text" v-model='showValue' @click="popupVisible=true" v-bind="$attrs" readonly>
        <input type="hidden" v-model='realValue'>
    </div>
    <!-- <mt-popup v-model="popupVisible" position="bottom">
        <mt-picker ref='picker' :slots="slots" @change="onValuesChange" showToolbar>
            <div class="btns">
                <mt-button @click="popupVisible=false">取消</mt-button>
                <mt-button @click="handleConfirm">确认</mt-button>
            </div>
        </mt-picker>
    </mt-popup> -->
    <div @touchmove.prevent>
        <mt-popup v-model="popupVisible" position="bottom">
            <mt-picker ref='picker' :slots="slots1" @change="onValuesChange" showToolbar :valueKey='item.showKey?item.showKey:undefined'>
                <div class="btns">
                    <mt-button @click="popupVisible=false">取消</mt-button>
                    <mt-button @click="handleConfirm">确认</mt-button>
                </div>
            </mt-picker>
        </mt-popup>
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
                this.realValue=val
            },
            immediate:true,
        },
        realValue:{
            handler(val){
                this.$emit('input',val)
            }
        },
        "item.options":{
            handler(opt){
                this.slots1=[]
                if(!Array.isArray(opt)){this.slots1=[];return}
                if(!this.item.multiple){
                    this.slots1=[{ flex:1, values:this.item.options }]
                }
                else{
                    async ()=>{
                        await this.item.options.forEach(async op=>{
                            if(typeof op ==='function'){
                                await Promise.resolve(op()).then((res)=>{
                                    this.slots1 = this.slots1.concat({ flex:1, values:res },{ divider: true, content: '-', })
                                }) 
                            }
                            else {
                                this.slots1 = this.slots1.concat({ flex:1, values:op },{ divider: true, content: '-', }) 
                            }
                        })
                         this.slots1.pop()
                    }
                }  
            },
            deep:true,
            immediate:true,
        }
    },
    data(){
        return {
            popupVisible:false,
            showValue:this.value,
            realValue:this.value,
            pickerValue:'',
            slots: [
                {
                    flex: 1,
                    values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
                }, 
                {
                    divider: true,
                    content: '-',
                }, 
                {
                    flex: 1,
                    values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
                }
            ],
            slots1:[
                {
                    flex: 1,
                    values: [{val:-1,name:'省'},{val:"0",name:'浙江省'}, {val:"1",name:'山东省'}],
                },
                {
                    divider: true,
                    content: '-',
                }, 
                {
                    flex: 1,
                    values: [{val:-1,name:'市'},],
                },
                {
                    divider: true,
                    content: '-',
                }, 
                {
                    flex: 1,
                    values: [{val:-1,name:'区'},],
                },
            ]
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
            console.log(values)
            // if(values[0].val==='0'){
            //     this.slots1[2].values= [{val:-1,name:'市'},{val:"00",name:'杭州市'}, {val:"01",name:'宁波市'}]
            // }
            // else if(values[0].val==='1'){
            //     this.slots1[2].values= [{val:-1,name:'市'},{val:"10",name:'青岛市'}, {val:"11",name:'济南市'}]
            // }

        },
        handleConfirm(){
            let val= this.$refs.picker.getValues()
            console.log(444444,val)
            if(!this.item.multiple){
                if(!this.item.valueKey){
                    this.showValue=val[0]
                    this.realValue=val[0]
                }
                else{
                    this.showValue=val[0][this.item.showKey]
                    this.realValue=val[0][this.item.valueKey]
                }
            }
            else{
                if(!this.item.valueKey){
                    this.showValue=val.join()
                    this.realValue=val.join()
                }
                else{
                    this.showValue=val.map(it=>it[this.item.showKey]).join()
                    this.realValue=val.map(it=>it[this.item.valueKey]).join()
                }
            }
            this.popupVisible=false
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
    justify-content: space-around;
    button{
        background-color: transparent;
        border:none;
        outline: none;
    }
}
</style>