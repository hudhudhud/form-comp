<template>
  <div class="form-list">
    <div class="form">
        <component 
          v-for='(item,i) in componentList' 
          :key='i' 
          :is='item.comp' 
          v-model='item.item.value' 
          :item='item.item' 
          v-bind="item.attr" v-on='item.events'
          @reSetFormJs='reSetFormJs' 
          v-show='item.item.show!==false'
          @input='input($event,item.item)'>
        </component>
    </div>
    <div class="btns">
      <mt-button type="primary" @click='submit'>提交</mt-button>
      <mt-button type="default" @click='reset'>重置</mt-button>
    </div> 
  </div>
</template>

<script>
// import components from '@/components'
// import formJs from 'form.js'
// import FormCheckbox from '@/components/FormCheckbox'
export default {
  // components,
  components:{
    // FormCheckbox:FormCheckbox
  },
  data(){
    return {
      formStruct:null,
      componentList:[]
    }
  },
  // watch:{
  //     formStruct:{
  //       handler(){
  //           if(!this.isInit){//第一次不需要
  //               console.log('rebuild from watch.........')
  //               this.reBuild()
  //           }
  //       },
  //       deep:true
  //     }
  // },
  async mounted(){
    //let { data } = await this.$axios.get("http://10.90.13.61/test/test.json")
    this.formStruct=window.formJs
    if(this.formStruct.js&&this.formStruct.js.length){
      let jsPromiseList = this.formStruct.js.map(url=>{
        return this.jsLoad(url)
      })
      //所有js加载完成再初始化数据，否则js中的函数还无法获取
      Promise.all(jsPromiseList)
      .then(()=>{
        this.reBuild()
      })
      .catch((e)=>{
        throw new Error(e)
      })
    }
    else{
      this.reBuild()
    }
  },
  methods:{
    //回调处理
    input(...vals){
      let val=vals[0]
      let item=vals[1]
      if(typeof item.callback === 'function'){
          item.callback({value:val,from:item.name})
          if(window.needChange){
              this.reSetFormJs()
          }
      }
    },
    jsLoad(url){
      return new Promise((res,rej)=>{
          let ele=document.createElement('script')
          ele.setAttribute('type','text/javascript')
          ele.onload = function() {
            res()
          };
          ele.onerror=function(){
            rej(new Error('js load faild:'+url))
          }
          ele.setAttribute('src',url)
          document.body.append(ele)
      })
    },
    reBuild(){
        console.log('reBuild.........')
        this.componentList=[]
        this.formStruct.elements.forEach(item=>{
            if(item.show===false)return
            let comp={},atObj={},eventsObj={}
            comp.name=item.name
            comp.item=item
            comp.type='Form'+item.type.replace(item.type.charAt(0),item.type.charAt(0).toUpperCase())
            comp.comp = ()=> {
                return new Promise((resolve,reject)=>{
                  let instance = import(`../components/${comp.type}`)//按需加载，与require的区别是require是赋值过程，同步的
                  instance.then(res=>{//组件加载成功才绑定属性与事件
                        resolve(res)
                        comp.attr=atObj
                        if(item.attributes&&item.attributes.length){
                            item.attributes.forEach(at=>{
                            atObj[at.name]=at.value
                            })
                        }
                        comp.events=eventsObj
                        if(item.events&&item.events.length){
                            item.events.forEach(ev=>{
                              if(typeof window[ev.handler] == 'function'){
                                eventsObj[ev.name]=window[ev.handler]
                              }
                            })
                        }
                        
                        if(item.callback){
                          item.callback = typeof item.callback==='string'?window[item.callback]:item.callback
                        }
                  })
                  instance.catch(e=>{
                    resolve(import(`../components/Error`))
                  })
              })
            }
            if(item.options instanceof Function){
              Promise.resolve(item.options()).then(res=>{
                item.options=res
              })
            }
            this.componentList.push(comp)
        })
    },
    reSetFormJs(){
        console.log('reSetFormJs.........')
        window.reSetJs.forEach(rejs=>{
          let changeCompJs=this.formStruct.elements.find(item=>item.name===rejs.name)
          if(changeCompJs) Object.assign(changeCompJs,rejs)
          if(changeCompJs.options instanceof Function){
            Promise.resolve(changeCompJs.options()).then(res=>{
              changeCompJs.options=res
            })
          }
          let changeComp = this.componentList.find(item=>item.name===rejs.name)
          if(changeComp){
            changeComp.item=changeCompJs
            if(rejs.attributes&&rejs.attributes.length){
              let atObj={}
              changeComp.attr=atObj
              rejs.attributes.forEach(at=>{
                atObj[at.name]=at.value
              })
            }
            if(rejs.events&&rejs.events.length){
                let eventsObj={}
                changeComp.events=eventsObj
                rejs.events.forEach(ev=>{
                  if(typeof window[ev.handler] == 'function'){
                    eventsObj[ev.name]=window[ev.handler]
                  }
                })
            }
            if(rejs.callback){
              changeCompJs.callback = typeof rejs.callback === 'string' ?window[rejs.callback]:rejs.callback
            }
          }
        })
    },
    submit(){
      let res={}
      this.formStruct.elements.forEach(({label,name,value,show})=>{
        if(show!==false)
        res[name]=value
      })
      console.log('submit',res)
    },
    reset(){
      this.formStruct.elements.forEach((item)=>{
        item.value=undefined
      })
    }
  }
}
</script>
<style  lang='scss'>
.test1{
    input[type='checkbox']{
        display: inline-block;
        width:20px;
        height:20px;
    }
}
.test2{
    border:5px solid pink;
}
</style>
<style scoped lang='scss'>
.form-list{
  padding-bottom:50px;
  overflow-y:scroll;
  .btns{
    width:100%;
    position:fixed;
    bottom:0;
    height:50px;
    box-shadow: 0 -5px 10px rgba(0,0,0,0.1);
    display:flex;
    justify-content: space-around;
    align-items: center;
    background-color:#fff;
  }
  
.cell-field{
  display: flex;
  width:100%;
  min-height: 48px;
  line-height: 1;
  padding: 0 10px;
  font-size: 16px;
  align-items: center;
  border-top:1px solid #d9d9d9;
  .cell-title{
      width:105px;
  }
  .cell-value{
      display: flex;
      flex: 1;
      align-items: center;
      input[type=text]{
          appearance: none;
          border-radius: 0;
          border: 0;
          box-flex: 1;
          flex: 1;
          outline: 0;
          line-height: 1.6;
          font-size: inherit;
          width: 100%;
      }
      .cell-checkbox-label,.cell-radio-label{
       width:80px;
      
      }
  }
  &:last-child{
      border-bottom:1px solid #d9d9d9;
  }
}
  .cell-field{
    display: flex;
    width:100%;
    min-height: 48px;
    line-height: 1;
    padding: 0 10px;
    font-size: 16px;
    align-items: center;
    border-top:1px solid #d9d9d9;
    .cell-title{
        width:105px;
    }
    .cell-value{
        display: flex;
        flex: 1;
        align-items: center;
        input[type=text]{
            appearance: none;
            border-radius: 0;
            border: 0;
            box-flex: 1;
            flex: 1;
            outline: 0;
            line-height: 1.6;
            font-size: inherit;
            width: 100%;
        }
        .cell-checkbox-label,.cell-radio-label{
        width:80px;
        
        }
    }
    &:last-child{
        border-bottom:1px solid #d9d9d9;
    }
  }
}
*{
  box-sizing: border-box;
}
</style>