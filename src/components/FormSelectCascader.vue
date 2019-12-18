<template>
    <section class="cell-field">
        <div class="cell-title">
            <span class="cell-text">{{item.label}}</span>
        </div>
        <div class="cell-value">
            <select v-model='selected[index]' v-bind="$attrs" v-on="listeners" v-for="(it,index) in options"
            :key="index" :name="index" 
            :style='"width:"+(100/options.length-3)+"%"'>
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
            funcs:[],
            changeIndex:-1
        }
    },
    watch:{
        value:{
            handler(val){
                this.selected=val
                //初始化数据
                this.selected.forEach((it,i)=>{
                    if(i<this.selected.length-1){
                        let casIndex=i+1
                        let func = this.item.options[casIndex]
                        let preVal=val[i]
                        if(func instanceof Function){
                            this.funcs.push(func)
                        }
                        else if(this.funcs[i]){
                            func=this.funcs[i]
                        }
                        if(func instanceof Function){
                            Promise.resolve(func(preVal)).then(res=>{
                                this.$set(this.options,casIndex,res)
                            })
                        }
                    }
                })
            },
            immediate:true,
            deep:true,
        },
        selected:{
            handler(val){
                this.$emit('input',val)

                //触发下级函数
                if(this.changeIndex<this.options.length-1){
                    let casIndex=this.changeIndex-''+1
                    let func = this.item.options[casIndex]
                    let preVal=val[this.changeIndex]
                    if(func instanceof Function){
                        this.funcs.push(func)
                    }
                    else if(this.funcs[this.changeIndex]){
                        func=this.funcs[this.changeIndex]
                    }
                    if(func instanceof Function){
                        Promise.resolve(func(preVal)).then(res=>{
                            this.$set(this.options,casIndex,res)
                        })
                    }
                }
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
                        vm.changeIndex=event.target.name
                        //清空后面项内容
                        vm.selected.forEach((it,i)=>{
                            if(i>(vm.changeIndex-'')){
                                vm.selected[i]=''
                                vm.options[i]=[]
                            }
                        })
                        vm.selected[event.target.name]=event.target.value
                    }
                }
            )
        }
    },
    mounted(){
        if(this.item.options[0] instanceof Function){
            Promise.resolve(this.item.options[0]()).then(res=>{
                this.$set(this.item.options,0,res)
            })
        }
    }
}
</script>
<style scoped lang='scss'>
.cell-value{
    display:flex;
    justify-content: space-between;
}
// select{
//     margin-right:5px;
// }
</style>