<template>
    <section id="shopcar">
        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" class="shopList" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="name" width="120">
                <template slot-scope="scope">
                    <img :src="scope.row.img" alt="">
                </template>
            </el-table-column>
            <el-table-column prop="name" label="商品名称" width="120">
            </el-table-column>
            <el-table-column prop="name" label="单价" width="120">
            </el-table-column>
            <el-table-column prop="address" label="数量">
                <template slot-scope="scope">
                    <Counter class="countBtn" :min="1" :max="100" @counter="changeNumber"></Counter>
                </template>
            </el-table-column>
            <el-table-column prop="address" label="小计">
            </el-table-column>
            <el-table-column prop="address" label="操作">
                <template slot-scope="scope">
                    <el-button icon="el-icon-delete" circle class="deleteIcon"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="table-bottom">
            <div class="bottom-left">
                <div>
                    <router-link :to="{path: '/'}" class="left">继续购物</router-link>
                </div>
                <div class="right">共
                    <span class="count">{{total}}</span>件商品，已选择
                    <span class="count">{{choosed}}</span>
                </div>
            </div>
            <div class="bottom-right">
                <div class="total">合计
                    <span>{{money}}元</span>
                </div>
                <div class="clear">去结算</div>
            </div>
        </div>
    </section>
</template>
<script>
import Counter from "@/components/Counter";

export default {
    name: "shopcar",
    components: {
        Counter
    },
    data() {
        return {
            tableData: [],
            PurchaseQuantity: "",
            total: 0,
            choosed: 0,
            money: 0
        };
    },
    methods: {
        handleSelectionChange(val) {
            console.log(val);
        },
        changeNumber(val) {
            this.PurchaseQuantity = val;
        }
    }
};
</script>
<style lang="scss" type="text/css">
#shopcar {
    .shopList {
        width: 60%;
        margin: 0 auto;
        margin-top: 20px;
        .deleteIcon {
            border: none;
            &:hover {
                background: #f56c6c;
                color: #ffffff;
            }
        }
        .countBtn {
            margin: 0 auto;
        }
    }
    .el-table td,
    .el-table th {
        color: #424242;
        text-align: center;
    }
    .table-bottom {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 60%;
        margin: 20px auto;
        padding-left: 20px;
        border: 1px solid #d2cfcf;
        .bottom-left,
        .bottom-right {
            display: flex;
            flex-direction: row;
            height: 50px;
            line-height: 50px;
            color: #757575;
            font-size: 14px;
        }
        .bottom-left {
            .left {
                padding-right: 10px;
                height: 10px;
                border-right: 1px solid #999;
                color: #757575;
                text-decoration: #ffffff;
                &:hover {
                    color: #ff670d;
                }
            }
            .right {
                padding-left: 10px;
                .count {
                    color: #ff670d;
                    margin: 0 5px;
                }
            }
        }
        .bottom-right {
            .total {
                color: #ff670d;
                margin: 0 5px;
            }
            .clear {
                width: 80px;
                height: 100%;
                text-align: center;
                background: #d2cfcf;
                margin-left: 10px;
            }
            .disabled{
                background: #ff670d;
                color: #ffffff;
            }
        }
    }
}
</style>


