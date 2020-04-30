<template>
  <div class="user">
    <h4>{{userinfo.username}}</h4>
    <div class="about">
    	<button @click='addBlog()' class="add">发布文章</button>
    </div>
  </div>
</template>

<script>
import store from '@/store'
export default {
	name: 'user',
	data(){
		return {
			userinfo: store.state.userinfo
		}
	},
	methods: {
		addBlog(){
			this.$router.push('/add')
		}
	}
}
</script>

<style scoped>
.user{
	margin-top: 5rem;
	padding: 2rem;
}
.about{
	margin-top: 3rem;
	margin-left: 2rem;
	text-align: left;
}
.add{
	padding: .5rem 1rem;
}

</style>