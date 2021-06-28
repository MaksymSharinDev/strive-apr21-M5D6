import express from "express"
import multer from "multer"
import uniqid from "uniqid"
import createError from "http-errors"
import { validationResult } from "express-validator"
import validateProducts from "./validation.js"
import {dirname, join} from "path";
import {fileURLToPath} from "url";
import fs from "fs";
import { parseFile, uploadFile } from "../../utils/upload/index.js";


const productsJsonPath = join(dirname(fileURLToPath(import.meta.url)), "product.json")
const readProducts = () => {
    const content = fs.readFileSync(productsJsonPath, 'utf8')
    return JSON.parse(content)
}
const writeProduct = (content) =>
    fs.writeFileSync(productsJsonPath, JSON.stringify(content))


const productsRouter = express.Router()

// 1. GET PRODUCTS http://localhost:3000/products
productsRouter.get("/", async(req, res, next) => { // could use exampleMiddleware as param here
    try {
        console.log("getting posts")
        const posts = await readProducts() //--> readJSON(blogPostsJSONPath)
        res.send(posts)
    } catch (error) {
        next(error)
    }
})

// 2. GET SINGLE PRODUCT http://localhost:3000/products/:id
productsRouter.get("/:id", async(req, res, next) => {
    try {
        console.log(`getting post by id ${req.params.id}`)
        const posts = await readProducts() //--> readJSON(blogPostsJSONPath)
        const post = posts.find(post => post._id === req.params.id)
        if (post) {
            res.send(post)
        } else {
            next(createError(404, `Product with id ${req.params.userId} not found!`))
        }
    } catch (error) {
        next(error)
    }
})

// 3. POST NEW PRODUCT http://localhost:3000/products
productsRouter.post("/", validateProducts, async(req, res, next) => {
    try {
        console.log("POSTING PRODUCT")
        const errors = validationResult(req)
        if (errors.isEmpty()) {
            //     {
            //         "_id": "5d318e1a8541744830bef139", //SERVER GENERATED
            //         "name": "3310",  //REQUIRED
            //         "description": "somthing longer", //REQUIRED
            //         "brand": "nokia", //REQUIRED 	  "imageUrl":"https://drop.ndtv.com/TECH/product_database/images/2152017124957PM_635_nokia_3310.jpeg?downsize=*:420&output-quality=80",
            //         "price": 100, //REQUIRED
            //         "category": "smartphones" //REQUIRED
            //         "createdAt": "2019-07-19T09:32:10.535Z", //SERVER GENERATED
            //         "updatedAt": "2019-07-19T09:32:10.535Z", //SERVER GENERATED
            //     }
            const product = {
                ...req.body, // REQUIRE name, description, brand, price, category
                _id: uniqid(), // SERVER GENERATED
                createdAt: new Date() // SERVER GENERATED
            }
            const products = await readProducts()
            products.push(product)
            await writeProduct(products)
            res.status(201).send({ _id: product._id })
        } else {
            next(createError(400, { errorsList: errors }))
        }
    } catch (error) {
        next(error)
    }
})

// 4. PUT SINGLE PRODUCT http://localhost:3000/products/:id
productsRouter.put("/:id", async(req, res, next) => {
    try {
        console.log("PUTTING PRODUCT")
        const products = await readProducts()
        const foundIndex = products.findIndex((obj) => obj._id === req.params.id)
        console.log(foundIndex)
        if (foundIndex !== -1) {
            let foundObject = products[foundIndex]
            console.log(foundObject)
            foundObject = { ...foundObject, ...req.body, _id : req.params.id, updatedAt: new Date(), }
            products[foundIndex] = foundObject
            await writeProduct(products)
            res.send(foundObject)
        } else {
            next(createError(404, `Product with id ${req.params.userId} not found!`))
        }
    } catch (error) {
        next(error)
    }
})

// 5. DELETE DELETE http://localhost:3000/products/:id
productsRouter.delete("/:id", async(req, res, next) => {
    try {
        console.log("DELETING PRODUCT")
        const products = await readProducts()
        const remainingProducts = products.filter(product => product._id !== req.params.id)
        await writeProduct(remainingProducts)
        res.status(200).send("PRODUCT DELETED.")
    } catch (error) {
        next(error)
    }
})

productsRouter.post(
    "/:id/imageUrl",
    parseFile.single("imageUrl"),
    uploadFile,
    async (req, res, next) => {
      try {
        const products = await readProducts()
  
        const prodIndex = products.findIndex(
          (prod) => prod._id === req.params.id
        );

        if (prodIndex !== -1) {
            let foundObject = products[prodIndex]
            console.log(foundObject)
            foundObject = { ...foundObject, _id : req.params.id, imageUrl: req.file, updatedAt: new Date(), }
            products[prodIndex] = foundObject
            await writeProduct(products)
            res.send(foundObject)
        } else {
            next(createError(404, `Product with id ${req.params.id} not found!`))
        }
    } catch (error) {
        next(error)
    }














    //     if (!prodIndex == -1) {
    //       res
    //         .status(404)
    //         .send({ message: `blog with ${req.params.id} is not found!` });
    //     }
    //     const previousblogData = fileAsJSONArray[blogIndex];
    //     const changedblog = {
    //       ...previousblogData,
    //       cover: req.file,
    //       updatedAt: new Date(),
    //       id: req.params.id,
    //     };
    //     fileAsJSONArray[blogIndex] = changedblog;
  
    //     fs.writeFileSync(blogsFilePath, JSON.stringify(fileAsJSONArray));
    //     res.send(changedblog);
    //   } catch (error) {
    //     res.send(500).send({ message: error.message });
    //   }
    
});

export default productsRouter