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
    //一个组件上的 v-model 默认会利用名为 value 的 prop 和名为 input 的事件，
    //但是像单选框、复选框等类型的输入控件可能会将 value 特性用于不同的目的。model 选项可以用来避免这样的冲突：
    //用input也照样可以触发，这个名字可以自定义，只是为了代码中可区分
    props:{
        checked:{
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
    model:{
        prop:'checked',
        event:'change',
        //event:'mychange', //用mychange也照样可以触发，这个名字可以自定义，只是为了代码中可区分
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
                    // 这里确保组件配合 `v-model` 的工作
                    change: function (event) {
                        console.log(44444444,event.target.checked)
                        vm.$emit('change', event.target.checked)
                    }
                }
            )
        }
    },
    data(){
        return {
            status:this.checked
        }
    },
    mounted(){
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
        checked:{
            handler(val){
                this.status=val
            },
            immediate:true,
        }
    }
}
</script>
<style scoped lang='scss'>

</style>