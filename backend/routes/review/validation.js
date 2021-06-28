import {body, validationResult} from "express-validator"
/*
  {
        "_id": "123455", //SERVER GENERATED
        "comment": "A good book but definitely I don't like many parts of the plot", //REQUIRED
        "rate": 3, //REQUIRED, max 5
        "productId": "5d318e1a8541744830bef139", //REQUIRED
        "createdAt": "2019-08-01T12:46:45.895Z" // SERVER GENERATED
    }
*/
export default [
    body("comment").exists().withMessage("comment is a mandatory field!"),
    body("rate").exists().withMessage("rate is a mandatory field!"),
    body("rate").custom(v => (v <= 5) || (v >= 5)).withMessage("rate must be between 1 and 5"),
    body("productId").exists().withMessage("productId is a mandatory field!"),
]
