<template>
	<div id="headerImgs">
		<div class="big-img" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
			<img :src="item" v-for="(item, index) in imgs" v-if="IsSelection == index">
		</div>
		<div class="img-list">
			<ul>
				<li v-for="(item, index) in imgs" :class="{'is-selection': IsSelection == index}" @mouseover="selectedImg(index)">
					<img :src="item">
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'BigImgGroup',
		data() {
			return {
				imgs: ['/static/1.jpg','/static/2.jpg','/static/3.jpg','/static/4.jpg','/static/6.jpg'],
				IsSelection: 0,
				changeTouch: {
					x1: '',
					y1: '',
					x2: '',
					y2: ''
				}
			}
		},
		methods: {
			touchStart(e) {
				this.x1 = e.changedTouches['0'].clientX
				this.y1 = e.changedTouches['0'].clientY
			},
			touchMove(e) { },
			touchEnd(e) {
				this.x2 = e.changedTouches['0'].clientX
				this.y2 = e.changedTouches['0'].clientY
				let X = this.x1 > this.x2
				let Xmove = Math.abs(this.x1 - this.x2)
				let Ymove = Math.abs(this.y1 - this.y2)
				if (Xmove > Ymove) {
					if (X) {
						if(this.IsSelection == 0) {
							this.IsSelection = this.imgs.length - 1
						} else {
							this.IsSelection--
						}
					}else{
						if(this.IsSelection == (this.imgs.length-1)) {
							this.IsSelection = 0
						} else {
							this.IsSelection++
						}
					}
				}
			},
			selectedImg(index) {
				this.IsSelection = index
			}
		}
	}
</script>

<style lang="scss" type="text/css">
	$max-box-size: 500px;
	$list-box-size: 50px;
	@media (min-width: 768px) {
		#headerImgs {
			max-width: $max-box-size;
			max-height: calc($max-box-size + 50px);
			width: $max-box-size;
			height: calc($max-box-size + 50px);
			.big-img {
				width: 500px;
				height: 500px;
				overflow: hidden;
			}
		}
	}
	@media screen and (max-width: 768px) {
		#headerImgs {
			width: 100%;
			.big-img {
				width: 100vw;
				height: 100vw;
				overflow: hidden;
			}
			.img-list {
				display: none;
			}
		}
	}
	#headerImgs {
		overflow: hidden;
		clear: both;
		.big-img {
			img {
				width: 100%;
				height: 100%;
			}
		}
		.img-list {
			ul {
				list-style: none;
				&:after {
					display:block;
					height: $list-box-size;
					content: '';
				};
				li {
					position: relative;
					margin: 10px 0 10px calc((500px - 50px * 5) / 6);
					height: $list-box-size;
					width: $list-box-size;
					float: left;
					cursor: pointer;
					img {
						width: 100%;
						height: 100%;
					}
					&.is-selection {
						outline: 2px solid #333333;
						&:after {
							position: absolute;
							font-size: 10px;
							content: '▲';
							color: #333333;
							z-index: 10;
							top: -12px;
							left: calc(50% - 5px);
						};
					}
				}
			}
		}
	}
</style>
