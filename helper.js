import { client } from "./index.js";
import { ObjectId } from "mongodb";

export async function createMovies(data) {
  return await client
    .db("b30wd")
    .collection("movies")
    .insertMany(data);
}

export async function createUser(data) {
  return await client
    .db("b30wd")
    .collection("users")
    .insertOne(data);
}

export async function updateMovieById(id, updateData) {
  return await client
    .db("b30wd")
    .collection("movies")
    .updateOne({ _id: ObjectId(id)}, { $set: updateData });
}
export async function deleteMovieById(id) {
  return await client
    .db("b30wd")
    .collection("movies")
    .deleteOne({_id: ObjectId(id) }); //id: id 
}
export async function getAllMovies() {
  return await client
    .db("b30wd")
    .collection("movies")
    .find({})
    .toArray();
}
export async function getMovieById(id) {
  console.log(id,ObjectId);
  return await client
    .db("b30wd")
    .collection("movies")
    .findOne({ _id: ObjectId(id) });
}

export async function getUserByName(username) {
  return await client
    .db("b30wd")
    .collection("users")
    .findOne({username : username });
}