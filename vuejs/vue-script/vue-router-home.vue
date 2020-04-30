<template>
	<h3>vue-router-home component</h3>
	<p>{{username}}</p>
</template>

<script>
export default {
  computed: {
    username () {
      // 我们很快就会看到 `params` 是什么
      return this.$route.params.username
    }
  },
  methods: {
    goBack () {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    }
  }
}
</script>

<style>
	h3{color: red;}
</style>