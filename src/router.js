import Routes from '@/libs/routelibs.js';
import beforeEnter from '@/libs/navguards.js';

Routes.Vue.use(Routes.Router);

const router = new Routes.Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'event-list',
      component: Routes.EventList,
      props: true
    },
    {
      path: '/example',
      component: Routes.VuelidateExample
    },
    {
      path: '/test',
      component: Routes.test
    },
    {
      path: '/events/:id',
      name: 'event-show',
      component: Routes.EventShow,
      props: true,
      beforeEnter(routeTo, routeFrom, next) {
        beforeEnter(routeTo, routeFrom, next);
      }
    },
    {
      path: '/events-no-vuex/:id',
      name: 'event-show-no-vuex',
      component: Routes.EventShowNoVuex,
      props: true,
      beforeEnter(routeTo, routeFrom, next) {
        beforeEnter(routeTo, routeFrom, next);
      }
    },
    {
      path: '/user/:username',
      name: 'userprofile',
      component: Routes.UserProfile,
      props: true
    },
    {
      path: '/register',
      name: 'register',
      component: Routes.RegisterUser
    },
    {
      path: '/login',
      name: 'login',
      component: Routes.LoginUser
    },
    {
      path: '/even-events',
      name: 'even-events',
      component: Routes.EvenEventList,
      meta: { requiresAuth: true }
    },
    {
      path: '/event/create',
      name: 'event-create',
      component: Routes.EventCreate
    },
    {
      path: '/group',
      name: 'group',
      component: Routes.GroupTransition
    },
    {
      path: '/gsap',
      name: 'gsap',
      component: Routes.Gsap
    },
    {
      path: '/hooks',
      name: 'hooks',
      component: Routes.JsHooks
    },
    {
      path: '/404',
      name: '404',
      component: Routes.NotFound,
      props: true
    },
    {
      name: 'network-issue',
      path: '/network-issue',
      component: Routes.NetworkIssue
    },
    {
      path: '*',
      redirect: { name: '404', params: { source: 'page' } }
    }
  ]
});

router.beforeEach((routeTo, routeFrom, next) => {
  Routes.NProgress.start();
  const loggedIn = localStorage.getItem('user');
  if (routeTo.matched.some(r => r.meta.requiresAuth) && !loggedIn) next('/');
  next();
});

router.afterEach(() => {
  Routes.NProgress.done();
  // no need to call next as this is last route navigation guard
});

export default router;
