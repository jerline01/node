import express from "express";
import { createUser } from "../helper.js";
import { getAllMovies, getMovieById, deleteMovieById, updateMovieById, createMovies } from "../helper.js";
const router = express.Router();
import bcrypt from "bcrypt";

async function genPassword(password) {
    // bcrypt.genSalt(NoOfRounds)
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password,salt); // salt + "password@123"= hashpassword
    console.log({salt,hashPassword});
    return hashPassword
  }

// router.post("/signup", async function (request, response) {
//     // db.users.insertOne(data)
//     const {username, password} = request.body;
//     const hashPassword = await genPassword(password);
//     console.log(data);
//     const newUser = {
//         username : username,
//         password : hashPassword
//     }
//     const result = await createUser(newUser);
//     response.send(result);
//   });

router.post("/signup", async function (request, response) {
    // db.users.insertOne(data)
    const { username, password } = request.body;
    const hashPassword = await genPassword(password);
    const newUser = {
      username: username,
      password: hashPassword,
    };
    const result = await createUser(newUser);
    response.send(result);
  });
  

  export const usersRouter = router;