import Vue from 'vue'

// ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import App from './ent.vue'


Vue.use(ElementUI)

Vue.config.productionTip = false;

import router from './router'

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
