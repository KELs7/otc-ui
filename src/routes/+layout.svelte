<script lang="ts">
    import '$lib/css/skeleton/skeleton.css';
    import { onMount } from 'svelte';
    import { syncOffers } from '../utils/api.utils'
    import { 
        initWalletController,
        handleWalletInfo,
        handleTxnInfo,
        isWalletInstalled
    } from '../utils/connections.utils'
    import { lwc_store } from '../stores'

    const connect = ()=>{
        //TODO: check whether lwc is null
        isWalletInstalled($lwc_store)
    }

    onMount(()=>{

        syncOffers()
        initWalletController()

    })

    $lwc_store?.events.on('newInfo', handleWalletInfo)
    $lwc_store?.events.on('txStatus', handleTxnInfo)
    
</script>

<nav>
    <a href="/">offers</a>
    <a href="/create_offer">create proposal</a>
    <button class="button-primary" on:click={connect}>connect</button>
</nav>

<slot/>