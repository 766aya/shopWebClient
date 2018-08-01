<template>
	<div id="header" class="fixed">
		<div id="logo"><a href="/">LOGO</a></div>
		<div id="header-control-group">
			<div class="header-box"><a class="text" href="">用户登陆</a></div>
			<i class="header-box" style="cursor: default;">|</i>
			<div class="header-box"><a class="text" href="">免费注册</a></div>
			<div class="header-box shopping-car"><a class="text iconfont icon-gouwuche" href=""></a></div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Header'
	}
</script>

<style lang="scss" type="text/css">
	$background: #FDFDFD;
	$text-color: #333333;
	$text-hover-color: #FF670D;
	$navbar-height: 60px;
	$animation-time: 0.3s;

	@media (min-width: 1200px) {
		#header {
			width: 100%;
			#header-control-group {
				margin-right: 20px;
				.shopping-car {
					width: 55px;
				}
			}
		}
	}
	@media screen and (max-width: 1200px) {
		.fixed {
			position: fixed;
			top: 0;
			background-color: #FDFDFD;
			z-index: 9999;
		}
		#header {
			width: 100%;
			#header-control-group {
				.shopping-car {
					width: 55px;
				}
			}
		}
	}

	#logo {
		float: left;
		margin-left: 20px;
		height: $navbar-height;
		width: 70px;
		text-align: center;
		line-height: $navbar-height;
		font-weight: bold;
		cursor: pointer;
		transition: $animation-time;
		&:hover {
			color: $text-hover-color;
		}
		a {
			display: block;
			color: inherit;
			text-decoration: none;
		}
	}
	#header {
		height: $navbar-height;
		background-color: $background;
		#header-control-group {
			float: right;
			.text {
				color: $text-color;
			}
			a {
				display: block;
				font-size: 1rem;
				text-decoration: none;
				transition: $animation-time;
				&:hover {
					color: $text-hover-color;
				}
			}
			.header-box {
				height: $navbar-height;
				padding: 0px 5px;
				float: left;
				line-height: $navbar-height;
			}
			.shopping-car {
				text-align: center;
				a {
					height: $navbar-height;
					width: 50px;
					font-size: 30px;
				}
			}
		}
	}
</style>
