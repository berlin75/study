<template>
	<section class="real-app">
		<input 
			type="text"
			class="add-input"
			autofocus 
			placeholder="接下来的计划。。。"
			@keyup.enter="addTodo" 
		>
		<Tabs 
			:filter="filter" 
			:todos="todos" 
			@toggle="toggleFilter"
			@clearAll="clearAllCompleted"
		/>
		<Item 
			v-for="todo in filteredTodos"
			:key="todo.id"
			:todo="todo"
			@del="deleteTodo"
		/>
	</section>
</template>

<script>
	import Item from './item.vue'
	import Tabs from './tabs.vue'
	import store from '../store';

	let id = 0;
	export default {
		data() {
			return {
				todos: [],
				filter: 'all'
			}
		},
		components: {
			Item,
			Tabs
		},
		computed: {
			filteredTodos(){
				this.todos = store.fetch()
				if(this.filter === 'all'){
					return this.todos
				}
				const completed = this.filter === 'completed'
				return this.todos.filter(todo => completed === todo.completed)
			}
		},
		methods: {
			addTodo(e) {
				let content = e.target.value.trim()
				if(content){
					this.todos.unshift({
						id: id++,
						content: content,
						completed: false
					})
				}
				e.target.value = ''
			},
			deleteTodo(id){
				this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1)
			},
			toggleFilter(state){
				this.filter = state
			},
			clearAllCompleted(){
				this.todos = this.todos.filter(todo => !todo.completed)
			}
		},
		watch: {
		    todos: {
		      handler: function (items) { 
		          store.save(items);
		       },
		      deep: true
		    }
		},
	}
</script>

<style lang="stylus" scoped>
.real-app{
  width 600px
  margin 0 auto
  box-shadow 0 0 5px #666
}
.add-input{
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: 0;
  outline: none;
  color: inherit;
  padding: 6px;
  border: 1px solid #999;
  box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  font-smoothing: antialiased;
  padding: 16px 16px 16px 60px;
  border: none;
  box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
}
</style>