<template>
  <v-app>
    <v-toolbar dark class="primary" flat>
      <v-toolbar-side-icon @click.stop="sideNav = !sideNav" class="hidden-md-and-up"></v-toolbar-side-icon>
      <v-toolbar-title v-bind:class="{active: classActivator}">
        <router-link to="/" tag="span" style="cursor: pointer">
          ETH Service Portal
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat 
        v-for="item in menuItems" 
        :to="item.link"
        :key="item.title">
          <v-icon left dark>{{item.icon}}</v-icon>
          {{item.title}}
        </v-btn>
        <v-btn flat 
        @click="OnLoggout"
        v-if="userIsAuthenticated">
          <v-icon left dark>exit_to_app</v-icon>
          LOGOUT
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    

    <v-navigation-drawer app v-model="sideNav" temporary>
      <v-list>
        <v-list-tile 
        v-for="item in menuItems" 
        :to="item.link"
        :key="item.title">
          <v-list-tile-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            {{item.title}}
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile
        @click="OnLoggout"
        v-if="userIsAuthenticated">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            Logout
          </v-list-tile-content>
        </v-list-tile>

      </v-list>
    </v-navigation-drawer>

    <main>
      <transition name="slide" mode="out-in">
        <router-view></router-view>
      </transition>
    </main>

    <v-footer app class="primary lighten-2">
      <v-layout>
        <v-flex text-xs-center white--text>
          <strong v-if="account">
            Address: {{account}} - {{balance}} ETH
          </strong>
          <strong v-else>
            You are not connected to etherium network!
          </strong>
        </v-flex>
      </v-layout>
    </v-footer>

  </v-app>
</template>
<script>
export default {
  data () {
    return {
      sideNav: false
    }
  },
  computed: {
    menuItems () {
      let menuItems = [
        {icon: 'face', title: 'Register', link: '/signup'},
        {icon: 'lock_open', title: 'Log in', link: '/signin'}
      ]
      if(this.userIsAuthenticated){
        menuItems = [
          {icon: 'list_alt', title: 'My services', link: '/services'},
          {icon: 'room', title: 'Create service', link: '/service/new'},
          {icon: 'face', title: 'Profil', link: '/profil'},
        ]
      }
      return menuItems
    },
    userIsAuthenticated(){
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    },
    account(){
      return this.$store.getters.account
    },
    balance(){
      return this.$store.getters.balance
    },
    classActivator(){
      if(this.$store.getters.userAddress == null){
        return false
      }
      if(this.$store.getters.account != this.$store.getters.userAddress){
        return true
      }
    }
  },
  methods: {
    OnLoggout (){
      this.$store.dispatch('loggout')
      this.$router.push('/')
    }
  }
}
</script>

<style>

.active{
  color:green;
}

.slide-enter-active{
  animation: slide-in 400ms ease-out forwards;
}
.slide-leave-active{
  animation: slide-out 400ms ease-out forwards;
}
@keyframes slide-in{
  from{  
    transform: translateY(-30px);
    opacity: 0;
  }
  to{
    transform: translateY(0);
    opacity: 1;
  }
}
@keyframes slide-out{
  from{  
    transform: translateY(0);
    opacity: 1;
  }
  to{
    transform: translateY(-30px);
    opacity: 0;
  }
}
</style>
