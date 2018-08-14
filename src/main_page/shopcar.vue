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
    </section>
</template>
<script>
import Counter from "@/components/Counter";

export default {
    name: "shopcar",
    components:{
        Counter
    },
    data() {
        return {
            tableData: [],
            PurchaseQuantity: ''
        };
    },
    methods: {
        handleSelectionChange(val) {
            console.log(val);
        },
        changeNumber(val) {
            this.PurchaseQuantity = val
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
        .countBtn{
            margin: 0 auto;
        }
    }
    .el-table td,
    .el-table th {
        color: #424242;
        text-align: center
    }
}
</style>


