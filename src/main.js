import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import { store } from './store/store'
import DateFilter from './filters/date'
import * as firebase from 'firebase'
import AlertCmp from './components/Shared/Alert.vue'
import SuccessCmp from './components/Shared/Success.vue'
import EditServiceDetailsDialog from './components/Service/Edit/EditServiceDetailsDialog.vue'
import RegisterDialog from './components/Service/Registration/RegisterDialog.vue'
import Vuelidate from 'vuelidate'
import DeleteServiceDialog from './components/Service/Edit/DeleteServiceDialog.vue'

Vue.config.productionTip = false

Vue.filter('date', DateFilter)
Vue.use(Vuelidate)
Vue.component('app-success', SuccessCmp)
Vue.component('app-alert', AlertCmp)
Vue.component('app-edit-service-details-dialog', EditServiceDetailsDialog)
Vue.component('app-delete-service-dialog', DeleteServiceDialog)
Vue.component('app-service-register-dialog', RegisterDialog)

new Vue({
  render: h => h(App),
  router,
  store,
  created() {
    this.$store.dispatch('updateMetamaskData')
    firebase.initializeApp({
      apiKey: 'AIzaSyAJ8qhg2MFaDgXzyZXOq1z-k4oTkSJe1tc',
      authDomain: 'ethserviceportal.firebaseapp.com',
      databaseURL: 'https://ethserviceportal.firebaseio.com',
      projectId: 'ethserviceportal',
      storageBucket: 'ethserviceportal.appspot.com',
      messagingSenderId: '984947077348'
    })
    // firebase.auth().onAuthStateChanged((user) => {
    //   if(user){
    //     this.$store.dispatch('autoSignIn', user)
    //   }
    // })
    this.$store.dispatch('loadServices')
    this.$store.dispatch('loadPurschases')
  },
}).$mount('#app')
