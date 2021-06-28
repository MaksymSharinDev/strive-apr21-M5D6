import express from "express"
import createError from "http-errors"
import {dirname, join} from "path";
import {fileURLToPath} from "url";
import fs from "fs";


const productsJsonPath = join(dirname(fileURLToPath(import.meta.url)), "product.json")
const readProducts = () => {
    const content = fs.readFileSync(productsJsonPath, 'utf8')
    return JSON.parse(content)
}

const categoriesRouter = express.Router()

// 6. GET BY CATEGORY http://localhost:3001/products?category=laptops
categoriesRouter.get("/", async(req, res, next) => {
    try {
        let category = req.query.category;
        console.log(`GETTING BY ${category}`)
        const products = await readProducts()
        const productsByCategory = await products.filter(product => (product.category === category))
        if (productsByCategory) {
            res.send(productsByCategory)
        } else {
            next(createError(404, `Product with category ${req.params.category} not found!`))
        }
    } catch (error) {
        next(error)
    }
})

export default categoriesRouter