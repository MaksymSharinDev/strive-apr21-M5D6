import fs from "fs-extra"
const { readJSON, writeJSON, writeFile } = fs
import { fileURLToPath } from "url"
import { dirname, join } from "path"
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename);
export const getDataFilePath = (name) => join(__dirname, "../data", name)
export const publicPath = join(__dirname, "../../public")

const productsJSONPath = join(dirname(fileURLToPath(import.meta.url)), "../data/product.json") // product data
export const readProducts = () => readJSON(productsJSONPath)
export const writeProduct = content => writeJSON(productsJSONPath, content)
export const getCurrentFolderPath = currentFile => dirname(fileURLToPath(currentFile))