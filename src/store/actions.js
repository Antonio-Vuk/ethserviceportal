import * as firebase from 'firebase'
import * as mutation from './mutation-types'
import * as DAPP from '../contract'

export const  updateMetamaskData = ({commit, getters}) =>{
    setInterval(async() => {

        web3.eth.getAccounts(function(err, accounts){
            if (err != null) {
                console.error("An error occurred: " + err);
            }
            else if (accounts.length == 0){
                //console.log("User is not logged in to MetaMask");    
                commit(mutation.updateAccount, undefined)            
            } 
            else {
                //console.log("User is logged in to MetaMask");
                commit(mutation.updateAccount, accounts[0])
                web3.eth.getBalance(accounts[0], function(error, result)  {
                    commit(mutation.setBalance, web3.fromWei(result.toNumber()))
                })
            }
        });

    }, 500)
}

export const loadServices = ({commit}) => {
    commit(mutation.setLoading, true)
    firebase.database().ref('Services').once('value')
    .then(
        (data) => {
            const services = []
            const obj = data.val()
            for(let key in obj){
                services.push({
                    creatorAddress: obj[key].creatorAddress,
                    creatorId: obj[key].creatorId,
                    date: obj[key].date,
                    description: obj[key].description,
                    imageUrl: obj[key].imageUrl,
                    location: obj[key].location,
                    phone: obj[key].phone,
                    price: obj[key].price,
                    title: obj[key].title,
                    id: key
                })
            }
            commit(mutation.setLoadedServices, services)
            commit(mutation.setLoading, false)
        }
    )
    .catch(
        (error) => {
            commit(mutation.setLoading, false)
            console.log(error)
        }
    )
};
export const createService = ({commit, getters}, payload) => {
    commit(mutation.setLoading, true)
    DAPP.ugovor.methods.createService()
        .send({
            from: web3.eth.defaultAccount,
            to: DAPP.contractAddress,
            value: web3.toWei(0.2, "ether"),
            gas: 300000
        })
        .on('confirmation', (confirmationNumber, receipt) => {
            if(confirmationNumber == 1){
                commit(mutation.setLoading, false)
                const service = {
                    title: payload.title,
                    location: payload.location,
                    description: payload.description,
                    date: payload.date.toISOString(),
                    creatorAddress: web3.eth.defaultAccount,
                    creatorId: getters.user.id,
                    price: payload.price,
                    phone: payload.phone
                }
                let imageUrl
                let key
                firebase.database().ref('Services').push(service)
                .then((data) => {
                    key = data.key
                    return key
                })
                .then(key => {
                    const filename = payload.image.name
                    const ext = filename.slice(filename.lastIndexOf('.'))
                    return firebase.storage().ref('Services/' + key + '.' + ext).put(payload.image)
                })
                .then(fileData => {
                    return firebase.storage().ref().child(fileData.metadata.fullPath).getDownloadURL()  
                })
                .then(function(url){
                    imageUrl = url
                    return firebase.database().ref('Services').child(key).update({imageUrl: imageUrl})  
                })
                .then(()=>{
                    commit(mutation.createService, {
                        ...service,
                        imageUrl: imageUrl,
                        id: key
                    })
                })
                .then(() => {
            
                })
                .catch((error) => {
                    console.log(error)
                })
                
                commit(mutation.setTransactionLoader, false)
                commit(mutation.setIndicator, true)
            }
        })
        .on('error', (error) => {            
            commit(mutation.setLoading, false)
            commit(mutation.setTransactionLoader, false)
            console.log(error)
        })
};

export const updateServiceData = ({commit}, payload) =>{
    commit(mutation.setLoading, true)
    const updateObj = {}
    if(payload.title){
        updateObj.title = payload.title
    }
    if(payload.description){
        updateObj.description = payload.description
    }
    if(payload.price){
        updateObj.price = payload.price
    }
    if(payload.phone){
        updateObj.phone = payload.phone
    }
    if(payload.location){
        updateObj.location = payload.location
    }
    firebase.database().ref('Services').child(payload.id).update(updateObj)
    .then(() =>{
        commit(mutation.setLoading, false)
        commit(mutation.updateService, payload)
    })
    .catch(error =>{
        console.log(error)
        commit(mutation.setLoading, false)
    })
};
export const signUserUp = ({commit, getters}, payload) => {
    if(web3.eth.defaultAccount == undefined){
        commit(mutation.setError, new Error("You are not connected to Metamask!"))
        return;
    }

    commit(mutation.setLoading, true)
    firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
    .then(
        () => {
            commit(mutation.setLoading, false)
            commit(mutation.clearError)
            const newUser = {
                address: web3.eth.defaultAccount,
                mail: payload.email,
                id: firebase.auth().currentUser.uid
            }
            firebase.database().ref('Users').push(newUser)
            commit(mutation.setUser, newUser)
            console.log(getters.error)
        }
    )
    .catch(
        error => {
            commit(mutation.setLoading, false)
            commit(mutation.setError, error)
        }
    )

};
export const signUserIn = ({commit, state}, payload) => {

    if(web3.eth.defaultAccount == undefined){
        commit(mutation.setError, new Error("You are not connected to Metamask!"))
        return;
    }

    commit(mutation.setLoading, true)
    firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
    .then(
        user => {
            const newUser = {
                id: firebase.auth().currentUser.uid,
                mail: payload.email
            }
            commit(mutation.setUser, newUser)
        }
    ).then(() => {
        firebase.database().ref('Users').once('value')
        .then(
            (data) => {
                const res = data.val()
                for(let key in res){
                    if(res[key].id == state.user.id){
                        var fuser = res[key]
                        commit(mutation.setUserAddress, fuser.address)
                        commit(mutation.setUser, fuser)
                    }
                }    
                if(state.userAddress != state.account){
                    alert("User and metamask account are not sincronized!")
                }
            }
        )
        commit(mutation.setLoading, false)
    }).catch(
        error => {
            commit(mutation.setLoading, false)
            commit(mutation.setError, error)
        }
    )
};
export const autoSignIn = ({commit}, payload) => {
    commit(mutation.setLoading, true)
    firebase.database().ref('Users').once('value')
    .then(
        (data) => {
            const res = data.val()
            for(let key in res){
                if(res[key].id = payload.uid){
                    var fuser = res[key]
                    commit(mutation.setUserAddress, fuser.address)
                    commit(mutation.setUser, fuser)
                }
            }    
        }
    )
    commit(mutation.setLoading, false)
};

export const loggout = ({commit}) => {
    commit(mutation.setUser, null)
    commit(mutation.setUserAddress, null)
    firebase.auth().signOut()
};
export const clearError = ({commit}) => {
    commit(mutation.clearError)
}
export const setIndicator = ({commit}, payload) => {
    commit(mutation.setIndicator, payload)
}
export const makePurschase = ({getters, state, commit}, payload) => {
    commit(mutation.setTransactionLoader, true)
    var purschase = {
        price: payload.price,
        purschaseDate: new Date().toUTCString(),
        serviceId: payload.id,
        approved: false,
        confirmed: false,
        buyerAddress: state.userAddress,
        serviceOwnerAddress: payload.creatorAddress
    }
    firebase.database().ref('Purschases').push(purschase)
    .then((data, error) => {
        if(error){
            console.log("Greska: ", error)
            commit(mutation.setTransactionLoader, false)
        }else{
            commit(mutation.setTransactionLoader, false)
            commit(mutation.setIndicator, true)
            commit(mutation.addPurschase, purschase)
        }
    })
}

export const loadPurschases = ({commit}) => {
    commit(mutation.setLoading, true)
    firebase.database().ref('Purschases').once('value')
    .then(
        (data) => {
            const purschases = []
            const obj = data.val()
            for(let key in obj){
                purschases.push({
                    approved: obj[key].approved,
                    buyerAddress: obj[key].buyerAddress,
                    confirmed: obj[key].confirmed,
                    price: obj[key].price,
                    purschaseDate: obj[key].purschaseDate,
                    serviceId: obj[key].serviceId,
                    serviceOwnerAddress: obj[key].serviceOwnerAddress,
                    id: key
                })
            }
            commit(mutation.setLoadedPurschases, purschases)
            commit(mutation.setLoading, false)
        }
    )
    .catch(
        (error) => {
            commit(mutation.setLoading, false)
            console.log(error)
        }
    )
};

export const widhdrawFounds = ({commit}) => {
    console.log("All founds 1")
    commit(mutation.setLoading, true)
    DAPP.ugovor.methods.withdraw()
        .send(
            {
                from: web3.eth.defaultAccount,
                to: DAPP.contractAddress,
                value: web3.toWei(0, "ether"),
                gas: 300000
            }
        )
        .on('confirmation', (confirmationNumber, receipt) => {
            if(confirmationNumber == 1){
                commit(mutation.setLoading, false)
            }
        })
        .on('error', (error) => { 
            commit(mutation.setLoading, false)
            commit(mutation.setTransactionLoader, false)
            console.log(error)
        })
}

export const deleteService = ({commit, state}, id) => {
    //firebase.database().ref('Services').child(id).remove()

    var index = state.loadedServices.findIndex(service => service.serviceId == id)
    state.loadedServices.splice(index, 1)
    
}