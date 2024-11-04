import { defineStore } from 'pinia'

export const useGoogle = defineStore('google', {
  state: () => {
    return {
      googleUser: {},
    }
  },
  mutations: {
    setGoogleUser(state, user) {
      state.googleUser = user
    },
  },
  actions: {},
  getters: {
    getGoogleUser(state) {
      return state.googleUser
    },
  },
})
