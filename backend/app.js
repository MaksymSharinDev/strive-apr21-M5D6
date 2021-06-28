import createError from "http-errors";
import express from "express";
import path from 'path';
import { dirname } from "path"
import {fileURLToPath} from "url";
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename);

import cookieParser from "cookie-parser";
import logger from "morgan";
import reviewRouter from "./routes/review/review.js";
import productRouter from "./routes/product/product.js";

import listEndpoints from "express-list-endpoints"
import cors from "cors"

const port = 3001
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/review', reviewRouter);
app.use('/api/product', productRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

/* error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});*/



console.table(listEndpoints(app))

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

export default app;
