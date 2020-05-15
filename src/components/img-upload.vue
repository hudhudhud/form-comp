<template>
    <section>
        <div class="imgs-area" ref="img-uploader">
            <div v-for="(img,i) of imgs" class="img-div item" :key='i'>
                <i class="fa fa-times" aria-hidden="true" @click="imgs.splice(i,1)"></i>
                <img :src="img.url"  />
            </div>
            <div class="upload-btn item">
                <i class="hips-icon hips-icon-add-o hips-uploader__add-icon" style="font-size: 48px;"></i>
                <input type="file" @change="imgUpload">
            </div>
        </div>
    </section>
</template>
<script>
export default {
    props:{
        value:'',
    },
    watch:{
        value(v){
            if(v){
                this.imgs=v
            }
        },
        imgs:{
            handler(v){
                this.$emit("input",v)
            },
            deep:true,
        }
    },
    data(){
        return {
            imgs:[]
        }
    },
    methods:{
        imgUpload(e){
            let file = e.target.files[0]
            file.url = window.URL.createObjectURL(file)
            this.imgs.push(file)
        }
    }
}
</script>
<style lang="stylus" scoped>
.imgs-area{
    padding:0 20px;
    display:flex;
    flex-wrap:wrap;
    justify-contents:space-between;
    .item{
        margin-left:10px;
        margin-top:10px;
    }
    .img-div{
        position:relative;
        i{
            position: absolute;
            top: .5px;
            right: 0px;
            z-index: 1;
            background-color: #f96f68;
            color: #fff;
            border-radius: 100%;
            padding: 1.067vw;
        }
        img{
            box-sizing border-box;
            border: 1px dashed #c9c9c9;
            border-radius: 1.333vw;
            width:100px;
            height:100px;
        }
    }
    .upload-btn{
        width:100px;
        height:100px;
        position:relative;
        border: 1px dashed #c9c9c9;
        border-radius: 1.333vw;
        color: #666;
        text-align center;
        box-sizing border-box
        input[type="file"]{
            opacity:0;
            position:absolute;
            top:0;
            left:0;
            bottom:0;
            right:0;
            width:100%;
            height:100%;
        }
        i{
            line-height 100px;
        }
    }
}
</style>