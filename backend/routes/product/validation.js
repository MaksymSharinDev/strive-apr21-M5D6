import { body } from "express-validator"
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
export default [
    body("name").exists().withMessage("Product name is a mandatory field!"),
    body("description").exists().withMessage("Product description is a mandatory field!"),
    body("brand").exists().withMessage("Product brand is a mandatory field"),
    body("price").exists().withMessage("Product price is a mandatory field"),
    body("category").exists().withMessage("Product category is a mandatory field"),
]