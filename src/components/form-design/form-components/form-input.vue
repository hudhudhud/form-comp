<template>
<section class="cell-field">
    <div class="cell-title" :class="{required:item.require}">
        <span class="cell-text">{{item.label}}</span>
    </div>
    <div class="cell-value">
        <template v-if='!onlyShowIn'> 
            <!-- $attrs的class和style只作用到子组件的最外层 -->
            <input type="text" v-model='txt' v-bind="$attrs" v-on="listeners" :readonly='item.readonly' :data-key='item.key'>
            <div class="mint-field-clear" style="" v-if='!item.readonly&&!item.disableClear&&txt' @click='txt=""'>
                <i class="mintui mintui-field-error"></i>
            </div>
        </template>
        <p v-else class='p-only-show'>{{txt}}</p>
    </div>
    <p class="error-info">{{errorInfo}}</p>

    <!-- <mt-field :label="item.label" v-bind="$attrs" v-model="txt" v-on.native="$listeners" :state="inputState" ></mt-field> -->
</section>
</template>
<script>
import {Field} from 'mint-ui'
import {isEmpty} from '@/utils/index.js'
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
                this.txt=val
            },
            immediate:true,
        },
        txt(val){
            if(this.item.require&&isEmpty(val)){
                this.errorInfo='请输入'+this.item.label
                this.$emit('input',val)
                return
            }
            else{
                this.errorInfo=''
            }
            if(this.item.rules&&this.item.rules.length){
                for(let rule of this.item.rules){
                    if(rule.regexp){
                        let reg = new RegExp(rule.regexp,'gm')
                        // this.inputState=reg.test(val)?'success':'error'
                        if(!reg.test(val)){
                            this.errorInfo=rule.message?rule.message:'输入格式有误'
                            break
                        }
                        else{
                            this.errorInfo=''
                        }
                    }
                }
            }
            this.$emit('input',val)
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
            inputState:'',
            txt:this.value,
            errorInfo:'',
            onlyShowIn:false,
        }
    },
}
</script>