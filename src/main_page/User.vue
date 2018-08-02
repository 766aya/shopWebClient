<template>
	<div id="User">
		<div class="content animated" :class="{'zoomIn': animated.zoomIn, 'zoomIn': animated.zoomOut, 'infinite': animated.infinite}">
			<el-row class="title" v-text="form.title"></el-row>
			<el-row type="flex" :gutter="10">
				<el-col :span="9" class="col-box label">
					<label>Username</label>
				</el-col>
				<el-col :span="15" class="col-box input">
					<el-input type="text" name="username" placeholder="input your username" v-model="form.username" clearable></el-input>
				</el-col>
			</el-row>
			<el-row type="flex" :gutter="10" v-if="form.title != 'Retrieve The Password'">
				<el-col :span="9" class="col-box label">
					<label>Password</label>
				</el-col>
				<el-col :span="15" class="col-box input">
					<el-input type="password" name="password" placeholder="input your password" v-model="form.password" clearable></el-input>
				</el-col>
			</el-row>
			<el-row type="flex" :gutter="10" v-if="form.title == 'Register'">
				<el-col :span="9" class="col-box label">
					<label>RePassword</label>
				</el-col>
				<el-col :span="15" class="col-box input">
					<el-input type="password" name="repassword" placeholder="input your RePassword" v-model="form.repassword" clearable></el-input>
				</el-col>
			</el-row>
			<el-row type="flex" :gutter="10" v-if="form.title == 'Register' || form.title == 'Retrieve The Password'">
				<el-col :span="9" class="col-box label">
					<label>EmailAddress</label>
				</el-col>
				<el-col :span="15" class="col-box input">
					<el-input type="text" name="email" placeholder="input your EmailAddress" v-model="form.email" clearable></el-input>
				</el-col>
			</el-row>
			<el-row type="flex" :gutter="10" v-if="form.title == 'Register'">
				<el-col :span="9" class="col-box label">
					<label>telPhoneNumber</label>
				</el-col>
				<el-col :span="15" class="col-box input">
					<el-input type="text" name="telphoneNumber" placeholder="input your telphoneNumber" v-model="form.telphoneNumber" clearable></el-input>
				</el-col>
			</el-row>
			<el-row type="flex" :gutter="10" v-if="form.title == 'Retrieve The Password'">
				<el-col :span="9" class="col-box label">
					<label>VerificationCode</label>
				</el-col>
				<el-col :span="7" class="col-box">
					<el-input type="text" name="VerificationCode" placeholder="VerificationCode" v-model="VerificationCode"></el-input>
				</el-col>
				<el-col :span="8" class="col-box">
					<el-button type="primary" @click="ObtainVerification" :disabled="VerificationState" v-text="VerificationBtnText"></el-button>
				</el-col>
			</el-row>
			<el-row type="flex" :gutter="10" v-if="form.title == 'Retrieve The Password'">
				<el-col :span="9" class="col-box label">
					<label>Password</label>
				</el-col>
				<el-col :span="15" class="col-box input">
					<el-input type="password" name="password" placeholder="input your password" v-model="form.password" clearable></el-input>
				</el-col>
			</el-row>
			<el-row type="flex" :gutter="10"  v-if="form.title == 'Retrieve The Password'">
				<el-col :span="9" class="col-box label">
					<label>RePassword</label>
				</el-col>
				<el-col :span="15" class="col-box input">
					<el-input type="password" name="repassword" placeholder="input your RePassword" v-model="form.repassword" clearable></el-input>
				</el-col>
			</el-row>
			<el-row type="flex" v-if="form.title == 'Login'">
				<el-col :span="24" class="col-box" style="text-align: center;">
					<el-checkbox v-model="form.checked">下次自动登录</el-checkbox>
				</el-col>
			</el-row>
			<el-row type="flex" v-if="form.title == 'Login'">
				<el-col :span="24" class="submit-box">
					<el-button type="primary" @click="Login" round class="submit">login</el-button>
				</el-col>
			</el-row>
			<el-row type="flex" v-if="form.title == 'Register'">
				<el-col :span="24" class="submit-box">
					<el-button type="primary" @click="NewAccount" round class="submit">register</el-button>
				</el-col>
			</el-row>
			<el-row type="flex" v-if="form.title == 'Retrieve The Password'">
				<el-col :span="24" class="submit-box">
					<el-button type="primary" @click="RetrievePassword" round class="submit">Retrieve The Password</el-button>
				</el-col>
			</el-row>
			<el-row type="flex">
				<el-col :span="12" class="link-box" v-if="form.title != 'Login'">
					<el-button type="text" @click="userChange(0)">用户登录</el-button>
				</el-col>
				<el-col :span="12" class="link-box" v-if="form.title != 'Register'">
					<el-button type="text" @click="userChange(1)">用户注册</el-button>
				</el-col>
				<el-col :span="12" class="link-box" v-if="form.title != 'Retrieve The Password'">
					<el-button type="text" @click="userChange(2)">找回密码</el-button>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	import { setItemLocal, setItemSession } from '@/components/localstrong'
	export default {
		name: 'User',
		data () {
			return {
				form: {
					title: 'Login',
					username: '',
					password: '',
					repassword: '',
					email: '',
					telphoneNumber: '',
					checked: false,
					userAuth: false
				},
				animated: {
					zoomIn: true,
					zoomOut: false,
					infinite: false
				},
				VerificationCode: '',
				VerificationState: false,
				VerificationBtnText: '获取验证码',
				VerificationCount: 0,
			}
		},
		created() {
			let routerType = this.$route.params.type
			if (routerType == 'login') {
				this.form.title = 'Login'
				this.userChange(0)
			} else if(routerType == 'register') {
				this.form.title = 'register'
				this.userChange(1)
			} else if(routerType == 'retrieve') {
				this.form.title="Retrieve The Password";
				this.userChange(2)
			} else {
				this.form.title = 'Login'
				this.userChange(0)
			}
		},
		methods: {
			userChange (val) {
				switch(val) {
					case 0:
						this.$router.push({name: 'User', params: {type: 'login'}})
						this.form.title="Login";
						this.changeAnimated()
						this.reform();
						break;
					case 1:
						this.$router.push({name: 'User', params: {type: 'register'}})
						this.form.title="Register";
						this.changeAnimated()
						this.reform();
						break;
					case 2:
						this.$router.push({name: 'User', params: {type: 'retrieve'}})
						this.form.title="Retrieve The Password";
						this.changeAnimated()
						this.reform();
						break;
				}
			},
			reform () {
				this.form.username = ''
				this.form.password = ''
				this.form.repassword = ''
				this.form.email = ''
				this.form.telphoneNumber = ''
				this.form.checked = false
			},
			changeAnimated () {
				this.animated.zoomIn = false
				this.animated.zoomOut = true
				this.animated.infinite = true
				setTimeout(()=>{
					this.animated.infinite = false
					this.animated.zoomIn = true
					this.animated.zoomOut = false
				}, 1000)
			},
			NewAccount () {
				// Axios请求
				let self = this;
				if(self.form.username && self.form.password && self.form.email && self.form.telphoneNumber) {
					self.Axios.post('/users/register', {
						'Username': self.form.username,
						'Password': self.form.password,
						'EmailAddress': self.form.email,
						'TelPhoneNumber': self.form.telphoneNumber
					}).then(res=>{
						if (res.data.status == 0 && res.status == 200) {
							this.msg_success('注册成功', res.data.msg)
						} else {
							this.msg_error('注册失败', res.data.msg)
						}
					}).catch(err=>{
						this.msg_error('注册失败', err)
					})
					this.reform()
				} else {
					this.msg_warning('注意', "用户名、密码、邮箱和手机号不能为空！")
				}
			},
			Login () {
				let self = this;
				if(this.form.username && this.form.password){
					self.Axios.post('/users/login', {
						"Username": self.form.username,
						'Password': self.form.password
					}).then(res=>{
						if (res.data.status == 0 && res.status == 200) {
							this.msg_success('登陆成功', res.data.msg)
							if (self.form.checked) {
								setItemLocal('username', self.form.username)
							} else {
								setItemSession('username', self.form.username)
							}
							this.reform()
						} else {
							this.msg_error('登陆失败', res.data.msg)
						}
					}).catch(err=>{
						this.msg_error('登陆失败', err)
					})
				} else {
					this.msg_warning('注意', "用户名和密码不能为空！")
				}
			},
			RetrievePassword () {
				let self = this;
				if (this.form.username && this.form.email && this.VerificationCode && this.form.password && this.form.repassword && this.VerificationCode) {
					this.Axios.post('/users/retrieve-password',{
						"Username": self.form.username,
						"EmailAddress": self.form.email,
						"password": self.form.password,
						"repassword": self.form.repassword,
						"verificationCode": self.VerificationCode
					}).then(res=>{
						if (res.status == 200 && res.data.status == 0) {
							this.msg_success('密码修改成功', "retrieve the password is success")
						} else {
							this.msg_error('密码修改失败', "retrieve the password is error")
						}
					}).catch(err=>{
						this.msg_error('密码修改失败', "网络错误，请求发起失败或服务器拒绝访问！")
					})
				} else {
					this.msg_warning('注意', "用户名、邮箱和验证码不能为空！")
				}
			},
			ObtainVerification () {
				let self = this;
				let storn = 60;
				this.VerificationState = true;
				this.VerificationCount++;
				let jsq = setInterval(()=>{
					storn--;
					this.VerificationBtnText = `${storn}秒后获取`;
					if (storn <= 0) {
						window.clearInterval(jsq);
						self.VerificationState = false;
						self.VerificationBtnText = `获取验证码`
					}
				}, 1000)
				this.Axios.get('/users/retrieve-password/yzm', {
					params: {
						'Username': self.form.username,
						'EmailAddress': self.form.email,
					}
				}).then(res=>{
					if (res.status==200 & res.data.status==0) {
						this.msg_success('邮件发送成功', '邮件发送失败，请在邮箱查收！')
					}else{
						this.msg_error('邮件发送失败', '邮件发送失败，请稍后重试！')
					}
				}).catch(err=>{
					this.msg_error('请求错误，邮件发送失败', '邮件发送失败，请稍后重试！')
				})
			},
		}
	}
</script>

<style lang="scss" type="text/css">
	#User {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		width: 100vw;
		background: url('/static/city02.png') center center;
		background-size: auto 100%;
		animation: BackgroundMove 5s;
		animation-iteration-count: infinite;
		animation-direction:alternate;
		.content {
			max-width: 610px;
			padding: 20px 70px;
			background-color: rgba(255, 255, 255, 0.8);
			box-shadow: 5px 0px 30px #AAAAAA;
			border-radius: 10px;
			.title {
				text-align: center;
				font-size: 2rem;
				padding: 0px 0px 20px 0px;
			}
			.col-box {
				height: 40px;
				line-height: 40px;
				margin: 10px 0px;
				&.label {
					/*width: 100%;*/
					height: auto;
					text-align: right;
				}
				&.input {
					width: auto;
					height: auto;
					input {
						width: 250px;
					}
				}
			}
			.submit-box {
				text-align: center;
				margin: 10px 0px;
				.submit {
					width: 90%;
				}
			}
			.link-box {
				text-align: center;
				height: 30px;
				line-height: 30px;
			}
		}
	}
	@keyframes BackgroundMove {
		from {
			background-position: 0px;
		}
		to {
			background-position: -60px;
		}
	}
</style>
