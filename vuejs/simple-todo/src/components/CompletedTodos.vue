<template>
    <div id="completed-todos">
        <h3 v-if="completed.length">Completed({{completed.length}})</h3>
        <ul class="list-group">
            <li class="list-group-item completed-li" v-for="todo in completed">
                {{todo.body}}
                <button type="button" @click="remove(todo)" class="btn btn-default btn-sm">
                    <span class="glyphicon glyphicon-remove-circle"></span> Remove
                </button>
            </li>
        </ul>

    </div>
</template>

<script>
    export default{
        methods: {
            remove(todo){
                this.$store.dispatch('removeTodo', todo)
            }
        },
        computed: {
            completed(){
                return this.$store.getters.completedTodos
            }
        }
    }
</script>

<style scoped>
    .completed-li {
        display: flex;
        justify-content: space-between;
    }
</style>