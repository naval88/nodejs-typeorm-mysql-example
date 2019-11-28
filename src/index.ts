import "reflect-metadata";
import {createConnection} from "typeorm";
import {Request, Response} from "express";
import * as express from "express";
import * as bodyParser from "body-parser";

//controller
import * as HomeController from "./controller/Home";
import * as PostController from "./controller/Post";


// create connection with database
// note that it's not active database connection
// TypeORM creates connection pools and uses them for your requests
createConnection().then(async connection => {    

    console.log("Express application is up and running on port 3000");

}).catch(error => console.log("TypeORM connection error: ", error));

// create express app
const app = express();
app.use(bodyParser.json());

//primary routes
app.get("/", HomeController.showHomePage);
app.get("/posts", PostController.getAllPosts);
app.get("/posts/add", PostController.saveAllPosts);

// run app
app.listen(3000);