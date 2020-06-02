<template>
<section class="cell-field">
    <div class="cell-title" :class="{required:item.require}">
        <span class="cell-text">{{item.label}}</span>
    </div>
    <div class="cell-value">
        <a href="javascript:;" class="a-upload">
            <span class="btn-txt">添加附件</span>
            <input type="file" :accept="item.accept?item.accept:'*'" v-bind="$attrs" v-on="listeners" @change='fileUpload'
            :multiple='item.multiple'>
        </a>
        <div class="file-items" v-if='fileList.length'>
            <template>
                <div class="el-tag el-tag--plain" style="margin-right: 5px;" v-for="(item,i) in fileList" :key="i" >
                    <span>{{item.name}}</span>
                    <i class="el-tag__close el-icon-close"  @click='showFileDialog(i,item)' v-if="item.fileId"></i> 
                    <i class="el-tag__close el-icon-close"  @click='removeFile(i,item)' v-else></i>
                </div>
            </template>
        </div>
    </div>
    <p class="error-info">{{errorInfo}}</p>
    <el-dialog title="提示" :visible.sync="confirmDialogVisible" width="70%" :append-to-body="true" :modal='false'
    custom-class='form-detail-pop-confirm-pop'> 
        <span>确认删除？</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="confirmDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="delFile">确 定</el-button>
        </span>
    </el-dialog>
</section>
</template>
<script>
// import {Field} from 'mint-ui'
// import {Tag,Dialog,Button as ELButton} from 'element-ui'
export default {
    // components:{
    //     [Field.name]:Field,
    //     [Tag.name]:Tag,
    //     [ELButton.name]:ELButton,
    //     [Dialog.name]:Dialog
    // },
    props:{
        value:'',
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
                if(Array.isArray(val)){
                    this.fileList=val
                }
                else{
                    this.fileList=[]
                }
            },
            immediate:true,
        },
        fileList:{
            handler(val){
                if(this.item.require&&!val.length){
                    this.errorInfo='请上传文件：'+this.item.label
                    this.$emit('input',val)
                    this.item.showValue=''
                    return
                }
                else{
                    this.errorInfo=''
                }
                this.$emit('input',val)
                //detail 类型 pop模式需要展示值
                if(Array.isArray(val)){
                    this.item.showValue=val.map(it=>it.name).join()
                }
            },
            deep:true,
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
            fileList:[],
            errorInfo:'',
            confirmDialogVisible:false,
            currentFile:'',
            currentFileIndex:-1
        }
    },
    methods:{
        fileUpload(e){
            let files = Array.from(e.target.files)
            if(this.item.maxNum&&this.fileList.length+files.length>this.item.maxNum){
                files = files.slice(0,this.item.maxNum-this.fileList.length)
                this.$toast('最多上传'+this.item.maxNum+'个文件！','','middle', 3000)
                if(files.length){
                    this.fileList.push(...files)
                }
                e.target.value=''
                return
            }
            if(this.item.maxSize){
                files = files.filter(file=>(file.size/1024)<=this.item.maxSize)
                if(files.length!=e.target.files.length){
                    this.$toast('文件大小不能超过'+this.item.maxSize+'KB!','','middle', 3000)
                }
            }
            if(files.length){
                this.fileList.push(...files)
            }
            e.target.value=''
        },
        removeFile(i,item){
            this.fileList.splice(i,1)
        },
        showFileDialog(i,item){
            this.currentFile=item
            this.currentFileIndex=i
            this.confirmDialogVisible=true
        },
        async delFile(){
            try{
                if(this.currentFile.fileId){
                   //服务器删除
                }
            }
            finally{
                this.confirmDialogVisible=false
            }
        }

    }
}
</script>
<style scoped lang='scss'>
.cell-value{
    flex-wrap:wrap;
}
.cell-title{
    align-self: flex-start;
    margin-top:15px;
}
.a-upload {
    position :relative;
    color: #108EE9;
    font-size:14px;
    text-decoration: none;
    width:100%;
    height:48px;
    input {
        position: absolute;
        font-size: 100px;
        right: 0;
        top: 0;
        left:0;
        bottom:0;
        opacity: 0;
    }
    .btn-txt{
        line-height: 48px;
    }
}
.file-items{
    width:100%;
    display:flex;
    flex-direction: column;
    .el-tag{
        display:flex;
        justify-content: space-between;
        align-items: center;
        margin-top:2px;
        span{
            display: inline-block;
            text-overflow :ellipsis;
            overflow: hidden;
            white-space: nowrap;
            width:200px;
            height:32px;
            line-height: 32px;
            box-sizing: border-box;
        }
    }
}
</style>