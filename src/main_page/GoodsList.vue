<template>
    <div id="goodslist">
        <!-- 遮罩层和侧边栏 -->
        <div id="overLayFlag" :class="{'is-show': OverLayFlagIsShow, 'sidebar-show': SidebarShow}" @click="OverLayFlagIsShow = !OverLayFlagIsShow"></div>
        <div id="sidebar" :class="{'is-show': OverLayFlagIsShow}">
            <div class="title">价格过滤</div>
            <ul class="price-filter">
                <li>
                    <a @click="PFilter('all')" href="javascript:;" :class="{'is-active': priceChecked == 'all'}">所有商品</a>
                </li>
                <li v-for="(item, index) in priceFilter" :key="index">
                    <a @click="PFilter(index)" href="javascript:;" :class="{'is-active': priceChecked == index}" v-text="`${item.startprice}-${item.endprice}`"></a>
                </li>
            </ul>
        </div>
        <div class="container header">
            <div class="header-main">
                <p class="text">SortBy:</p>
                <a class="text link" href="javascript:;" :class="{'is-active': IsActive==0}" @click="sort(0)">Default</a>
                <a class="text link" href="javascript:;" :class="{'is-active': IsActive==1}" @click="sort(1)">
                    Price
                    <i class="iconfont" :class="{'icon-paixu-shengxu': isSortPrice, 'icon-paixu-jiangxu': !isSortPrice}"></i>
                </a>
                <a class="text link is-show" @click="OverLayFlagIsShow = !OverLayFlagIsShow">ShowPriceFilter</a>
            </div>
        </div>
        <div class="container main">
            <div class="lside">
                <div class="title">价格过滤</div>
                <ul class="price-filter">
                    <li>
                        <a @click="PFilter('all')" href="javascript:;" :class="{'is-active': priceChecked == 'all'}">所有商品</a>
                    </li>
                    <li v-for="(item, index) in priceFilter" :key="index">
                        <a @click="PFilter(index)" href="javascript:;" :class="{'is-active': priceChecked == index}" v-text="`${item.startprice}元-${item.endprice}元`"></a>
                    </li>
                </ul>
            </div>
            <div class="rside">
                <a :href="'/Goods/'+item.productId" class="item" v-for="item in GoodsList" :id="'Good'+item.productId" :key="item.productId">
                    <div class="img-box">
                        <img class="img" :alt="item.productName" v-lazy="'/static/'+item.productImg" :src="'/static/'+item.productImg">
                    </div>
                    <h2 class="title" v-text="item.productName"></h2>
                    <p class="description" v-text="test(item.productDescription)"></p>
                    <p class="price" v-text="`￥${item.salePrice}元`"></p>
                    <a class="shopcar iconfont icon-gouwuche" @click.stop.prevent="addShop(item.productId)">
                        <i>加入购物车</i>
                    </a>
                </a>
                <div v-if="GoodsList == ''" class="warning-text">
                    哦豁，卖完了！
                </div>
                <div class="toggle-page">
                    <a @click="TogglePage('prev')" :class="{'dis-page': disPrev}">上一页</a>
                    <span>
                        <i>第</i><input type="text" v-model="page" @keyup.enter="getGoodsList">
                        <i>页</i>
                    </span>
                    <a @click="TogglePage('next')" :class="{'dis-page': disNext}">下一页</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { setItemLocal, getItemLocal } from "@/components/localstrong";
import Vue from "vue";

export default {
    name: "GoodsList",
    data() {
        return {
            GoodsList: [],
            priceFilter: [
                {
                    startprice: 0,
                    endprice: 500
                },
                {
                    startprice: 500,
                    endprice: 1000
                },
                {
                    startprice: 1000,
                    endprice: 2000
                },
                {
                    startprice: 2000,
                    endprice: 3500
                }
            ],
            priceChecked: "all",
            isSortPrice: true,
            IsActive: 0,
            isPriceFilterShow: true,
            OverLayFlagIsShow: true,
            SidebarShow: true,
            page: 1,
            pageSize: 6,
            maxpage: 1,
            disPrev: true,
            disNext: true
        };
    },
    created() {
        let self = this;
        this.getGoodsList();
        if (this.page == this.maxpage && this.page != "1") {
            this.disPrev = true;
            this.disNext = true;
        } else if (this.page <= 1) {
            this.disPrev = true;
            this.disNext = false;
        } else if (this.page >= this.maxpage) {
            this.disPrev = false;
            this.disNext = true;
        } else {
            this.disNext = false;
            this.disPrev = false;
        }
    },
    watch: {
        OverLayFlagIsShow(type) {
            this.SidebarShow = this.OverLayFlagIsShow;
        },
        page() {
            this.onPage();
        },
        maxpage() {
            this.onPage();
        }
    },
    // computed: {
    //     goods() {
    //         return getItemLocal("goods");
    //     }
    // },
    methods: {
        PFilter(val) {
            this.priceChecked = val;
            this.page = 1;
            this.getGoodsList();
        },
        onPage() {
            if (
                (this.page == 1 && this.page == this.maxpage) ||
                this.maxpage == 0
            ) {
                // console.log("1");
                this.disPrev = true;
                this.disNext = true;
            } else if (this.page <= 1) {
                this.disPrev = true;
                this.disNext = false;
            } else if (this.page >= this.maxpage) {
                // console.log("3");
                this.disPrev = false;
                this.disNext = true;
            } else {
                // console.log("4");
                this.disNext = false;
                this.disPrev = false;
            }
        },
        test(val) {
            if (val.length >= 15) {
                let str = "";
                for (let i = 0; i < 15; i++) {
                    str += val[i];
                }
                return str + "...";
            } else {
                return val;
            }
        },
        sort(val) {
            this.IsActive = val;
            if (val == 1) {
                this.isSortPrice = !this.isSortPrice;
                this.page = 1;
                this.getGoodsList();
            }
        },
        getGoodsList() {
            let self = this;
            var params = {
                page: this.page,
                pageSize: this.pageSize,
                sort: this.isSortPrice ? 1 : -1
            };
            if (self.priceChecked != "all") {
                params["gte"] = this.priceFilter[self.priceChecked].startprice;
                params["lte"] = this.priceFilter[self.priceChecked].endprice;
            } else {
                params["gte"] = 0;
                params["lte"] = 0;
            }
            self.Axios.get("/goods", {
                params: params
            })
                .then(res => {
                    self.GoodsList = res.data.result.list;
                    self.maxpage = res.data.result.len;
                })
                .catch(err => {
                    // console.log(err);
                });
        },
        TogglePage(val) {
            if (val == "prev") {
                if (this.page > 1) {
                    this.page--;
                }
            } else {
                if (this.page < this.maxpage) {
                    this.page++;
                }
            }
            this.getGoodsList();
        },
        addShop(id) {
            var goods = JSON.parse(getItemLocal("goods")); 
            var list = [{ productId: id, num: 1 }];
            //初始化
            if (
                goods == "" ||
                goods == null ||
                goods == undefined ||
                goods == []
            ) {
                goods = list;
                setItemLocal("goods", JSON.stringify(list));
                return;
            }
            //长度
            var len = goods.length;
            var isNew = false
            for (var i = 0; i < goods.length; i++) {
                if (parseInt(goods[i].productId) === parseInt(id)) {
                    goods[i].num = parseInt(goods[i].num) + 1;
                    setItemLocal("goods", goods); 
                    isNew = false;
                    return false; 
                } else {
                    isNew = true;
                }
            }
            if (isNew) {
                Vue.set(goods, len, { productId: id, num: 1 }); //不能push 只能set
            }
            setItemLocal("goods", goods); 
        }
    }
};
</script>

<style lang="scss" type="">
a,
a:hover,
a:active,
a:visited,
a:link,
a:focus {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-tap-highlight-color: transparent;
    outline: none;
    background: none;
    text-decoration: none;
}
@media (min-width: 1200px) {
    #sidebar {
        display: none;
    }
    #goodslist {
        .container {
            width: 1200px;
            margin: 10px auto;
        }
        .container.header {
            .header-main {
                width: 195px;
                .is-show {
                    display: none;
                }
            }
        }
        .container.main {
            .lside {
                display: block;
            }
            .rside {
                width: 1000px;
                float: left;
                .item {
                    $width: calc((1000px - 60px) / 3);
                    width: $width;
                    height: 433px;
                    margin: 10px;
                    text-align: center;
                    .img-box {
                        width: $width;
                        height: $width;
                    }
                    .shopcar {
                        margin-top: 10px;
                        width: 100%;
                        height: 41px;
                        transition: 0.6s;
                        // border-top: 2px solid #9D2933;
                        border-bottom: 2px solid #9d2933;
                        line-height: 41px;
                        &:hover {
                            font-size: 1.25rem;
                        }
                    }
                    &:hover {
                        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
                    }
                }
                .warning-text {
                    width: 100%;
                    margin-top: 30px;
                    text-align: center;
                    font-size: 14px;
                }
            }
        }
    }
    .toggle-page {
        position: relative;
        clear: both;
        height: 40px;
        width: 400px;
        margin: 0px auto;
        padding: 10px 0 20px 0;
        * {
            line-height: 40px;
            float: left;
            cursor: default;
            &::selection {
                background: none;
            }
        }
        a {
            width: 100px;
            height: 40px;
            text-align: center;
            cursor: pointer;
            border-radius: 5px;
            overflow: hidden;
            background-color: #f5f5f5;
            transition: 0.3s;
            &:hover {
                background: #ff6700;
            }
        }
        span {
            width: calc(100% - 200px);
            display: block;
            text-align: center;
            height: 100%;
            margin: 0 auto;
            i {
                width: 75px;
            }
            input {
                padding: 0;
                margin: 0;
                width: 50px;
                float: left;
                border: none;
                text-align: center;
                outline: none;
                cursor: text;
                &::selection {
                    background: #ff6700;
                    color: #ffffff;
                }
            }
        }
    }
}
@media screen and (max-width: 1200px) {
    #sidebar.sidebar-show {
        transform: translateX(-140px);
    }
    #sidebar {
        position: fixed;
        top: 60px;
        right: 0;
        height: 100vh;
        width: 100px;
        background-color: #f5f5f5;
        z-index: 9999;
        padding: 30px 20px;
        transition: 0.5s;
        * {
            cursor: default;
        }
        .title {
            padding: 10px;
            border-left: 2px solid #ff6700;
            font-family: fantasy;
        }
        .price-filter {
            li {
                margin-left: 20px;
                margin-bottom: 20px;
                a {
                    display: block;
                    width: 100%;
                    cursor: pointer;
                    text-decoration: none;
                    color: #333333;
                    text-align: center;
                    transition: 0.3s;
                    border-left: 2px solid rgba(255, 255, 255, 0);
                    border-right: 2px solid rgba(255, 255, 255, 0);
                    &:hover {
                        border-left: 2px solid #ff6700;
                        border-right: 2px solid #ff6700;
                        color: #ff6700;
                    }
                    &.is-active {
                        border-left: 2px solid #ff6700;
                        border-right: 2px solid #ff6700;
                        color: #ff6700;
                        font-weight: bold;
                    }
                }
            }
            li:first-child {
                margin-top: 25px;
            }
        }
    }
    #goodslist {
        overflow: hidden;
        .container {
            width: 100%;
            margin: 10px auto;
        }
        .container.header {
            .header-main {
                width: 315px;
                .is-show {
                    display: block;
                    opacity: 1;
                }
            }
        }
        .container.main {
            .lside {
                display: none;
            }
            .rside {
                position: relative;
                width: 100%;
                .item {
                    display: block;
                    width: 100%;
                    margin: 15px auto;
                    height: 100px;
                    .img-box {
                        float: left;
                        width: 100px;
                        height: 100px;
                    }
                    .title {
                        margin-top: 15px;
                    }
                    .shopcar {
                        position: absolute;
                        top: 20px;
                        right: 10px;
                        border: 2px solid #9d2933;
                        padding: 5px;
                        height: 50px;
                        width: 50px;
                        transition: 0.5s;
                        &::before {
                            display: block;
                            font-size: 20px;
                            line-height: 50px;
                        }
                        &:hover {
                            background-color: #9d2933;
                            color: #ffffff;
                        }
                        i {
                            display: none;
                        }
                    }
                    &:hover {
                        box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
                    }
                }
            }
        }
    }
    .toggle-page {
        position: relative;
        clear: both;
        height: 40px;
        width: 100%;
        * {
            line-height: 40px;
            float: left;
            cursor: default;
            &::selection {
                background: none;
            }
        }
        a {
            width: 30%;
            height: 40px;
            text-align: center;
            cursor: pointer;
            border-radius: 5px;
            overflow: hidden;
            background-color: #f5f5f5;
            transition: 0.3s;
            &:hover {
                background: #ff6700;
            }
        }
        span {
            width: 40%;
            display: block;
            text-align: center;
            height: 100%;
            margin: 0 auto;
            i {
                width: 30%;
            }
            input {
                padding: 0;
                margin: 0;
                width: 40%;
                float: left;
                border: none;
                text-align: center;
                outline: none;
                cursor: text;
                &::selection {
                    background: #ff6700;
                    color: #ffffff;
                }
            }
        }
    }
}
#overLayFlag {
    position: fixed;
    top: 60px;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 1;
    z-index: 9998;
}
.is-show {
    display: none;
    opacity: 0;
}
.dis-page {
    opacity: 0;
    visibility: 100;
}
#goodslist {
    width: 100%;
    clear: both;
    .container.header {
        height: 50px;
        line-height: 50px;
        .header-main {
            float: right;
            margin-right: 20px;
            .text {
                float: left;
                margin-left: 15px;
                color: #333333;
                font-size: 14px;
                cursor: default;
            }
            .link {
                text-decoration: none;
                cursor: pointer;
                &:hover {
                    color: #ff6700;
                }
                &::before {
                    font-size: 1rem;
                }
            }
            .is-active {
                color: #ff6700;
            }
        }
    }
    .container.main {
        .lside {
            float: left;
            width: 200px;
            * {
                cursor: default;
            }
            .title {
                padding: 10px;
                border-left: 2px solid #ff6700;
                font-family: fantasy;
            }
            .price-filter {
                li {
                    margin-left: 20px;
                    margin-bottom: 20px;
                    a {
                        display: block;
                        width: 100%;
                        cursor: pointer;
                        text-decoration: none;
                        color: #333333;
                        text-align: center;
                        transition: 0.3s;
                        border-left: 2px solid rgba(255, 255, 255, 0);
                        border-right: 2px solid rgba(255, 255, 255, 0);
                        padding: 10px 0;
                        &:hover {
                            border-left: 2px solid #ff6700;
                            border-right: 2px solid #ff6700;
                            color: #ff6700;
                        }
                        &.is-active {
                            border-left: 2px solid #ff6700;
                            border-right: 2px solid #ff6700;
                            color: #ff6700;
                            font-weight: bold;
                        }
                    }
                }
                li:first-child {
                    margin-top: 25px;
                }
            }
        }
        .rside {
            position: relative;
            overflow: hidden;
            display: block;
            .item {
                position: relative;
                display: block;
                overflow: hidden;
                float: left;
                text-decoration: none;
                transition: all 0.3s linear;
                overflow: hidden;
                &:hover {
                    transform: translateY(-3px);
                }
                .img-box {
                    .img {
                        width: 100%;
                        height: 100%;
                    }
                }
                .title {
                    color: #333333;
                    cursor: pointer;
                }
                .description {
                    font-size: 12px;
                    color: #b0b0b0;
                    padding: 10px 0px;
                }
                .price {
                    color: #ff6700;
                }
                .shopcar {
                    display: block;
                    text-align: center;
                    text-decoration: none;
                    color: #9d2933;
                }
            }
        }
    }
}
</style>
