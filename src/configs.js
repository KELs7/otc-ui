//##########Wallet Cnnnection Config##############################

export const connectionRequest = {
    appName: "OTC dApp",
    version: "1.0.0", 
    logo: "otc-logo.svg", 
    contractName: "con_otc002", 
    networkType: "testnet",
    networkName: "arko"
}

//##########Transaction Configs##############################

let makeOfferKwargs = {
    offer_token: "con_rswp_lst001",
    offer_amount: "5",
    take_token: "currency",
    take_amount: "5"
}

let takeOfferKwargs = {
    offer_id: "",
}

let cancelOfferKwargs = {
    offer_id: "",
}

let approveOTCKwargs = {
    to: connectionRequest.contractName,
    amount: 0
}

export let makeOfferTxInfo = {
    networkType: "mainnet",
    methodName: "make_offer",
    kwargs: makeOfferKwargs, 
    stampLimit: 100
    
}
export let takeOfferTxInfo = {
    networkType: "mainnet",
    methodName: "take_offer",
    kwargs: takeOfferKwargs, 
    stampLimit: 100
    
}
export let cancelOfferTxInfo = {
    networkType: "mainnet",
    methodName: "cancel_offer",
    kwargs: cancelOfferKwargs, 
    stampLimit: 100
    
}

export let approveOTCcontractTxInfo = {
    networkType: "mainnet",
    contractName: "",
    methodName: "approve",
    kwargs: approveOTCKwargs, 
    stampLimit: 100
    
}


//##########Blockservice Config##############################

export let blockservices = [
    "testnet-v2-bs-sf.lamden.io",
    "testnet-v2-bs-bang.lamden.io",
    "testnet-v2-bs-lon.lamden.io"
]
   
    
