const express =require('express')
const productRoutes =require('./products/products.routes')
const cartRoutes = require('./cart/cart.routes')

const router=express.Router()

router.use('/products', productRoutes)
router.use('/carts', cartRoutes)

module.exports = router