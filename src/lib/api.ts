import axios from 'axios';

//Api from NestJS
export const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL_API,
    headers: {
        'Content-Type': 'application/json',
    },
})

export const intancesPredictions = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL_API_PREDICTIONS,
    headers: {
        'Content-Type': 'application/json',
    },
})