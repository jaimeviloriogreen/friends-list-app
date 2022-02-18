import pkg from 'pg';
import {config} from "../config/config.js";


const {Pool} = pkg;
const pool = new Pool(config);

const getFriends = async ()=>{
    try {
        const res = await pool.query("SELECT * FROM friend");
        return res.rows.length > 0 ? res.rows : null;
    } catch (e) {
        console.log(`Error: ${e.message}`);
    }
}
const getFriend = async(id) =>{
    try {
        const query = 'SELECT * FROM friend WHERE id = $1';
        const value = [id];

        const res = await pool.query(query, value);
        return res.rows;
    } catch (e) {
        console.log(`Error: ${e.message}`);
    }
}
const getInsertFriend = async (id, fname, lname, profession)=>{
    try {
        
        const query = 'INSERT INTO friend(id, fname, lname, profession) VALUES($1, $2, $3, $4)';
        const values = [id, fname, lname, profession];
        const res = await pool.query(query, values);
        return res.rowCount;
   } catch (e) {
        console.log(`Error: ${e.message}`);
   }
}
const getDeleteFriends = async (values)=>{ 
    try {
        const index = values.map((val, indx)=> indx + 1);
        const query = `delete from friend where id in($${index.join(",$")})`;
        const res = await pool.query(query, values);

        return res.rowCount;
    } catch (e) {
        
    }
}
const getUpdateFriends = async (fname, lname, profession, id)=>{
    const query = 'update friend set fname = $1, lname = $2, profession = $3 where id = $4';

    const value = [fname, lname, profession, id];
    const res = await pool.query(query, value);

    return res.rowCount;
}
const endApp = async ()=>{
    pool.end();
}

export {getFriends, getInsertFriend, getDeleteFriends, getUpdateFriends, getFriend, endApp};