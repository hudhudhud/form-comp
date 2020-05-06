//设置事件与属性
function setParamForEventAtt(rejs,comp){
    //属性和事件按值覆盖
    comp.attr=comp.attr?comp.attr:{}
    if(rejs.attributes&&rejs.attributes.length){
        //新attr的name覆盖到老attr的name
        rejs.attributes.forEach(at=>{
            comp.attr[at.name]=at.value
        })
    }
    if(!comp.attr.hasOwnProperty('placeholder')&&comp.item&&comp.item.label){
        comp.attr.placeholder='请输入'+comp.item.label
    }
    if(rejs.events&&rejs.events.length){
        //新events的name覆盖到老events的name
        comp.events=comp.events?comp.events:{}
        rejs.events.forEach(ev=>{
            if(!ev.handler){//空值则去掉之前绑定的函数
                delete comp.events[ev.name]
            }
            else if(typeof ev.handler == 'function'){
                comp.events[ev.name]=ev.handler
            }
            else if(typeof ev.handler == "string" && typeof window[ev.handler] == 'function'){
                comp.events[ev.name]=window[ev.handler]
            }
        })
    }
}

export default {setParamForEventAtt}