<template>
<section class="cell-field">
    <div class="cell-title">
        <span class="cell-text">{{item.label}}</span>
    </div>
    <div class="cell-value">
        <!-- $attrs的class和style只作用到子组件的最外层 -->
        <input type="text" v-model='txt' v-bind="$attrs" v-on="listeners" >
        <div class="mint-field-clear" style="" v-if='!item.disableClear&&txt' @click='txt=""'>
            <i class="mintui mintui-field-error"></i>
        </div>
        <span class="mint-field-state is-success" v-if='inputState==="success"'><i class="mintui mintui-field-success"></i></span>
        <span class="mint-field-state is-error" v-else-if='inputState==="error"'><i class="mintui mintui-field-error"></i></span>
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
    },
    watch:{
        value:{
            handler(val){
                this.txt=val
            },
            immediate:true,
        },
        txt(val){
            if(this.item.regexp){
                let regType=Object.prototype.toString.call(this.item.regexp)
                if(regType==='[object RegExp]'){
                    this.inputState=this.item.regexp.test(val)?'success':'error'
                }
                else if(regType==='[object String]'){
                    let reg = new RegExp(this.item.regexp,'gim')
                    this.inputState=reg.test(val)?'success':'error'
                }
            }
            this.$emit('input',val)
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
            inputState:'',
            txt:this.value
        }
    },
    mounted(){
    },
    methods:{
    }
}
</script>
