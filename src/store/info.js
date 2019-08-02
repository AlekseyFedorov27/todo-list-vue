import firebase from 'firebase/app'
import db from '@/fb'

export default {
  state: {
    info: []
  },
  mutations:{
    setInfo(state, info) {
      state.info = info
    },
    clearInfo(state) {
      state.info = []
    },
    addNote(state, payload) {
      state.info.push(payload) 
    },
    loadNote(state, payload) {
      state.info = payload
    },
  },
  actions:{
    async addNote({dispatch, commit}, payload){
      try{
        await db.collection('todolist').add(payload)
        .then(() => {
          dispatch('loadNote')
        })
      } catch (e) {
        console.log(e)
      }
    },
    async loadNote({commit}){
      try {
        await db.collection('todolist').onSnapshot(res => {
          const changes = res.docChanges();
          const infoArr = []
            changes.forEach( change => {
              if (change.type == 'added') {
                infoArr.push( {...change.doc.data(), id: change.doc.id} )
              }
            })
            infoArr.sort((a,b)=> new Date(b.date) - new Date(a.date))
            const massInfo = [];
            infoArr.forEach(function(item, i) {
              massInfo.push( {...item, num: i+1} )
            });
            commit ('loadNote', massInfo)
        })
      } catch (e) {
        console.log(e)
      }
    },
    async editNote({dispatch}, payload){
      try {
        await db.collection('todolist').doc(payload.id).update(payload)
        dispatch('loadNote')
      } catch (e) {
        console.log(e)
      }
    },
    async deleteNote({dispatch, commit}, id){
      try {
        await db.collection('todolist').doc(id).delete()
        dispatch('loadNote');
      } catch (e) {
        console.log(e)
      }
    },
  },
  getters:{
    info: s => s.info
  }
}