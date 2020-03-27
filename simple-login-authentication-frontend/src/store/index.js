import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userList: [],
    loginResult: "init",
    userInfo: {}
  },
  mutations: {
    setUserList(state, list){
      state.userList = list
    },
    setPassWord(state, pass){
      state.passWord = pass
    },
    setLoginResult(state, bool){
      state.loginResult = bool
    },
    setUserInfo(state, obj){
      state.userInfo = obj
    }
  },
  actions: {
    async getUserList(context){
      await axios.get("http://localhost:3000/userList")
      .then(res => {
        context.commit('setUserList', res.data.userList)
      })
    },
    async getPassWord(context, {username,password}){
      await axios.get("http://localhost:3000/passWord",{params:{username: username}})
      .then(res => {
        if (password == res.data.password){
          context.commit('setLoginResult', true)
        }
        else{
          context.commit('setLoginResult', false)
        }
      })
    },
    async fetchData(context,username){
      await axios.get("http://localhost:3000/userData",{params:{username: username}})
      .then(res => {
        console.log(res.data)
        context.commit('setUserInfo', res.data.obj)
      })
    },
    async newRegister(context,obj){
      await axios.get("http://localhost:3000/addUser",{params:obj})
      .then(res => {
        console.log(res)
      })
    },
    async deleteUser(context, username){
      await axios.get("http://localhost:3000/deleteUser",{params:{username: username}})
      .then(res => {
        console.log(res)
      })
    }
  },
  modules: {
  }
})
