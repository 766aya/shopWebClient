<template>
	<div id="bread">
		<el-breadcrumb separator-class="el-icon-arrow-right" class="box">
			<el-breadcrumb-item v-for="(item, index) in $route.matched" :key="index">
				{{item.name}}
			</el-breadcrumb-item>
		</el-breadcrumb>
	</div>
</template>

<script>
export default {
	name: "Bread"
};
</script>

<style lang="scss" type="text/css">
$background: #f5f5f5;
$text-hover-color: #ff670d;
$animation-time: 0.3s;
$header-height: 50px;

@media (min-width: 1200px) {
    #bread {
        width: 100%;
        .box {
            width: 1180px;
			height: 50px;
			line-height: 50px;
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
	.el-breadcrumb__inner{
		&:hover{
			color: $text-hover-color;
            font-weight: bold;
		}
	}
}
</style>
