<template>
    <section class="cell-field">
        <div class="cell-title">
            <span class="cell-text">{{item.label}}</span>
        </div>
        <div class="cell-value">
            <label class="cell-checkbox-label">
                <input type="checkbox" v-model='status'  v-bind="$attrs"  v-on='listeners' > 
                <span>是</span>
            </label>
        </div>
    </section>
</template>
<script>
export default {
    props:{
        value:{
            type:Boolean,
            default:false,
        },
        item:{
            type:Object,
            default(){
                return {}
            }
        }
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
        },
    },
    computed: {
        listeners: function () {
            var vm = this
            // `Object.assign` 将所有的对象合并为一个新对象
            return Object.assign({},
                // 我们从父级添加所有的监听器
                this.$listeners,
                // 然后我们添加自定义监听器，
                // 或覆写一些监听器的行为
                {
                    input(){}
                }
            )
        }
    },
    data(){
        return {
            status:this.value
        }
    },
    mounted(){
    },
}
</script>
<style scoped lang='scss'>

</style>