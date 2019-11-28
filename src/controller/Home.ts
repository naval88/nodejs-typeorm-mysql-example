import {Request, Response} from "express";

/**
* Loads home page.
*/
export const showHomePage = async(req: Request, res: Response) => {    
    res.send("we are on home page");
}
