<template>
<transition 
	>
	<div class="goods">
		<div class="menu-wrapper" ref='menuWrapper'>
			<ul >
				<li v-for='(item,index) in goods' class="menu-item" :class="{'active':currentIndex===index}" @click='menuClick(index,$event)'>					
					<span class="text border-1px-bot" ><span v-if='item.type>0' class='icon' :class='classMap'></span>{{item.name}}</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper" ref='foodsWrapper'>
			<div>
				<div class="foods-item" v-for='item in goods' ref='foodsItem'>
					<div class='name'>{{item.name}}</div>
					<ul>
						<li class="food-item border-1px-bot" v-for='food in item.foods' @click='foodDetail(food,$event)'>
							<div class="foodPic"><img :src="food.icon" alt=""></div>
							<div class="content-wrapper">
								<h1 class="title">{{food.name}}</h1>
								<div class="description">{{food.description}}</div>
								<div class="content">
									<span class="count">月售{{food.sellCount}}份</span>
									<span class="ratings">好评率{{food.rating}}%</span>
								</div>
								<div class="price-wrapper">
									<span class="price"><span class="mark">￥</span>{{food.price}}</span>
									<span v-if='food.oldPrice' class="oldPrice"><span class="mark">￥</span>{{food.oldPrice}}</span>
								</div>
								<div class="cartControl-wrapper">
									<cartControl :food='food' v-on:cartAdd='_drop' ></cartControl>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="shopCart-wrapper">
			<shopCart ref='shopCart' :selectFoods='selectFoods' :deliveryPrice='seller.deliveryPrice' :minPrice='seller.minPrice'></shopCart>	
		</div>
		<food :food='selectedFood' ref='food' v-on:cartAdd='_drop' ></food>
	</div>
</transition>
</template>
<script>
import BScroll from 'better-scroll'
import shopCart from '../shopCart/shopCart'
import cartControl from '../cartControl/cartControl'
import food from '../food/food'
	export default{
		data(){
			return {
				goods:[],
				listHeight:[],
				scrollY:0,
				selectedFood:{}
			}
		},
		props:{
			seller:{
				type:Object
			}
		},
		components:{
			shopCart,
			cartControl,
			food
		},
		created(){
			this.classMap=['decrease','discount','special','invoice','guarantee']
			this.$http.get('/api/goods').then((res)=>{
				if(res.data.errno===0){
					this.goods=res.data.data
					this.$nextTick(()=>{
						this._initBScroll()
						this._calculateHeight()
					})
				}

			}).catch((error)=>{

			})
		},
		methods:{
			foodDetail(food,event){
				if(!event._constructed){
					return
				}
				this.selectedFood=food;
				this.$refs.food.showDetail()
			},
			_initBScroll(){
				this.menuScoll=new BScroll(this.$refs.menuWrapper,{
					click:true
				})
				this.foodScoll=new BScroll(this.$refs.foodsWrapper,{
					probeType:3,
					click:true
				})
				this.foodScoll.on('scroll',(pos)=>{
					this.scrollY=Math.abs(Math.round(pos.y))
				})
			},
			_calculateHeight(){
				let height=0;
				let dom=this.$refs.foodsItem;
				this.listHeight.push(height)
				for (var i = 0; i <dom.length; i++) {
					height+=dom[i].clientHeight
					this.listHeight.push(height)
				}
			},
			menuClick(index,event){
				console.log(index)
				if(!event._constructed){
					return;
				}
				this.foodScoll.scrollToElement(this.$refs.foodsItem[index],300)

			},
			_drop(Object){

				//异步加载下落动画 优化体验
				this.$nextTick(()=>{
					this.$refs.shopCart.drop(Object)	
				})
				
			}

		},
		computed:{
			currentIndex(){
				for (let i = 0; i < this.listHeight.length; i++) {
					let h1 = this.listHeight[i];
					let h2 = this.listHeight[i+1];
					if(!h2 || (this.scrollY>=h1 && this.scrollY<h2)){
						return i;
					}
				}
			},
			selectFoods(){
				let foods=[];
				this.goods.forEach((good)=>{
					good.foods.forEach((food)=>{
						if(food.count>0){
							foods.push(food)
						}
					})
				})
				return foods;
			},
			// target(){
			// 	return this.$store.state.target;
			// }
		}


	}

</script>
<style scoped lang="stylus">
@import "../../common/stylus/mixin.styl"
	.goods
		display flex
		width 100%
		position absolute
		top 174px
		left 0
		bottom 46px
		overflow hidden
		.menu-wrapper
			flex 0 0 80px
			width 80px
			background #f3f5f7
			font-size 0
			.menu-item
				height 54px
				padding 0 12px
				display table
				width 56px
				line-height 14px
				&.active
					background #fff
					padding-top 1px
					.text
						border-none()
						font-weight 700
				.icon
					vertical-align top
					margin-right 2px
					display inline-block
					width 12px
					height 12px
					background-size 12px 12px
					background-repeat no-repeat
					&.decrease
						bg-image('decrease_3')
					&.discount
						bg-image('discount_3')
					&.guarantee
						bg-image('guarantee_3')
					&.invoice
						bg-image('invoice_3')
					&.special
						bg-image('special_3')
				.text 
					display table-cell
					vertical-align middle
					font-size 12px
					border-1px(rgba(7,17,27,0.1))
		.foods-wrapper
			flex 1
			.foods-item
				.name
					height 26px
					line-height 26px
					background #f3f5f7
					border-left 2px solid #d9dde1
					font-size 12px
					color rgb(147,153,159)
					padding-left 14px
				.food-item
					margin 18px
					margin-bottom 0
					padding-bottom 18px
					display flex
					border-1px(rgba(7,17,27,0.1))
					&:last-child
						border-none()
						margin-bottom 0
					.foodPic
						flex 0 0 57px
						width 57px
						margin-right 10px
						img
							width 57px
							height 57px
					.content-wrapper
						flex 1
						position relative
						.title
							font-size 14px
							margin-top 2px
							line-height 14px
							color rgb(7,17,27)
							font-weight 700
						.description,.content
							margin-top 8px
							color rgb(147,153,159)
							font-size 10px 
							line-height 12px
						.content
							.count
								margin-right 12px
						.price-wrapper
							margin-top 8px
							.price
								font-size 14px
								color rgb(240,20,20)
								font-weight 700
								line-height 24px
								margin-right 8px
								.mark
									font-size 10px
									font-weight normal
									line-height 24px
							.oldPrice
								font-size 10px
								color rgb(147,153,159)
								font-weight 700
								line-height 24px
								text-decoration line-through
								.mark
									font-weight normal
									line-height 24px
						.cartControl-wrapper
							position absolute
							right 0
							bottom -5px
		.shopCart-wrapper
			position fixed
			left 0
			bottom 0
			width 100%
			z-index 50




</style>
