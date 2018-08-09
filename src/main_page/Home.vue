<template>
	<div id="HomePage">
		<Header></Header>
		<Bread class="bread">
			<a class="active">商品列表</a>
		</Bread>
		<router-view/>
		<Footer></Footer>
	</div>
</template>

<script>
import Header from "@/components/Header.vue";
import Bread from "@/components/Bread.vue";
import Footer from "@/components/Footer.vue";
import { setItemLocal, getItemLocal} from "@/components/localstrong";

export default {
    name: "HomePage",
    components: {
        Header,
        Bread,
        Footer
    }
};
</script>

<style lang="scss" type="text/css">
@media screen and (max-width: 1200px) {
    .bread {
        margin-top: 60px;
    }
}
</style>
