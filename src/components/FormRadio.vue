<template>
    <section class="cell-field">
        <div class="cell-title">
            <span class="cell-text">{{item.label}}</span>
        </div>
        <div class="cell-value">
            <div v-model='status'>
                <label class="cell-radio-label" v-for='(it,i) of item.options' :key='i'>
                    <input type="radio" v-bind="$attrs" v-on="$listeners" :checked='status==it.value' @change='status=it.value'> 
                    <span>{{it.label}}</span>
                </label>
            </div>
        </div>
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
        }
    },
    model:{
        prop:'value',
        event:'change',
    },
    watch:{
        status(val){
            if(typeof this.item.callback === 'function'){
                this.item.callback({value:val,from:this.item.name})
                if(window.needChange){
                    this.$emit('reSetFormJs')
                }
            }
            this.$emit('change',val)
        },
        value:{
            handler(val){
                this.status=val
            },
            immediate:true,
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