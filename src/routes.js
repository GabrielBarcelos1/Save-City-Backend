const express = require('express')
const {celebrate,Segments,Joi} = require('celebrate')

const OngController = require('./controllers/OngController')
const IncidentController = require('./controllers/IncidentControllers')
const ProfileController = require('./controllers/ProfileControler')
const SessionController = require('./controllers/SessionControler')
const routes = express.Router()

routes.post('/sessions',celebrate({
    [Segments.BODY]:Joi.object().keys({
        email: Joi.required(),
        password: Joi.required()
    })
}),SessionController.create)


routes.get('/ongs',OngController.index)


routes.post('/citizen', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required(),
        cpf: Joi.string().required(),
        cep: Joi.string().required(),
        city: Joi.string().required(),
        district: Joi.string().required(),
        street: Joi.string().required(),
        number: Joi.string().required(),
        whatsapp: Joi.string().required().min(10).max(11),
    })
}) , OngController.create)

routes.get('/profile',celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}),ProfileController.index)

routes.get('/incidents',celebrate({
    [Segments.QUERY]:Joi.object().keys({
        page: Joi.number()
    })
}) , IncidentController.index)

routes.get('/incidents/celesc',celebrate({
    [Segments.QUERY]:Joi.object().keys({
        page: Joi.number()
    })
}) , IncidentController.withFilterCelesc)



routes.post('/incidents',celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}),celebrate({
    [Segments.BODY]: Joi.object().keys({
       title: Joi.string().required(),
       description: Joi.string().required(),
       cep: Joi.string().required(),
       city: Joi.string().required(),
       street: Joi.string().required(),
       district: Joi.string().required(),
       type: Joi.string().required(),
       number: Joi.string().required(),
    })
}), IncidentController.create)


routes.get('/incident/:id',celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}),IncidentController.getById)

routes.put('/incident/:id',celebrate({
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        cep: Joi.string().required(),
        city: Joi.string().required(),
        street: Joi.string().required(),
        district: Joi.string().required(),
        type: Joi.string().required(),
        number: Joi.string().required(),
     }),
     [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}),IncidentController.update)

routes.delete('/incidents/:id',celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}),IncidentController.delete)

module.exports = routes
