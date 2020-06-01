import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'form',
            component: ()=>import('../views/form.vue'),
            meta:{
                keepAlive:true
            }
        },{
            path: '/index',
            name: 'index',
            component: ()=>import('../views/index.vue'),
            meta:{
                keepAlive:true
            }
        },{
            path: '/test',
            name: 'test',
            component: ()=>import('../views/test.vue'),
            meta:{
                keepAlive:true
            }
        }
    ]
})