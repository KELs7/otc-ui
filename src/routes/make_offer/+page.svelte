<script lang="ts">
    import type { I_TransactionObj } from "../../types";
    import {
        makeOfferTxInfo, 
        takeOfferTxInfo, 
        cancelOfferTxInfo,
        approveOTCcontractTxInfo
    } from '../../configs'
    import { sendTransaction} from '../../utils/txn.utils'
    import { encodeNumber } from '../../utils/encoding.utils'
    import { checkInputs } from '../../utils/validation.util';
    import { lwc_store, form_button_inactive_store } from '../../stores'
    //THOUGHT: probably move to config
    const spinnerGif = "icons8-spinning-circle.gif"

    import Loader from '$lib/components/loader.svelte'

    const submitOffer = async()=> {
        makeOfferTxInfo.kwargs.offer_amount = encodeNumber(makeOfferTxInfo.kwargs.offer_amount)
        makeOfferTxInfo.kwargs.take_amount = encodeNumber(makeOfferTxInfo.kwargs.take_amount)
        //approval txInfo
        approveOTCcontractTxInfo.contractName  = makeOfferTxInfo.kwargs.offer_token
        approveOTCcontractTxInfo.kwargs.amount = makeOfferTxInfo.kwargs.offer_amount
        
        form_button_inactive_store.set({form:"makeOfferForm"});

        checkInputs(makeOfferTxInfo.kwargs)
       
        await sendTransaction(makeOfferTxInfo) 
        await sendTransaction(approveOTCcontractTxInfo) //send approval txn
    }

     const submitTakeOffer = async()=> {
        checkInputs(takeOfferTxInfo.kwargs)
        
        approveOTCcontractTxInfo.contractName  = takeOfferTxInfo.kwargs.offer_token
        approveOTCcontractTxInfo.kwargs.amount = encodeNumber(takeOfferTxInfo.kwargs.offer_amount)
        
        form_button_inactive_store.set({form:"takeOfferForm"});
        
        await sendTransaction(takeOfferTxInfo) 
        await sendTransaction(approveOTCcontractTxInfo) //send approval txn
    }

     const submitCancelOffer = async()=> {
        checkInputs(cancelOfferTxInfo.kwargs)
        form_button_inactive_store.set({form:"cancelOfferForm"});
        await sendTransaction(cancelOfferTxInfo) 
    }
        
</script>

<form on:submit|preventDefault={submitOffer}>
    <div class="row">
        <div class="one-half column">
            <p>What token do you want to otc?</p>
            <input type="text" bind:value={makeOfferTxInfo.kwargs.offer_token}/>
        </div>
        <div class="one-half column">
            <p>How much do you want to otc?</p>
            <input type="text" bind:value={makeOfferTxInfo.kwargs.offer_amount}/>
        </div>
    </div>
    
    <div class="row">
        <div class="one-half column">
            <p>What token do you want in exchange?</p>
            <input type="text" bind:value={makeOfferTxInfo.kwargs.take_token}/>
        </div>
        <div class="one-half column">    
            <p>How much do you want in exchange?</p>
            <input type="text" bind:value={makeOfferTxInfo.kwargs.take_amount}/>
        </div>
    </div>

    <button class:inactive={$form_button_inactive_store.form} class="font-color">
        {#if $form_button_inactive_store.form == "makeOfferForm"}
            <!--img class="loading" src={spinnerGif} alt="pending"/-->
            <Loader/>
        {:else}
            submit
        {/if}
    </button>
</form>

<form on:submit|preventDefault={submitTakeOffer} >
    <p>Paste offer id to accept offer</p>
    <input type="text" bind:value={takeOfferTxInfo.kwargs.offer_id}/><br>
    <button class:inactive={$form_button_inactive_store.form} class="font-color">
        {#if $form_button_inactive_store.form == "takeOfferForm"}
            <!--img class="loading" src={spinnerGif} alt="pending"/-->
            <Loader/>
        {:else}
            submit
        {/if}
    </button>
</form>

<form on:submit|preventDefault={submitCancelOffer}>
    <p>Paste offer id to cancel offer you made</p>
    <input type="text" bind:value={cancelOfferTxInfo.kwargs.offer_id}/><br>
    <button class:inactive={$form_button_inactive_store.form} class="font-color">
        {#if $form_button_inactive_store.form === "cancelOfferForm"}
            <!--img class="loading" src={spinnerGif} alt="pending"/-->
            <Loader/>
        {:else}
            submit
        {/if} 
    </button>
</form>



<style>
    form {
        /*margin: auto;*/
        padding: 1em;
        border: 1px solid gray;
        border-radius: 7px;
        color: var(--font-color);
        /*background-color: var(--form-color);*/
    }
    form p {
        margin-bottom: 0;
        
    }
    form input {
        background-color: transparent;
        color: var(--font-color);
        border: 2px solid var(--form-color);
    }
    button{
    color: var(--font-color);
  }
    .loading{
        width: 30px;     
    }
    .inactive{
        pointer-events: none;
    }
</style>

<!--a target="_blank" href="https://icons8.com/icon/J18pPgWKQBRT/spinning-circle">Spinning Circle</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a-->
