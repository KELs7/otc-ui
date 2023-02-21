import axios from "axios"
import type { I_Offer, I_FormatttedForTable } from "../types";
import { blockservice, connectionRequest, supportedTokens } from "../configs";
import {  balance_tau_store, vk_store } from '../stores'
import { get } from 'svelte/store'

async function walkThroughBsUrls(contract: string, variable: string){
    //TODO: provide a timeout to avoid getting stuck when all blockservices are offline
    for (let bs of blockservice){
        const res = await axios.get(`https://${bs}/current/all/${contract}/${variable}`) 
        if(res.data) return res.data
    }

}
   
export async function syncOffers(): Promise<any> {
    try {

        const bs_data =  await walkThroughBsUrls(connectionRequest.contractName, "data")

        const processed: I_Offer[]  = processBlockserviceData(bs_data)

        const formatted : I_FormatttedForTable[] = formatForTable(processed)

        return formatted

    } catch (err) {
        console.log(err)
    }
}

function processBlockserviceData(bs_data: any): I_Offer[]{
    const offersData : any = bs_data.con_otc002.data
    const ids: string[] = Object.keys(offersData)

    let processed = []
    for(let id of ids){
        
        const { 
            fee, maker, 
            offer_amount, offer_token, 
            state, take_amount, 
            take_token, taker
        }   = offersData[id]

        //gather only OPEN offers
        if(state === 'OPEN'){
           
            const offerObj: I_Offer ={ 
                offer_id: id, 
                fee, maker, 
                offer_amount, offer_token,
                state, take_amount, 
                take_token, taker
            }
           
            processed.push(offerObj)
        }
    }

    return processed
}

function getValueFromFixed(isItFixed: any): number{
    let value: number;
    if(isItFixed===null)return 0
    isItFixed.__fixed__?value = Number(isItFixed.__fixed__): value = Number(isItFixed)
    return value
}

async function formatForTable(processed: I_Offer[]): I_FormatttedForTable[] {
    let formatted = []
    
    for(let f of processed){
        const offer_id = f.offer_id
        const maker = `${f.maker.slice(0, 4)}. . .${f.maker.slice(61, 64)}`
        const offer = `${getValueFromFixed(f.offer_amount)} ${await getTokenSymbol(f.offer_token)}`
        const take = `${getValueFromFixed(f.take_amount)} ${await getTokenSymbol(f.take_token)}`

        formatted.push({ offer_id, maker, offer, take })
    }
    
    return formatted
}

function assignTokenSymbol(contract: string): string{
    let st = Object.keys(supportedTokens)
    for(let t of st){
        if(contract === t)return supportedTokens[t]
    }
}

async function getTokenSymbol(contract: string){
    const res = await axios.get(`https://testnet-v2-bs-sf.lamden.io/current/one/${contract}/metadata/token_symbol`)
    return res.data.value
}

 
