<template>
	<div id="footer">
		<div class="container">
			<div class="container-header-control-group">
				<ul>
					<li><a href="" class="iconfont icon-gongju">预约维修服务</a></li>
					<li><a href="" class="iconfont icon-7tianwuliyoutuihuo">7天无理由退货</a></li>
					<li><a href="" class="iconfont icon-tuihuanhuo">15天免费换货</a></li>
					<li><a href="" class="iconfont icon-gifs">满150元包邮</a></li>
					<li><a href="" class="iconfont icon-ditu">520余家售后网点</a></li>
				</ul>
			</div>
		</div>
		<div class="copyright">Copyright © 2011-2018 shopping. 当前呈现版本 1.0.1</div>
	</div>
</template>

<script>
	export default {
		name: 'Footer',
		data() {
			return {

			}
		}
	}
</script>

<style lang="scss" type="text/css">
	$background: #FDFDFD;
	$text-color: #333333;
	$text-hover-color: #FF670D;
	$navbar-height: 121px;
	$header-height: 50px;
	$animation-time: 0.3s;
	$border-color-default: 1px solid #D5D5D5;

	@media (min-width: 1200px) {
		#footer {
			width: 100%;
			height: $navbar-height;
			.container {
				width: 1200px;
			}
		}
	}
	@media screen and (max-width: 1200px) {
		#footer {
			width: 100%;
			height: $navbar-height;
			.container {
				width: 100%;
			}
		}
	}
	@media screen and (max-width: 850px) {
		#footer {
			height: 50px;
			.container {
				display: none;
			}
		}
		.copyright {
			font-size: 12px;
		}
	}
	#footer {
		clear: both;
		background-color: $background;
		.container {
			margin: 0 auto;
			.container-header-control-group {
				border-bottom: $border-color-default;
				padding: 20px 0px;
				ul {
					height: 30px;
					list-style: none;
					* { line-height: 30px; }
					li {
						position: flex;
						float: left;
						width: calc(20% - 1px);
						border-right: $border-color-default;
						a {
							display: flex;
							align-items:center;
							justify-content: center;
							width: 100%;
							height: 30px;
							text-align: center;
							color: $text-color;
							text-decoration: none;
							transition: $animation-time;
							&:hover {
								color: $text-hover-color;
							}
							&:before {
								font-size: 1.5rem;
								padding-right: 5px;
							}
						}
					}
					li:last-child {
						border: none;
					}
				}
			}
		}
	}
	.copyright {
		height: $header-height;
		line-height: $header-height;
		color: #C0C0C0;
		text-align: center;
	}
</style>
