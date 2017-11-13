<template>
	<div class="cartControl">
		<transition
		enter-active-class='animated fadeInRightBig'
		leave-active-class='animated fadeOutRightBig'>
			<div class="decrease" v-if='food.count>0' @click.stop='decrease' >
				<span class="icon-remove_circle_outline"></span>
			</div>
		</transition>
		<transition
		enter-active-class='animated fadeIn'
		leave-active-class='animated fadeOut'>
			<div class="count" v-if='food.count>0' >{{food.count}}</div>
		</transition>	
			
		<div class="add" @click.stop='add($event)'>
			<span class="icon-add_circle"></span>
		</div>

		
	</div>
</template>
<script>
	export default{
		
		props:{
			food:{
				type:Object
			}
			
		
		},
		methods:{
			add(event){
				if(!event._constructed){
					return;
				}
				if(!this.food.count){
					this.$set(this.food,'count',1)
				}else{
					this.food.count++	
				}
				this.$emit('cartAdd',{obj:event.target,X:-event.offsetX,Y:-event.offsetY})
				
			},
			decrease(){
				if(this.food.count){
					this.food.count--
				}

			}
			
		}
	}
</script>
<style lang="stylus" scoped>
	.cartControl
		font-size 0
		.decrease,.count,.add
			display inline-block
			padding 6px
			font-size 24px
			line-height 24px
			color rgb(0,160,220)
			vertical-align top
		.count
			font-size 15px
			color rgb(7,17,27)
		



		
</style>