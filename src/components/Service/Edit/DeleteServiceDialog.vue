<template>
    <v-dialog
    width="350px" 
    persistent 
    v-model="deleteDialog">
        <v-btn fab accent slot="activator">
            <v-icon>delete</v-icon>
        </v-btn>
        <v-card>
            <v-container>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-title class="primary--text"> Are you sure you want to delete service?</v-card-title>
                    </v-flex>
                </v-layout>                
                <v-divider></v-divider>

                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-actions>
                            <v-btn flat class="blue--text darken-1" @click="deleteDialog = false">No</v-btn>
                            <v-btn flat class="blue--text darken-1" @click="deleteService">Yes</v-btn>
                        </v-card-actions>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
    props: ['id'],
    data(){
        return{
            deleteDialog: false,
        }
    },
    methods: {
        deleteService(){
            this.deleteDialog = false;
            this.$store.dispatch('deleteService', this.id)
            this.$router.push('/')
        }
    }
}
</script>