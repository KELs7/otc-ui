//import WalletController from 'lamden_wallet_controller';
import type { I_TransactionObj } from "../types";
import { get } from 'svelte/store';
import {
    lwc_store,
    form_button_inactive_store,
    toast_store
} from '../stores';


export const sendTransaction = async (transaction: I_TransactionObj): Promise<void> =>{
    
    await get(lwc_store).sendTransaction(transaction, handleTxnResult)
    
}

//callback function to operate on returned txn result
export const handleTxnResult = (e: any)=>{
    //handle txn results

    const { data } = e

    const { errors, resultInfo, txBlockResult } = data;
    if(errors){     
        toast_store.set({
            show: true, 
            error: true, 
            message: errors[0]
        }) 
        
        setTimeout(()=>{
            toast_store.set({show: false})
        }, 4000)
        
    } else {
        //this block handles the case where txBlockResult is populated by wallet
        //but we will not display any info from it
        //REASON: I think none of the info is important to the average user 
        const { title, returnResult } = resultInfo;
        
        if(!returnResult){ 
            toast_store.set({
                show: true, 
                error: false, 
                message: title
            }) 
        } else {
            toast_store.set({
                show: true, 
                error: true, 
                message: returnResult
            }) 
        }

        setTimeout(()=>{
            toast_store.set({show: false})
        }, 4000)
    }
    
    //set button state back to active
    form_button_inactive_store.set({form: ""})
}

