<template>
	<div class="bigbox">
		<img class="bg" src="../assets/img/weixin.jpg" v-show="!registerIsShow&&!loginIsShow">
		<div class="registerOrLogin" v-show="!registerIsShow&&!loginIsShow">
			<div class="registerBtn">
				<mu-button large round ripple @click="">注册</mu-button>
			</div>
			<div class="loginBtn">
				<mu-button large round ripple @click="loginIsShow=true">登陆</mu-button>
			</div>
		</div>
        <div class="register">

        </div>
        <div class="login" v-show="loginIsShow">
            <mu-form ref="form" :model="validateForm" class="mu-demo-form">
                <mu-form-item label="用户名"  prop="username" :rules="usernameRules">
                    <mu-text-field v-model="validateForm.username" prop="username"></mu-text-field>
                </mu-form-item>
                <mu-form-item label="密码" prop="password" :rules="passwordRules">
                    <mu-text-field type="password" v-model="validateForm.password" prop="password"></mu-text-field>
                </mu-form-item>
                <mu-form-item>
                    <mu-button color="primary" @click="login()">登陆</mu-button>
                </mu-form-item>
            </mu-form>
        </div>
	</div>
</template>

<script>
	export default {
		name: "Welcome",
		data() {
			return {
				registerIsShow: false,
                loginIsShow: false,
                usernameRules: [
                    { validate: (val) => !!val, message: '必须填写用户名'},
                    { validate: (val) => val.length >= 3, message: '用户名长度大于3'}
                ],
                passwordRules: [
                    { validate: (val) => !!val, message: '必须填写密码'},
                    { validate: (val) => val.length >= 3 && val.length <= 10, message: '密码长度大于3小于10'}
                ],
                validateForm: {
                    username: '',
                    password: '',
                }
            }
		},
		created() {
			// this.update('123', '123')
		},
        methods:{
		    login(){
		        const user=this.validateForm.username
                const pwd=this.validateForm.password
		        this.update(user,pwd)
            }
        }
	}
</script>

<style lang="scss" scoped>
	.bigbox {
		position: fixed;
		top: 0;
		bottom: 0;
        left: 0;
        right: 0;
		z-index: 1;
		.bg {
			position: absolute;
            width: 100%;
            height: 100%;
            z-index: 5;
		}
		.registerOrLogin {
			position: relative;
            top: 80%;
            left: 20%;
            width: 60%;
            right: 20%;
			z-index: 99;
            display: flex;
            justify-content: space-between;
			.registerBtn {
				position: relative;
                display: inline-block;
			}
			.loginBtn {
				position: relative;
                display: inline-block;
            }
		}
        .login{
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 1;
            background: white;
        }
	}
</style>