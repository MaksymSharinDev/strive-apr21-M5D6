import express from 'express'
import fs from 'fs'
import {fileURLToPath} from 'url'
import {dirname, join} from 'path'
import uniqid from 'uniqid'

const router = express.Router();

const reviewsJsonPath = join(dirname(fileURLToPath(import.meta.url)), "reviews.json")
const getReviewsArray = () => {
  const content = fs.readFileSync(reviewsJsonPath, 'utf8')
  return JSON.parse(content)
}

const writeReviews = (content) => fs.writeFileSync(reviewsJsonPath, JSON.stringify(content))

// 1.
router.get("/", (req, res) => {
  const reviews = getReviewsArray()
  res.send(reviews)
})

// 2.
router.get("/:id", (req, res) => {
  const reviews = getReviewsArray()
  const review = reviews.find(r => r._id === req.params.id)
  res.send(review)
})

// 3.
router.post("/", (req, res) => {
  const newReview = {...req.body, _id: uniqid(), createdAt: new Date()}

  const reviews = getReviewsArray()

  reviews.push(newReview)

  writeReviews(reviews)
  res.status(201).send({_id: newReview._id})
})

// 4.
router.put("/:id", (req, res) => {
  const reviews = getReviewsArray()
  const remainingReviews = reviews.filter(review => review._id !==req.params.id)
  const updatedReview = {...req.body, _id: req.params.id}

  remainingReviews.push(updatedReview)
  writeReviews(remainingReviews)
  res.send(updatedReview)
})

// 5.
router.delete("/:id", (req, res) => {
  const reviews = getReviewsArray()
  const remainingReviews = reviews.filter(review => review._id !==req.params.id)
  writeReviews(remainingReviews)
  res.status(204).send()
})


export default router;
