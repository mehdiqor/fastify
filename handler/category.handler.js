import { Category } from "../model/category.model.js";

async function findCategory(id, reply){
    const category = await Category.findOne({
        where : {id}
    })
    if(!category) return reply.status(404).send({
        message : "category not found"
    })
    return category
}
export const createCategory = async(req, reply) => {
    const {name, ParentId} = req.body;
    const category = await Category.findOne({
        where : {name}
    })
    if(category) return reply.status(400).send({
        message : "category is already exist"
    })
    const newCategory = await Category.create({name, ParentId});
    await newCategory.save();
    reply.status(201).send({
        message : "category created successfully"
    })
}
export const updateCategory = async(req, reply) => {
    const {id} = req.params;
    const {name} = req.body;
    const category = await findCategory(id, reply);
    category.setDataValue("name", name);
    await category.save();
    reply.status(201).send({
        message : "category updated successfully",
        category
    })
}
export const getAllCategories = async(req, reply) => {
    const categories = await Category.findAll({
        include : [
            {
                model : Category,
                as : "children",
                include : [
                    {
                        model : Category,
                        as : "children"
                    }
                ]
            }
        ],
        where : {
            ParentId : null
        }
    });
    reply.status(200).send({categories});
}
export const getOneCategory = async(req, reply) => {
    const {id} = req.params;
    const category = await findCategory(id, reply);
    reply.status(200).send({category});
}
export const removeCategory = async(req, reply) => {
    const {id} = req.params;
    const category = await findCategory(id, reply)
    await category.destroy();
    reply.status(200).send({
        message : "category deleted successfully"
    });
}