<template>
<section class="cell-field">
    <div class="cell-title">
        <span class="cell-text">{{item.label}}</span>
    </div>
    <div class="cell-value">
        <!-- $attrs的class和style只作用到子组件的最外层 -->
        <input type="text" v-model='txt' v-bind="$attrs" v-on="$listeners" >
        <div class="mint-field-clear" style="" v-if='!disableClear&&txt'>
            <i class="mintui mintui-field-error"></i>
        </div>
    </div>

    <!-- <mt-field :label="item.label" v-bind="$attrs" v-model="txt" v-on.native="$listeners" :state="inputState"  v-on:click.native='test'></mt-field> -->
</section>
</template>
<script>
export default {
    props:{
        value:'',
        item:{
            type:Object,
            default(){
                return {}
            }
        },
        // disableClear:{
        //     type:Boolean,
        //     default:false
        // }
    },
    watch:{
        txt(val){
            if(this.item.regexp){
              let reg = new RegExp(this.item.regexp,'gim')
              this.inputState=reg.test(val)?'success':'error'
            }
            this.$emit('input',val)
        },
        value:{
            handler(val){
                this.txt=val
            },
            immediate:true,
        }
    },
    computed:{
        disableClear(){
            return this.item.disableClear
        }
    },
    data(){
        return {
            inputState:'',
            txt:this.value
        }
    },
    mounted(){
    },
    methods:{
        test(){
            console.log(222222222)
        }
    }
}
</script>
