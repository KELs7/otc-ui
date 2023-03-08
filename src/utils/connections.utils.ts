import WalletController from '$lib/walletController';
import { get } from 'svelte/store';
import { connectionRequest } from '../configs';
import { randoBSfetchCall } from './api.utils';
import { 
    lwc_store, 
    balance_tau_store,
    vk_store, 
    toast_store, 
} from '../stores';

const authError = `You must be an authorized dApp to send this message type.
 Send 'lamdenWalletConnect' event first to authorize.`

export const handleWalletInfo = (wInfo)=> {
    if (wInfo.errors){
        wInfo.errors.forEach(err => {
            if(err === authError)return
            toast_store.set({show: true, error:true, message:err})
        })
        setTimeout(()=>{
            toast_store.set({show: false})
        }, 4000)
        return
    }
    vk_store.set(wInfo.wallets[0]);
        
}

export const initWalletController= ()=>{ 
    const lwc = new WalletController();
    lwc_store.set(lwc)     
}

export const isWalletInstalled = ()=>{
    const lwc = get(lwc_store);
    let response;

    if(lwc===null){
        toast_store.set({
            show: true, error:true, 
            message:"Connection request not initialised!" 
        })
        return
    }
    const handleResponse = (wInfo)=> {
        response = "got an event!";
        if (get(balance_tau_store) === "0"){
            getTauBalance(wInfo.wallets[0]);
        }
        lwc.events.removeListener("newInfo", handleResponse);
    }
    lwc.events.on("newInfo", handleResponse)
    lwc.sendConnection(connectionRequest)
    setTimeout(() => {
        if (response === undefined){
            toast_store.set({ show: true, error:true, message:"install wallet" })   
        }
    }, 1000)
}

export const getCurrentWalletInfo = ()=>{
    get(lwc_store).getInfo()
}

function getValueFromFixed(isItFixed: any): number{
    let value: number;
    if(isItFixed===null)return 0
    isItFixed.__fixed__?value = Number(isItFixed.__fixed__): value = Number(isItFixed)
    return value
}

async function getTauBalance(vk: string) {
    try {   
        const bs_data =  await randoBSfetchCall("currency", "balances", vk)
        const bal  = getValueFromFixed(bs_data)
        balance_tau_store.set(bal.toFixed(8))    

    } catch (err) {
        console.log(err)
    }
}
