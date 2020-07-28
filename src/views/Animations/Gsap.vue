<template>
  <div>
      <transition appear @before-enter="beforeEnter" @enter="enter" :css="false">
        <div class="card"></div>
      </transition>
      <div id="container">
          <div v-for="(card) in cards" :key="card.id" class="icard"></div>
      </div>
      <div class="bar" :style="{ width: tweenedNumber + 'px'}">
          <span> {{ tweenedNumber.toFixed(0) }} </span>
      </div>
      <div>
          <img src="@/assets/runner.png" alt="runner" class="runner first">
          <img src="@/assets/runner.png" alt="runner" class="runner second">
          <img src="@/assets/runner.png" alt="runner" class="runner third">
      </div>
      <div id="master_container">
          <img src="@/assets/paws.png" alt="fox-paws" class="paws pfirst">
          <img src="@/assets/paws.png" alt="fox-paws" class="paws psecond">
          <img src="@/assets/paws.png" alt="fox-paws" class="paws pthird">
          <img src="@/assets/paws.png" alt="fox-paws" class="paws pfourth">

          <img src="@/assets/fox.png" alt="fox-logo" id="fox">
      </div>
      <button @click="playMasterTL">Play Master Timeline</button>
  </div>
</template>

<script>
import gsap from 'gsap';
let masterTL = gsap.timeline();

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
      ],
      number: 0,
      tweenedNumber: 0
    };
  },
  watch: {
    //   will watch value of number in data and run the following method when it changes
    number(newValue) {
      gsap.to(this.$data, {
        duration: 1,
        ease: 'circ.out',
        tweenedNumber: newValue
      });
    }
  },
  methods: {
    playMasterTL() {
      let p = false;
      masterTL.add(this.pawsTL());
      masterTL.add(this.foxTL());
      masterTL
        .play()
        .then(() => (p = true))
        .then(() => {
          if (p) masterTL.clear(true);
        });
    },
    pawsTL() {
      let tl = gsap.timeline();
      tl.to('.pfirst', {
        opacity: 1,
        duration: 1,
        scale: 1,
        ease: 'bounce.out'
      });
      tl.to(
        '.psecond',
        { opacity: 1, duration: 1, scale: 1, ease: 'bounce.out' },
        '<.3'
      );
      tl.to(
        '.pthird',
        { opacity: 1, duration: 1, scale: 1, ease: 'bounce.out' },
        '<.3'
      );
      tl.to(
        '.pfourth',
        { opacity: 1, duration: 1, scale: 1, ease: 'bounce.out' },
        '<.3'
      );
      return tl;
    },
    foxTL() {
      let tl = gsap.timeline();
      tl.to('#fox', {
        opacity: 1,
        filter: 'blur(0)',
        scale: 1,
        duration: 1.3,
        ease: 'slow'
      });
      return tl;
    },
    randomNumber() {
      this.number = Math.floor(Math.random() * (450 - 0));
    },
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
    let tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
    tl.to('.first', { x: 400, duration: 2, ease: 'expo.out' });
    tl.to('.second', { x: 400, duration: 2, ease: 'expo.out' }, '<.5');
    tl.to('.third', { x: 400, duration: 2, ease: 'expo.out' }, '<');
    gsap.from('.icard', {
      duration: 0.5,
      opacity: 0,
      scale: 0,
      y: 500,
      ease: 'power1',
      stagger: {
        each: 0.3,
        from: 'end'
      }
    });
  },
  created() {
    setInterval(this.randomNumber, 1500);
  }
};
</script>

<style scoped>
#container {
  margin-top: 1em;
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
.bar {
  margin-top: 1em;
  padding: 5px;
  background-color: #2c3e50;
  border: 1px #16c0b0 solid;
  min-width: 20px;
}
.bar span {
  color: white;
}
.runner {
  display: block;
  height: 5em;
  width: 5em;
  margin-top: 1.5em;
}
#master_container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 5em;
}
#fox {
  opacity: 0;
  filter: blur(3px);
  height: 8em;
  width: 8em;
}
.paws {
  transform: scale(0);
  width: 2.5em;
  height: 2.5em;
  margin-top: 50px;
  margin-right: 0.8em;
  opacity: 0;
}
/* button {
  margin-top: 1em;
} */
</style>
