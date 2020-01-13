const temp = process.argv;
let input = temp.slice(2);
var prompt = require('prompt');
// const stdin = process.stdin;


const { Pool } = require('pg');
const pool = new Pool({
  host: 'localhost',
  user: 'vagrant',
  password: '123',
  database: 'free_cardgames_online',
});

let readline = require('readline-sync');

const updatePlayerHand = (cardPlayed, userId)  => {
  return pool
    .query(`
      UPDATE player_hands 
      SET card_${cardPlayed} = 0
      WHERE user_id = ${userId};
      `);

};

const askQuestion = async (n) => {
  let number = await readline.question(`player-${n} play your card`);
  readline.close();
  return Promise.resolve(number);
};

const askQuestion1 = (n) => {
  const stdin = process.stdin;
  stdin.resume();

  console.log(`player ${n} play your card:  `);
  return new Promise(res => {
    stdin.once('data', data => {
      res(data);
    })
  })
}

prompt.start();

const compareCards = async( ) => {
  prompt.get(['username', 'email'], function (err, result) {
    let playedCards = [];
    let winner = '';
    let card = askQuestion1(1);
    console.log(card);
    if (card <= 13 && card >= 1) {
      playedCards.push(parseInt(card));
      await updatePlayerHand(card, 1)
      card =  askQuestion1(2);
      if (card <= 13 && card >= 1) {
        playedCards.push(parseInt(card));
        await updatePlayerHand(card, 1)
        const winnerNum = Math.max(...playedCards); //find largest element in array
        let count = 0;
        for (let element of playedCards) {
          if (element === winnerNum) {
            count++;
          }
        }
        if (count === 1) {
          winner = `player ${playedCards.indexOf(winnerNum)+1}`;
        } else {
          winner = `no one`;
        }
        console.log(playedCards);
        console.log(`the winner is ${winner}`);
      }
      
    }
  })
};

compareCards();

// if (line === 'test') {
//   console.log('test');
// }
// if (line === "query") {
//   pool
//     .query('select card_1 from player_hands where user_id = 1')
//     .then(res => console.log(res.rows));
// }











