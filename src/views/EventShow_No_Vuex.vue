<template>
  <div>
    <div class="event-header">
      <h1 class="title">No Vuex for {{ event.title }}</h1>
      <span class="eyebrow">@{{ event.time }} on {{ event.date }}</span>
    </div>

    <BaseIcon name="map"><h2>Location</h2></BaseIcon>

    <address>{{ event.location }}</address>

    <h2>Event details</h2>
    <p>{{ event.description }}</p>

    <button @click.prevent="saved = !saved" style="margin-top: 10px;">Save</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      saved: false
    };
  },
  props: { event: { type: Object, required: true } },
  beforeRouteLeave(routeTo, routeFrom, next) {
    let result = false;
    if (!this.saved) {
      result = window.confirm('Unsaved changes, you wanna leave?');
      if (result) next();
      else next(false);
    } else next();
  },
  beforeRouteUpdate() {
    window.alert('Saved ? ' + this.saved);
  }
};
</script>
<style scoped>
.location {
  margin-bottom: 0;
}
.location > .icon {
  margin-left: 10px;
}
.event-header > .title {
  margin: 0;
}
.list-group {
  margin: 0;
  padding: 0;
  list-style: none;
}
.list-group > .list-item {
  padding: 1em 0;
  border-bottom: solid 1px #e5e5e5;
}
</style>
