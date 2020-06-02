<template>
    <section>
        <Home msg='啦啦啦'/>
        <mt-cell-swipe
        title="标题文字"
        ref="cell-swipe"
        :right="[
            {
            content: 'Delete',
            style: { background: 'red', color: '#fff' },
            handler: () => this.$messagebox('delete')
            },
            {
            content: 'edit',
            style: { background: 'green', color: '#fff' },
            handler: () => this.$messagebox('green')
            }
        ]"></mt-cell-swipe>
        <p @click='moveLeft'>点我</p>
    </section>
</template>
<script>
import Home from '../utils/render.js'
export default {
    components:{
        Home,
    },
    data(){
        return{
            moveDis:0
        }
    },
    methods:{
        moveLeft(){
            if(this.moveDis==-68){
                this.moveDis=0
            }
            else{
                this.moveDis=-68
            }
            this.$refs["cell-swipe"].swipeMove(this.moveDis)
        }
    }
}
</script>