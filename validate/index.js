const Router = require('koa-joi-router')
const Joi = Router.Joi

module.exports = {
    '/user/:_id': {
        params: {
            _id: Joi.string().alphanum().max(24).description('User id').required()
        },
        output: {
            '200-299': {
                body: Joi.object({
                    userId: Joi.string().description('User id')
                }).options({
                    allowUnknown: true
                }).description('User object')
            }
        }
    },
    '/signup': {
        type: 'json',
        body: {
            username: Joi.string().alphanum().min(3).max(30).required(),
            password: Joi.string().alphanum().min(6).max(30).required()
        },
        output: {
            200: {
                body: {
                    userId: Joi.string().description('Newly created user id')
                }
            }
        }
    }
}