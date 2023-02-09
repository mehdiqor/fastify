
import { User } from "../model/model.js";
import { fastify } from "../server.js";

export const registerHandler = async function(req, reply){
    const {username, password, first_name, last_name} = req.body;
    const newUser = new User({
        username,
        first_name,
        last_name,
        password : await fastify.bcrypt.hash(password)
    });
    await newUser.save();
    reply.send(newUser);
}
export const loginHandler = async function(req, reply){
    const {username, password} = req.body;
    const user = await User.findOne({
        where : {
            username
        }
    });
    if(!user) return reply.status(404).send({message : "user not found"});
    const compareResult = await fastify.bcrypt.compare(password, user.password);
    if(compareResult){
        const accessToken = fastify.jwt.sign({username}, {expiresIn : "1y"});
        user.setDataValue("accessToken", accessToken);
        await user.save();
        return reply.status(200).send({
            message : "logged in successfully",
            accessToken : user.accessToken
        });
    }
    reply.status(401).send({
        message : "username or password is incorrect"
    })
}