<template>
  <!-- note list -->  
  <div class="notes">

    <div class="note card"  :class="[{full:!grid}, [note.selected]]" v-for="(note, index) in notes" :key="index">
      <div class="note-header card-header" :class="{ full: !grid }" >
        <p class="title_notes">{{note.num}}. {{ note.title }}</p>


        <div class="close" @click="removeNote(note.id)" data-toggle="tooltip" title="Удалить задачу">
            <svg class="icon" height="20" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M512.003072 64C264.570234 64 64 264.570234 64 511.991814 64 759.426701 264.570234 960 512.003072 960 759.423629 960 960 759.426701 960 511.991814 960 264.570234 759.423629 64 512.003072 64L512.003072 64 512.003072 64ZM512.003072 900.266189C297.907891 900.266189 123.733811 726.097222 123.733811 511.99079 123.733811 297.905843 297.913005 123.729722 512.003072 123.729722 726.092109 123.729722 900.265165 297.905843 900.265165 511.99079 900.265165 726.097222 726.092109 900.266189 512.003072 900.266189L512.003072 900.266189 512.003072 900.266189ZM556.848186 511.044454 695.21799 374.180602C707.790464 361.767731 707.888678 341.507936 695.471712 328.936493 683.053728 316.356858 662.765286 316.259667 650.222483 328.676634L511.663411 465.703149 375.219014 328.837254C362.70384 316.328211 342.478829 316.259667 329.968768 328.774848 317.455635 341.253197 317.424941 361.507872 329.906355 374.023053L466.161485 510.692518 328.78201 646.594688C316.209536 659.047462 316.111322 679.267354 328.528288 691.846989 334.798662 698.180794 343.02617 701.346163 351.281293 701.346163 359.406496 701.346163 367.536806 698.245248 373.776493 692.096614L511.345235 556.038944 650.031174 695.174003C656.271878 701.444378 664.465626 704.577011 672.688013 704.577011 680.88073 704.577011 689.039693 701.443354 695.280403 695.237434 707.790464 682.757037 707.824224 662.531002 695.343834 649.988205L556.848186 511.044454 556.848186 511.044454Z" /></svg>
        </div>
      </div>

        <p>{{note.selected}}</p>

        <div class="space">
          <span class="note_date">{{ note.date }}</span>
          <router-link :to="/note/+note.id">
            <div class="icons"  data-toggle="tooltip" title="Редактировать задачу">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
                <g><path d="M909.8,514.5v405.2c0,7.1-5.8,12.8-12.8,12.8H88.1c-7.1,0-12.9-5.8-12.9-12.8V110.3c0-7.1,5.8-12.8,12.9-12.8h404.7c18,0,32.6-14.6,32.6-32.6c0-18-14.6-32.6-32.6-32.6H88.1C45,32.2,10,67.2,10,110.3v809.4c0,43.1,35,78.1,78.1,78.1h808.9c43.1,0,78.1-35,78.1-78.1V514.5c0-18-14.6-32.6-32.6-32.6S909.8,496.5,909.8,514.5L909.8,514.5z M281.5,545.8l-40,144.9c-4.8,17.4,5.4,35.3,22.8,40.1c17.4,4.8,35.3-5.4,40.1-22.8l40-144.9c4.8-17.4-5.4-35.3-22.8-40.1C304.2,518.2,286.2,528.4,281.5,545.8L281.5,545.8z M283.6,731.4l169.9-30c17.7-3.1,29.6-20,26.4-37.8c-3.1-17.7-20-29.6-37.8-26.4l-169.9,30c-17.7,3.1-29.6,20-26.4,37.8C248.9,722.7,265.9,734.6,283.6,731.4L283.6,731.4z M340.9,572.5l501.2-500c6.8-6.8,17.8-6.8,24.6,0l53,53c6.8,6.8,6.8,17.8,0,24.5l-490,491.3c-12.7,12.8-12.7,33.4,0.1,46.1c12.7,12.7,33.4,12.7,46.1-0.1l490-491.2c32.2-32.2,32.2-84.5,0-116.7l-53-53c-32.3-32.2-84.5-32.2-116.8,0L294.9,526.4c-12.7,12.7-12.8,33.4-0.1,46.1C307.5,585.2,328.2,585.3,340.9,572.5L340.9,572.5z"/></g>
              </svg>
            </div>
          </router-link>
        </div>
      </div>

  </div>
</template>

<script>
export default {
  props: {
    notes: {
      type: Array,
      required: true
    },
    grid: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      defolt:{
        title:'',
      },
    }
  },
  methods: {
    removeNote (id) {
      this.$emit('remove', id)
    },
    editNote: function(note){
      note.edit=false
      this.$emit('cangeNote', note)
    },
  }
}
</script>

<style lang="scss">
.title_notes{
font-size: 20px!important;
font-weight: normal!important;
}
.note_date{
 font-size: 12px;
 color: #818181;
 padding: 5px;
}
.close{
  cursor: pointer;
  margin-right: -20px;
  margin-top: -55px;
}

.icons{
  width: 20px;
  height: 20px;
}
.space{
  display: flex;
  justify-content: space-between;
}
.planned{
  background-color: #fff!important;
}
.finished{
  background-color: rgb(252, 255, 59)!important;
}

.note-header.full {
  justify-content: space-between!important;
}
.notes {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 40px 0;
}
.note {
  width: 48%;
  padding: 18px 20px;
  margin-bottom: 20px;
  
  transition: all .25s cubic-bezier(.02,.01,.47,1);
  box-shadow: 0 30px 30px rgba(0,0,0,.02);
  &:hover {
    box-shadow: 0 30px 30px rgba(0,0,0,.04);
    transform: translate(0,-6px);
    transition-delay: 0s !important;
  }
  &.full {
    width: 100%;
    // text-align: center;
  }
}
.note-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  h1 {
    font-size: 20px;
  }
  p {
    font-size: 22px;
    font-weight: bold;
    // color: #747474;
  }
  svg {
    margin-right: 12px;
    color: #3b3b3b;
    &.active {
      color: #402caf;
    }
    &:last-child {
      margin-right: 0;
    }
  }
  &.full {
    justify-content: center;
    p {
      margin-right: 16px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
}

.note-body{
  p {
    margin: 20px 0;
  }
  span {
    font-size: 14px;
    color: #464646;
  }
}
@media (max-width:600px){
  .note .full{
      width: 100%;
    
  }
}
</style>

