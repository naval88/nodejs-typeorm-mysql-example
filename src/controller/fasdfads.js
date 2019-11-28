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
    for(i=3; i<=5; i ++) {
	   		

	   	let  newUser:any = await userRepository.findOne
	   		({ 
	   			where: { id: i} ,
	   			relations: ['posts'],
	   		})

	   	if(newUser) {
	   		newUser.name  = "naval test"+i;

	   		let  newPost:any = await postRepository.findOne
	   		({ 
	   			where: { userId: i} 
	   		})

	   		newPost.title = "naval add post title "+i;

			newUser.posts = [newPost];
			//newUsers.push(newUser)
			await userRepository.update(newUser,i); 

	   	} else {
	   		let  newUser = new User();
			newUser.name  = "naval test"+i;   

			let  newPost = new Post();
			newPost.title = "naval add post title "+i;

			newUser.posts = [newPost];
			//newUsers.push(newUser)
			await userRepository.save(newUser); 
		}
	}
     
    res.send("complete");
};