import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: "#1a237e",
    secondary: "#DCDCDC",
    accent: "#82B1FF",
    error: "#b71c1c",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FB8C00"
  }
})