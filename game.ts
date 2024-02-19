import chalk from "chalk";
import inquirer from "inquirer";

let apilink:string = "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple";

let FetchData = async (data:string) => {

    let FetchQuiz:any = await fetch(data)
    let res = await FetchQuiz.json();
    return res.results
    
}
let data = await FetchData(apilink);


let StartQuiz = async () => {
    let score:number=0;
    //for user 
    let name = await inquirer.prompt({
        
            type:"input",
            name:"fname",
            message:"What is your Name?"
        
        
    });
    for (let i = 1; i <= 5; i++) {
        let answers = [...data[i].incorrect_answers,data[i].correct_answer];

        let qus = await inquirer.prompt({
     
            
                type:"list",
                name:"Quiz",
                choices:answers.map((val:any)=>val),
                message:data[i].question,
});
        if (qus.Quiz === data[i].correct_answer)
        {
               ++score;
        }
        
    }
    
    

    console.log(`Dear ${chalk.green.bold(name.fname)}, your score is ${chalk.red.bold(score)},out of ${chalk.red.bold("5")}`);
};
StartQuiz();




