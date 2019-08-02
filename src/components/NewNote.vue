<template>
  <!-- new note -->
  <div lass="input-group flex-nowrap ">
    
    <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text">Новая задача</span>
        </div>  
      <input class="form-control" v-model="note.title" type="text">
    </div>

    <button class="btn btn-primary" @click="addNote">Добавить</button>
  </div>
</template>

<script>

export default {
  data() {
    return {
    }
  },
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  methods: {
    addNote () {
     this.$emit('addNote', this.note)
    }
  }
}
</script>

<style lang="scss">

.new-note {
  text-align: center;
}
.input-group{
  margin-bottom: 10px;
}
.flex{
  display: flex;
  justify-content: space-between;
}
</style>

