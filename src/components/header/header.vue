<template>
	<div class="header">
		<div class="content-wrapper">
			<div class="avatar">
				<img :src="seller.avatar" alt="" width="64" height="64">
			</div>
			<div class="content">
				<div class="title">
					<span class="brand"></span>
					<span class="name">{{seller.name}}</span>
				</div>
				<div class="description">
					{{seller.description}}/{{seller.delivertime}}分钟送达
				</div>
				<div v-if='seller.supports' class="supports">
					<span class="icon" :class='classMap[seller.supports[0].type]'></span>
					<span class="text">{{seller.supports[0].description}}</span>
				</div>
			</div>
			<div v-if='seller.supports' class="support-count" @click='showDetail'>
				<span class="count">{{seller.supports.length}}个</span>
				<span class="icon-keyboard_arrow_right"></span>
			</div>
		</div>
		<div class="bulletin-wrapper" @click='showDetail'>
			<span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
			<span class="icon-keyboard_arrow_right"></span>
		</div>
		<div class="background">
			<img :src="seller.avatar" alt="" width='100%' height="100%">
		</div>
		<transition 
		name="fade"
		enter-active-class="animated bounceIn"
    	leave-active-class="animated bounceOut" >
    		<div class="detail" v-show='detailShow'>
				<div class="detail-wraper clearfix">
					<div class="detail-main">
						<h1 class="name">{{seller.name}}</h1>
						<div class="star-wrapper">
							<star :size='48' :score='seller.score' ></star>
						</div>
						<div class="title">
							<div class="line"></div>
							<div class="text">优惠信息</div>
							<div class="line"></div>
						</div>
						<div class="content">
							<ul class="supports" v-if='seller.supports'>
								<li class="supports-item" v-for='item in seller.supports'>
									<span class="icon" :class='classMap[item.type]'></span>
									<span class="text">{{item.description}}</span>
								</li>
							</ul>
						</div>
						<div class="title">
							<div class="line"></div>
							<div class="text">商家公告</div>
							<div class="line"></div>
						</div>
						<div class="bulletin">
							<div class="text">{{seller.bulletin}}</div>
						</div>
						

					</div>
				</div>
				<div class="detail-close" @click='hideDetail'>
					<span class="icon-close"></span>
				</div>
			</div>
  		</transition>
		
	</div>
</template>
<script>
import star from 'components/star/star'
	export default {
		data(){
			return{
				detailShow:false
			}
		},
		props:{
			seller:{
				type:Object
			}

		},
		components:{
			star
		},
		created(){
			this.classMap=['decrease','discount','special','invoice','guarantee']
		},
		methods:{
			showDetail(){
				this.detailShow=true
			},
			hideDetail(){
				this.detailShow=false
			}
		}
	}
</script>
<style scoped lang="stylus">
@import "../../common/stylus/mixin.styl"
	.header
		position relative
		background rgba(7,17,27,.5)
		color #fff
		overflow hidden
		.content-wrapper
			position relative
			padding 24px 12px 18px 24px
			font-size 0
			.avatar,.content
				display inline-block
			.avatar
				margin-right 16px
				vertical-align top
				img
					border-radius 2px
			.content
				font-size 14px
				.title 
					margin 2px 0 8px 0
					.brand
						vertical-align top
						width 30px
						height 18px
						display inline-block
						bg-image(brand)
						background-size 30px 18px
						background-repeat no-repeat
					.name
						font-size 16px
						margin-left 6px
						line-height 18px
						font-weight bold
			.description
				font-size 12px
				line-height 12px
				margin-bottom 10px
			.supports
				font-size 0
				.icon
					vertical-align top
					display inline-block
					width 12px
					height 12px
					margin-right 4px
					background-size 12px 12px
					background-repeat no-repeat
					&.decrease
						bg-image('decrease_1')
					&.discount
						bg-image('discount_1')
					&.guarantee
						bg-image('guarantee_1')
					&.invoice
						bg-image('invoice_1')
					&.special
						bg-image('special_1')
				.text
					font-size 10px
					line-height 12px
			.support-count
				font-size 0
				background-color rgba(0,0,0,.2)
				position absolute
				height 24px
				line-height 24px
				right 12px
				bottom 16px
				padding 0 8px
				border-radius 14px
				text-align center
				.count
					vertical-align top 
					font-size 10px
				.icon-keyboard_arrow_right
					line-height 24px
					font-size 10px
					margin-left 2px
		.bulletin-wrapper
			position relative
			height 28px
			padding 0 22px 0 12px
			line-height 28px
			white-space nowrap
			overflow hidden
			text-overflow ellipsis
			background rgba(7,17,27,0.2)
			.bulletin-title
				display inline-block
				bg-image(bulletin)
				width 22px 
				height 12px
				background-size 22px 12px
				background-repeat no-repeat
				margin-top 10px
				vertical-align top
			.bulletin-text
				font-size 10px
				margin 0 4px
			.icon-keyboard_arrow_right
				position absolute 
				right 12px
				top 10px
				font-size 10px
		.background
			position absolute
			top 0
			left 0
			width 100%
			height 100%
			z-index -1
			filter blur(10px)
		.detail
			position fixed
			left 0
			top 0
			z-index 100
			background rgba(7,17,27,.8)
			width 100%
			height 100%
			overflow auto
			.detail-wraper
				min-height 100%
				width 100%
				.detail-main
					margin-top 64px
					padding-bottom 64px
					.name
						width 100%
						font-size 16px
						font-weight 700
						line-height 16px
						text-align center
						margin-bottom 16px
					.star-wrapper
						height 24px 
						line-height 24px
						text-align center
					.title
						width 80%
						margin 28px 36px 24px 36px
						display flex
						.text
							padding 0 12px
							font-size 14px
							font-weight 700
							line-height 12px
						.line
							flex 1
							position relative 
							top -6px
							border-bottom 1px solid rgba(255,255,255,0.5)
					.content
						.supports
							font-size 0
							width 80%
							margin 0 auto
							.supports-item
								margin-bottom 12px
								padding 0 12px
								.icon
									vertical-align top
									display inline-block
									width 16px
									height 16px
									margin-right 6px
									background-size 16px 16px
									background-repeat no-repeat
									&.decrease
										bg-image('decrease_2')
									&.discount
										bg-image('discount_2')
									&.guarantee
										bg-image('guarantee_2')
									&.invoice
										bg-image('invoice_2')
									&.special
										bg-image('special_2')
								.text
									font-size 12px
									line-height 12px
					.bulletin
						width 80%
						margin 0 auto
						.text
							padding 0 12px
							font-size 12px
							line-height 24px

			.detail-close
				position relative
				width 32px
				height 32px
				margin -64px auto
				clear both
				font-size 32px








</style>