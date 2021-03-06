import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';
import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';
import 'nprogress/nprogress.css';
import Vuelidate from 'vuelidate';
import DateFilter from '@/filters/date.js';
import axios from 'axios';

Vue.use(Vuelidate);

// Global mixins
Vue.mixin({
  mounted() {
    console.log('Global mixin mounted');
  }
});

// Registering global date filter
Vue.filter('date', DateFilter);

// Vue.config.productionTip = false;

const requireComponent = require.context(
  // The relative path of the components folder
  './components/Globals',
  // Whether or not to look in subfolders
  false,
  // The regular expression used to match base component filenames
  /Base[A-Z]\w+\.(vue|js)$/
);

requireComponent.keys().forEach(fileName => {
  console.log(`Global Component Name: ${fileName}`);
  // Get component config
  const componentConfig = requireComponent(fileName);

  // Get PascalCase name of component
  const componentName = upperFirst(
    camelCase(
      // Gets the file name regardless of folder depth
      fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')
    )
  );

  // Register component globally
  Vue.component(
    componentName,
    // Look for the component options on `.default`, which will
    // exist if the component was exported with `export default`,
    // otherwise fall back to module's root.
    componentConfig.default || componentConfig
  );
});

new Vue({
  router,
  store,
  created() {
    const userString = localStorage.getItem('user');
    if (userString) {
      const userData = JSON.parse(userString);
      this.$store.commit('SET_USER_DATA', userData);
    }
    axios.interceptors.response.use(
      r => r,
      e => {
        if (e.response.status === 401) this.$store.dispatch('logout');
        return Promise.reject(e);
      }
    );
  },
  render: h => h(App)
}).$mount('#app');
