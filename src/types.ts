export interface I_Offer{
    offer_id: string;
    maker: string ;
    taker: string | undefined | null; 
    offer_token :string;
    offer_amount: number; 
    take_token: string;
    take_amount: number;
    fee: number;
    state: string;
}

export interface I_ProcessedOffer{
    offer_id: string;
    maker: string;
    offer: string;
    take: string;
}
 

export interface I_TransactionObj{
    networkType: string;
    methodName: string; 
    kwargs: any; 
    stampLimit: number;
}

export interface I_ConnectionReq{
    appName: string;
    version: string; 
    logo: string; 
    contractName: string; 
    networkType: string;
}

