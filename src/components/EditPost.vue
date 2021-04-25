<template>
    <div class="posts">
        <div class="posts_create">
            Title:
            <input type="text" v-model="params.title">
            Body:
            <input type="text" v-model="params.body">
            <button @click="saveEdited(),$router.push({ path: `/posts`})">Apply</button>
        </div>        
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    data(){
        return{
            params:{
                
                title: '',
                body: '',
            },
            
            
        }
    },
    computed: {
        ...mapState({
            posts: state => state.posts.posts,
            post: state => state.posts.post
        }),
        idd() {
            return parseInt(this.$route.params.id)
        }    
    },
    methods:{
        ...mapActions({
            loadPosts: "posts/loadPosts",
            loadPost: "posts/loadPost",
            editPost: "posts/editPost",
            
        }),
        clean(){
            this.params.title = ''
            this.params.body = ''
        },
        saveEdited() {
            this.editPost([
                this.idd,
                {
                userId: this.$route.params.id,
                title: this.params.title,
                body: this.params.body,
                },
            ]).then(() => {
                this.loadPosts();
                
            });
        },
        

    },
    mounted(){
        this.loadPost(this.idd);
        this.params.title = this.post.title
        this.params.body = this.post.body
        
    }    
    
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