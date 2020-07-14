import Vue from 'vue';
import Router from 'vue-router';
import EventCreate from '@/views/EventCreate.vue';
import EventList from '@/views/EventList.vue';
import EventShow from '@/views/EventShow.vue';
import EventShowNoVuex from '@/views/EventShow_No_Vuex';
import NotFound from '@/views/NotFound.vue';
import NetworkIssue from '@/views/NetworkIssue.vue';
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
          })
          .catch(error => {
            if (error.response && error.response.status === 404) {
              const errorNoti = {
                type: 'error',
                message:
                  'There is an error while fetching event: ' + error.message
              };
              store.dispatch('notification/add', errorNoti, { root: true });
              next({ name: '404', params: { source: 'event' } });
            } else next({ name: 'network-issue' });
          });
      }
    },

    {
      path: '/event/create',
      name: 'event-create',
      component: EventCreate
    },
    {
      path: '/404',
      name: '404',
      component: NotFound,
      props: true
    },
    {
      name: 'network-issue',
      path: '/network-issue',
      component: NetworkIssue
    },
    {
      path: '*',
      redirect: { name: '404', params: { source: 'page' } }
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
