export default {
    props:['msg'],
    render(h){
        return h('div',this.msg)
    }
}