const fs = require('fs');
const { title } = require('process');
class CartApi{
    constructor(route){
        this.route=route
    }
    async createCart(){
        try{
            const content = await fs.promises.readFile(`./${this.route}`,'utf-8');
            const jsonContent = JSON.parse(content);
            let max = 0
            jsonContent.forEach(element => {
                if(element.id > max){
                    max = element.id
                }
            })
            const newId = max+1
            const newCart = {
                timestamp: Date.now(),
                products:[],
                id: newId
            }    
            jsonContent.push(newCart)
            await fs.promises.writeFile(`./${this.route}`, JSON.stringify(jsonContent, null, 2))
            
            return {id: newCart.id}
        }
        catch(error){
            console.log(error.message);
        }
    }
    async addProductToCart(id, newProduct){
        try{
            const content = await fs.promises.readFile(`./${this.route}`,'utf-8');
            const jsonContent = JSON.parse(content);
            const indexCart= jsonContent.findIndex(element=>element.id===+id)
            const { name, description, code, price, img, timestamp}= newProduct
            if(indexCart<0){
                return{error: `The Cart with id ${id} does not exist`}
            }else if( !name || !description || !code || !price || !img || !timestamp) {
                return {error: "Wrong body format"}
            }else{
                let max = 0
                jsonContent[indexCart].products.forEach(element => {
                if(element.id > max){
                    max = element.id
                }})
                const newId = max+1
                const newModifiedProduct = {
                    name,
                    description,
                    code,
                    price,
                    img,
                    timestamp,
                    id: newId
                }
                jsonContent[indexCart].products.push(newModifiedProduct)
                await fs.promises.writeFile(`./${this.route}`, JSON.stringify(jsonContent, null, 2))
                return newModifiedProduct
            }
        }
        catch(error){
            console.log(error.message);
        }
    }
    async deleteCartById(id){
        try{
            const content = await fs.promises.readFile(`./${this.route}`,'utf-8');
            const jsonContent = JSON.parse(content);
            const indexCart= jsonContent.findIndex(element=>element.id===+id)
            console.log(indexCart);
            if(indexCart<0){
                return{error: `The Cart with id ${id} does not exist`}
            }else{
                jsonContent.splice(indexCart,1)
                await fs.promises.writeFile(`./${this.route}`, JSON.stringify(jsonContent, null, 2))
                return `The Cart with id ${id} has been deleted`
            }
        }
        catch(error){
            console.log(error.message);
        }
    }
    async deleteProductInACartById(idc, idp){
        try{
            const content = await fs.promises.readFile(`./${this.route}`,'utf-8');
            const jsonContent = JSON.parse(content);
            const indexCart= jsonContent.findIndex(element=>element.id===+idc)
            if(indexCart<0){
                return{error: `The Cart with id ${id} does not exist`}
            }else{
                const indexProduct=jsonContent[indexCart].products.findIndex(element=>element.id===+idp)
                if(indexProduct<0){
                    return{error: `The product with id ${indexProduct} does not exist`}
                }
                jsonContent[indexCart].products.splice(indexProduct,1)
                await fs.promises.writeFile(`./${this.route}`, JSON.stringify(jsonContent, null, 2))
                return `The product with id ${idp} inside the cart with id ${idc} has been deleted`
            }
        }
        catch(error){
            console.log(error.message);
        }
    }
    async getProductsOfACart(id){
        try{
            const content = await fs.promises.readFile(`./${this.route}`,'utf-8');
            const jsonContent = JSON.parse(content);
            const indexCart= jsonContent.findIndex(element=>element.id===+id)
            if(indexCart<0){
                return{error: `The cart with id:${id} does not exist`}
            }else{
                return jsonContent[indexCart].products
            }
        }
        catch(error){
            console.log(error.message);
        }
    }
}
module.exports = CartApi









