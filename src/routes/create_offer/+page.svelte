<script lang="ts">
    import type { I_TransactionObj } from "../../types";
    import {
        makeOffer, 
        takeOffer, 
        cancelOffer
    } from '../../configs'
    import { sendTransaction} from '../../utils/txn.utils'
    import { lwc_store } from '../../stores'
    


    const submitOffer = (txInfo: I_TransactionObj)=>{

        sendTransaction($lwc_store, txInfo) 
    }

    
</script>


<form on:submit|preventDefault={submitOffer(makeOffer)}>
    <p>What token do you want to otc?</p>
    <input type="text" bind:value={makeOffer.kwargs.offer_token}/><br>
    <p>How much do you want to otc?</p>
    <input type="text" bind:value={makeOffer.kwargs.offer_amount}/><br>
    <p>What token do you want in exchange?</p>
    <input type="text" bind:value={makeOffer.kwargs.take_token}/><br>
    <p>How much do you want in exchange?</p>
    <input type="text" bind:value={makeOffer.kwargs.take_amount}/><br>
    <input type="submit" value="submit"/>
</form>

<form on:submit|preventDefault={submitOffer(takeOffer)}>
    <p>Paste offer id to accept offer</p>
    <input type="text" bind:value={takeOffer.kwargs.offer_id}/><br>
    <input type="submit" value="submit"/>
</form>

<form on:submit|preventDefault={submitOffer(cancelOffer)}>
    <p>Paste offer id to cancel offer you made</p>
    <input type="text" bind:value={cancelOffer.kwargs.offer_id}/><br>
    <input type="submit" value="submit"/>
</form>

<style>
    form p {
        margin-bottom: 0;
    }
</style>