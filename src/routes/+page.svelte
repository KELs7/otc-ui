<script lang="ts">
  import CopyToClipboard from '$lib/components/copyToClipboard.svelte';
  
  export let data: any;
  const { offers } = data

  const handleSuccessfulCopy = (e: any)=>{
    alert('success copied')
  }

  const handleFailedCopy = ()=>{
    alert('copied failed')
  }

</script>

<!--TODO: show loader when nothing is being loaded-->

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

<style>
  table{
    color: var(--font-color);
    /*background-color: var(--form-color);*/
  }
  button{
    color: var(--font-color);
  }
</style>

