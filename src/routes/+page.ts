import { syncOffers } from "../utils/api.utils"

export async function load(){
    const offers = await syncOffers()
    return  {
        offers
    }    
}
