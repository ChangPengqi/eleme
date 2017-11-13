<template>
	<transition 
	>
		<div class="seller" ref='seller'>
			<div class="seller-wraper" >
				<div class="top border-1px-bot">
					<div class="title border-1px-bot">
						<h1 class="name">{{seller.name}}</h1>
						<div class="strat-wrapper">
							<star class='star' :size='36' :score='seller.score' ></star>
							<span class="score">{{seller.score}}</span>
							<span class="count">月售{{seller.sellCount}}单</span>

						</div>
						<div class="heart" @click='favor'>
							<transition
							enter-active-class="animated bounceIn"
							>
								<div v-if='!favorshow' >
									<span class="icon-favorite"></span>
									<span>收藏</span>
								</div>
							</transition>
							<transition
							enter-active-class="animated bounceIn"
							>
								<div v-if='favorshow'>
									<span  class="icon-favorite active"></span>
									<span>已收藏</span>
								</div>
							</transition>
						</div>
					</div>
					<div class="text">
						<div class="item">
							<span class="tit">起送价</span>
							<span class="big">{{seller.minPrice}}</span>元
						</div>
						<div class="item">
							<span class="tit">商家配送</span>
							<span class="big">{{seller.deliveryPrice}}</span>元
						</div>
						<div class="item">
							<span class="tit">平均配送时间</span>
							<span class="big">{{seller.deliveryTime}}</span>元
						</div>
					</div>
				</div>
				<div class="bulletin">
					<h1 class="name">公告活动</h1>
					<p class="bulletin-text">
						{{seller.bulletin}}
					</p>
					<div class="content">
							<ul class="supports" v-if='seller.supports'>
								<li class="supports-item border-1px-top" v-for='item in seller.supports'>
									<span class="icon" :class='classMap[item.type]'></span>
									<span class="text">{{item.description}}</span>
								</li>
							</ul>
					</div>
				</div>
				<div class="picbox">
					<h1 class="name">商家实景</h1>
					<div class="box-wrapper" ref='boxWrapper'>
						<ul class="ul-wrapper">
							<li class="pic-item" v-for='(pic,index) in seller.pics'><img :src="pic" alt=""></li>
						</ul>
					</div>
				</div>
				<div class="seller-info">
					<h1 class="name border-1px-bot">商家信息</h1>
					<ul>
						<li class="info-item border-1px-bot" v-for='info in seller.infos'>{{info}}</li>
					</ul>
				</div>
			</div>
		</div>
	</transition>
</template>
<script>
import BScroll from 'better-scroll'
import star from  '../star/star'
import {urlParse} from '../../common/js/localStore.js'
import {saveToLocal,loadFromLocal} from '../../common/js/localStore.js'
	export default{
		data(){
			return {
				seller:{
				},
				favorshow:false
			}
		},
		/*props:{
			seller:{
				type:Object
			}
		},*/
		methods:{
			favor(){
				this.favorshow=!this.favorshow
			},
			_initscroll(){
				this.$nextTick(()=>{
					if(!this.scroll){
						this.scroll=new BScroll(this.$refs.seller,{
							click:true
						})
					}else{
						this.scroll.refresh()
					}
					let ul=document.querySelector('.ul-wrapper')
					let imgwidth=120
					let marign=6
					let len=this.seller.pics.length
					ul.style.width=len*(imgwidth+marign)-marign+'px'
					if(!this.scrollpic){
						this.scrollpic=new BScroll(this.$refs.boxWrapper,{
							click:true,
							scrollX:true
						})
					}else{
						this.scrollpic.refresh()
					}

					
				})
			}
		},
		components:{
			star
		},
		created(){
			this.classMap=['decrease','discount','special','invoice','guarantee']
			this.$http.get('/api/seller').then((res)=>{
					if(res.data.errno===0){
						this.seller=res.data.data
						this._initscroll()
					}
				}).catch((error)=>{
					
			});	
			
		},
		mounted(){

		}

	}

</script>
<style scoped lang="stylus">
@import '../../common/stylus/mixin.styl'
	.seller
		position absolute 
		left 0
		top 174px
		width 100%
		overflow hidden
		background #f3f5f7
		bottom 0
		.top
			background #fff
			padding 18px 0
			border-1px(rgba(7,17,27,0.1))
			margin-bottom 18px
			.title
				margin 0 18px
				border-1px(rgba(7,17,27,0.1))
				positon relative
				.name 
					font-size 14px
					font-weight bold
					line-height 14px
					margin-bottom 8px
				.strat-wrapper
					padding-bottom 18px
					.star
						display inline-block
						vertical-align top
						margin-right 8px
					.score
						font-size 10px
						margin-right 12px
					.count 
						font-size 10px
				.heart
					div
						position absolute
						right 18px
						bottom 18px
						width 36px
					span
						display block
						text-align center
						font-size 10px
						color rgb(77,85,93)
					.icon-favorite
						font-size 24px
						color rgb(77,85,93)
						line-height 24px
						margin-bottom 4px
						&.active
							color rgb(240,20,20)
			.text
				display flex
				.item
					flex 1
					text-align center
					border-right 1px solid rgba(7,17,27,0.1)
					margin-top 18px
					font-size 10px
					color rgb(147,153,159)
					.tit
						display block
						margin-bottom 8px
						line-height 10px
					.big
						display inline-block
						font-size 24px
						color rgb(7,17,27)
						line-height 24px
						margin-right 4px
		.bulletin
			background #fff
			padding 18px
			margin-bottom 16px
			.name
				font-size 14px
				font-weight bold
				line-height 14px
				margin-bottom 8px
			.bulletin-text
				margin 0 12px
				padding-bottom 16px
				font-size 12px
				font-weight 200
				color rgb(240,20,20)
				line-height 24px
				border-1px(rgba(7,17,27,0.1))
			.content
				margin 0 12px
				.supports
					font-size 0
					.supports-item
						padding 16px
						border-1px(rgba(7,17,27,0.1))
						&:last-child
							border-none()
						.icon
							vertical-align top
							display inline-block
							width 12px
							height 12px
							margin-right 6px
							background-size 12px 12px
							background-repeat no-repeat
							&.decrease
								bg-image('decrease_4')
							&.discount
								bg-image('discount_4')
							&.guarantee
								bg-image('guarantee_4')
							&.invoice
								bg-image('invoice_4')
							&.special
								bg-image('special_4')
						.text
							font-size 10px
							line-height 12px
		.picbox
			padding 18px
			background #fff
			margin-bottom 18px
			.name
				font-size 14px
				font-weight bold
				line-height 14px
				margin-bottom 8px
			.box-wrapper
				width 100%
				overflow hidden
				white-space nowrap
				.pic-item
					display inline-block 
					img
						width 120px
						height 90px
						margin-right 6px
		.seller-info
			padding 18px
			background #fff
			.name
				font-size 14px
				font-weight bold
				line-height 14px
				margin-bottom 8px
				border-1px(rgba(7,17,27,0.1))
				padding-bottom 18px
			.info-item
				padding 18px 12px
				font-size 12px
				color rgb(7,17,27)
				border-1px(rgba(7,17,27,0.1))
				line-height 16px
				&:last-child
					border-none()	 



</style>