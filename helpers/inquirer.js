import inquirer from "inquirer";

const getChoice = async ()=>{
    const question = {
        type:"list",
        name:"choice",
        message:"Choice what do you want to do...",
        choices:[
            {value:"1", name:"1. Show all my friends"},
            {value:"2", name:"2. Insert new friend"},
            {value:"3", name:"3. Edit a friend"},
            {value:"4", name:"4. Delete a friend"},
            {value:"5", name:"5. Exit"},
        ]
    };
    const {choice} = await inquirer.prompt(question);
    return choice;
}
const getFname = async (fnameDefault = undefined)=>{
    const question = {
        type:"input", 
        name:"fname",
        message:"Write his first name...", 
        default(){
            if(fnameDefault){
                return fnameDefault;
            }
        },
        validate(value){
            const regex = new RegExp("^([a-zA-ZÀ-ÿ]{2,})(\\s[a-zA-ZÀ-ÿ]+)*$", "g");
            if(regex.test(value)){
                return true;
            }
            return "Please, enter a validate value!".yellow;
        }
    }
    const {fname} = await inquirer.prompt(question);
    return fname;
}
const getLname = async (lnameDefault = undefined)=>{
    const question = {
        type:"input", 
        name:"lname",
        message:"Write his last name...",
        default(){
            if(lnameDefault){
                return lnameDefault;
            }
        },
        validate(value){
            const regex = new RegExp("^([a-zA-ZÀ-ÿ]{2,})(\\s[a-zA-ZÀ-ÿ]+)*$", "g");
            if(regex.test(value)){
                return true;
            }
            return "Please, enter a validate value!".yellow;
        }
    }

    const {lname} = await inquirer.prompt(question);
    return lname;
}
const getProfession = async (profesionDefault = undefined)=>{
    const question = {
        type:"input", 
        name:"profession",
        message:"Write his profession...",
        default(){
            if(profesionDefault){
                return profesionDefault;
            }
        },
        validate(value){
            const regex = new RegExp("^([a-zA-ZÀ-ÿ]{2,})(\\s[a-zA-ZÀ-ÿ]+)*$", "g");
            if(regex.test(value)){
                return true;
            }
            return "Please, enter a validate value!".yellow;
        }
    }

    const {profession} = await inquirer.prompt(question);
    return profession;
}
const deleteFriends = async (toDelete)=>{
    const friends = toDelete.map(friend =>{
        return {
            name: `${friend.fname} ${friend.lname}`, value:friend.id
        }
    });

    const question = {
        type:"checkbox", 
        message:"Whom do you what to delete?", 
        name:"deleted", 
        choices:friends,
        validate(answer) {
            if (answer.length < 1) {
              return 'You must choose at least one topping.'.yellow;
            }
            return true;
        }
    };

    const {deleted} = await inquirer.prompt(question);
    return deleted;
}
const updateFriends = async (toUpdate)=>{
    const friends = toUpdate.map(friend =>{
        return {
            name: `${friend.fname} ${friend.lname}`, value:friend.id
        }
    });
    const question = {
        type:"list",
        name:"updated",
        message:"Choice whom do you want to update...",
        choices:friends
    };
    const {updated} = await inquirer.prompt(question);
    return updated;
}

 export {getChoice, getFname, getLname, getProfession, deleteFriends, updateFriends};