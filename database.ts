'use server'

import {MongoClient, ObjectId, ServerApiVersion} from 'mongodb';
import {DailyTask, Item, ItemType, MainQuest, User} from "@/types";
const uri = "mongodb+srv://admin:admin@cluster0.uddvl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export async function run() {
  // Connect the client to the server	(optional starting in v4.7)
  console.log("running!")
  await client.connect();
  // Send a ping to confirm a successful connection
  await client.db("admin").command({ ping: 1 });
  console.log("Pinged your deployment. You successfully connected to MongoDB!");
}


// Queries:
export async function getUser(username: string, password: string) {
  const result = await client
    .db('TowerUp') // Replace with your DB name
    .collection<User>('Users')
    .findOne({ username: username, password });
  return JSON.parse(JSON.stringify(result))
}

export async function createUser(newUser: Omit<User, '_id'>) {

  const result = await client
    .db("TowerUp") // Replace with your actual database name
    .collection("Users")
    .insertOne(newUser);

  console.log(`New user created with ID: ${result.insertedId}`);
  return JSON.parse(JSON.stringify(result.insertedId));
}

export async function getUserById(id: string) {
  const userId = new ObjectId(id);
  const user = await client
    .db("TowerUp")
    .collection<User>("Users")
    .findOne({ _id: userId });

  console.log('Fetched User:', user);
  return JSON.parse(JSON.stringify(user));
}

export async function addDailyTask(userId: number, task: DailyTask) {
  await client.db("TowerUp").collection<User>("Users").updateOne(
    { id: userId },
    { $push: { dailyTasks: task } }
  );
}


export async function addMainQuest(userId: number, quest: MainQuest) {
  await client.db("TowerUp").collection<User>("Users").updateOne(
    { id: userId },
    { $push: { mainQuest: quest } }
  );
}

export async function updateUserCoins(id: number, coins: number) {
  await client.db("TowerUp").collection<User>("Users").updateOne(
    { id },
    { $inc: { coins } }
  );
}

export async function addItemToInventory(userId: number, item: Item<ItemType>) {
  await client.db("TowerUp").collection<User>("Users").updateOne(
    { id: userId },
    { $push: { inventory: item } }
  );
}

export async function completeDailyTask(userId: number, id: number) {
  await client.db("TowerUp").collection<User>("Users").updateOne(
    { id: userId, "dailyTasks.id": id },
    { $set: { "dailyTasks.$.completed": true } }
  );
}