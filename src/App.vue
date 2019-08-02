<template>
  <div class="wrapper">

    <div class="wrapper-content">

      <router-view/> 

    </div>
  </div>
</template>

 <script>

import Note from '@/views/Note.vue'


export default {
  components: {
    Note
  },
}

</script>

<style scoped>
.container {
  max-width: 800px;
}
</style>
