<template>
<transition 
	>
	<div class="Ratings" ref='Ratings'>
		<div class="ratings-wrapper">
			<div class="top border-1px-bot">
				<div class="content-left">
					<h1 class="score">{{seller.score}}</h1>
					<p class="text">综合评分</p>
					<p class="rank" >高于周边商家{{seller.rankRate}}%</p>
				</div>
				<div class="content-right">
					<div class="item">
						<span class="title">服务态度</span>
						<span class="star-wrapper"><star :size='36' :score='seller.serviceScore'></star></span>
						<span class="score">{{seller.serviceScore}}</span>
						
					</div>
					<div class="item">
						<span class="title">商品评价</span>
						<span class="star-wrapper"><star :size='36' :score='seller.foodScore'></star></span>
						<span class="score">{{seller.foodScore}}</span>
					</div>
					<div class="item">
						<span class="title">送达时间</span>
						<span class="time">{{seller.deliveryTime}}分钟</span>
					</div>
				</div>
			</div>
			<div class="rating border-1px-top">
				<ratingSelect  :selectType='selectType' :onlyContent='onlyContent' :desc="{all:'全部',positive:'满意',nagative:'不满意'}" @select-type='SelectType' @only-content='OnlyContent'></ratingSelect>
				<div class="ratingList">
						<ul  class="ratings" v-if='ratings.length>0'>
								<li v-show='needShow(rating.rateType,rating.text)' class="list-item border-1px-bot" v-for='(rating,index) in ratings' >
									<div class="top">
										<span class="con-left"><img width="28" height="28" :src="rating.avatar" alt=""></span>
										<span class="con-cen">
											<p class="username">{{rating.username}}</p>
											<p class="star-wrapper">
												<star :size='24' :score='rating.score' style='display:inline-block'></star>
												<span class="deliveryTime" >{{rating.deliveryTime}}分钟送达</span>
											</p>

										</span>
										<span class="time">{{rating.rateTime | format}}</span>
									</div>
									<div class="text">
										{{rating.text}}
									</div>
									<div class="bot">
										<span v-if='rating.rateType===0' class="icon-thumb_down"></span>
										<span v-if='rating.rateType===1' class="icon-thumb_up"></span>
										<span class="rec" v-for='rec in rating.recommend'>{{rec}}</span>
									</div>
								</li>
							
						</ul>
						<div class='noRatings' v-if='!(ratings.length>0)'>
							暂无评论
						</div>
					</div>
			</div>
		</div>
	</div>
</transition>
</template>
<script>
import BScroll from 'better-scroll'
import shopCart from '../shopCart/shopCart'
import star from '../star/star'
import ratingSelect from '../ratingSelect/ratingSelect'

	export default{
		data(){
			return {
				goods:[],
				ratings:[],
				selectType:2,
				onlyContent:false
			}
		},
		props:{
			seller:{
				type:Object
			}
		},
		components:{
			star,
			ratingSelect,
			shopCart
		},
		created(){
			this.getData()
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
					return false
				}
				if(this.selectType===2){
					return true
				}else{
					return type===this.selectType
				}
			},
			getData(){
				this.$http.get('/api/ratings').then((res)=>{
					if(res.data.errno===0){
						this.ratings=res.data.data
						this._initScoll();
					}
				}).catch((error)=>{
					
				});	
			},
			_initScoll(){
				this.$nextTick(()=>{
					if(!this.scroll){
						this.scroll=new BScroll(this.$refs.Ratings,{
							click:true
						})	
					}else{
						this.scroll.refresh()
					}
					
				})
			},
			needShow(type,text){
				if(this.onlyContent && !text){
					this._initScoll()
					return false
				}
				if(this.selectType===2){
					this._initScoll()
					return true
				}else{
					this._initScoll()
					return type===this.selectType
				}

				
				

			},
			
		}
	}

</script>
<style scoped lang="stylus">
@import '../../common/stylus/mixin.styl'
	.Ratings 
		position absolute
		top 174px
		width 100%
		bottom 0
		overflow hidden
		left 0
		background #f3f5f7
		.top
			display flex
			padding 18px 0
			background #fff
			.content-left
				flex 0 0 140px
				border-right 1px solid rgba(7,17,27,0.1)
				text-align center
				.score
					font-size 24px
					color rgb(255,153,0)
					line-height 28px
				.text	
					font-size 12px
					color rgb(7,17,27)
					line-height 12px
					margin-top 6px 
					margin-bottom 8px
				.rank
					font-size 10px
					color rgba(7,17,27,0.5)
			.content-right 
				flex 1
				.item
					margin-left 12px
					margin-bottom 8px 
					span
						display inline-block
					.star-wrapper
						vertical-align middle
					.score
						font-size 12px
						color rgb(255,153,0)
						line-height 18px
						margin-left 12px
					.title
						font-size 12px
						line-height 18px
						margin-right 12px
					.time
						font-size 12px
						color rgb(147,153,159)
		.rating
			padding 18px 0
			background #fff
			margin-top 18px
			border-1px(rgba(7,17,27,0.1))
			.ratingList
				.noRatings
					text-align center
					padding 10px
					font-size 12px
					color rgb(0,160,220)
				.list-item
					margin 18px
					padding-bottom 18px
					border-1px(rgba(7,17,27,0.1))
					.top
						padding-bottom 8px
						.con-left
							img
								border-radius 50%
								margin-right 12px
						.con-cen
							.username
								display inline-block
								font-size 10px
								color rgb(7,17,27)
								line-height 12px
								margin-bottom 4px
							.star-wrapper
								line-height 14px
								position relative
								top -8px
								.deliveryTime
									display inline-block
									font-size 10px
									font-weight 200
									color rgb(147,153,159)
									line-height 14px
									vertical-align bottom
									margin-left 6px
						.time
							display inline-block
							font-size 10px
							position absolute 
							right 18PX
					.text
						font-size 12px
						color rgb(7,17,27)
						line-height 18px
						padding-left 40px
						padding-bottom 8px
					.bot
						padding-left 40px
						font-size 12px
						color rgb(183,187,191)
						span
							display inline-block
						.icon-thumb_down
							font-size 12px
						.icon-thumb_up
							font-size 12px
							color rgb(0,160,222)
						.rec
							padding 3px 
							border 1px solid rgba(7,17,27,0.1)
							margin-right 8px
							margin-bottom 8px
		.shopCart-wrapper
			position fixed
			left 0
			bottom 0
			width 100%
			z-index 50



								

				

					
</style>