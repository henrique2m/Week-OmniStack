const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const routes = express.Router();

const SessionController = require('./controllers/SessionController');
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');

routes.post('/sessions', 
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            id: Joi.string().required(),   
        }),  
    }),
SessionController.create);

routes.post('/ongs',
 celebrate({
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.string().required().min(10).max(12),
            city: Joi.string().required(),
            uf: Joi.string().required().length(2),
        }),  
    }),
OngController.create);

routes.get('/ongs', OngController.index);

routes.get('/profile',
    celebrate({
        [Segments.HEADERS]: Joi.object({
            authorization: Joi.string().required(),
        }).unknown(),
    }), 
ProfileController.index);

routes.post('/incidents', 
    celebrate({
        [Segments.HEADERS]: Joi.object({
                authorization:  Joi.string().required(),
        }).unknown(),

        [Segments.BODY]: Joi.object().keys({
            title: Joi.string().required().min(4).max(30),
            description: Joi.string().required().min(30).max(200),
            value: Joi.number().required(),
        }),
    })
,IncidentController.create);

routes.get('/incidents', 
    celebrate({
        [Segments.QUERY]: Joi.object().keys({
            page: Joi.number(),
        }),  
    }),
IncidentController.index);

routes.delete('/incidents/:id', 
    celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required(),
        }),  
    }), 
IncidentController.delete); 


module.exports = routes;