//##########Wallet Cnnnection Config##############################

export const connectionRequest = {
    appName: 'OTC dApp',
    version: '1.0.0', 
    logo: 'otc-logo.svg', 
    contractName: 'con_otc001', 
    networkType: 'mainnet'
}

//##########Supported Tokens##############################

export const supportedTokens = {
    currency: "TAU",
    tau: "TAU",
    con_rswp_lst001: "RSWP",
    con_lusd_lst001: "LUSD",
    con_weth_lst001: "WETH",
    con_marmite100: "$MARMITE",
    con_yeti_contract: "YETI",
    con_reflecttau_v2: "RTAU",
    con_spang : "SPANG",
    con_beer: "BEER",
    con_spooky: "SPOOKY",
    con_gold_contract: "GOLD"
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


//##########Blockservice Config##############################

export let blockservice = [
    "blockservice.opticprotocol.finance"
]
   
    
