<template>
	<div class="shopCart" ref='shopCart'>
		<div class="shop-left" @click='listToShow' >
			<span class="cart-wrapper">
				<span ref='cart' class="cart" :class="{'current':totalCount>0}">
					<span class="icon-shopping_cart"></span>
				</span>
				<span v-if='totalCount>0' class="count">{{totalCount}}</span>
			</span>
			<span class="price">￥{{totalPrice}}</span>
			<span class="line"></span>
			<span class="transPrice">另需配送费￥{{deliveryPrice}}元</span>
		</div>
		<div class="shop-right">
			<span class="pay" v-if='totalPrice==0'>￥{{minPrice}}起送</span>
			<span class="pay noenough" v-if='totalPrice<minPrice'>还差￥{{minPrice-totalPrice}}起送</span>
			<span class="pay enough" v-if='totalPrice>=minPrice'>结算</span>
		</div>
		<div class="ball-wrapper">
			<div v-for='ball in balls'>
				<transition 
				name='drop'
				v-on:before-enter="beforeEnter"
			    v-on:enter="enter"
			    v-on:after-enter="afterEnter">
					<div  v-show='ball.show' class="ball">
						<div class="inner inner-hook"></div>
					</div>
				</transition>
			</div>
		</div>
		<transition name='transtop'>
			<div class="shopCart-list" v-show='listShow'>
				<div class="listHeader border-1px-bot">
					<h1 class="title">购物车</h1>
					<span class="empty" @click='empty'>清空</span>
				</div>
				<div class="listnone" v-if='selectFoods.length<=0'>
					您还没有添加任何商品！
				</div>
				<div class="list-content" ref='listContent' v-if='selectFoods.length>0'>
					<ul >
						<li class="food" v-for='food in selectFoods'>
							<span class="name">{{food.name}}</span>
							<div class="right">	
								<div class="price">
									<span><span class="mark">￥</span>{{food.price*food.count}}</span>
								</div>
								<div class="cartControl-wrapper">
									<cartControl :food='food'  v-on:cartAdd='drop'></cartControl>
								</div>
							</div>

						</li>
					</ul>
				</div>
			</div>
		</transition>
		<transition name='fade'>
			<div class="layout" @click='hideListShow' v-show='listShow' ></div>
		</transition>
		
	</div>
</template>
<script>
import BScroll from 'better-scroll'
import cartControl from '../cartControl/cartControl'

export default{
	data(){
			return {
				listShow:false,
				balls:[{
					show:false
				},{
					show:false
				},{
					show:false
				},{
					show:false
				},{
					show:false
				}],
				dropBalls:[]
				
			}
	},
	components:{
		cartControl
	},
	props:{
		selectFoods:{
			type:Array,
			default(){
				return []
			}
		},
		deliveryPrice:{
			type:Number,
			default:0
		},
		minPrice:{
			type:Number,
			default:0
		}
	},
	methods:{
		empty(){
			this.selectFoods.forEach((food)=>{
				food.count=0
			})
			this.listShow=false
		},
		hideListShow(){
			this.listShow=false
		},
		listToShow(){
			console.log(this.totalCount)
			if(!this.totalCount){
				this.listShow=false;
				return;
			}
			this.listShow=!this.listShow;
			if(this.listShow){
				this.$nextTick(()=>{
					if(!this.listScroll){
						this.listScroll=new BScroll(this.$refs.listContent,{
							click:true
						})
					}else{
						this.listScroll.refresh()
					}
					
				
				})
			
			}
			
				
		},
		drop(Object){
			document.querySelectorAll(".cart")[0].classList.add("animate")
			setTimeout(()=>{
					document.querySelectorAll(".cart")[0].classList.remove("animate")
			},500)
			for (var i = 0; i < this.balls.length; i++) {
				let ball=this.balls[i]
				if(!ball.show){
					ball.show=true
					ball.offset=Object
					this.dropBalls.push(ball)
					return ;
				}
			}

		},
		beforeEnter(el){
			let count=this.balls.length;
			while(count--){
				let ball=this.balls[count];
				if(ball.show){
					let x=ball.offset.X-23
					let y=-(window.innerHeight-ball.offset.Y-48)
					el.style.display='';
					el.style.transform='translate3d(0,'+y+'px,0)'
					let inner=el.getElementsByClassName('inner')[0]
					inner.style.transform='translate3d('+x+'px,0,0)'
					
				}
			}
			
			
		},
		enter(el,done){
			let rf=el.offsetHeight;
			this.$nextTick(()=>{
				el.style.transform='translate3d(0,0,0)'
				let inner=el.getElementsByClassName('inner')[0]
				inner.style.transform='translate3d(0,0,0)'
				el.addEventListener('transitionend',done)
			})
			
		},
		afterEnter(el){
			
			let ball=this.dropBalls.shift()
			if(ball){
				ball.show=false
				el.style.display='none'
			}
		}
		
	},
	computed:{
		totalPrice(){
			let total=0;
			this.selectFoods.forEach((food)=>{
				total+=food.price*food.count
			})
			return total
		},
		totalCount(){
			let count=0
			this.selectFoods.forEach((food)=>{
				count+=food.count
			})
			return count
		},
		
	}
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixin.styl'

	.shopCart
		display flex
		width 100%
		height 46px
		background #141d27
		.shop-left
			flex 1
			.cart-wrapper
				display inline-block
				position relative
				width 44px
				height 44px
				top -10px
				border-radius 50%
				background #141d27
				left 18px
				margin-right 18px
				.cart
					display inline-block
					position relative
					left 4px
					top 6px
					padding 6px
					width 24px
					height 24px
					background rgba(255,255,255,0.2)
					border-radius 50%
					transition all ease 0.5s
					&.current
						background rgb(0,160,220)
						.icon-shopping_cart
							color #fff
					&.animate
						transform scale(1.4)

					.icon-shopping_cart
						display inline-block
						font-size 24px
						color rgba(255,255,255,0.4)
						line-height 24px
				.count
					position absolute
					right 0
					top 0
					font-size 10px
					color #fff
					padding 2px 5px
					background #f01414
					border-radius 5px

			.price
				display inline-block
				position relative
				font-size 16px
				color rgba(255,255,255,0.4)
				font-weight 700
				line-height 24px
				
				border-right 1px sloid #fff
				
			.line
				position relative 
				top 5px
				margin 0 12px
				display inline-block
				height 24px
				width 1px 
				background rgba(255,255,255,0.4)

			.transPrice
				font-size 14px
				color rgba(255,255,255,0.4)
				line-height 24px
		.shop-right
			flex 0 0 105px
			width 105px
			text-align center
			.pay
				display inline-block
				width 100%
				height 100%
				background rgba(255,255,255,0.4)
				font-size 14px
				color rgba(255,255,255,0.4)
				font-weight 700
				line-height 46px
			.noenough
				background #2b333b
			.enough
				background #00b43c
				color #fff
		.ball-wrapper
			.ball
				position fixed
				left 32px
				bottom 22px
				z-index 200
				width 16px
				height 16px
				&.drop-enter-active
					transition all 0.5s cubic-bezier(0.49,-0.5,0.75,0.41)	
					.inner
						width 16px
						height 16px
						border-radius 50%
						background rgb(0,160,220)
						transition all 0.5s cubic-bezier(0.49,0,0.75,0.41)
		.listnone
			padding 12px
			text-align center
			background #fff
			color rgb(240,20,20)
		.layout
			z-index -2
			left 0
			top 0
			position fixed 
			width 100%
			height 100%
			background rgba(7,17,27,0.6)
			&.fade-enter-active,&.fade-leave-active
				transition all 0.5s ease-in-out
			&.fade-enter,&.fade-leave-active
				opacity 1
		.shopCart-list
			position absolute 
			left 0 
			bottom 45px
			width 100%
			background #fff
			z-index -1
			overflow hidden
			&.transtop-enter-active,&.transtop-leave-active
				transition all 0.5s ease-in-out
			&.transtop-enter,&.transtop-leave-active
				transform translateY(100%)
			.listHeader
				height 40px
				border-1px(rgba(7,17,27,0.1))
				background #f3f5f7
				line-height 40px
				.title
					font-size 14px
					font-weight 200
					color rgb(7,17,27)
					margin-left 12px
					display inline-block
				.empty
					display inline-block
					float right 
					margin-right 12px
					font-size 12px
					color rgb(0,160,220)
			.list-content
				background #fff
				max-height 300px
				overflow hidden
				.food
					margin 0 12px
					height 48px
					line-height 48px
					border-1px(rgba(7,17,27,0.1))
					clear both
					.name
						float left
						display block
						font-size 14px
						color rgb(7,17,27)
					.right
						display block
						float right
						.price
							display inline-block
							font-size 14px
							font-weight 700
							color rgb(240,20,20)
							line-height 48px
							margin-right 12px
							.mark
								font-size 10px
								font-weight normal
						.cartControl-wrapper
							display inline-block
							line-height 40px



					


	

</style>