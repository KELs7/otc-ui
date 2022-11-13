import axios from "axios"
import type { I_Offer, I_ProcessedOffer } from "../types";
import { offer_store } from '../stores';
//mock data
import offers from '../lib/mock-data/offers.json';

const local_hostnames = [
    '0.0.0.0', 'localhost', '127.0.0.1'
]

//const isProd = () => !local_hostnames.includes(window.location.hostname)

//const base_url = isProd() ? 'api/' : `${constructTestingUrl()}:2001/`

// function constructTestingUrl() {
//     const url = `${window.location.protocol}//${window.location.hostname}`
//     console.log(url)
//     return url
// }

export async function syncOffers(): Promise<void> {
    try {
        //const offers = (await axios.get(`${base_url}all_offers`)).data as I_Offer[]

         
        const f = await processOffers(offers.offers)

        offer_store.set(f)
        //console.log(offers.offers)

    } catch (err) {
        console.log(err)
    }
}

export async function processOffers(offers: I_Offer[]): Promise<I_ProcessedOffer[]> {
    let offerArray: any[] = [];
    for (let f of offers){
        //let offer_id = `${f.offer_id.slice(0, 3)}. . .${f.offer_id.slice(61, 64)}`
        let maker = `${f.maker.slice(0, 4)}. . .${f.maker.slice(61, 64)}`
        let offer = `${f.offer_amount} ${f.offer_token}`
        let take = `${f.take_amount} ${f.take_token}`

        offerArray.push({
            offer_id: f.offer_id,
            maker: maker,
            offer: offer,
            take: take
        })
    }
    return offerArray
}