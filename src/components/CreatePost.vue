<template>
    <div class="posts">
        <div class="posts_create">
            <input type="text" v-model="params.title" placeholder="Title">
            <input type="text" v-model="params.body" placeholder="Text">
            <button @click="creatingPost(),$router.push({ path: `/posts`})">Создать</button>
        </div>
        
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    data(){
        return{
            params:{
                userId: 1,
                title: "",
                body: "",
            }
        }
    },
    computed: {
        ...mapState({
            posts: state => state.posts.posts,
            
        })
    },
    methods:{
        ...mapActions({
            loadPosts: "posts/loadPosts",
            createPost: "posts/createPost"
        }),
        clean(){
            this.params.title = ''
            this.params.body = ''
        },
        creatingPost(){
            this.createPost(this.params).then(() => {this.loadPosts()})
        }

    },
    
}
</script>

<style scoped>
.posts{
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}    

.posts_create{
    max-width: 100%;
    margin-bottom: 20px;

}
.posts_create input{
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 2px;
    padding: 10px;
    margin-bottom: 10px;
}
.break {
  flex-basis: 100%;
  height: 0;
}
</style>