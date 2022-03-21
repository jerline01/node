import express from "express";

import { getAllMovies, getMovieById, deleteMovieById, updateMovieById, createMovies } from "../helper.js";
const router = express.Router();

//use of toArray() -> cursor - pagination -> convert to an array (toArray)
router.get("/movies", async function (request, response) {
    // db.movies.find({})
    const movies = await getAllMovies(); 
    response.send(movies);
  });

router.get("/:id", async function (request, response) {
  console.log(request.params);
  // db.movies.findOne({id: "102"})
  const { id } = request.params;
//   const movie = movies.find((mv) => mv.id === id); //this line will return a movie details respected to the id specified.
const movie = await getMovieById(id);

  console.log(movie);
  movie ? response.send(movie) : response.status(404).send({message: "No such movie found"});
  response.send(movie);
  // response.send(movies);
});

router.delete("/:id", async function (request, response) {
    console.log(request.params);
    // db.movies.deleteOne({id: "102"})
    const { id } = request.params;
  //   const movie = movies.find((mv) => mv.id === id); //this line will return a movie details respected to the id specified.
  const result = await deleteMovieById(id);
    response.send(result);
    // response.send(movies);
  });

router.put("/:id", async function (request, response) {
    console.log(request.params);
    // db.movies.updateOne({id: "102"}, {$set : updateData})
    const { id } = request.params;
    const updateData = request.body;
 
  const result = await updateMovieById(id, updateData);
    response.send(result);
    // response.send(movies);
  });

router.post("/", async function (request, response) {
    // db.movies.insertMany(data)
    const data = request.body;
    console.log(data);
    const result = await createMovies(data);
    response.send(result);
  });

  export const moviesRouter = router;