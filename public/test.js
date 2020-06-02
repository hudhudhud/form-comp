var setParamGlobal;
function getDeptData(setOptions,payload){
    console.log('getDeptData....',payload)
    if(!payload){
            setOptions([
                {deptId:1,deptName:'人力资源部',other:'one'},
                {deptId:2,deptName:'信息技术部',other:'two'},
            ]) 
    }
    else{
        if(payload.deptId==1){
            setTimeout(() => {
                setOptions([
                    {deptId:10,deptName:'人才管理部',other:'one1'},
                    {deptId:11,deptName:'合作管理部',other:'two1'},
                ])
            }, 500);
        }
        else if(payload.deptId==2){
            setOptions([
                {deptId:20,deptName:'IT基础架构部',other:'one2'},
                {deptId:21,deptName:'研发及平台方案部',other:'two2'},
            ])
        }
        else{
            setOptions([])
        }
    }
}
function deptChange(setParam,payload){
    console.log('deptChange...',payload)
    if(!payload.fromParam.selectItems)return
    let showValues=[]
    payload.fromParam.selectItems.forEach(function(item){
        showValues.push(item.deptName)
    })
    setParam([{
        key:'department_customer',
        value:{
            value:payload.value,//最终保存到数据库的值
            showValue:showValues.join(',')//显示在输入框里的值
        }
    }])
}
function inputclick(e){
    console.log('inputclick....',e)
}
function getCheckbox(setOptions){
    console.log('getCheckbox......')
    setTimeout(()=>{
    setOptions([{
        "value": 0,
        "name": "足球"
    }, {
        "value": 1,
        "name": "篮球"
    }, {
        "value": 2,
        "name": "羽毛球"
    }, {
        "value": 3,
        "name": "毛球"
    }])
    },1000)
}
function test(e){console.log('click',e)};
function test1(e){console.log('click','test1111111')};
function bookChange(setParam,payload){
    // alert(JSON.stringify(payload.value))
    if(!payload.value||!payload.value.userList)return
    let value = payload.value.userList.map(it=>it.id).join()||payload.value.departmentList.map(it=>it.id).join()
    setParam([{
            key:'book',
            value:value,//最终保存到数据库的值
            // value:{
            //     value:payload.value.userList.map(it=>it.id).join(),//最终保存到数据库的值
            //     showValue:payload.value.userList.map(it=>it.name).join(),//显示在页面上的值
            // }
        }])
}
function change1(setParam,payload){
    console.log('change1111...cb',payload)
    if(payload.from==='sex'){
        if(payload.value==0){
            setParam([
            {
            "key":"friends",
            "resetOptions":[
               {id:1,name:"one"},
               {id:2,name:"two"}
            ]
                
            },])
        }
        else{
                setParam([
            {
                "key":"friends",
                "resetOptions":[
                    {id:3,name:"three"},
                    {id:4,name:"four"}
                ]
            },])
        }
    }
    setParamGlobal=setParam
}
function change(setParam,payload){
    console.log('change...cb',payload)
    if(payload.from==='sex'){
        if(payload.value==0){
            setParam([
                // {"key":'number', "value":4 },
                {"key":"address",value:'1,11'}
            ]);
        }
        else{
            setParam([
                // {"key":'number', "value":3 }
                 {"key":"address",value:'1,11,110'}
            ]);
        }
    }
    else if(payload.from=="number"){
        if(payload.value==1){
            setParam([{key:"select2","resetOptions":[{id:1,name:"one"},{id:2,name:"two"}]}])
        }
        else{
            setParam([{key:"select2","resetOptions":[{id:3,name:"three"},{id:4,name:"four"}]}])
        }
    }
}
function getNumber(setOptions){
    console.log('getNumber......')
    setTimeout(()=>{
        setOptions([1,2,3,4,5])
    },2000)
}      
function getProvince(setOptions){
    console.log('getProvince.........')
    setTimeout(()=>{
        let values=[{
            name:'浙江省',
            id:1
        },{
            name:'山西省',
            id:2
        }]
        setOptions(values)
    },1000)
}  
function getCity(setOptions,id,ids){
    console.log('getCity.........',ids)
    if(id==1){
            setTimeout(()=>{
            setOptions([{
                name:'杭州市',
                id:11
            },{
                name:'温州市',
                id:12
            }])
        },1000)
    }
    else{
        setTimeout(()=>{
            setOptions([{
                name:'太原',
                id:21
            },{
                name:'大同',
                id:22
            }])
        },1000)
    }
}
function getArea(setOptions,id,ids){
    console.log('getArea.........',ids)
    if(id==11){
            setTimeout(()=>{
            setOptions([{
                name:'滨江',
                id:110
            },{
                name:'萧山',
                id:111
            }])
        },1000)
    }
    else{
        setTimeout(()=>{
            setOptions([{
                name:'青田',
                id:120
            },{
                name:'瑞安',
                id:121
            }])
        },1000)
    }
}
function beforeSubmit(res,submit){
    
    return true
}    
function init(setParam,payload){
    console.log('init.........',payload)
    setParam([
        {key:'name',value:payload.userId},
        {"key":"intro","value":"测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试"},
        {"key":"time","value":(new Date()).toLocaleString().split(' ')[0].split('/').join('-')},
        {"key":"book","value":"hys3032","showValue":"胡丹"},
        {"key":"friends","value":{"value":"11,22","showValue":"1,2"}}//{"value":"11,22","showValue":"1,2"}
    ]);
    console.log('init...',payload.userId)
}      
function searchFunc(setOptions,payload){
    console.log('searchFunc...',payload)
    setTimeout(()=>{
        if(payload.searchStr){
            setOptions([
                {'name':'1','id':'11',"txt":'label1',"label2":"label2"},
                {'name':'2','id':'22',"txt":'label1',"label2":"label2"},
            ])
        }
        else{
                setOptions([{
            "name": "1",
            "id": "11",
            "txt": "label1",
            "label2": "label2"
        },
        {
            "name": "2",
            "id": "22",
            "txt": "label1",
            "label2": "label2"
        }, {
            "name": "3",
            "id": "33",
            "txt": "label1",
            "label2": "label2"
        },
        {
            "name": "4",
            "id": "44",
            "txt": "label1",
            "label2": "label2"
        }, {
            "name": "5",
            "id": "55",
            "txt": "label1",
            "label2": "label2"
        },
        {
            "name": "6",
            "id": "66",
            "txt": "label1",
            "label2": "label2"
        }, {
            "name": "7",
            "id": "77",
            "txt": "label1",
            "label2": "label2"
        },
        {
            "name": "8",
            "id": "88",
            "txt": "label1",
            "label2": "label2"
        }, {
            "name": "9",
            "id": "99",
            "txt": "label1",
            "label2": "label2"
        },
        {
            "name": "99",
            "id": "00",
            "txt": "label1",
            "label2": "label2"
        }, {
            "name": "999",
            "id": "01",
            "txt": "label1",
            "label2": "label2"
        }
    ])
        }
    },1000)
} 
function searchselectChange1(setParam,payload){
console.log(66666666666,payload.fromParam.selectItems)
    if(payload.fromParam.selectItems){
        setParam([{key:'friends2',value:payload.fromParam.selectItems.txt,showValue:payload.fromParam.selectItems.txt}])
    }

}
function searchselectChange2(setParam,payload){
    console.log(77777777777,payload.fromParam.selectItems)
    if(payload.fromParam.selectItems){
    setParam([{key:'friends1',value:payload.fromParam.selectItems.name,showValue:payload.fromParam.selectItems.name}])
    }
}
function getSearchSelect(setOptions,payload){
    setTimeout(()=>{
        setOptions([
        {'name':'1111111111111111111','id':'11',"txt":'label1',"label2":"label2"},
        {'name':'22222222222222','id':'22',"txt":'label2',"label2":"label2"},
        {'name':'3','id':'33',"txt":'label3',"label2":"label2"},
        {'name':'4','id':'44',"txt":'label4',"label2":"label2"},
        {'name':'5','id':'55',"txt":'label5',"label2":"label2"},
    ])
    },1000)
}
function pageFunc(setOptions,payload){
    console.log('pageFunc....', payload.pageIndex)
    let pageIndex = payload.pageIndex
    let pageSize = payload.pageSize
    let searchStr = payload.searchStr
    if(searchStr){
        setTimeout(()=>{
            setOptions([])
            },1000)
        return
    }
    else if(pageIndex>=3){
        let datas=[]
        for(let i=0;i<4;i++){
            datas.push({'name':'分页数据'+pageIndex+i,'id':pageIndex+''+i,"txt":'label'+pageIndex+i,"label2":"label1"+pageIndex+i})
        }
        setTimeout(()=>{setOptions(datas)},1000)
    }
    else{
        let datas=[]
        for(let i=0;i<10;i++){
            datas.push({'name':'分页数据'+pageIndex+i,'id':pageIndex+''+i,"txt":'label'+pageIndex+i,"label2":"label1"+pageIndex+i})
        }
        setTimeout(()=>{
            setOptions(datas)
        },1000)
    }
}

function beforeSave(){
    console.log('pop....beforeSave')
    return true
}
function fileChange(payload){
    console.log('fileChange.....',payload)
}