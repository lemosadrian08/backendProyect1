const express = require ('express');
const CartApi= require('../../models/cartsContainer')
const cartApi= new CartApi('/models/carts.json')

const router = express.Router()


//Middleware
router.use(express.json())

// Routes

router.get('/:id/products',(req,res)=>{
    const { id } = req.params;
    cartApi.getProductsOfACart(id).then((product)=>res.send(product))
});

router.post('/',(req,res)=>{
cartApi.createCart().then((cartId)=>res.send(cartId))
});

router.post('/:id/products',(req,res)=>{
    const { id } = req.params
    const newProduct=req.body
    cartApi.addProductToCart(id, newProduct).then((newModifiedProduct)=>res.send(newModifiedProduct))
});

router.delete('/:id', (req,res)=>{
    const { id } = req.params;
    cartApi.deleteCartById(id).then((products) => { res.send(products)})
});

router.delete('/:idc/products/:idp', (req,res)=>{
    const { idc, idp } = req.params;
    cartApi.deleteProductInACartById(idc, idp).then((products) => { res.send(products)})
});


module.exports = router