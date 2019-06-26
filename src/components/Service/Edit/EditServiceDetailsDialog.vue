<template>
    <v-dialog
    width="350px" 
    persistent 
    v-model="editDialog">
        <v-btn fab accent slot="activator">
            <v-icon>edit</v-icon>
        </v-btn>
        <v-card>
            <v-container>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-title class="primary--text">Edit Service</v-card-title>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-text>
                            <v-text-field
                            id="title"
                            label="Title"
                            required
                            v-model="editedTitle"
                            name="title">  
                            </v-text-field>
                            
                            <v-text-field
                            type="number"
                            step="0.01"
                            id="price"
                            label="Price"
                            required
                            v-model="editedPrice"
                            name="price">  
                            </v-text-field>

                            <v-textarea
                            id="description"
                            label="Description"
                            required
                            v-model="editedDescription"
                            name="description">  
                            </v-textarea>

                            <v-text-field
                            id="phone"
                            label="Phone"
                            required
                            v-model="editedPhone"
                            name="phone">  
                            </v-text-field>

                            <v-text-field
                            id="location"
                            label="Location"
                            required
                            v-model="editedLocation"
                            name="location">  
                            </v-text-field>

                        </v-card-text>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-actions>
                            <v-btn flat class="blue--text darken-1" @click="editDialog = false">Close</v-btn>
                            <v-btn flat class="blue--text darken-1" @click="OnSaveChanges">Save</v-btn>
                        </v-card-actions>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
    props: ['service'],
    data(){
        return{
            editDialog: false,
            editedTitle: this.service.title,
            editedDescription: this.service.description,
            editedPrice: this.service.price,
            editedPhone: this.service.phone,
            editedLocation: this.service.location
        }
    },
    methods: {
        OnSaveChanges(){
            if(this.editedTitle.trim() === '' || this.editedDescription.trim() === '' || this.editedPhone.trim() === '' || this.editedLocation.trim() === ''){
                return
            }
            this.editDialog = false;
            this.$store.dispatch('updateServiceData', {
                id: this.service.id,
                title: this.editedTitle,
                description: this.editedDescription,
                price: this.editedPrice,
                phone: this.editedPhone,
                location: this.editedLocation
            })
        }
    }
}
</script>
