let deckId = ''


//this is how you get the desk from the server, see json
//on page load, it runs and gets me a deck of cards


fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        deckId = data.deck_id  //we store the id we got from deck in a global variable called deckId
      })
      .catch(err => {
          console.log(`error ${err}`)
      });




//whenever we click, our game is going to run. we can use the id we got from 
//page load and draw 2 cards   /draw/?count=2

document.querySelector('button').addEventListener('click', drawTwo)


//the set of instructions

function drawTwo(){
  const url = `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`
  


fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        document.querySelector('#player1').src = data.cards[0].image
        //you get the data back. it has a cards property. you are going to grab the 
        //first card from the array [0], and grab the image property
        document.querySelector('#player2').src = data.cards[1].image

        let player1Val = convertToNum(data.cards[0].value) //every value will convert to num convertToNum
        let player2Val = convertToNum(data.cards[1].value)

        if(player1Val > player2Val){
            document.querySelector('h3').innerHTML = 'Player 1 Wins'
        }else if(player1Val < player2Val){
            document.querySelector('h3').innerHTML = 'Player 2 Wins'
        }else{
            document.querySelector('h3').innerHTML = 'Time for War!'
        }
    })

    .catch(err => {
        console.log(`error ${err}`)
    });

}


//Turns the face cards into values 




function convertToNum(val){
    if(val === 'ACE'){
        return 14
    }else if(val === 'KING'){
        return 13
    }else if(val === 'QUEEN'){
        return 12
    }else if(val === 'JACK'){
        return 11
    }else{
        return Number(val)
    }
}