
const {getChoice,  getFname, getLname, getProfession, deleteFriends, updateFriends} = require("./helpers/inquirer.js");
const {getFriends, getInsertFriend, getDeleteFriends,getUpdateFriends,getFriend, endApp} = require("./helpers/pg.js");
const { v4: uuidv4 } = require('uuid'); 
require('colors');

main();

async function main(){
    console.clear();
    console.log("");
    console.log("Welcome to my friend list @pp!".yellow);
    console.log("");
    let opt = "";
    do{
        opt = await getChoice();
        switch (opt) {
            case "1":
                const friends = await getFriends();
                console.clear();
                console.table(friends);
                
                break;
            case "2":
                console.clear();
                const firstName = await getFname();
                const lastName = await getLname();
                const profession = await getProfession();
                const id = uuidv4();
                console.clear();

                const insert = await getInsertFriend(id, firstName, lastName, profession);
                insert >= 1 ? console.log(`One friend have been inserted!`.green) : 'Nothing have been inserted!';
                break;
            case "3":
                console.clear();
                const toUpdate = await getFriends();
                const result = await updateFriends(toUpdate);

                const getOneFriend = await getFriend(result);
                
                console.clear();
                const firstNameUpdate = await getFname(getOneFriend[0].fname);
                const lastNameUpdate = await getLname(getOneFriend[0].lname);
                const professionUpdate = await getProfession(getOneFriend[0].profession);
                console.clear();

                const upd = await getUpdateFriends(firstNameUpdate,lastNameUpdate, professionUpdate, getOneFriend[0].id);

                upd >= 1 ? console.log(`One friend have been updated!`.green) : 'Nothing have been inserted!'
                break;
            case "4":
                console.clear();
                const toDelete = await getFriends();
                const res = await deleteFriends(toDelete);

                const del = await getDeleteFriends(res);
                console.clear();
                console.log(`You have deleted ${del} friend(s)!`.green);            
            default:
                break;
        }       
    }while(opt != "5");

    console.clear();
    console.log("Session end!".green);
    endApp();
}


