<template>
	<div id="bread">
		<div class="box">
			<a href="/">首页</a><i>/</i>
			<slot class="active"></slot>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Bread',
	}
</script>

<style lang="scss" type="text/css">
	$background: #F5F5F5;
	$text-hover-color: #FF670D;
	$animation-time: 0.3s;
	$header-height: 50px;

	@media (min-width: 1200px) {
		#bread {
			width: 100%;
			.box {
				width: 1180px;
				margin: 0 auto;
				padding-left: 20px;
			}
		}
	}
	@media screen and (max-width: 1200px) {
		#bread {
			width: 100%;
			.box {
				width: calc(100% - 50px);
				margin: 0 auto;
			}
		}
	}

	#bread {
		height: $header-height;
		line-height: $header-height;
		background-color: $background;
		cursor: default;
		.box {
			a {
				text-decoration: none;
				color: #333333;
				transition: $animation-time;
				cursor: pointer;
				&:hover {
					color: $text-hover-color;
				}
			}
			i {
				padding: 0px 10px;
			}
			.active {
				color: $text-hover-color;
				font-weight: bold;
			}
		}
	}
</style>
