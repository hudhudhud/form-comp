<template>
    <section class="cell-field">
        <div class="cell-title">
            <span class="cell-text">{{item.label}}</span>
        </div>
        <div class="cell-value">
            <select v-model='selected[index]' v-bind="$attrs" v-on="listeners" v-for="(it,index) in options" :key="index">
                <option :value='item[valueKey]' :label='item[labelKey]' v-for="(item,i) in options[index]" :key='i'>{{item[labelKey]}}</option>
            </select>
        </div>
    </section>
</template>
<script>
export default {
    //一个组件上的 v-model 默认会利用名为 value 的 prop 和名为 input 的事件
    props:{
        value:{
            type:Array,
            default:()=>{
                return []
            }
        },
        item:{
            type:Object,
            default:()=>{
                return {}
            }
        }
    },
    data(){
        return {
            selected:this.value,
            options:this.item.options,
            labelKey:this.item.labelKey?this.item.labelKey:'label',
            valueKey:this.item.valueKey?this.item.valueKey:'value',
        }
    },
    watch:{
        value:{
            handler(val){
                this.selected=val
            },
            immediate:true,
            deep:true,
        },
        selected:{
            handler(val){
                if(typeof this.item.callback === 'function'){
                    this.item.callback({value:val,from:this.item.name})
                    if(window.needChange){
                        this.$emit('reSetFormJs')
                    }
                }
                this.$emit('input',val)
            },
            deep:true,
        },
        "item.options":{
            handler(opt){
                if(!Array.isArray(opt)){this.options=[];return}
                this.options=opt               
            },
            deep:true,
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
                        vm.$emit('input', event.target.value)
                    }
                }
            )
        }
    },
    mounted(){
    }
}
</script>