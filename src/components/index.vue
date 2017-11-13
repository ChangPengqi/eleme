<template>
	<div id='index' >
		<sellhead :seller="seller"></sellhead>
		<div class="tab border-1px-bot">
			<div class="tab-item">
				<router-link to='/goods'>商品</router-link>		
			</div>
			<div class="tab-item">
				<router-link to='/ratings'>评论</router-link>
			</div>
			<div class="tab-item">
				<router-link to='/seller'>商家</router-link>
			</div>
		</div>
		<div class="content">
			<!-- <transition 
				enter-active-class='animated slideInRight'
				leave-active-class='animated slideOutRight'>
					<keep-alive>
					</keep-alive>
				</transition> -->	
					<router-view :seller='seller'></router-view>
			
		</div>
		
	</div>
</template>

<script>
import sellhead from './header/header'

	export default {
		data(){
			return {
				seller:{}
			}
		},
		components:{
			sellhead
			
		},
		created(){
			this.$router.push({path:'/goods'})
			this.getData()
		},
		methods:{
			getData(){
				this.$http.get('/api/seller').then((res)=>{
					if(res.data.errno===0){
						this.seller=res.data.data
						console.log(this.seller)
					}
				}).catch((error)=>{
					
				});	
			}
			
		}
	}
</script>
<style scoped lang="stylus">
@import "../common/stylus/mixin.styl"
.tab
	height 40px
	display flex
	border-1px(rgba(7,17,27,0.1))
	.tab-item
		flex 1
		&>a
			display block
			height 40px
			line-height 40px
			color rgb(77,85,93)
			text-align center
		&>a.router-link-active
			color rgb(240,20,20)



</style>