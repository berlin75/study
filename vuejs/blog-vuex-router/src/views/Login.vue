<template>
  <div class="login">
  	<h4  v-if="!isReg">欢迎登陆</h4>
  	<h4  v-if="isReg">欢迎注册</h4>
		<div class="formItem"><input v-model="username" placeholder="用户名"></div>
		<div class="formItem"><input type="password" v-model="password" placeholder="密码"></div>
		<div v-if="isReg">
  		<div class="formItem"><input type="password" v-model="repeat" placeholder="再次输入密码"></div>
  		<div class="btnArea">
	  		<button class="btn active" @click="addUser()">确定</button>
	  		<button class="btn" @click="cancel()">取消</button>
	  	</div>
  	</div>
  	<div v-else class="btnArea">
	    <button class="btn active" @click="login()">登录</button>
	    <button class="btn" @click="reg()">注册</button>
	  </div>
  </div>
</template>

<script>
import store from '@/store'
export default {
	name: 'login',
	store,
	data(){
		return {
			username: '',
			password: '',
			repeat: '',
			isReg: false
		}
	},
	methods: {
		login(){
			const {username, password} = JSON.parse(localStorage.getItem('userinfo'))
			if(username === this.username && password === this.password){
				this.username = this.password = ''
				store.commit('addUser', {username})
				this.$router.push('/home/list')
			}else{
				alert('用户名或密码错误')
			}
		},
		reg(){
			this.isReg = true
		},
		addUser(){
			this.username = this.username.trim() 
			this.password = this.password.trim() 
			if(this.username === '' || this.password === ''){
				alert('请输入完整的信息')
			}else if(this.password === this.repeat){
				localStorage.setItem('userinfo', JSON.stringify({username: this.username, password: this.password}))
				this.username = this.password = this.repeat = ''
				this.isReg = false
			}else{
				alert('两次密码输入不一致')
			}
		},
		cancel(){
			this.isReg = false
		}
	}
}

</script>

<style scoped>
.login{
	padding: 1rem;
	margin: 1rem;
}
.formItem, h4{
	margin-bottom: 1rem;
}
input{
	width: 100%;
	padding: .5rem;
}
.btnArea{
	display: flex;
	justify-content: space-around;
  align-items: center;
}	
.btn{
	height: 3rem;
  line-height: 3rem;
  flex: 1;
  max-width: 40%;
  color: #42b983;
  background: #fff;
  font-size: 1rem;
  border-radius: 5px;
}
.active{
	color: #fff;
	background: #42b983;
}

</style>