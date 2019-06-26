<template>
    <v-container>
        <v-layout row wrap v-if="false">
            <v-flex xs12 sm6 class="text-sm-right text-xs-center">
                <v-btn large router to="/services" class="secondary black--text">View service</v-btn>
            </v-flex>
            <v-flex xs12 sm6 class="text-sm-left text-xs-center">
                <v-btn large router to="/service/new" class="secondary black--text">Organize service</v-btn>
            </v-flex>
        </v-layout>

        <v-layout>
            <v-flex xs12 class="text-xs-center">
                <v-progress-circular
                class="primary--text"
                :width="7"
                :size="70"
                v-if="loading"
                indeterminate>
                </v-progress-circular>
            </v-flex>
        </v-layout>

        <v-layout row wrap class="mt-2" v-if="!loading && this.services.length > 0">
            <v-flex xs12>
                <v-carousel style="cursor:pointer;">
                    <v-carousel-item
                        v-for="service in services"
                        :key="service.id"
                        :src="service.imageUrl"
                        @click="onLoadService(service.id)">
                        <div class="title">
                            {{service.title}}
                        </div>
                    </v-carousel-item>
                </v-carousel>
            </v-flex>
        </v-layout>

        <v-layout row wrap class="mt-2" v-if="!loading && this.services.length > 0">
            <v-flex xs12 class="text-xs-center">
                <p>Buy with your favourite crypto currency</p>
            </v-flex>
        </v-layout>

        <v-layout row wrap class="mt-2" v-if="!loading && this.services.length == 0">
            <v-flex xs12>
                <v-card>
                    <v-card-title style="color: black; font-size: 23px;">
                        There is no service
                    </v-card-title>
                </v-card>
            </v-flex>
        </v-layout>

        <v-data-iterator
        v-if="!loading && this.services.length > 0"
        :pagination.sync="pagination"
        :rows-per-page-items="rowsPerPageItems"
        :items = "services">
            <v-layout slot="item" slot-scope="props" class="mt-3">
                <v-flex xs12 sm10 md12 offset-sm1 offset-md0>
                    <v-card class="secondary">
                        <v-container fluid>
                            <v-layout row>
                                <v-flex xs5 sm4 md4>
                                    <v-img 
                                        height="150px"                               
                                        :src = "props.item.imageUrl">
                                    </v-img>
                                </v-flex>
                                <v-flex xs7 sm8 md9>
                                    <v-card-title primary-title>
                                        <div>
                                            <h1 class="primary--text" mb0>{{props.item.title}}</h1>
                                            <div>{{props.item.date | date}}</div>
                                            <h2 class="primary--text">Price: {{props.item.price}} ETH</h2>
                                        </div>
                                    </v-card-title>
                                    <v-card-actions>
                                    <v-spacer></v-spacer>
                                        <v-btn flat 
                                        class="primary"
                                        :to="'/services/' + props.item.id">
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
        </v-data-iterator>
    </v-container>
</template>

<script>
export default {
    data(){
        return{
            pagination: {
                rowsPerPage: 4
            }
        }
    },
    computed: {
        loading(){
            return this.$store.getters.loading
        },
        services(){
            return this.$store.getters.loadedServices
        },
        rowsPerPageItems(){
            return [2, 3, 4]
        }
    },
    methods: {
        onLoadService(id){
            this.$router.push('/services/' + id)
        }
    }
}
</script>  

<style scoped>
    .title{
        position: absolute; 
        bottom: 50px;
        background-color: rgba(0, 0, 0, 0.5);
        color: white;
        font-size: 2em;
        padding: 20px;
    }
</style>
