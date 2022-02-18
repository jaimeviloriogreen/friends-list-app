
import {getChoice,  getFname, getLname, getProfession, deleteFriends, updateFriends} from "./helpers/inquirer.js";
import {getFriends, getInsertFriend, getDeleteFriends,getUpdateFriends,getFriend, endApp} from "./helpers/pg.js";

import { v4 as uuidv4 } from 'uuid';
import {advise} from "./module/messages.js";

main();

async function main(){
    advise("Welcome to my friends list @pp!", "yellow");

    let opt = "";
    do{
        opt = await getChoice();
        switch (opt) {
            case "1":
                const friends = await getFriends();
                if(friends){
                    console.clear();
                    console.table(friends);
                    break;
                }
                advise("There is not friends to show!", "yellow");
                break;
            case "2":
                console.clear();
                const firstName = await getFname();
                const lastName = await getLname();
                const profession = await getProfession();
                const id = uuidv4();
                console.clear();

                const insert = await getInsertFriend(id, firstName, lastName, profession);
                if(insert >= 1 ) advise(`One friend have been inserted!`,"green");
                break;
            case "3":
                console.clear();
                const toUpdate = await getFriends();
                if(toUpdate){
                    const result = await updateFriends(toUpdate);

                    const getOneFriend = await getFriend(result);
                    
                    console.clear();
                    const firstNameUpdate = await getFname(getOneFriend[0].fname);
                    const lastNameUpdate = await getLname(getOneFriend[0].lname);
                    const professionUpdate = await getProfession(getOneFriend[0].profession);
                    console.clear();

                    const upd = await getUpdateFriends(firstNameUpdate,lastNameUpdate, professionUpdate, getOneFriend[0].id);

                    if(upd >= 1 ) advise(`One friend have been updated!`,"green")
                    
                    break;
                }
                advise("There is not friends to edit!","yellow");
                break;
            case "4":
                console.clear();
                const toDelete = await getFriends();
                if(toDelete){
                    const res = await deleteFriends(toDelete);

                    const del = await getDeleteFriends(res);
                    
                    advise(`You have deleted ${del} friend(s)!`,"green"); 
                    break;
                }          
                advise(`There is not friends to delete!`,"yellow"); 
                break;
            default:
                break;
        }       
    }while(opt != "5");

    advise("Session end!","green");
    endApp();
}


