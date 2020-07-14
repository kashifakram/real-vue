import Vue from 'vue';
import Router from 'vue-router';
import EventCreate from '@/views/EventCreate.vue';
import EventList from '@/views/EventList.vue';
import EventShow from '@/views/EventShow.vue';
import EventShowNoVuex from '@/views/EventShow_No_Vuex';
import NotFound from '@/views/NotFound.vue';
import NProgress from 'nprogress';
import store from '@/store/store';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'event-list',
      component: EventList,
      props: true
    },
    {
      path: '/events/:id',
      name: 'event-show',
      component: EventShow,
      props: true
    },
    {
      path: '/events-no-vuex/:id',
      name: 'event-show-no-vuex',
      component: EventShowNoVuex,
      props: true,
      beforeEnter(routeTo, routeFrom, next) {
        store
          .dispatch('event/fetchEventNoVuex', routeTo.params.id)
          .then(event => {
            routeTo.params.event = event;
            next();
          });
      }
    },

    {
      path: '/event/create',
      name: 'event-create',
      component: EventCreate
    },
    {
      path: '*',
      component: NotFound
    }
  ]
});

router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
  // no need to call next as this is last route navigation guard
});

export default router;
