<template>
    <div>
        <h1>Create event {{ user.name }}</h1>
        <h2>User ID {{ user.id }}</h2>
        <h3>Total Categories {{ totalCategories }}</h3>
        <ol>
            <li v-for="c in categories" :key="c">{{ c }}</li>
        </ol>
        <h4>Total Completed Tasks {{ totalCompletedTasks }}</h4>
        <ul>
            <li v-for="ct in completedTasks" :key="ct.id"> id {{ ct.id }}, status {{ ct.done }} </li>
        </ul>
        <h4>Total Active Tasks {{ totalActiveTasks }}</h4>
        <ul>
            <li v-for="at in activeTasks" :key="at.id"> id {{ at.id }}, status {{ at.done }} </li>
        </ul>
        <h4>Status of Task 5 {{ getTaskById(5).done }}</h4>
    </div>
</template>
 
<script>
import { mapState } from 'vuex';
import { mapGetters } from 'vuex';

export default {
  //   computed: mapState({
  //     user: 'user',
  //     userName: s => s.user.name,
  //     userID: s => s.user.id,
  //     categories: 'categories'
  //   }),
  //   totalCategories() {
  //       return this.$store.getters.totalCategories;
  //     },
  //     totalCompletedTasks() {
  //       return this.$store.getters.totalCompletedTasks;
  //     },
  //     totalActiveTasks() {
  //       return this.$store.getters.totalActiveTasks;
  //     },
  // using same names as store objects and passing just names in array
  computed: {
    localComputed() {
      return 'local';
    },
    ...mapGetters([
      'totalCategories',
      'totalCompletedTasks',
      'totalActiveTasks',
      'completedTasks',
      'activeTasks',
      'getTaskById'
    ]),
    ...mapState(['user', 'categories'])
  },
  data() {
    return {};
  }
};
</script>
