<template>
  <div>
      <transition appear @before-enter="beforeEnter" @enter="enter" :css="false">
        <div class="card"></div>
      </transition>
      <div id="container">
          <div v-for="(card) in cards" :key="card.id" class="icard"></div>
      </div>
  </div>
</template>

<script>
import gsap from 'gsap';
export default {
  data() {
    return {
      cards: [
        { id: 7 },
        { id: 2 },
        { id: 3 },
        { id: 5 },
        { id: 4 },
        { id: 6 },
        { id: 1 }
      ]
    };
  },
  methods: {
    beforeEnter(el) {
      el.style.opacity = 0;
      el.style.transform = 'scale(0,0)';
    },
    enter(el, done) {
      gsap.to(el, {
        duration: 2,
        opacity: 1,
        scale: 1,
        ease: 'bounce.inOut',
        onComplete: done
      });
    }
  },
  mounted() {
    gsap.from('.icard', {
      duration: 0.5,
      opacity: 0,
      scale: 0,
      y: 500,
      ease: 'power1',
      stagger: {
        each: 0.3,
        from: 'edges'
      }
    });
  }
};
</script>

<style scoped>
#container {
  margin-top: 4em;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
.icard {
  height: 6.5em;
  width: 6.5em;
  border-radius: 1%;
  background-color: #16a0f0;
  box-shadow: 0.08em 0.03em 0.4em #ababab;
  padding-top: 1em;
  margin-top: 0.5em;
  margin-right: 0.5em;
}
.card {
  display: block;
  margin: 0 auto 0 auto;
  height: 6.5em;
  width: 6.5em;
  border-radius: 1%;
  background-color: #16c0b0;
  box-shadow: 0.08em 0.03em 0.4em #ababab;
}
</style>
