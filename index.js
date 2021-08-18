const { fifaData } = require('./fifa.js')

// ⚽️ M  V P ⚽️ //

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 1: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Practice accessing data by console.log-ing the following pieces of data note, you may want to filter the data first 😉*/
// fifaData.filter(function(item){
//     return item.Year === 2014;
// })

const finals2014 = fifaData.filter(info => info.Year === 2014 && info.Stage === 'Final')
console.log('2014 Result:', finals2014);

//(a) Home Team name for 2014 world cup final
console.log('Task 1a:', finals2014[0]['Home Team Name']);
// //(b) Away Team name for 2014 world cup final
console.log('Task 1b:', finals2014[0]['Away Team Name']);
// //(c) Home Team goals for 2014 world cup final
console.log('Task 1c:', finals2014[0]['Home Team Goals']);
// //(d) Away Team goals for 2014 world cup final
console.log('Task 1d:', finals2014[0]['Away Team Goals']);
// //(e) Winner of 2014 world cup final */
console.log('Task 1e:', finals2014[0]['Win conditions']);

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 2: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use getFinals to do the following:
1. Receive data as a parameter
2. Return an array of objects with the data of the teams that made it to the final stage

hint - you should be looking at the stage key inside of the objects
*/

function getFinals(data) {
    const allFinals = data.filter(info => info.Stage === 'Final');
    return allFinals;
}
console.log('Task 2:', getFinals(fifaData));


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 3: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function called getYears to do the following: 
1. Receive an array
2. Receive a callback function getFinals from task 2 
3. Return an array called years containing all of the years in the getFinals data set*/

function getYears(arrData, getFinalCb) {
    /* code here */
    const years = getFinalCb(arrData).map(info => info.Year)
    return years;
}
console.log('Task 3:', getYears(fifaData, getFinals));


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 4: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function getWinners to do the following:  
1. Receives an array
2. Receives the callback function getFinals from task 2 
3. Determines the winner (home or away) of each `finals` game. 
4. Returns the names of all winning countries in an array called `winners` */

function getWinners(arrData, getFinalCb) {
    /* code here */
    // map over getFinals and return the winners using a conditional
    //dont worry about ties / dont worry about the over time
    //just return the winner based on points scored in the game.

    const winners = getFinalCb(arrData).map(info => {
        return info['Home Team Goals'] > info['Away Team Goals'] ? info['Home Team Name'] : info['Away Team Name'];
    });
    return winners;
}
console.log('Task 4:', getWinners(fifaData, getFinals));



/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 5: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use the higher-order function getWinnersByYear to do the following:
1. Receive an array
2. Receive a callback function getYears from task 3
3. Receive a callback function getWinners from task 4
4. Return an array of strings that say "In {year}, {country} won the world cup!" 

hint: the strings returned need to exactly match the string in step 4.
 */

function getWinnersByYear(arrData, getYearsCb, getWinnersCb) {
    const years = getYearsCb(arrData, getFinals);
    const winnersByYear = getWinnersCb(arrData, getFinals).map((country, indx) => `In ${years[indx]}, ${country} won the world cup!`);

    return winnersByYear;
}
console.log('Task 5:', getWinnersByYear(fifaData, getYears, getWinners));



/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 6: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher order function getAverageGoals to do the following: 
 1. Receive the callback function getFinals from task 2 ensure you pass in the data as an argument
 2. Return the the average number of the total home team goals and away team goals scored per match and round to the second decimal place. 
 
 (Hint: use .reduce and do this in 2 steps) 
 
 Example of invocation: getAverageGoals(getFinals(fifaData));
*/

function getAverageGoals(arrData) {
    /* code here */
    //hint: of you want the second decimal look up .toFixed(2)
    // const getData = arrData.reduce((acc, currentVal) => acc + currentVal);

    const homeTeamTot = arrData.reduce((acc, currentVal) => acc + currentVal['Home Team Goals'] / arrData.length, 0);
    const awayTeamTot = arrData.reduce((acc, currentVal) => acc + currentVal['Away Team Goals'] / arrData.length, 0);
    return (homeTeamTot + awayTeamTot).toFixed(2);
}
console.log('Task 6:', getAverageGoals(getFinals(fifaData)));


/// 🥅 STRETCH 🥅 ///

/* 💪💪💪💪💪 Stretch 1: 💪💪💪💪💪 
Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(winnersData, teamInitial) {
    /* code here */
    // const initialCountry = winnersData.filter (initial => initial['Home Team Initials'] === teamInitial)

    const mostWin = winnersData.filter(info => info.Stage === 'Final' && (info['Home Team Initials'] === teamInitial || info['Away Team Initials'] === teamInitial));

    const homeTeamWon = mostWin.filter(info => info['Home Team Initials'] === teamInitial && info['Home Team Goals'] > info['Away Team Goals']);

    const awayTeamWon = mostWin.filter(info => info['Away Team Initials'] === teamInitial && info['Home Team Goals'] < info['Away Team Goals']);

    const teamName = homeTeamWon.length > 0 ? homeTeamWon[0]['Home Team Name'] : awayTeamWon[0]['Away Team Name'];


    return (`${teamName} has won ${homeTeamWon.length + awayTeamWon.length} world cup so far.`);
    // return mostWin;
}
console.log('Stretch 1:', getCountryWins(fifaData, 'BRA'));

/* 💪💪💪💪💪 Stretch 2: 💪💪💪💪💪 
Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals(data) {
    /* code here */

}

getGoals(fifaData);


/* 💪💪💪💪💪 Stretch 3: 💪💪💪💪💪
Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(/* code here */) {

    /* code here */

}


/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */


/* 🛑🛑🛑🛑🛑 Please do not modify anything below this line 🛑🛑🛑🛑🛑 */
function foo() {
    console.log('its working');
    return 'bar';
}
foo();
module.exports = {
    foo,
    getFinals,
    getYears,
    getWinners,
    getWinnersByYear,
    getAverageGoals
}
