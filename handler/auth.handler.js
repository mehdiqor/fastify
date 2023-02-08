import { User } from "../model/model.js";

export const registerHandler = async function(req, reply){
    const {username, password, first_name, last_name} = req.body;
    const newUser = new User({username, password, first_name, last_name});
    await newUser.save();
    reply.send(newUser);
}