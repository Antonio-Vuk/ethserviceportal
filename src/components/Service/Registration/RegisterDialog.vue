<template>
    <v-dialog
    :disabled="transactionLoader"
    width="350px"
    persistent 
    v-model="registerDialog">
        <v-btn accent 
        slot="activator" 
        class="primary"
        :disabled="transactionLoader"
        :loading="transactionLoader">
            Buy
            <span slot="loader" class="custom-loader">
                <v-icon light>cached</v-icon>
            </span>
        </v-btn>
        <v-card>
            <v-container>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-title>Are you sure you want to buy service: {{service.title}}</v-card-title>                        
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-text>One time you make purschase, you cant change your decision!</v-card-text>
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-actions>
                            <v-btn 
                            class="red--text darken-1" 
                            flat 
                            @click="registerDialog = false">Cancel</v-btn>
                            <v-btn
                            
                            class="green--text darken-1"
                            flat
                            @click="onAgree">Confirm</v-btn>
                        </v-card-actions>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </v-dialog>
</template>
<script>
import { setTimeout } from 'timers';
import { async } from 'q';
export default {
    props: ['service'],
    data(){
        return{
            registerDialog: false
        }
    },
    methods: {
        onAgree (){
            this.$store.dispatch("makePurschase", this.service)
            this.registerDialog = false
        }
    },
    computed: {
        loading(){
            return this.$store.getters.loading
        },
        transactionLoader(){
            return this.$store.getters.transactionLoader
        }
    }
}
</script>
<style>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>

