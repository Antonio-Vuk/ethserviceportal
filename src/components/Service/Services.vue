<template>
    <v-container>

        <v-layout v-if="loading">
            <v-flex xs12 class="text-xs-center">
                <v-progress-circular
                class="primary--text"
                :width="7"
                :size="70"
                
                indeterminate>
                </v-progress-circular>
            </v-flex>
        </v-layout>

        <v-layout v-else row wrap v-for="service in services" :key="service.id" class="mb-3">
            <v-flex xs12 sm10 md12 offset-sm1 offset-md0>
                <v-card class="secondary" >
                    <v-container fluid>
                        <v-layout row >
                            <v-flex xs5 sm4 md4>
                                <v-img 
                                    height="150px"                               
                                    :src="service.imageUrl">
                                </v-img>
                            </v-flex>
                            <v-flex xs7 sm8 md9>
                                <v-card-title primary-title>
                                    <div>
                                        <h1 class="primary--text" mb0>{{service.title}}</h1>
                                        <div>{{service.date | date}}</div>
                                        <h2 class="primary--text">Price: {{service.price}} ETH</h2>
                                    </div>
                                </v-card-title>
                                <v-card-actions>
                                <v-spacer></v-spacer>
                                    <v-btn flat 
                                    class="primary"
                                    :to="'/services/' + service.id">
                                        <v-icon left light>arrow_forward</v-icon>
                                        View Service
                                    </v-btn>
                                </v-card-actions>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout row wrap v-if="!servicesCount" && !loading>
            <v-flex xs12>
                <v-card>
                    <v-card-title>
                        You do not have any services
                    </v-card-title>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    computed: {
        services(){
            return this.$store.getters.myServices
        },
        servicesCount(){
            return this.$store.getters.myServices.length > 0
        },
        loading(){
            return this.$store.getters.loading
        }
    }
}
</script>