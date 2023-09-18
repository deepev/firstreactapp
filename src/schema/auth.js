import * as yup from 'yup';

const { string, object, number } = yup;

export const registerSchema = object({
    name: string().required(),
    email: string().email().required(),
    password: string().min(6).required()
})

export const loginSchema = object({
    email: string().email().required(),
    password: string().min(6).required()
})