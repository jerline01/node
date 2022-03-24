// Ctrl + C = to kill the server

// const express = require("express");
import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
import {
  getAllMovies,
  getMovieById,
  deleteMovieById,
  updateMovieById,
  createMovies,
} from "./helper.js";
import { moviesRouter } from "./routes/movies.js";
import { usersRouter } from "./routes/users.js";
dotenv.config();

console.log(process.env.MONGO_URL);
const app = express();

const PORT = process.env.PORT;

const movies = [
  {
    id: "100",
    name: "Iron man 2",
    poster:
      "https://m.media-amazon.com/posters/M/MV5BMTM0MDgwNjMyMl5BMl5BanBnXkFtZTcwNTg3NzAzMw@@._V1_FMjpg_UX1000_.jpg",
    rating: 7,
    summary:
      "With the world now aware that he is Iron Man, billionaire inventor Tony Stark (Robert Downey Jr.) faces pressure from all sides to share his technology with the military. He is reluctant to divulge the secrets of his armored suit, fearing the information will fall into the wrong hands. With Pepper Potts (Gwyneth Paltrow) and Rhodes (Don Cheadle) by his side, Tony must forge new alliances and confront a powerful new enemy.",
    trailer: "https://www.youtube.com/embed/wKtcmiifycU",
  },
  {
    id: "101",
    name: "No Country for Old Men",
    poster:
      "https://upload.wikimedia.org/wikipedia/en/8/8b/No_Country_for_Old_Men_poster.jpg",
    rating: 8.1,
    summary:
      "A hunter's life takes a drastic turn when he discovers two million dollars while strolling through the aftermath of a drug deal. He is then pursued by a psychopathic killer who wants the money.",
    trailer: "https://www.youtube.com/embed/38A__WT3-o0",
  },
  {
    id: "102",
    name: "Jai Bhim",
    poster:
      "https://m.media-amazon.com/posters/M/MV5BY2Y5ZWMwZDgtZDQxYy00Mjk0LThhY2YtMmU1MTRmMjVhMjRiXkEyXkFqcGdeQXVyMTI1NDEyNTM5._V1_FMjpg_UX1000_.jpg",
    summary:
      "A tribal woman and a righteous lawyer battle in court to unravel the mystery around the disappearance of her husband, who was picked up the police on a false case",
    rating: 8.8,
    trailer: "https://www.youtube.com/embed/nnXpbTFrqXA",
  },
  {
    id: "103",
    name: "The Avengers",
    rating: 8,
    summary:
      "Marvel's The Avengers (classified under the name Marvel Avengers\n Assemble in the United Kingdom and Ireland), or simply The Avengers, is\n a 2012 American superhero film based on the Marvel Comics superhero team\n of the same name.",
    poster:
      "https://terrigen-cdn-dev.marvel.com/content/prod/1x/avengersendgame_lob_crd_05.jpg",
    trailer: "https://www.youtube.com/embed/eOrNdBpGMv8",
  },
  {
    id: "104",
    name: "Interstellar",
    poster: "https://m.media-amazon.com/posters/I/A1JVqNMI7UL._SL1500_.jpg",
    rating: 8.6,
    summary:
      "When Earth becomes uninhabitable in the future, a farmer and ex-NASA\n pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team\n of researchers, to find a new planet for humans.",
    trailer: "https://www.youtube.com/embed/zSWdZVtXT7E",
  },
  {
    id: "105",
    name: "Baahubali",
    poster: "https://flxt.tmsimg.com/assets/p11546593_p_v10_af.jpg",
    rating: 8,
    summary:
      "In the kingdom of Mahishmati, Shivudu falls in love with a young warrior woman. While trying to woo her, he learns about the conflict-ridden past of his family and his true legacy.",
    trailer: "https://www.youtube.com/embed/sOEg_YZQsTI",
  },
  {
    id: "106",
    name: "Ratatouille",
    poster:
      "https://resizing.flixster.com/gL_JpWcD7sNHNYSwI1ff069Yyug=/ems.ZW1zLXByZC1hc3NldHMvbW92aWVzLzc4ZmJhZjZiLTEzNWMtNDIwOC1hYzU1LTgwZjE3ZjQzNTdiNy5qcGc=",
    rating: 8,
    summary:
      "Remy, a rat, aspires to become a renowned French chef. However, he fails to realise that people despise rodents and will never enjoy a meal cooked by him.",
    trailer: "https://www.youtube.com/embed/NgsQ8mVkN8w",
  },
];

// const mobiles = [
//   {
//     model: "OnePlus 9 5G",
//     img: "https://m.media-amazon.com/images/I/61fy+u9uqPL._SX679_.jpg",
//     company: "Oneplus",
//   },
//   {
//     model: "Iphone 13 mini",
//     img: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-mini-blue-select-2021?wid=470&hei=556&fmt=jpeg&qlt=95&.v=1645572315986",
//     company: "Apple",
//   },
//   {
//     model: "Samsung s21 ultra",
//     img: "https://m.media-amazon.com/images/I/81kfA-GtWwL._SY606_.jpg",
//     company: "Samsung",
//   },
//   {
//     model: "xiomi mi 11",
//     img: "https://m.media-amazon.com/images/I/51K4vNxMAhS._AC_SX522_.jpg",
//     company: "xiomi",
//   },
// ];

// const fruits = [
//   {
//     name: "Apple",
//     img: "https://5.imimg.com/data5/YY/EN/MY-8155364/fresh-apple-500x500.jpg"
//   },
//   {
//     name: "Orange",
//     img: "https://media.istockphoto.com/photos/orange-picture-id185284489?k=20&m=185284489&s=612x612&w=0&h=LLY2os0YTG2uAzpBKpQZOAC4DGiXBt1jJrltErTJTKI="
//   },
//   {
//     name: "Pine Apple",
//     img: "https://media.istockphoto.com/photos/whole-with-slice-ripe-pineapple-isolated-on-white-background-picture-id1064819674?k=20&m=1064819674&s=612x612&w=0&h=WIYJDrmo9L6xh8-l0dCkmCCb9_rIBQhhp4m2MXK_XMc="
//   },
//   {
//     name: "Strawberry",
//     img: "https://media.istockphoto.com/photos/red-berry-strawberry-isolated-picture-id1157946861?k=20&m=1157946861&s=612x612&w=0&h=TkcgPU1fblZISunSxNasdYUqUHz_Mrmo0eGWaxLQHEI="
//   },
//   {
//     name: "Grapes",
//     img: "https://www.jiomart.com/images/product/600x600/590000042/sonaka-seedless-grapes-1-kg-product-images-o590000042-p590116962-0-202203142035.jpg"
//   }
// ];

app.use(cors()); // cors - 3rd party middleware
// middle ware -> Intercept -> converting body to json
app.use(express.json()); //inbuilt middleware

// const MONGO_URL = "mongodb://localhost";
const MONGO_URL = process.env.MONGO_URL;

async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Mongo is connected 😊");
  return client;
}
export const client = await createConnection();

app.get("/", function (request, response) {
  response.send("Hello World 🌍😃😊");
});

// app.get("/movies", function (request, response) {
//   response.send(movies);
// });

app.use("/movies", moviesRouter);

app.use("/users", usersRouter);

app.get("/mobiles", async function (request, response) {
  // db.mobiles.find({})
  const mobiles = await client
    .db("b30wd")
    .collection("mobiles")
    .find({})
    .toArray();
  response.send(mobiles);
});

app.post("/mobiles", async function (request, response) {
  const data = request.body;
  const result = await client
    .db("b30wd")
    .collection("mobiles")
    .insertMany(data);
  response.send(result);
});

app.get("/fruits", async function(request,response){
  const result = await client 
    .db("b30wd")
    .collection("fruits")
    .find({})
    .toArray();
  response.send(result);
});

app.post("/fruits", async function(request,response){
  const data = request.body;
  const result = await client 
   .db("b30wd")
   .collection("fruits")
   .insertMany(data);
  response.send(result);
})

app.listen(PORT, () => console.log(`Server started in ${PORT}`));
