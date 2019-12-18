<template>
<section class="cell-field" ref='textareaWraper'>
    <div class="cell-title">
        <span class="cell-text">{{item.label}}</span>
    </div>
    <div class="cell-value">
        <textarea ref='input'  rows="1" class="mint-field-core" v-bind="$attrs" v-on="listeners" v-model='txt'></textarea>
    </div>
    <div class="word-limit" v-if='item.maxLen'>{{txt.length}}/{{item.maxLen}}</div>
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
        },
    },
    watch:{
        value:{
            handler(val){
                this.txt=val
            },
            immediate:true,
        },
        txt:{
            handler(val){
                this.adjustSize()
                this.format()
                this.$emit('input',val)
            }
        },
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
            autoSize:this.item.autoSize?this.item.autoSize:false
        }
    },
    mounted(){
        this.adjustSize()
        this.format()
    },
    methods:{
        format() {
            if(!this.item.maxLen){
                return
            }
            if (this.txt && this.txt.length > this.item.maxLen) {
                this.txt = this.txt.slice(0, this.item.maxLen);
            }
        },
        adjustSize() {
            const { input,textareaWraper } = this.$refs;
            if (!this.autoSize || !input) {
                return;
            }

            input.style.height = 'auto';
            textareaWraper.style.height = 'auto';

            let height = input.scrollHeight;
            if (typeof this.autoSize === 'object') {
                const { maxHeight, minHeight } = this.autoSize;
                if (maxHeight) {
                    height = Math.min(height, maxHeight);
                }
                if (minHeight) {
                    height = Math.max(height, minHeight);
                }
            }

            if (height) {
                input.style.height = height + 'px';
                textareaWraper.style.height = height+10+(this.item.maxLen?25:0)+ 'px';
            }
        },
    }
}
</script>
<style scoped lang='scss'>
.cell-field{
    position:relative;
    .word-limit{
        margin-top:5px;
        position:absolute;
        right:10px;
        bottom:5px;
        color: #646566;
        font-size: 12px;
        line-height: 16px;
        text-align: right;
    }
}
</style>
