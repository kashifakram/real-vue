import store from '@/store/store';

export default function beforeEnter(routeTo, routeFrom, next) {
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
          message: 'There is an error while fetching event: ' + error.message
        };
        store.dispatch('notification/add', errorNoti, { root: true });
        next({ name: '404', params: { source: 'event' } });
      } else next({ name: 'network-issue' });
    });
}
