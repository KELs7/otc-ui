<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher<{ copy: string; fail: never}>();
    //export let text: string;

    const copy = (e: any)=>{
        let text = e.target.dataset.offerId
        navigator.clipboard.writeText(text).then(
            ()=>dispatch("copy", text),
            (e)=>dispatch("fail")
        );
    }
</script>

<slot {copy}/>