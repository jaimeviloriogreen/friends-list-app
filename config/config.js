import 'dotenv/config';

const {USER, HOST, PASS, DATABASE} = process.env;

export const config = {
    user:USER,
    host:HOST, 
    password:PASS,
    database:DATABASE
};