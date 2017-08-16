$(document).ready(function() {

  var cardsArray = ['https://www.wpclipart.com/signs_symbol/safety_signs/warning/caution.png',
                      'https://www.wpclipart.com/signs_symbol/safety_signs/warning/caution.png',
                      'https://www.wpclipart.com/signs_symbol/safety_signs/warning/falling_ice.png',
                      'https://www.wpclipart.com/signs_symbol/safety_signs/warning/falling_ice.png',
                      'https://www.wpclipart.com/signs_symbol/safety_signs/warning/falling_rocks.png',
                      'https://www.wpclipart.com/signs_symbol/safety_signs/warning/falling_rocks.png',
                      'https://www.wpclipart.com/signs_symbol/safety_signs/warning/fallout_shelter.png',
                      'https://www.wpclipart.com/signs_symbol/safety_signs/warning/fallout_shelter.png',
                      'https://www.wpclipart.com/signs_symbol/safety_signs/biohazard_01.png',
                      'https://www.wpclipart.com/signs_symbol/safety_signs/biohazard_01.png',
                      'https://www.wpclipart.com/signs_symbol/safety_signs/warning/handle_with_care.png',
                      'https://www.wpclipart.com/signs_symbol/safety_signs/warning/handle_with_care.png',
                      'https://www.wpclipart.com/signs_symbol/safety_signs/warning/high_voltage.png',
                      'https://www.wpclipart.com/signs_symbol/safety_signs/warning/high_voltage.png',
                      'https://www.wpclipart.com/signs_symbol/safety_signs/warning/radiation.png',
                      'https://www.wpclipart.com/signs_symbol/safety_signs/warning/radiation.png'];

  //Shuffle the order of the pictures
  function shuffleArray(array) {
      for (var i = array.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var temp = array[i];
          array[i] = array[j];
          array[j] = temp;
      }
      return array;
  }

  //Set up and display game content
  function display(cardsArray, game) {
    //Display cards
    for (i = 0; i < 4; i++) {
      var cardsImg = cardsArray[i];
      var row = $('#row1');
      row.append('<div class="cardBox"><img class="transparent" class="card" src="' + cardsImg + '"/></div>');
    }
    for (i = 4; i < 8; i++) {
      var cardsImg = cardsArray[i];
      var row = $('#row2');
      row.append('<div class="cardBox"><img class="transparent" class="card" src="' + cardsImg + '"/></div>');
    }
    for (i = 8; i < 12; i++) {
      var cardsImg = cardsArray[i];
      var row = $('#row3');
      row.append('<div class="cardBox"><img class="transparent" class="card" src="' + cardsImg + '"/></div>');
    }
    for (i = 12; i < 16; i++) {
      var cardsImg = cardsArray[i];
      var row = $('#row4');
      row.append('<div class="cardBox"><img class="transparent" class="card" src="' + cardsImg + '"/></div>');
    }
  }

  shuffleArray(cardsArray);
  display(cardsArray, game);

  //Variables for commonly selected DOM elements
  var cardsAreCorrect;
  var game = $('#squaresBox');
  var cardBack = $('img');


  //Select and show card face
  cardBack.click(function showCards() {
    var clickedCard = $(this);
    var selectedCards = $('.selected');
    if (selectedCards.length < 2) {
      clickedCard.addClass('selected');
      var cardFront = clickedCard.parent();
      cardFront.css('background-color', '#A9A9A9')
      setTimeout(function pause() {
        clickedCard.removeClass('transparent');
      }, 200);
    }
  });


  //Click Counter
  cardBack.click(function() {
    var clickNumber = $('#clickCounter');
    var newClickNumber = parseInt(clickNumber.text()) + 1;
    clickNumber.text(newClickNumber);
    if (clickNumber.text() == 1) {
      $('#clickWord').text('Click');
    }
    if (clickNumber.text() == 2) {
      $('#clickWord').text('Clicks');
    }
  });

  //Check if cards match
  cardBack.click(function() {
    setTimeout(function checkCards() {
      var selectedCards = $('.selected');
      //Only execute the match-function if exactly two cards are selected
      if (selectedCards.length === 2) {
        var firstCard = selectedCards.first();
        var secondCard = selectedCards.last();
        //Compare the url source of the two images
        if (firstCard.attr('src') === secondCard.attr('src')) {
          selectedCards.toggleClass('selected correct');
        } else {
          selectedCards.toggleClass('selected transparent');
          var cardFront = selectedCards.parent();
          cardFront.css('background-color', '#CAEBF2')
        }
      }
    }, 600);
  });

  //Update star rating
  cardBack.click(function() {
    var clickCount = parseInt($('#clickCounter').text())
    if (clickCount === 25) {
      $('#threeStars').html('&#x2606');
    }
    if (clickCount === 29) {
      $('#twoStars').html('&#x2606');
    }
    if (clickCount === 35) {
      $('#oneStar').html('&#x2606');
    }
  });

  //Win Condition
  cardBack.click(function() {
    setTimeout(function win(){
      var clickCount = parseInt($('#clickCounter').text());
      var rank;
      if (clickCount < 25) {
        rank = 1;
      } else if (clickCount > 24 && clickCount < 29) {
        rank = 2;
      } else if (clickCount > 28 && clickCount < 35) {
        rank = 3;
      } else if (clickCount > 35) {
        rank = 4;
      }
      var matchedCards = $('.correct');
      if (matchedCards.length === 16) {
        if (rank === 1){
          alert('Great job! You win with 3 stars!')
        } else if (rank === 2) {
          alert ('Good job! You win with 2 stars!')
        } else if (rank === 3) {
          alert('Not bad. You win with 1 star.')
        } else if (rank ===4) {
          alert('Well, you finished...')
        }
      }
    }, 650);
  });

});
//Filled star: &#9733
//Empty star: &#9734
//alert('test1 ' + selectedCards.attr('src'));
//alert($(this).attr('src'));
