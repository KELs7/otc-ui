import WalletController from 'lamden_wallet_controller';
import { connectionRequest } from '../configs'
import { lwc_store } from '../stores';


export const handleWalletInfo = (walletInfo)=> console.log("www")
export const handleTxnInfo = (txInfo)=> console.log("tttt")

export const initWalletController= ()=>{
    const lwc = new WalletController(connectionRequest);

    lwc_store.set(lwc)      
}



export const isWalletInstalled = (lwc)=>{
    lwc.walletInstalled()
        .then(installed=>{
            if(installed){}
            else {
                //send "install wallet" info to toast
                console.log("install wallet")
            }
        })
}