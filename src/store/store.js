import Vue from 'vue'
import Vuex from 'vuex'

import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        balance: undefined,
        account: undefined,
        loadedServices: [],
        loadedPurschases: [],
        user: null,
        loading: false,
        error: null,
        userAddress: null,
        indicator: null,
        transactionLoader: null
    },
    mutations,
    actions,
    getters
})