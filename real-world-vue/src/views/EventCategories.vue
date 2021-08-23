<template>
  <div v-if="categories">
    <h1>Categories</h1>
    <p class="event-category" v-for="category in categories" :key="category"> {{ category }} </p>
  </div>
</template>

<script>
import EventService from '@/services/EventService.js'

export default {
  data() {
    return {
        categories: null
    }
  },
  created() {
    EventService.getEvents()
      .then(response => {
        this.categories = response.data.map(a => a.category)
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>

<style scoped>
.event-category {
  color:chocolate;
}

.event-category:hover {
  transform: scale(1.01);
  font-weight: bold;
}
</style>