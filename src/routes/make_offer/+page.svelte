<script lang="ts">
    import type { I_TransactionObj } from "../../types";
    import {
        makeOffer, 
        takeOffer, 
        cancelOffer
    } from '../../configs'
    import { sendTransaction} from '../../utils/txn.utils'
    import { encodeNumber } from '../../utils/encoding.utils'
    import { lwc_store, form_button_inactive_store } from '../../stores'
    //THOUGHT: probably move to config
    const spinnerGif = "icons8-spinning-circle.gif"

    import Loader from '$lib/components/loader.svelte'

    const submitOffer = async()=> {
        let txInfo = makeOffer
        txInfo.kwargs.offer_amount = encodeNumber(txInfo.kwargs.offer_amount)
        txInfo.kwargs.take_amount = encodeNumber(txInfo.kwargs.take_amount)
        
        form_button_inactive_store.set({form:"makeOfferForm"});
        await sendTransaction(txInfo) 
    }

     const submitTakeOffer = async()=> {
        
        form_button_inactive_store.set({form:"takeOfferForm"});
        await sendTransaction(takeOffer) 
    }

     const submitCancelOffer = async()=> {
        form_button_inactive_store.set({form:"cancelOfferForm"});
        await sendTransaction(cancelOffer) 
    }
        
</script>

<form on:submit|preventDefault={submitOffer}>
    <div class="row">
        <div class="one-half column">
            <p>What token do you want to otc?</p>
            <input type="text" bind:value={makeOffer.kwargs.offer_token}/>
        </div>
        <div class="one-half column">
            <p>How much do you want to otc?</p>
            <input type="text" bind:value={makeOffer.kwargs.offer_amount}/>
        </div>
    </div>
    
    <div class="row">
        <div class="one-half column">
            <p>What token do you want in exchange?</p>
            <input type="text" bind:value={makeOffer.kwargs.take_token}/>
        </div>
        <div class="one-half column">    
            <p>How much do you want in exchange?</p>
            <input type="text" bind:value={makeOffer.kwargs.take_amount}/>
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
    <input type="text" bind:value={takeOffer.kwargs.offer_id}/><br>
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
    <input type="text" bind:value={cancelOffer.kwargs.offer_id}/><br>
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
