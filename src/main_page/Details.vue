<template>
    <div id="Details">
        <div class="header">
            <div class="img">
                <header-imgs></header-imgs>
            </div>
            <div class="parametes">
                <div class="choose-list">
                    <div>月销量</div>
                    <div>累计评价</div>
                    <div>产品参数</div>
                </div>
                <h1 class="title" v-text="productName"></h1>
                <h2 class="description">xxxxxxxxxxxxxxxxxxxxx</h2>
                <div class="price">
                    <div class="price-main yb">
                        <div class="title">价格</div>
                        <div class="content">
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
                        <div class="tips">
                            <a href="" class="yhq">领券</a>
                        </div>
                    </div>
                </div>
                <!-- <div class="xl">
					<span class="f-l">月销量 <i class="red">{{yxl}}</i> 件</span>
				</div> -->
                <div class="buy-number">
                    <span class="f-l text">购买数量：</span>
                    <Counter class="f-l" :min="1" :max="100" @counter="changeNumber"></Counter>
                </div>
                <div class="btn-group">
                    <a class="btn buy">立即购买</a>
                    <a class="btn addcar">加入购物车</a>
                </div>
            </div>
        </div>
        <div id="content">

        </div>
    </div>
</template>

<script>
import HeaderImgs from "@/components/DetailsHeaderImgs";
import Counter from "@/components/Counter";

export default {
    name: "Details",
    data() {
        return {
            parductId: this.$route.params.parductId,
            productName: "小米手机5",
            parductImgs: "",
            parductDetailsImg: "",
            parductPrice: "",
            productDescription: "",
            cxtext: "biubiubiu",
            hdDescription: "满20包邮，满额送礼到2018-11-20 00:00:00结束",
            PurchaseQuantity: 1,
            yxl: 0
        };
    },
    components: {
        HeaderImgs,
        Counter
    },
    methods: {
        changeNumber(val) {
            this.PurchaseQuantity = this.val;
        }
    },
    mounted() {
        console.log(this.$route.params.parductId);
    }
};
</script>

<style lang="scss" type="text/css">
$background: #fdfdfd;
$text-color: #333333;
$text-hover-color: #ff670d;
$navbar-height: 121px;
$header-height: 50px;
$animation-time: 0.3s;
$border-color-default: 1px solid #d5d5d5;

@media (min-width: 1200px) {
    #Details {
        &:after {
            content: "";
            display: block;
            clear: both;
        }
        width: 1200px;
        margin: 0 auto;
        .header {
            &:after {
                content: "";
                display: block;
                clear: both;
            }
            clear: both;
            .img {
                float: left;
                &:after {
                    content: "";
                    display: block;
                    clear: both;
                }
            }
            .parametes {
                position: relative;
                float: left;
                padding: 90px;
                &:after {
                    content: "";
                    display: block;
                    clear: both;
                }
                > .title {
                    font-size: 1rem;
                    font-weight: bold;
                }
                .description {
                    color: #ff0036;
                    font-size: 16px;
                }
                .price {
                    width: 520px;
                    height: 120px;
                    margin-top: 10px;
                    background: url("/static/details.png");
                    .price-main {
                        &.yb > .content {
                            color: #aaaaaa;
                        }
                        &.cx {
                            height: 35px;
                        }
                        &.cx > .content {
                            color: #ff0036;
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
                            color: #ffffff;
                            background-color: #ff0036;
                            float: left;
                            padding: 5px;
                            margin-left: 15px;
                            &:before {
                                position: absolute;
                                content: "";
                                height: 10px;
                                width: 10px;
                                background: url("/static/Triangle.svg");
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
                            background-color: #ff0036;
                            text-decoration: none;
                            color: #ffffff;
                            font-size: 12px;
                            line-height: 20px;
                            padding: 0px 5px;
                            transition: 0.3s;
                            &:hover {
                                background-color: #df2424;
                            }
                        }
                        padding: 10px 10px 0px 10px;
                        height: 20px;
                        .content {
                            float: left;
                            line-height: 20px;
                            margin-left: 15px;
                            &:before {
                                content: "￥";
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
                .choose-list {
                    position: absolute;
                    top: 0;
                    right: 90px;
                    display: flex;
                    flex-direction: row;
                    padding: 10px 0;
                    div {
                        padding: 0 10px;
                        border-right: 2px solid #f25807;
                        font-size: 14px;
                        color: #666;
                        &:last-child {
                            margin: 0;
                            border: none;
                        }
                    }
                }
                .xl {
                    display: block;
                    padding: 40px 30px;
                    line-height: 40px;
                    clear: both;
                    width: 100px;
                    margin: 0 auto;
                    .red {
                        color: #ff0036;
                        font-weight: bold;
                    }
                }
                .buy-number {
                    width: 250px;
                    height: 40px;
                    line-height: 40px;
                    margin: 40px auto;
                    padding: 0px 30px;
                    clear: both;
                }
                .f-l {
                    float: left;
                }
                .btn-group {
                    height: 40px;
                    width: 324px;
                    padding: 0px 20%;
                    margin: 0 auto;
                    clear: both;
                    .btn {
                        display: block;
                        width: 150px;
                        height: 40px;
                        line-height: 40px;
                        border: 1px solid #ff0036;
                        text-align: center;
                        float: left;
                        cursor: pointer;
                        &:last-child {
                            margin-left: 20px;
                        }
                        &::selection {
                            background-color: none;
                        }
                    }
                    .buy {
                        background-color: #ffeded;
                        color: #ff0036;
                    }
                }
            }
        }
        #content {
            width: 750px;
            height: 30px;
            margin: 15px auto;
            background-color: #333333;
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
