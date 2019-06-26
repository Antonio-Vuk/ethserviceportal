export const myServices = (state) => {
    if(state.user == null){
        return null
    }
    var allServices = state.loadedServices.sort((serviceA, serviceB) =>{
        return serviceA.date > serviceB.date
    })
    var myServices = []

    allServices.forEach(element => {
        if(element.creatorId === state.user.id){
            myServices.push(element)
        }
    });

    return myServices 
}

export const loadedServices = (state) => {
    return state.loadedServices.sort((serviceA, serviceB) =>{
        return serviceA.date > serviceB.date
    })
}

export const loadedPurschases = (state) => {
    return state.loadedPurschases.sort((purschaseA, purschaseB) =>{
        return purschaseA.purschaseDate > purschaseB.purschaseDate
    })
}

export const featuredServices = (state, getters) => {
    return getters.loadedServices.slice(0, 5)
}
export const loadedService = (state) => {
    return(serviceId) => {
        return state.loadedServices.find((service) => {
            return service.id === serviceId
        })
    }
}
export const user = (state) => {
    return state.user
}
export const loading = (state) => {
    return state.loading
}
export const error = (state) => {
    return state.error
}
export const account = (state) => {
    return state.account
}
export const balance = (state) => {
    return state.balance
}
export const userAddress = (state) => {
    return state.userAddress
}
export const indicator = (state) => {
    return state.indicator
}
export const transactionLoader = (state) => {
    return state.transactionLoader
}
export const soldServices = (state) => {
    if(state.user == null){
        return null
    }
    var soldServices = []
    
    var allPurschases = state.loadedPurschases.sort((purschaseA, purschaseB) =>{
        return purschaseA.purschaseDate > purschaseB.purschaseDate
    })

    allPurschases.forEach(element => {
        if(element.buyerAddress === state.userAddress){
            soldServices.push(element)
        }
    });

    return soldServices 
}
export const buyedServices = (state) => {
    if(state.user == null){
        return null
    }
    var buyedServices = []
    
    var allPurschases = state.loadedPurschases.sort((purschaseA, purschaseB) =>{
        return purschaseA.purschaseDate > purschaseB.purschaseDate
    })

    allPurschases.forEach(element => {
        if(element.serviceOwnerAddress === state.userAddress){
            buyedServices.push(element)
        }
    });

    return buyedServices 
}