<template>
	<transition
	enter-active-class="animated bounceInRight"
    leave-active-class="animated bounceOutRight">
		<div class="food" v-show='showFood' ref='food'>
			<div class="food-wrapper">
				<div class="imgHeader" ref='imgHeader'> 
					<img :src="food.image" alt="" >
					<span class="icon-arrow_lift" @click='back'></span>
				</div>
				<div class="trans" ref='trans' >
					<div class="content-wrapper border-1px-bot">
						<h1 class="title">{{food.name}}</h1>
						<div class="content">
							<span class="count">月售{{food.sellCount}}份</span>
							<span class="ratings">好评率{{food.rating}}%</span>
						</div>
						<div class="price-wrapper">
							<span class="price"><span class="mark">￥</span>{{food.price}}</span>
							<span v-if='food.oldPrice' class="oldPrice"><span class="mark">￥</span>{{food.oldPrice}}</span>
						</div>
						<div class="addCart">
							<transition
							enter-active-class="animated bounceIn"
							leave-active-class="animated fadeOut">
								<div class="buy" v-if='!food.count' @click='buy($event)'>加入购物车</div>
							</transition>
							<transition
							enter-active-class="animated bounceIn"
							    					leave-active-class="animated fadeOut">
								<div class="cartControl-wrapper" v-if='food.count'>
									<cartControl :food='food' v-on:cartAdd='drop'></cartControl>
								</div>
							</transition>
						</div>
						
					</div>
					<div v-if='food.info' class="description border-1px-top">
						<h1 class="title">商品介绍</h1>
						<div class="text">
							{{food.info}}
						</div>
					</div>
					<div class="rating">
						<h1 class="title">商品评价</h1>
						<div class="rating-wrapper">
							<ratingSelect  :selectType='selectType' :onlyContent='onlyContent' :desc="{all:'全部',positive:'推荐',nagative:'吐槽'}" @select-type='SelectType' @only-content='OnlyContent'></ratingSelect>
						</div>
						<div class="ratingList">
							<ul  class="ratings" v-if='food.ratings && food.ratings.length>0'>
								<transition-group
									enter-active-class="animated bounceIn"
							    	leave-active-class="animated bounceOut">
									<li v-show='needShow(rating.rateType,rating.text)' class="list-item border-1px-bot" v-for='(rating,index) in food.ratings' :key='index'>
										<div class="top">
											<span class="time">{{rating.rateTime | format}}</span>
											<span class="user">{{rating.username}} <img width="14" height="14" :src="rating.avatar" alt=""></span>
										</div>
										<div class="bot" v-if='rating.rateType===0'>
											<span class="icon-thumb_down" ></span>
											<span class="text">{{rating.text}}</span>
											
										</div>
										<div class="bot"  v-if='rating.rateType===1'>
											<span class="icon-thumb_up"></span>
											<span class="text">{{rating.text}}</span>
										</div>
									</li>
								</transition-group>
							</ul>
							<div class='noRatings' v-if='!(food.ratings && food.ratings.length>0)'>
								暂无评论
							</div>
						</div>
					</div>
				</div>
			</div>	
		</div>
	</transition>
</template>
<script>
import BScroll from 'better-scroll'
import cartControl from '../cartControl/cartControl'
import ratingSelect from '../ratingSelect/ratingSelect'
const POSITIVE=1;
const NAGATIVE=0;
const ALL=2
	export default{
		data(){
			return {
				showFood:false,
				selectType:2,
				onlyContent:false
			}
		},
		props:{
			food:{
				type:Object
			}
			
		},
		components:{
			cartControl,
			ratingSelect
		},
		filters:{
			format(value) { //author: meizz
				return new Date(value).Format("yyyy-MM-dd hh:mm:ss");
			}
		},
		methods:{
			SelectType(type){
				this.selectType=type
			},
			OnlyContent(type){
				this.onlyContent=type
			},
			needShow(type,text){
				if(this.onlyContent && !text){
					this._initScroll()
					return false
				}
				if(this.selectType===2){
					this._initScroll()
					return true
				}else{
					this._initScroll()
					return type===this.selectType
				}
			},
			drop(){
				this.$emit('cartAdd',{obj:event.target,X:-event.offsetX,Y:-event.offsetY})
			},
			buy(event){
				if(!this.food.count){
					this.$set(this.food,'count',1)
				}
				this.$emit('cartAdd',{obj:event.target,X:-event.offsetX,Y:-event.offsetY})
			},
			showDetail(){
				this.showFood=true
				this._initScroll()
				
			},
			_initScroll(){
				this.$nextTick(()=>{
					if(!this.scroll){
						this.scroll=new BScroll(this.$refs.food,{
							click:true,
							probeType:3
						})
						this.scroll.on('scroll',(pos)=>{
							let scrolly=Math.round(Math.abs(pos.y))
							console.log(scrolly)
							
							if(scrolly/300<1){
								this.$refs.imgHeader.style.opacity=1-scrolly/300;
								this.$refs.trans.style.transform='translateY(-'+scrolly*0.3+'px)'
							}else{
								this.$refs.imgHeader.style.opacity=0
								
							}
							
						})

					}else{
						this.scroll.refresh()
					}
					
				})
			},
			back(){
				this.showFood=false
			}
		}
	}
</script>
<style scoped lang="stylus">
@import '../../common/stylus/mixin.styl'
	.food
		position fixed
		left 0
		top 0
		bottom 46px
		width 100%
		background #f3f5f7
		overflow hidden
		.food-wrapper
			.imgHeader
				position relative
				width 100%
				height 0
				padding-top 100%
				transition all ease 0.5
				img
					position absolute
					top 0
					left 0
					width 100%
					height 100%
					
				.icon-arrow_lift
					position absolute
					left 0
					top 0
					font-size 20px
					display block
					padding 10px
					color #fff
					display block
			.content-wrapper
				position relative
				padding 18px
				background #fff
				border-1px(rgba(7,17,27,0.1))
				margin-bottom 16px
				.title
					font-size 14px
					margin-top 2px
					line-height 14px
					color rgb(7,17,27)
					font-weight 700
				.content
					margin-top 8px
					color rgb(147,153,159)
					font-size 10px 
					line-height 12px
					.count
						margin-right 12px
				.price-wrapper
					margin-top 18px
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
				.addCart
					.buy
						position absolute
						right 18px
						bottom 9px
						width 74px
						height 24px
						margin 7px 9px
						line-height 24px
						font-size 10px
						color #fff
						border-radius 12px
						background rgb(0,160,220)
						text-align center
					.cartControl-wrapper
						position absolute
						right 18px
						bottom 9px

			.description
				padding 18px
				background #fff
				border-1px(rgba(7,17,27,0.1))
				margin-bottom 16px
				.title
					font-size 14px
					color rgb(7,17,27)
				.text
					font-size 12px
					color rgb(77,85,93)
					line-height 24px
					padding-top 6px
					padding-left 8px
			.rating
				border-top 1px solid rgba(7,17,27,0.1)
				background #fff
				padding 18px 0
				.title
					font-size 14px
					color rgb(7,17,27)
					padding 0 18px
				.rating-wrapper
					margin-top 12px
				.ratingList
					.noRatings
						text-align center
						padding 10px
						font-size 12px
						color rgb(0,160,220)
					.list-item
						height 48px
						padding 16px 18px
						border-1px(rgba(7,17,27,0.1))
						.top
							padding-bottom 6px
							span
								display inline-block
								font-size 10px
								img
									width 14px
									height 14px
									border-radius 50%
									margin-left 5px
									vertical-align bottom
							.user
								float  right

						.bot
							clear both
							span
								display inline-block
								font-size 12px
								line-height 24px
								color rgb(7,17,27)
							.icon-thumb_up
								color rgb(0,160,220)
								margin-right 4px
							.icon-thumb_down
								color rgb(147,153,159)
								margin-right 4px





	
</style>