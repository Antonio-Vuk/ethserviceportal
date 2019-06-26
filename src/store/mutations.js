export const updateAccount = (state, account) => {
    state.account = account
};
export const registerUserForService = (state, payload) => {
    const id = payload.id
    if(state.user.registeredServices.findIndex(service => service.id ===id) >= 0){
        return
    }
    state.user.registeredServices.push(id)
    state.user.fbKeys[id] = payload.fbKeys
};
export const unregisterUserForService = (state, payload) => {
    const registeredServices = state.user.registeredServices
    registeredServices.splice(registeredServices.findIndex(service => service.id === payload), 1)
    Reflect.deleteProperty(state.user.fbKeys, payload)
};
export const createService = (state, payload) => {
    state.loadedServices.push(payload)
};
export const addPurschase = (state, payload) => {
    state.loadedPurschases.push(payload)
};
export const updateService = (state, payload) => {
    const service = state.loadedServices.find(service => {
        return service.id === payload.id
    })
    if(payload.title){
        service.title = payload.title
    }
    if(payload.description){
        service.description = payload.description
    }
    if(payload.price){
        service.price = payload.price
    }
    if(payload.phone){
        service.phone = payload.phone
    }
    if(payload.location){
        service.location = payload.location
    }
};
export const setUser = (state, payload) => {
    state.user = payload
};
export const setLoading = (state, payload) => {
    state.loading = payload
};
export const setError = (state, payload) => {
    state.error = payload
};
export const clearError = (state) => {
    state.error = null
};
export const clearIndicator = (state) => {
    state.indicator = null
};
export const setLoadedServices = (state, payload) => {
    state.loadedServices = payload
}
export const setLoadedPurschases = (state, payload) => {
    state.loadedPurschases = payload
}
export const setBalance = (state, payload) => {
    state.balance = payload
}
export const setUserAddress = (state, payload) => {
    state.userAddress = payload
}
export const setIndicator = (state, payload) => {
    state.indicator = payload
};
export const setTransactionLoader = (state, payload) => {
    state.transactionLoader = payload
};