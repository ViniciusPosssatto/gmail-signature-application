import { defineStore } from 'pinia'

export const useGoogle = defineStore('google', {
  state: () => {
    return {
      googleUser: {},
    }
  },
  mutations: {
    setGoogleUser(user) {
      this.googleUser = user
    },
  },
  actions: {},
  getters: {
    getGoogleUser(state) {
      return state.googleUser
    },
  },
})
