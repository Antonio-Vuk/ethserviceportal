<template>
    <div>
        <v-container>
            <v-layout row>
                <v-flex xs12 sm8 offset-sm2>
                    <h1>Profile data:</h1>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs12 sm8 offset-sm2>
                    <v-card>
                        <v-container>
                            <v-layout>
                                <h2>Username: </h2>
                                <v-spacer></v-spacer>
                                <h3>{{user.mail}}</h3>    
                            </v-layout>  
                        </v-container>
                    </v-card>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs12 sm8 offset-sm2>
                    <v-card>
                        <v-container>
                            <v-layout>
                                <h2>Address: </h2>
                                <v-spacer></v-spacer>
                                <h3>{{account}}</h3>    
                            </v-layout>  
                        </v-container>
                    </v-card>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs12 sm8 offset-sm2>
                    <v-card>
                        <v-container>
                            <v-layout>
                                <h2>Balance: </h2>
                                <v-spacer></v-spacer>
                                <h3>{{balance}} ETH</h3>    
                            </v-layout>  
                        </v-container>
                    </v-card>
                </v-flex>
            </v-layout>

            <v-layout v-if="this.account == 0x7850E8fb863EEE8c11656257F4497c6BE76402B6">
                <v-flex xs12 sm8 offset-sm2>
                    <v-card>
                        <v-container>
                            <v-layout>
                                <v-spacer></v-spacer>
                                <v-btn 
                                @click="withdraw"
                                :disabled="loading"
                                :loading="loading"
                                class="primary"
                                type="submit">
                                    Withdraw all earnings
                                    <span slot="loader" class="custom-loader">
                                        <v-icon light>cached</v-icon>
                                    </span>
                                </v-btn>
                            </v-layout>  
                        </v-container>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>

export default {
    data(){
        return {
        }
    },
    methods: {
        withdraw(){
            this.$store.dispatch('widhdrawFounds')
        }
    },
    computed: {
        buyedServices(){
            return this.$store.getters.buyedServices
        },
        soldServices(){
            return this.$store.getters.soldServices
        },
        purschases(){
            return this.$store.getters.loadedPurschases
        },
        user (){
            return this.$store.getters.user
        },
        balance(){
            return this.$store.getters.balance
        },
        account(){
            return this.$store.getters.userAddress
        },
        loading(){
            return this.$store.getters.loading
        }
    }
}
</script>
