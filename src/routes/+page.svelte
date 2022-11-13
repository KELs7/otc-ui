<script lang="ts">
  import CopyToClipboard from '$lib/components/copyToClipboard.svelte';

  // const handleE = (e: any)=>{
  //   text = e.target.dataset.offerId
  // }

  const handleSuccessfulCopy = (e: any)=>{
    alert('success copied')
  }

  const handleFailedCopy = ()=>{
    alert('copied failed')
  }

  //mock data
  import { offer_store } from '../stores';
	



</script>

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
      <!-- <tr>
        <td>Dave Gamache</td>
        <td>26</td>
        <td>Male</td>
        <td>San Francisco</td>
      </tr>
      <tr>
        <td>Dwayne Johnson</td>
        <td>42</td>
        <td>Male</td>
        <td>Hayward</td>
      </tr> -->
      {#each $offer_store as offer_data}
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