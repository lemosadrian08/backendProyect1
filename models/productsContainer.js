const fs = require('fs');
class ProductsApi{
    constructor(name){
        this.name = name
    }
    async save(newProduct){
        try{
            const content = await fs.promises.readFile(`./${this.name}`,'utf-8');
            const jsonContent = JSON.parse(content);
            let max = 0
            jsonContent.forEach(element => {
                if(element.id > max){
                    max = element.id
                }
            })
            const newId = max+1
            const { name, description, code, price, img, timestamp } =newProduct
            const newModifiedProduct = {
                name,
                description,
                code,
                price,
                img,
                timestamp: Date.now(),
                id: newId
            }
            jsonContent.push(newModifiedProduct)
            await fs.promises.writeFile(`./${this.name}`, JSON.stringify(jsonContent, null, 2))
            return newModifiedProduct
        }
        catch(error){
            console.log(error.message);
        }
    }
    async getAll(){
        try{
            const content = await fs.promises.readFile(`./${this.name}`,'utf-8');
            const jsonContent = JSON.parse(content);
            return jsonContent
        }
        catch(error){
            console.log(error.message);
        }
    }
    async getById(id){
        try{
            const content = await fs.promises.readFile(`./${this.name}`,'utf-8');
            const jsonContent = JSON.parse(content);
            const filteredContent = jsonContent.filter(element=>element.id===+id)
            if(filteredContent<0){
                return{error: `Product with id:${id} does not exist`}
            }else{
                return filteredContent
            }
        }
        catch(error){
            console.log(error.message);
        }
    }
    async deleteById(id){
        try{
            const content = await fs.promises.readFile(`./${this.name}`,'utf-8');
            const jsonContent = JSON.parse(content);
            const indexProduct= jsonContent.findIndex(element=>element.id===+id)
            if(indexProduct<0){
                return{error: `Product with id:${id} does not exist`}
            }else{
                jsonContent.splice(indexProduct,1)
                await fs.promises.writeFile(`./${this.name}`, JSON.stringify(jsonContent, null, 2))
                return `The product with id ${id} has been deleted`
            }
        }
        catch(error){
            console.log(error.message);
        }
    }
    async update(id, productToUpdate){
        try{
            const { name, description, code, price, img, timestamp } = productToUpdate;
            if( !name || !description || !code || !price || !img || !timestamp ) {
                return {error: "Wrong body format"}
            }
            const content = await fs.promises.readFile(`./${this.name}`,'utf-8');
            const jsonContent = JSON.parse(content);
            const indexProduct= jsonContent.findIndex(element=>element.id===+id)
            if(indexProduct<0){
                return{error: `Product with id:${id} does not exist`}
            }
            const updatedProduct = {
                ...jsonContent[indexProduct],
                name,
                description,
                code,
                price,
                img,
                timestamp: Date.now()
            }
            jsonContent[indexProduct] = updatedProduct
            await fs.promises.writeFile(`./${this.name}`, JSON.stringify(jsonContent, null, 2))
            return updatedProduct
        }
        catch(error){
            console.log(error.message);
        }
    }
}
module.exports = ProductsApi
