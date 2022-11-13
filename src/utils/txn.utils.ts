import WalletController from 'lamden_wallet_controller';
import type { I_TransactionObj } from "../types";

//const lwc = new WalletController()

export const sendTransaction = async (lwc, transaction: I_TransactionObj): Promise<void> =>{
    //lwc.sendTransaction(transaction) 
    console.log(transaction)
}

