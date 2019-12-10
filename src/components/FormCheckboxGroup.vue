<template>
    <section class="cell-field">
        <div class="cell-title">
            <span class="cell-text">{{item.label}}</span>
        </div>
        <div class="cell-value">
            <div v-model='status'>
                <label class="cell-checkbox-label" v-for='(it,i) of item.options' :key='i'>
                    <input type="checkbox" v-bind="$attrs" v-model='it.checked'  v-on='listeners' > 
                    <span>{{it.label}}</span>
                </label>
            </div>
        </div>
    </section>
</template>
<script>
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
        }
    },
    model:{
        prop:'value',
        event:'change',
    },
    watch:{
        status:{
            handler(val){
                this.item.options.forEach(it=>{
                    if(Array.isArray(val)&&val.includes(it.value)){
                        this.$set(it,'checked',true)
                    }
                    else{
                        this.$set(it,'checked',false)
                    }
                })
            
                if(typeof this.item.callback === 'function'){
                    this.item.callback({value:val,from:this.item.name})
                    if(window.needChange){
                        this.$emit('reSetFormJs')
                    }
                }
                this.$emit('change',val)
            },
            immediate:true
        },
        value:{
            handler(val){
                this.status=val
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
                    change: function (event) {
                        vm.status = vm.item.options.filter(it=>it.checked).map(it=>it.value)
                    }
                }
            )
        }
    },
    data(){
        return {
            status:this.value
        }
    },
}
</script>
<style scoped lang='scss'>

</style>