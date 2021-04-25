<template>
    <div class="post">
        
        <h2>Post</h2> 
        <div class="post_info" v-if="post">
            
            <h3>{{post.title}}</h3>
            <p>{{post.body}}</p>
            <button class="editButton" @click="$router.push({ path: `/posts/${post.id}/edit`})">Edit</button>
            <button @click="deletePost(idd)">Delete</button>
        </div>
        
        <h2>Comments</h2>
        <div class="add_comment">
            <input v-model="name" type="text" placeholder="Name">
            <input v-model="body" type="text" placeholder="Text">
            <button v-if="this.editting" @click="edittingCommentApply">Apply</button>
            <button v-else @click="addingComment">Add</button>
        </div>
        <span v-if="this.comments.length==0">Comments empty</span>
        <div class="post_comments" v-for="comment in comments" :key="comment.id">
            <h3>Name: {{comment.name}}</h3>
            <p>Body: {{comment.body}}</p>
            <button @click="deletingComment(comment.id)">Delete Comment</button>
            <button @click="edittingComment(comment.id,comment.name,comment.body)">Edit Comment</button>
        </div>
        
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    data(){
        return{
            name: '',
            body: '',
            editting: false,
            commentId: 0
        }
    },
    
    computed: {
        ...mapState({
            
            post: state => state.posts.post,
            comments: state => state.posts.comments,
        }),
        idd() {
            return parseInt(this.$route.params.id)
        },
    },
    methods:{
        ...mapActions({           
            loadPost: "posts/loadPost",
            loadComments: "posts/loadComments",
            deletePost: "posts/deletePost",
            addComments: "posts/addComments",
            deleteComment: "posts/deleteComment",
            editComment: "posts/editComment"
        }),
        addingComment(){
        this.addComments([
            this.$route.params.id,
            {
              postId: this.$route.params.id,
              name: this.name,
              body: this.body,
            },
          ]);
        },
        deletingComment(comment_id){
            this.deleteComment(comment_id).then(() => {this.loadComments(this.idd)})
        },
        edittingComment(comment_id,name,body){
            this.name = name
            this.body = body
            this.editting = true
            this.commentId = comment_id
            
        },
        edittingCommentApply(){
            this.editComment([
            this.commentId,
            {
                name: this.name,
                body: this.body,
            },
            ]).then(() => {
            this.loadComments(this.idd);
            });
            this.editting = false
            this.name = ''
            this.body = ''
        }


    },
    mounted(){
        
        this.loadPost(this.idd);
        this.loadComments(this.idd);
        
    }
}
</script>

<style scoped>    
.post{
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
}
.post_info{
    min-width: 90%;
    border: 1px solid black;
    padding: 10px;
}
.post_comments{
    
    border: 1px solid black;
    margin: 10px;
    width: 500px;   
}
.editButton{
    margin-right: 5px;
}
.break {
  flex-basis: 100%;
  height: 0;
}
</style>