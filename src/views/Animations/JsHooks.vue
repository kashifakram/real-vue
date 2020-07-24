<template>
    <div>
        <button @click="isOpen = !isOpen">Open Profile</button>
        <transition @before-enter="beforeEnterProfile" @enter="enterProfile" @leave="leaveProfile" :css="false">
            <div v-if="isOpen" class="drawer">
                <img src="@/assets/avatar.png" alt="avatar" />
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </transition>  
    </div>
</template>

<script>
import * as JsHooks from '@/libs/JsHooks.js';
export default {
  data() {
    return {
      isOpen: false
    };
  },
  methods: {
    beforeEnterProfile(el) {
      JsHooks.beforeEnterProfile(el);
    },
    enterProfile(el, done) {
      JsHooks.enterProfile(el, done);
    },
    leaveProfile(el, done) {
      JsHooks.leaveProfile(el, done);
    }
  }
};
</script>

<style scoped>
img {
  height: 2.5em;
  width: 2.5em;
  border-radius: 50%;
}

.drawer {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 20em;
  width: 12em;
  border-radius: 1%;
  background-color: #e0e0e0;
  box-shadow: 0.08em 0.03em 0.4em #ababab;
  padding-top: 0.7em;
}

.drawer div {
  height: 3.5em;
  width: 95%;
  margin-top: 0.6em;
  background-color: #f0f0f0;
  border: 0.02em solid #ababab;
  border-radius: 1%;
}
</style>