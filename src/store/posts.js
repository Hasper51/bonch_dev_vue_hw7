import axios from 'axios';

const state = {
    posts: [],
    post: null,
    comments: [],
};

const getters = {
    onePost: (state) => (id) => {
        return state.posts.filter(p => p.id == id)
    },
    allComments(state){
        return state.comments
    },
};

const actions = {
    loadPosts({commit}){
        return new Promise((resolve, reject) =>{
            axios
                .get('http://localhost:3000/posts')
                .then(response => {
                    commit("SET_POSTS", response.data);
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                })
        })
    },
    loadPost({commit},id){
        return new Promise((resolve, reject) =>{
            axios
                .get(`http://localhost:3000/posts/${id}`)
                .then(response => {
                    commit("SET_POST", response.data);
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                })
        })
    },
    createPost({commit}, data) {
        return new Promise((resolve, reject) =>{
            axios.post("http://localhost:3000/posts/", data)
            .then(response => {
                commit("SET_POST", response.data);
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        })
    },
    editPost(_,data) {
        return new Promise((resolve, reject) =>{
            axios.put(`http://localhost:3000/posts/${data[0]}`, data[1])
            .then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        })
    },
    deletePost(_,id) {
        return new Promise((resolve, reject) =>{
            axios.delete(`http://localhost:3000/posts/${id}`)
            .then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    loadComments({commit},id){
        return new Promise((resolve, reject) =>{
            axios
                .get(`http://localhost:3000/posts/${id}/comments`)
                .then(response => {
                    commit("SET_COMMENTS", response.data);//другой коммит
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                })
        })
    },
    addComments({ commit }, data) {
        return new Promise((resolve, reject) => {
          axios
            .post(`http://localhost:3000/posts/${data[0]}/comments`, data[1])
            .then((response) => {
              commit("NEW_COMMENT", response.data);
              resolve(response);
            })
            .catch((error) => {
              reject(error);
            });
        });
    },
    deleteComment(_, id) {
        return new Promise((resolve, reject) => {
            axios
            .delete(`http://localhost:3000/comments/${id}`)
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
        });
    },
    editComment(_, data) {
        return new Promise((resolve, reject) => {
            axios
            .put(`http://localhost:3000/comments/${data[0]}`, data[1])
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
        });
    },
      

};

const mutations = {
    SET_POSTS(state, payload){
        state.posts = payload
    },
    SET_POST(state, payload){
        state.post = payload
    },
    SET_COMMENTS(state, payload){
        state.comments = payload
    },
    NEW_COMMENT(state, payload) {
        state.comments.push(payload);
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
