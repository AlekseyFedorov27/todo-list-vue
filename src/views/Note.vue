<template>
    <!-- new note -->
    <div v-if='note'>
      <div class="title">
        <p >Редактирование задачи</p>

        <router-link to="/">
          <button type="button" class="btn btn-light">
            Вернутся к списку задач
          </button>
        </router-link>
      </div>


      <div class="note card">
        <div class="card-header">
          <textarea type="text" v-model="note.title" class="inp"></h2></textarea>
        </div>

          <div class="p-4">

              <p>{{note.selected}}</p>
              <select v-model="note.selected">
                <option value='planned'>Не выполнено</option>
                <option value='finished'>Выполнено</option>
              </select>
            <span class="note_date">{{ note.date }}</span>
          </div>

          <div class="flex">
            <button type="button" class="btn btn-outline-success btn-sm"
            @click="editNote(note)"
            >Сохранить
            </button>

            <button type="button" class="btn btn-outline-danger btn-sm"
            @click="removeNote(note.id)">
            Удалить
            </button>
          </div>

      </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      note: null
    };
  },
  created (){
    let id=this.$route.params.id
    const found = this.$store.getters.info.find(el => el.id == id); 
    if (found) { 
      this.note = found
    } 
  },
  methods: {
    removeNote (id) {
      console.log(id)
      this.$emit('remove', id)
      this.$store.dispatch('deleteNote', id);
      this.$router.push('/')
    },
    editNote: function(note){
      note.edit=false
      this.$emit('cangeNote', note)
      this.$store.dispatch('editNote', note)
      this.$router.push('/')
    }
  }
}
</script>
<style lang="scss" scoped>
.inp{
 width: 300px;
}
.title{
  margin: 0 auto;
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  
}
.center{
  margin: 0 auto;
  text-align: center;
}
.flex{
  display: flex;
}
.note{
  margin-top: 60px;
  width: 600px;
  margin: 0 auto;
  margin-top: 80px;
}
</style>
