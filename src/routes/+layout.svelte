<script lang="ts">
    //css
    import '$lib/css/app.css';
    import '$lib/css/skeleton/skeleton.css';
    import { onMount } from 'svelte';
    
    //utils
    import { 
        initWalletController,
        handleWalletInfo,
        getCurrentWalletInfo,
        isWalletInstalled
    } from '../utils/connections.utils'
    
    //stores
    import { 
        lwc_store, 
        vk_store, 
        balance_tau_store, 
        toast_store, 
        menu_slide_store 
    } from '../stores';
    
    //component
    import Toast from '$lib/components/toast.svelte';
    import MenuSlide from '$lib/components/menuSlide.svelte';
    
    //environment
    import { browser } from '$app/environment';
    import { page } from '$app/stores';

    $: current_route = $page.url.pathname 
   

    onMount(()=>{
        initWalletController();
        getCurrentWalletInfo();
        isWalletInstalled() 

        $lwc_store?.events.on('newInfo', handleWalletInfo)

    })

    const connect = ()=>{
        isWalletInstalled()
    }

    
</script>

<nav class="container">
    <div class="flex j-space-between" >
    
        <div class="flex">
            <div class="otc-icon">OTC</div>
            <div class="flex pages">
                <div style="margin-right: 1.5rem; align-self: center" class:active={current_route == "/"}>
                    <a style="text-decoration: none" href="/">
                        offers
                    </a>
                </div>
                <div style="margin-right: 1.5rem; align-self: center" class:active={current_route == "/make_offer"}>
                    <a style="text-decoration: none; " href="/make_offer">
                        make offer
                    </a>
                </div>
            </div>
        </div>
        
        <div class="flex">
            <!--connect button-->
            <button class="button-primary" on:click={connect} on:keyup style="margin-bottom: 0">
                { $vk_store?`${$balance_tau_store} TAU | ${$vk_store.slice(0, 4)}. . .${$vk_store.slice(61, 64)}`: "connect wallet" }
            </button>
            <img class="menu-burger" src="menu-burger.svg" alt="menu" 
            on:click={menu_slide_store.set($menu_slide_store?false:true)} on:keyup/>
        </div>
        
    </div>
       
</nav>



<main class="container" style="padding-top: 5rem">

    <slot/>
    
</main>


<MenuSlide/>
<Toast/>




<style>
    nav {
        padding-top: 2rem;
    }
    .otc-icon{
        font-size: 3rem;
        color: var(--font-color);
        margin-right: 2rem; 
        /*align-self: end;*/
    }
    .menu-burger{
      display: none;  
    }
    .active{
        border-bottom: 2px solid var(--font-color);
    }
    @media (max-width: 400px) {
        .pages{
            display: none;
        }
        .menu-burger{
            display: block;  
            align-self: flex-start;
        }
    }
    
</style>
