<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm8 offset-sm2>
                <h1>Add new service</h1>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs12>
                <form @submit.prevent="onCreateService">
                    <v-layout row>
                        <v-flex xs12 sm8 offset-sm2>
                            <v-text-field
                            v-model="title"
                            id="title"
                            label="Title"
                            required
                            name="title">  
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm8 offset-sm2>
                                <v-text-field
                                v-model="price"
                                precision="2"
                                step="0.01"
                                id="price"
                                type="number"
                                label="Price"
                                required
                                name="price">  
                                </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm8 offset-sm2>
                            <v-btn raised class="primary" @click="onPickFile">Upload Image</v-btn>
                            <input 
                            type="file" 
                            style="display:none" 
                            ref="fileInput" 
                            @change="onFilePicked"
                            accept="image/*">
                        </v-flex>
                    </v-layout>
                    <v-layout row v-if="filePicked">
                        <v-flex xs12 sm8 offset-sm2>
                            <v-img
                            height="300"
                            :src="imageUrl">
                            </v-img>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm8 offset-sm2>
                            <v-textarea
                            v-model="description"
                            id="description"
                            label="Description"
                            required
                            name="description">  
                            </v-textarea>
                        </v-flex>
                    </v-layout>
                    <v-layout row >
                        <v-flex xs12 sm8 offset-sm2>
                            <v-text-field
                                v-model="phone"
                                type="phone"
                                name="phone"
                                label="Phone"
                                id="phone"
                                required>
                            </v-text-field>
                        </v-flex>
                    </v-layout>

                    <v-layout row >
                        <v-flex xs12 sm8 offset-sm2>
                            <v-text-field
                                v-model="location"
                                name="location"
                                label="Location"
                                id="location"
                                required>
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm8 offset-sm2>
                            <v-btn 
                            class="primary"
                            type="submit" 
                            :disabled="!formIsValid">
                            Create service
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </form>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
export default {
    data(){
        return {
            title: '',
            imageUrl: '',
            description: '',
            image: null,
            filePicked: false,
            price: '',
            phone: '',
            location: '',
        }
    },
    computed: {
        formIsValid(){
            return this.title !== '' 
            && this.imageUrl !== '' 
            && this.description !== ''
            && this.price !== ''
            && this.phone !== ''
            && this.location !== ''
        }
    },
    methods: {
        onCreateService(){
            if(!this.formIsValid){
                return
            }
            if(!this.image){
                return
            }
            const serviceData = {
                title: this.title,
                image: this.image,
                description: this.description,
                date: new Date(),
                price: this.price,
                phone: this.phone,
                location: this.location
            }
            this.$store.dispatch('createService', serviceData)
            this.$router.push('/services')
        },
        onPickFile(){
            this.$refs.fileInput.click()
        },
        onFilePicked(event){
            const files = event.target.files
            let filename = files[0].name
            if(filename.lastIndexOf('.') <= 0){
                return alert('Please add a valid file!')
                this.filePicked = false
                return
            }else{
                this.filePicked = true
            }
            const fileReader = new FileReader()

            fileReader.addEventListener('load', () => {
                this.imageUrl = fileReader.result
            })

            fileReader.readAsDataURL(files[0])
            this.image = files[0]
        }
    }
}
</script>