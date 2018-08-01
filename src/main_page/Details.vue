<template>
	<div id="Details">
		<div class="header">
			<div class="img">
				<header-imgs></header-imgs>
			</div>
			<div class="parametes">
				<h1 class="title" v-text="productName"></h1>
				<h2 class="description">xxxxxxxxxxxxxxxxxxxxx</h2>
				<div class="price">
					<div class="price-main yb">
						<div class="title">价格</div>
						<div class="content" >
							<i v-text="'188.00'"></i>
						</div>
					</div>
					<div class="price-main cx">
						<div class="title">促销价</div>
						<div class="content">9999</div>
						<div class="tips" v-if="cxtext" v-text="cxtext"></div>
					</div>
					<div class="price-main hd">
						<div class="title">优惠活动</div>
						<div class="content description" v-text="hdDescription"></div>
						<div class="tips"><a href="" class="yhq">领券</a></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import HeaderImgs from '@/components/DetailsHeaderImgs'
	export default {
		name: 'Details',
		data() {
			return {
				parductId: this.$route.params.parductId,
				productName: '小米手机5',
				parductImgs: '',
				parductDetailsImg: '',
				parductPrice: '',
				productDescription: '',
				cxtext: 'biubiubiu',
				hdDescription: '满20包邮，满额送礼到2018-11-20 00:00:00结束'
			}
		},
		components: {
			HeaderImgs
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
		#Details {
			&:after {
				content: '';
				display: block;
				clear: both;
			}
			width: 1200px;
			margin: 0 auto;
			.header {
				&:after {
					content: '';
					display: block;
					clear: both;
				}
				clear: both;
				.img {
					float: left;
					&:after {
						content: '';
						display: block;
						clear: both;
					}
				}
				.parametes {
					float: left;
					padding: 90px;
					&:after {
						content: '';
						display: block;
						clear: both;
					}
					> .title {
						font-size: 1rem;
						font-weight: bold;
					}
					.description {
						color: #FF0036;
						font-size: 16px;
					}
					.price {
						width: 520px;
						height: 120px;
						margin-top: 10px;
						background: url('/static/details.png');
						.price-main {
							&.yb > .content {
								color: #AAAAAA;
							}
							&.cx {
								height: 35px;
							}
							&.cx > .content {
								color: #FF0036;
								font-size: 30px;
								line-height: 35px;
								font-weight: bold;
							}
							&.cx > .title {
								line-height: 35px;
								height: 35px;
							}
							&.cx > .tips {
								position: relative;
								display: block;
								font-size: 12px;
								color: #FFFFFF;
								background-color: #FF0036;
								float: left;
								padding: 5px;
								margin-left: 15px;
								&:before {
									position: absolute;
									content: '';
									height: 10px;
									width: 10px;
									background: url('/static/Triangle.svg');
									top: -5;
									left: -9px;
								}
							}
							&.hd > .description {
								color: #333333;
							}
							&.hd * {
								float: left;
							}
							&.hd a {
								display: block;
								height: 20px;
								margin-left: 10px;
								background-color: #FF0036;
								text-decoration: none;
								color: #FFFFFF;
								font-size: 12px;
								line-height: 20px;
								padding: 0px 5px;
								transition: 0.3s;
								&:hover {
									background-color: #DF2424;
								}
							}
							padding: 10px 10px 0px 10px;
							height: 20px;
							.content {
								float: left;
    							line-height: 20px;
    							margin-left: 15px;
								&:before {
									content: '￥';
									font-size: 12px;
									line-height: 20px;
								}
								i {
									text-decoration: line-through;
								}
							}
							.title {
								font-size: 12px;
								font-weight: bold;
								float: left;
								display: block;
								width: 50px;
								height: 20px;
								line-height: 20px;
							}
							clear: both;
						}
					}
				}
			}
		}
	}
	@media screen and (max-width: 1200px) {
		#Details {
			width: 100vw;
			background-color: $text-hover-color;
		}
	}
	
</style>
