<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
    <p>Organized by <b>{{ event.organizer }}</b></p>
    <router-link class="event-category" :to="{ name: 'EventCategories'}">
      <p>{{ event.category }}</p>
    </router-link>
  </div>
</template>

<script>
import EventService from '@/services/EventService.js'

export default {
  props: ['id'],
  data() {
    return {
        event: null
    }
  },
  created() {
    EventService.getEvent(this.id)
      .then(response => {
        this.event = response.data
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
  text-decoration: none;
}

.event-category:hover {
  transform: scale(1.01);
  font-weight: bold;
}
</style>