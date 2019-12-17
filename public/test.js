function test(payload){
    window.needChange=false
    console.log('test js ',payload)
    if(payload.from=='sex'){//性别为男，不需要选择兴趣
        window.reSetJs=[
          {
            "name":'love',
            show:true, 
            "options":()=>getData(payload.value)
          },
          {
            "name":'loveSync',
            show:true, 
            "options":()=>getDataSync(payload.value)
          },
        ]
        window.needChange=true
    }
    // if(payload.from=='address'){
    //     window.reSetJs=[
    //       {
    //         "name":'address',
    //         label:payload.value.join(), 
    //       },
    //     ]
    //     window.needChange=true
    // }
  }

  function getData(value){
    let opt=[]
    return new Promise((res,rej)=>{
      setTimeout(() => {
        if(value===0){
          opt=[
            {value:0,name:'足球'},
            {value:1,name:'篮球'},
            {value:2,name:'羽毛球'},
          ]
        }
        else{
          opt=[
            {value:0,name:'健身'},
            {value:1,name:'舞蹈'},
            {value:2,name:'游泳'},
          ]
        }
        res(opt)
        window.needChange=true
      }, 1000);
    }) 
  }

  function getDataSync(value){
    let opt=[]
    if(value===0){
      opt=[
        {value:0,name:'足球'},
        {value:1,name:'篮球'},
        {value:2,name:'羽毛球'},
      ]
    }
    else{
      opt=[
        {value:0,name:'健身'},
        {value:1,name:'舞蹈'},
        {value:2,name:'游泳'},
      ]
    }
    window.needChange=true
    return opt
  }
  
  function getProvince(){
    return new Promise((res,rej)=>{
      setTimeout(() => {
        let ops=[{val:"0",name:'浙江省'}, {val:"1",name:'山东省'}]
        res(ops)
      },500);
    })
  }
  function getCity(pro){
    return new Promise((res,rej)=>{
      setTimeout(() => {
        let ops;
        if(pro==='0'){
          ops=[{val:"00",name:'杭州市'}, {val:"01",name:'宁波市'}]
        }
        else  if(pro==='1'){
          ops=[{val:"10",name:'青岛市'}, {val:"11",name:'济南市'}]
        }
        res(ops)
      }, 500);
    })
  }
  function getArea(pro){
    return new Promise((res,rej)=>{
      setTimeout(() => {
        let ops;
        if(pro==='00'){
          ops=[{val:"001",name:'萧山'}, {val:"002",name:'滨江'}]
        }
        else  if(pro==='01'){
          ops=[{val:"010",name:'镇海'}, {val:"012",name:'北仑'}]
        }
        res(ops)
      }, 500);
    })
  }