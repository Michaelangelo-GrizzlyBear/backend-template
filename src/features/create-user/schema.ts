import Joi from 'joi'

export default Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email_address: Joi.string().email()
        .required(),
    password: Joi.string().required(),
})
