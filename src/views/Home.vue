<template>
  <div class="wrapper">
    
    <div class="wrapper-content">

      <section>
        <div class="container">
          <div class="note-header" style="justify-content: center;">
            <p> {{ params.title }} </p>
          </div>
          <!-- message -->
          <message v-if="params.message" :message="params.message"/>

          <!-- new note -->
          <newNote class="newNote" :note="params.note" @addNote="addNote"/>

          <div class="note-header" style="margin: 36px 0;">


            <!-- icons controls -->
            <div class="icons">
                <svg :class="{ active: params.grid }" @click="params.grid = true" style="cursor: pointer;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            </div>
            <div class="icons">
                <svg :class="{ active: !params.grid }" @click="params.grid = false" style="cursor: pointer;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3" y2="6"></line><line x1="3" y1="12" x2="3" y2="12"></line><line x1="3" y1="18" x2="3" y2="18"></line></svg>
            </div>
          </div>
          <p class="title">Задачи</p>

          <!-- note list -->
          <preloader v-if="Info.length == 0" class="preloader" :width="90" :height="90"/>
          <notes v-else @cangeNote="cangeNote" :notes="sortInfo" :grid="params.grid" @remove="removeNote"/>


            <!--pagination -->
            <div class="button-list btn_center">
              <div type="button" class="btn btn-info" @click="prevPege">&#8592</div>
              <div type="button" class="btn btn-info ml-5" @click="nextPage">&#8594</div>
              <p>Страница: {{page.current}} из {{Math.ceil(Info.length/page.length)}}</p>   
            </div> 

        </div>
      </section>

    </div>
  </div>
</template>

<script>
import message from '@/components/Message.vue'
import notes from '@/components/Notes.vue'
import newNote from '@/components/NewNote.vue'
import preloader from '@/components/UI/Preloader.vue' 
import db from '@/fb'

export default {
  components: {
    message, notes, newNote, preloader
  },
  data () {
    return {
      page:{
        current: 1,
        length: 10
      } 
    }
  },
  mounted(){
    return this.$store.dispatch('loadNote')
  },
  computed: {
    params(){
      return  this.$store.getters.params
    },
    Info(){
      return this.$store.getters.info
    },
    sortInfo () {
      return this.Info.filter((row, index) => {
        let start = (this.page.current-1)*this.page.length;
        let end = this.page.current * this.page.length;
        if (index >= start && index < end) return true
      })
    }
  },
  methods: {
    addNote () {
      let {id, title, edit, selected} = this.params.note
        if (title === '') {
          this.params.message = "Поле задачи не может быть пустым"
          return false
        }
        const prog = {
          id,
          title,
          edit,
          selected,
          date: new Date(Date.now()).toLocaleString()
          }
        this.$store.dispatch('addNote', prog)
        this.params.message = null;
        this.params.note.title = '';
        this.params.note.selected = 'planned';
        //перенаправление на 1 стр пагинации
        this.page.current = 1;
    },
    removeNote (Info) {
      this.$store.dispatch('deleteNote', Info)
    },
    cangeNote(note) {
      this.$store.dispatch('editNote', note)
    },
    nextPage() {
      if ((this.page.current * this.page.length) < this.Info.length) this.page.current+=1
    },
    prevPege() {
      if (this.page.current > 1) this.page.current-=1
    } 
  }
}
</script>

<style scoped>
.icons{
  display: block;
}
.preloader{
 left: 50%;
 transform: translateX(-50%);
 margin-bottom: 30px;
 margin-top: 30px;
}
.btn_center{
   text-align: center;
   margin: 0 auto;
   color: rgb(131, 131, 131);
}
.title{
  text-align: center;
  font-size: 22px;
  font-weight: bold;
  color: rgb(131, 131, 131);
}
.newNote{
  background: rgb(247, 247, 247);
  padding: 10px;
}
.container {
  max-width: 800px;
}
</style>

