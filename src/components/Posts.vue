<template>
<div>
    <div class="posts">
        <button @click="$router.push({ path: `/posts/create`})">Create Post</button>
        <div class="break"></div>
        <div 
            class="posts_item" 
            v-for="post in paginatedPosts" 
            :key="post.id" >
            <h4 @click="$router.push({ path: `/posts/${post.id}`})">{{ post.title }}</h4>
            <p>{{post.body}}</p>
            
        </div>
        
        
    </div>
    <div class="pagination">
        <div class="page"
            v-for="page in pages"
            :key="page"
            :class="{'page_selected':page === pageNumber}"
            @click="pageClick(page)"
        >{{page}}</div>
    </div>
</div>    
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    data(){
        return{
            postsPerPage: 5,
            pageNumber: 1
        }
    },
    computed: {
        ...mapState({
            posts: state => state.posts.posts,
            // post: state => state.posts.post
        }),
        pages(){
            return Math.ceil(this.posts.length/5)
        },
        paginatedPosts(){
            let from = (this.pageNumber-1)*this.postsPerPage;
            let to = from + this.postsPerPage;
            
            return this.posts.slice(from, to);
        }
    },
    methods:{
        ...mapActions({
            loadPosts: "posts/loadPosts",
            // loadPost: "posts/loadPost",
            //createPost: "posts/createPost"
        }),
        pageClick(page){
            this.pageNumber = page
        }
    },
    mounted(){
        this.loadPosts();
        
    }
}
</script>

<style scoped>
.posts{
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    align-content: center;
}    
.posts_item{
    border: 1px solid black;
    margin: 10px;
    width: 400px;
    padding: 5px;
}
.posts_item h4{
    cursor: pointer;
}
.posts_item h4:hover{
    color: #6288ad;
}
.pagination{
    display: flex;
    flex-wrap: wrap;
    justify-content:center;
    margin-top: 30px;
}
.page{
    padding: 8px;
    border: 1px solid #7a7a7a;
    margin-right: 5px;

}
.page:hover{
    background-color: #aeaeae;
    color: white;
    cursor: pointer;
}
.page_selected{
    background-color: #aeaeae;
    color: white;
    cursor: pointer;
}
.break {
  flex-basis: 100%;
  height: 0;
}
</style>