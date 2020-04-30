<template>
  <div class="list">
    <ul>
    	<li class="listItem" v-for="(item, index) of pageLists" :key="index">
				<h4>{{item.title}}</h4>
				<p>{{item.content}}</p>
    	</li>
    </ul>
  </div>
</template>

<script>
import store from '@/store'	
export default {
	name: 'list',
	store,
	computed: {
		pageLists(){
			return store.state.lists
		}
	}
}	

</script>

<style scoped="">
.listItem{
	padding: 1rem;
	border: 1px solid rgba(0,0,0,.3);
	border-radius: 5px;
	box-shadow: 0 0 5px rgba(0,0,0,.2);
	text-align: left;
}

</style>