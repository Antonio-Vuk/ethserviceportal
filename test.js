export const watchWeb3Account = ({commit, dispatch, state}) => {
    setInterval(async () => {

        console.log("Default account", web3.eth.defaultAccount)
        console.log(DAPP.ugovor.options.address)
        
        var adre = DAPP.ugovor.methods.getPeopleAddresses().call()
        .then(result => {
            console.log(result)
        })

        var people = DAPP.ugovor.methods.getPersonData('0xD5eb9562fE0d02dEB55B01126EAF57B3a04bc709').call()
        .then(result => {
            var people = result
            console.log(people)
        })

        var people = DAPP.ugovor.methods.setData("Domajgoj", 23).send({from: web3.eth.defaultAccount})
        .then(result =>{
            console.log(result)
        })
        
        const activeAccount = accounts[0]

        console.log(activeAccount)

        if(!activeAccount) return

        console.log(activeAccount)

        if(activeAccount !== state.account){
            commit(types.UPDATE_ACCOUNT, activeAccount)
        }
   }, 5000)
}

export const getUserDetail = ({commit}, id) => {    
    
    var Url = 'https://ethserviceportal.firebaseio.com/Users.json?id=WeA0ljcLL2cTc0O3tEUwCQyM4ar2'

     var res = fetch(Url)
     .then(data => {
         return data.json()
     })
     .then(res => {
        console.log(key)
     })

    
}
