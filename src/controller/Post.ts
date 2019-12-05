import {Request, Response} from "express";
import {getManager} from "typeorm";
import {User} from "../entity/User";
import {Post} from "../entity/Post";

/**
 * Loads all posts from the database.
 */
export const getAllPosts = async (req: Request, res: Response) => {

    // get a post repository to perform operations with post
    const postRepository = getManager().getRepository(Post);

    // load a post by a given post id
    const posts = await postRepository.find();

    // return loaded posts
    res.send(posts);
};

/**
 * Loads all posts from the database.
 */
export const saveAllPosts = async (req: Request, res: Response) => {
    const userRepository = getManager().getRepository(User);
    const postRepository = getManager().getRepository(Post);
    let i;
    let newUsers:any = [];
    let  newUser:any = {};
    let  newPost:any = {};
    for(i=1; i<=6; i ++) {

   		newUser = await userRepository.findOne({ 
        select: ["id"],
   			where: { id: i} 
   		});

      console.log("hi", newUser);
   		if(typeof newUser == "undefined") {
   			newUser = new User();
   			newPost = new Post();
   		} else  {
   			console.log("update");
        newPost = await postRepository.findOne({ 
          select: ["id","userId"],
          where: { userId: i} 
        });
   		}

		 newUser.name  = "naval find pankaj test"+i; 
   	 newPost.title = "naval asf pankaj add post title "+i;

		 newUser.posts = [newPost];

		 newUsers.push(newUser);		
	}
    await userRepository.save(newUsers);  
    res.send("complete");
};