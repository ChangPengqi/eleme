<template>
	<div class="ratingSelecte">
		<div class="ratingType border-1px-bot">
			<span class="block positive"  :class="{'active':sType==2}" @click='select(2,$event)'>{{desc.all}} <span class="num">22</span></span>
			<span class="block positive" :class="{'active':sType==1}" @click='select(1,$event)'>{{desc.positive}}<span class="num">22</span></span>
			<span class="block nagative" :class="{'active':sType==0}" @click='select(0,$event)'>{{desc.nagative}}<span class="num">22</span></span>
		</div>
		<div class="switch border-1px-bot">
			<span class="icon-check_circle" :class="{'on':oContent}" @click='toggleContent(oContent)'></span>
			<span class="text">只看有内容的评价</span>
		</div>
	</div>
</template>
<script>
const POSITIVE=1;
const NAGATIVE=0;
const ALL=2
	export default{
		data(){
			return {
				allAc:false,
				sType:this.selectType,
				oContent:this.onlyContent
			}
		},
		methods:{
			select(type,event){
				if(!event._constructed){
					return;
				}
				this.sType=type
				this.$emit('select-type',type)

			},
			toggleContent(type){
				this.oContent=!type
				this.$emit('only-content',!type)

			}


		},
		props:{
			food:{
				type:Object
			},
			ratings:{
				type:Array,
				default(){
					return []
				}
			},
			selectType:{
				type:Number,
				default:ALL

			},
			onlyContent:{
				type:Boolean,
				default:false
			},
			desc:{
				type:Object,
				default(){
					return　{
						all:"全部",
						positive:"满意",
						nagative:"不满意"
					}
				}
			}
		}
	}
</script>
<style lang="stylus" scoped>
@import "../../common/stylus/mixin.styl"
	.ratingSelecte
		.ratingType
			padding-bottom 18px
			border-1px(rgba(7,17,27,0.1))
			margin 0 18px 
			.block
				display inline-block
				padding 8px
				text-align center
				font-size 12px
				border-radius 2px
				color rgb(77,85,93)
				transition all ease 0.5s
				.num
					font-size 8px
					padding-left 5px
			.positive				
				background rgba(0,160,220,0.2)
			.nagative
				background rgba(77,85,93,0.2)
			.active
				background rgb(0,160,220)
				color #fff
		.switch
			padding 12px 18px
			border-1px(rgba(7,17,27,0.1))
			span
				display inline-block
			.icon-check_circle
				font-size 24px
				color rgb(147,153,159)
				line-height 24px
				vertical-align top
				transition all ease 0.5s
				&.on
					color rgb(0,160,220)
			.text
				font-size 12px
				color rgb(147,153,159)
				line-height 24px
		






</style>