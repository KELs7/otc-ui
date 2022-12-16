import WalletController from 'lamden_wallet_controller';
import { get } from 'svelte/store';
import { connectionRequest } from '../configs'
import { lwc_store, vk_store, toast_store } from '../stores';


export const handleWalletInfo = (wInfo)=> {
    if (wInfo.errors){
        wInfo.errors.forEach(err => {
            if(err=="You must be an authorized dApp to send this message type. Send 'lamdenWalletConnect' event first to authorize.")return
            toast_store.set({show: true, error:true, message:err})
        })
        setTimeout(()=>{
            toast_store.set({show: false})
        }, 4000)
        return
    }
    vk_store.set(wInfo.wallets[0])
}
//export const handleTxnInfo = (txInfo)=> console.log("tttt")

export const initWalletController= ()=>{
    const lwc = new WalletController(connectionRequest);
    lwc_store.set(lwc)     
}

export const isWalletInstalled = ()=>{
    const lwc = get(lwc_store)
    
    if(lwc===null){
        toast_store.set({show: true, error:true, message:"Connection request not initialised!" })
        return
    }
    lwc.walletIsInstalled()
        .then(installed=>{
            if(installed){}
            else {
                toast_store.set({show: true, error:true, message:"install wallet" })
            }
        })
}

export const getCurrentWalletInfo = ()=>{
    get(lwc_store).getInfo()
}
