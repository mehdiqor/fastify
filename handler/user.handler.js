import { User, UserDetail } from "../model/model.js"

export const changeProfileHandler = async function(req, reply){
    const body = {...req.body};
    const userDetail = await UserDetail.findOne({
        where : {
            UserId : +req.user.id
        }
    })
    if(userDetail){
        for (const key in body) {
            if(body[key]){
                userDetail.setDataValue(key, body[key]);
            }
        }
        await userDetail.save();
    }else {
        Object.assign(body, {UserId : req.user.id})
        const newUserDetail = await UserDetail.create(body);
        await newUserDetail.save();
    }
    return reply.status(200).send({
        message : "user profile updated successfully"
    })
}
export const getProfileHandler = async function(req, reply){
    const user = await User.findOne({
        where : {
            id : req.user.id
        },
        include : [
            {
                model : UserDetail,
                as : "UserDetail",
                attributes : ['id', 'address', 'latitudes', 'longitudes']
            }
        ]
    })
    return reply.status(200).send({
        statusCode : 200,
        user
    })
}