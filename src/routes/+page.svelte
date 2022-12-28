<script lang="ts">
  import CopyToClipboard from '$lib/components/copyToClipboard.svelte';
  import Loader from '$lib/components/loader-table-page.svelte';
  
  export let data: any;
  const { offers } = data

  const handleSuccessfulCopy = (e: any)=>{
    alert('success copied')
  }

  const handleFailedCopy = ()=>{
    alert('copied failed')
  }

</script>

{#if offers === undefined}
  <div class="loader-bkg">
    <Loader/>
  </div>
  
{:else}

  <table class="u-full-width">
    <thead>
      <tr>
        <th>Offer id</th>
        <th>Maker</th>
        <th>Offer</th>
        <th>Take</th>
      </tr>
    </thead>
    <tbody>
      {#each offers as offer_data}
        <tr>
            <td>
              <CopyToClipboard on:copy={handleSuccessfulCopy} on:fail={handleFailedCopy} let:copy>
                <button data-offer-id={offer_data.offer_id} on:click={copy}>copy id</button>
              </CopyToClipboard>
              
            </td>
            <td>{offer_data.maker}</td>
            <td>{offer_data.offer}</td>
            <td>{offer_data.take}</td>
        </tr>
      {/each}
    </tbody>
  </table>

{/if}


<style>
  .loader-bkg{
    position: relative; 
    height: 50vh;
    width: 100%;
  }
  table{
    color: var(--font-color);
    /*background-color: var(--form-color);*/
  }
  button{
    color: var(--font-color);
  }
</style>

