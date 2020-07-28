import Vue from 'vue';
import Router from 'vue-router';
import EventCreate from '@/views/EventCreate.vue';
import EventList from '@/views/EventList.vue';
import EventShow from '@/views/EventShow.vue';
import EventShowNoVuex from '@/views/EventShow_No_Vuex';
import NotFound from '@/views/NotFound.vue';
import NetworkIssue from '@/views/NetworkIssue.vue';
import VuelidateExample from '@/views/VuelidateExample.vue';
import GroupTransition from '@/views/Animations/GroupTransition.vue';
import JsHooks from '@/views/Animations/JsHooks.vue';
import Gsap from '@/views/Animations/Gsap.vue';
import test from '@/views/Animations/test.vue';
import NProgress from 'nprogress';
import store from '@/store/store';
import RegisterUser from '@/views/Administration/RegisterUser.vue';
import EvenEventList from '@/views/EvenEventList.vue';
import UserProfile from '@/views/Administration/UserProfile.vue';
import LoginUser from '@/views/Administration/LoginUser.vue';

export default {
  Vue,
  Router,
  EventCreate,
  EventList,
  EventShow,
  EventShowNoVuex,
  NotFound,
  NetworkIssue,
  VuelidateExample,
  GroupTransition,
  JsHooks,
  Gsap,
  test,
  NProgress,
  store,
  RegisterUser,
  EvenEventList,
  UserProfile,
  LoginUser
};
