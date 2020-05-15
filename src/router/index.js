import Vue from 'vue'
import Router from 'vue-router'
import Index from '../views/index.vue'
import Form from '../views/form.vue'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'index',
            component: Index,
            meta:{
                keepAlive:true
            }
        },{
            path: '/form',
            name: 'form',
            component: Form,
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