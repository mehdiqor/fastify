const indexRoute = {
    schema : {
        tags : ['home'],
        security : [{apiKey : []}],
        response : {
            200 : {
                type : 'object',
                properties : {
                    header : {
                        type : 'object',
                        properties : {
                            authorization : {
                                type: 'string'
                            }
                        }
                    },
                    message : {
                        type : 'string'
                    }
                }
            }
        }
    },
    handler : (req, reply) => {
        reply.send({
            header : req.headers,
            message : "Hello Fastify"
        })
    }
}

export default function indexRoutes(fastify, option, done){
    fastify.get("/", indexRoute)
    done();
}