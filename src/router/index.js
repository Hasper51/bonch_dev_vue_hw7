import Vue from 'vue'
import VueRouter from 'vue-router'
import Post from '@/components/Post'
import Posts from '@/components/Posts'
import CreatePost from '@/components/CreatePost'
import EditPost from '@/components/EditPost'
Vue.use(VueRouter)

const routes = [
  
  {
    path:"/posts",
    component: () => import(/* webpackChunkName: "about"*/"../views/PostsViews.vue"),
    children: [
      {path: '', component: Posts},
      {path: 'create', component: CreatePost},
      {path: ':id/edit', component: EditPost},
      {path: ':id', component: Post},
      
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
