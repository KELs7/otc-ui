<script>
	
	import { page } from '$app/stores';
	import { menu_slide_store } from '../../stores'
	

	const menuItems = [{
		label:'offers', 
		route:'/'
	},
	{
		label:'make offer', 
		route:'/make_offer'
	
	}]

</script>

<div class="slideNav {$menu_slide_store?'slide':''}">
	
	<ul>
		{#each menuItems as menuItem}
			
			<li
				class="flex align-center"

				on:click={()=> {
					setTimeout(()=> menu_slide_store.set(false), 400);	
				}}
			>
			
			
				<a data-sveltekit-prefetch href={menuItem.route} class="flex align-center">
					
						{menuItem.label}
				
				</a>
			
		
			</li>
			
		{/each}
		
	</ul>
	
</div>

<style>
	.slideNav {
		display: none;
		margin: 0;
		position: fixed;
		z-index: 10; 
		width: 69.6vw;
		left: -72vw;
		height: 100vh;
		top: 14vh; 
		font-size: 2.5vh;
		font-weight: 600;
		color: var(--background-color);
		background-color: var(--table-color);
		transition: left 500ms ease;
	}
	ul {
		padding-left: 1.2rem;
		list-style: none;
		line-height: 4rem;
		
	}
	li {
		user-select: none;
		cursor: pointer;
		padding: 0;
		margin: 0;
		
	}
    li a {
		padding: 1.5vh 2.5vw;
    text-decoration: none;
		margin-right: 3vw;
    }
	li:hover > a{
		width: 100%;
		text-decoration: underline;
		background-color: var(--font-color);
    }
	.slide {
		left: -1vh;
	}
	img {
		width: 5vh;
		margin-right: 2.5vw;
	}
	
	@media (max-width: 400px) {
		.slideNav{
			display: block;
		}
	}
	
</style>
