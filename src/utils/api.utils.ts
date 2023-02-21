import axios from "axios"
import type { I_Offer, I_FormatttedForTable } from "../types";
import { blockservices, connectionRequest } from "../configs";

export async function randoBSfetchCall(contract: string, variable: string, key: string|any){

    let n = Math.floor(Math.random() * 3);
    let bs = blockservices[n]
    if(key === undefined){
        const res = await axios.get(`https://${bs}/current/all/${contract}/${variable}`) 
        if(res.data) return res.data
    } else {
        const res = await axios.get(`https://${bs}/current/one/${contract}/${variable}/${key}`)
        if(res.data) return res.data.value
    }

}
   
export async function syncOffers(): Promise<any> {
    try {

        const bs_data =  await randoBSfetchCall(connectionRequest.contractName, "data", undefined)

        const processed: I_Offer[]  = processBlockserviceData(bs_data)

        const formatted : Promise<I_FormatttedForTable[]> = formatForTable(processed)

        return formatted

    } catch (err) {
        console.log(err)
    }
}

function processBlockserviceData(bs_data: any): I_Offer[]{
    const offersData : any = bs_data.con_otc002.data
    const ids: string[] = Object.keys(offersData)

    let processed: I_Offer[] = []
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

async function formatForTable(processed: I_Offer[]): Promise<I_FormatttedForTable[]> {
    let formatted: I_FormatttedForTable[]= []
    
    for(let f of processed){
        const offer_id = f.offer_id
        const maker = `${f.maker.slice(0, 4)}. . .${f.maker.slice(61, 64)}`
        const offer = `${getValueFromFixed(f.offer_amount)} ${await getTokenSymbol(f.offer_token)}`
        const take = `${getValueFromFixed(f.take_amount)} ${await getTokenSymbol(f.take_token)}`

        formatted.push({ offer_id, maker, offer, take })
    }
    
    return formatted
}

async function getTokenSymbol(contract: string){
    const tokenSymbol = await randoBSfetchCall(contract, "metadata", "token_symbol")
    return tokenSymbol
}

 
