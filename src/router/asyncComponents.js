const index=resolve => require(['components/index'],resolve)
const goods=resolve => require(['components/goods/goods'],resolve)
const ratings=resolve => require(['components/ratings/ratings'],resolve)
const seller=resolve => require(['components/seller/seller'],resolve)

export {index,goods,ratings,seller}