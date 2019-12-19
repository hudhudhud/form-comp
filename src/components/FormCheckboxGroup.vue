<template>
    <section class="cell-field">
        <div class="cell-title">
            <span class="cell-text">{{item.label}}</span>
        </div>
        <div class="cell-value">
            <div>
                <label class="cell-checkbox-label" v-for='(it,i) of options' :key='i'>
                    <input type="checkbox" v-bind="$attrs" v-model='it.checked'  v-on='listeners' > 
                    <span>{{it[labelKey]}}</span>
                </label>
            </div>
        </div>
    </section>
</template>
<script>
import { type } from 'os'
export default {
    props:{
        value:{
            type:Array,
            defalut(){
                return []
            }
        },
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
                this.status=val
            },
            immediate:true,
            deep:true,
        },
        status:{
            handler(val){
                if(!Array.isArray(this.item.options)){this.options=[];return}
                this.item.options.forEach(it=>{
                    if(Array.isArray(val)&&val.includes(it[this.valueKey])){
                        this.$set(it,'checked',true)
                    }
                    else{
                        this.$set(it,'checked',false)
                    }
                })
                this.$emit('input',val)
            },
        },
        "item.options":{
            handler(opt){
                if(!Array.isArray(opt)){this.options=[];return}
                this.options=opt
                opt.forEach(it=>{
                    if(Array.isArray(this.status)&&this.status.includes(it[this.valueKey])){
                        this.$set(it,'checked',true)
                    }
                    else{
                        this.$set(it,'checked',false)
                    }
                })
               
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
                    change: function (event) {
                        vm.status = vm.item.options.filter(it=>it.checked).map(it=>it[vm.valueKey])
                    },
                    input:function(){}
                }
            )
        }
    },
    data(){
        return {
            status:this.value,
            options:this.item.options,
            labelKey:this.item.labelKey?this.item.labelKey:'label',
            valueKey:this.item.valueKey?this.item.valueKey:'value'
        }
    },
}
</script>