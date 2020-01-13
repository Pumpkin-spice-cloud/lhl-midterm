const temp = process.argv;
let input = temp.slice(2);



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
const compareCards = function() {

  let playedCards = [];
  let winner = '';
  let card = readline.question('player-1 play your card')
  if (card <= 13 && card >= 1) {
    playedCards.push(parseInt(card));
    updatePlayerHand(card, 1)
      .then(function() {
        card = readline.question(`player-2 play your card`);
        if (card <= 13 && card >= 1) {
          playedCards.push(parseInt(card));
          updatePlayerHand(card, 1)
            .then(function() {
              const winnerNum = Math.max(...playedCards); //find largest element in array
              let count = 0;
              for (let element of playedCards) {
                if (element === winnerNum) {
                  count++;
                }
              }
              if (count === 1) {
                winner = `player ${playedCards.indexOf(winnerNum) + 1}`;
              } else {
                winner = `no one`;
              }
              console.log(playedCards);
              console.log(`the winner is ${winner}`);
            });
        }
      });
  }
}


compareCards();





// if (line === 'test') {
//   console.log('test');
// }
// if (line === "query") {
//   pool
//     .query('select card_1 from player_hands where user_id = 1')
//     .then(res => console.log(res.rows));
// }











