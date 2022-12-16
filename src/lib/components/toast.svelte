<script lang="ts">
    import { fly } from 'svelte/transition';
    import { toast_store } from '../../stores';

</script>
{#if $toast_store.show}
    <div transition:fly="{{ y: -100, duration: 1000 }}" 
    class="toast {$toast_store.error?'toast-error':'toast-success'}">

    {$toast_store.message}
    
    </div>
{/if}



<style>
    .toast {
        position: fixed;
        max-width: 400px;
        z-index: 20;
        padding: 1em;
        margin: auto;
        left: 0;
        right: 0;
        top: 2em;
        text-align: center;
        border-radius: 5px;
        /* visibility: hidden;
        opacity: 0; */
    }
    .toast-success {
        background-color: #98FB98; /*Mint green*/
    }
    .toast-error {
        background-color: #FF7F50; /*Coral*/
    }
    
</style>
