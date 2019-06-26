<template>
    <v-container>

        <v-layout row wrap v-if="loading">
            <v-flex xs12 class="text-xs-center">
                <v-progress-circular
                class="primary--text"
                :width="7"
                :size="70"
                indeterminate>
                </v-progress-circular>
            </v-flex>
        </v-layout>

        <v-layout row wrap v-if="successIndicator">
            <v-flex xs12>
                <app-success @dismissed="onDismissed" :text="poruka">
                </app-success>
            </v-flex>
        </v-layout> 
        
        <v-layout row wrap v-if="!loading">
            <v-flex xs12>
                <v-card>
                    <v-card-title>
                        <h1 class="primary--text">
                            {{service.title}} 
                        </h1> 
                        <template v-if="userIsCreator">
                            <v-spacer></v-spacer>
                            <app-edit-service-details-dialog :service="service"></app-edit-service-details-dialog>
                            <app-delete-service-dialog :id="this.id"></app-delete-service-dialog>
                        </template>
                    </v-card-title>
                    <v-img
                    :src="service.imageUrl"
                    height="400px">
                    </v-img>
                    <v-card-text>
                        <div class="primary--text">
                            {{service.date | date}} - {{service.location}}
                        </div>
                        <div>
                            {{service.description}}
                        </div>
                        <div>
                            <h2>
                                Price: {{service.price}} ETH
                            </h2>
                        </div>
                        <div>
                            <h4>
                                Location: {{service.location}}
                            </h4>
                        </div>
                        <div>
                            <h4>
                                Contact: {{service.phone}}
                            </h4>
                        </div>
                    </v-card-text>
                    <v-card-actions v-if="false">
                        <v-spacer></v-spacer>
                        <app-service-register-dialog 
                        v-if="userIsAuthenticated && !userIsCreator"
                        :service="service">
                        </app-service-register-dialog>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    props: ['id'],
    computed: {
        successIndicator(){
            return this.$store.getters.indicator
        },
        poruka(){
            return "Transaction commited!"
        },
        service(){
            return this.$store.getters.loadedService(this.id)
        },
        userIsAuthenticated(){
            return this.$store.getters.user !== null && this.$store.getters.user !== undefined
        },
        userIsCreator(){
            if(!this.userIsAuthenticated){
                return false
            }
            return this.$store.getters.user.id === this.service.creatorId
        },
        loading(){
            return this.$store.getters.loading
        },
        transactionLoader(){
            return this.$store.getters.transactionLoader
        }
    },
    methods: {
        onDismissed(){
            this.$store.dispatch('setIndicator', false)
        }
    }
}
</script>