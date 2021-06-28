import express from "express";

import cors from "cors"
import cookieParser from "cookie-parser";

import listEndpoints from "express-list-endpoints"

import reviewRouter from "./routes/review/review.js";
import productRouter from "./routes/product/product.js";

const port = 3001
const app = express();

app.use( cors() )
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/api/review', reviewRouter)
app.use('/api/product', productRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).send( { error :"not found" } )
})

console.table(listEndpoints(app))

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

export default app
