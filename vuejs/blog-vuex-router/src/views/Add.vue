<template>
  <div class="add">
    <p><input v-model='title' placeholder="标题"></p>
    <p><input v-model='content' placeholder="内容"></p>
    <p><button @click='add()'>添加</button></p>
  </div>
</template>

<script>
import store from '@/store'	
export default {
	name: 'login',
	store,
	data(){
		return {
			title: '',
			content: ''
		}
	},
	methods: {
		add(){
			store.commit('addItem', {title: this.title, content: this.content})
			this.title = ''
			this.content = ''
			this.$router.push('/home/list')
		}
	}
}	

</script>