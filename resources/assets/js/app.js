require('./bootstrap');

window.Vue = require('vue');
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

Vue.component('document', require('./components/Document.vue'));

// import es from 'vee-validate/dist/locale/es';
// import VeeValidate from 'vee-validate';
// import * as VeeValidate from 'vee-validate';
// Vue.use(VeeValidate);
