export const connectionRequest = {
    appName: 'My Killer dApp',
    version: '1.0.0', 
    logo: 'images/logo.png', 
    contractName: 'con_killer_app', 
    networkType: 'testnet'
}


//##########Transaction Configs##############################

let makeOfferKwargs = {
    offer_token: "con_lusd_lst001",
    offer_amount: 0,
    take_token: "currency",
    take_amount: 0
}

let takeOfferKwargs = {
    offer_id: "",
}

let cancelOfferKwargs = {
    offer_id: "",
}

export let makeOffer = {
   
    networkType: "mainnet",
    methodName: "make_offer",
    kwargs: makeOfferKwargs, 
    stampLimit: 100
    
}
export let takeOffer = {
   
    networkType: "mainnet",
    methodName: "take_offer",
    kwargs: takeOfferKwargs, 
    stampLimit: 100
    
}
export let cancelOffer = {
   
    networkType: "mainnet",
    methodName: "cancel_offer",
    kwargs: cancelOfferKwargs, 
    stampLimit: 100
    
}