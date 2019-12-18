<template>
    <section class="cell-field">
        <div class="cell-title">
            <span class="cell-text">{{item.label}}</span>
        </div>
        <div class="cell-value">
            <div>
                <label class="cell-radio-label" v-for='(it,i) of item.options' :key='i'>
                    <input type="radio" v-bind="$attrs" v-on="listeners" :checked='status==it.value' @change='status=it.value'> 
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
        event:'input',
    },
    watch:{
        value:{
            handler(val){
                this.status=val
            },
            immediate:true,
        },
        status(val){
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
            status:this.value
        }
    },
}
</script>
<style scoped lang='scss'>

</style>