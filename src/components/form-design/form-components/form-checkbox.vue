<template>
    <section class="cell-field">
        <div class="cell-title" :class="{required:item.require}">
            <span class="cell-text">{{item.label}}</span>
        </div>
        <div class="cell-value">
            <label class="cell-checkbox-label">
                <input type="checkbox" v-model='status'  v-bind="$attrs"  v-on='listeners' class="mint-checkbox-input" :disabled='onlyShowIn||item.readonly'> 
                <span class="mint-checkbox-core"></span>
                <span class="mint-checkbox-label">{{item.optionLabel}}</span>
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
        },
        onlyShow:{
            type:Boolean,
            default:false
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
            status:this.value,
            onlyShowIn:false,
        }
    },
    mounted(){
    },
}
</script>
<style scoped lang='scss'>
input[type="checkbox"] {
    background-color: initial;
    cursor: default;
    -webkit-appearance: checkbox;
    box-sizing: border-box;
    margin: 3px 3px 3px 4px;
    padding: initial;
    border: initial;
}
/deep/.mint-checkbox-core{
    border-radius: 0;
    width:14px;
    height:14px;
    &:after{
        left:4px;
        top:1px;
    }
}
</style>