var $ = jQuery.noConflict();

var app = app || {};
!function(){
	"use strict";

	$('html').removeClass('no-js');

	var suits = ["spades", "diamonds", "hearts", "clubs"],
			names = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"],
			cards = [],
			cardsPlayed = [],
			dealerCards = [],
			playerCards = [],
			dealerScore = 0,
			playerScore = 0;

	//-
	// Initialize the functions on document ready
	//-
	app.initialize = {
		init: function() {
			app.deck.init();
		}
	},

	//-
	// Deck
	//-
	app.deck = {
		init: function() {

			var suitsName, cardNames;

			// Loop through suits and names
			for(var i = 0; i < suits.length; i++) {
				suitsName = suits[i];
						for(var a = 0; a < names.length; a++) {
							var cardObj = {};

							cardNames = names[a];
							cardObj[suitsName] = cardNames;

							// Push objects to array
							cards.push(cardObj);
						}
			}

			// Run game
			app.game.init();
		}
	},

	//-
	// Game
	//-
	app.game = {
		init: function() {
			var btnDeal = $('#deal'),
					btnHit = $('#hit'),
					btnStick = $('#stick');

			btnDeal.on('click', function(e) {
				if($(this).is(":disabled")) return;
				$(this).attr("disabled", true);
				btnHit.attr("disabled", false);
				btnStick.attr("disabled", false);
				app.game.playedCards(app.game.getRandomNr(1,52),'player');
				app.game.playedCards(app.game.getRandomNr(1,52),'dealer');
			});

			btnHit.on('click', function(e) {
				if($(this).is(":disabled")) return;
				app.game.playedCards(app.game.getRandomNr(1,52),'player');
				app.game.playedCards(app.game.getRandomNr(1,52),'dealer');
			});

			btnStick.on('click', function(e) {
				if($(this).is(":disabled")) return;
				$(this).attr("disabled", true);
				btnHit.attr("disabled", true);
				app.game.stick();
			});
		},
		getRandomNr: function(min,max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		},
		playedCards: function(nr,person) {
			// Check if number has been chosen already
			if($.inArray(nr, cardsPlayed) !== -1) {
					// Check if all cards has been played
					if(cardsPlayed.length === 52) {
						app.game.gameOver();
					} else {
						// Number has been chosen already, run again
						app.game.playedCards(app.game.getRandomNr(1,52),person);
					}
				} else {
					cardsPlayed.push(nr);
					if(person === 'player') {
						playerCards.push(nr);
						app.game.showHand(nr,'player');
					} else {
						dealerCards.push(nr);
						app.game.showHand(nr,'dealer');
					}
				}
		},
		showHand: function(nr,player) {
			var objCard = cards[nr];
			for(var key in objCard) {
				if(player === 'player') {
					app.game.displayCard(key,objCard[key]);
					app.game.score(objCard[key], 'player');
				} else {
					app.game.score(objCard[key], 'dealer');
				}
			}
		},
		score: function(n,player) {
			var curNr = '';
			switch(n) {
				case 'A': 
					curNr = '1';
					break;
				case 'J':
					curNr = '11';
					break;
				case 'Q':
					curNr = '12';
					break;
				case 'K':
					curNr = '13';
					break;
				default:
					curNr = n;
					break;
			}

			if(player === 'player') {
				console.log(curNr);
				playerScore = playerScore + parseInt(curNr);
				$('#gamer-score').text('You have '+ playerScore);

				if(playerScore > 21) {
					app.game.gameOver();
					$('#hit').attr("disabled", true);
					$('#stick').attr("disabled", true);
				}

				if(playerScore === 21) {
					app.game.gameWon();
					$('#hit').attr("disabled", true);
					$('#stick').attr("disabled", true);
				}
			} else {
				console.log(curNr);
				dealerScore = dealerScore + parseInt(curNr);
			}

			console.log('player score: ' + playerScore);
			console.log('dealer score: ' + dealerScore);

		},
		displayCard: function(s,n) {
			var cardSymbol = '';

			switch(s) {
				case 'spades': 
					cardSymbol = '&spades;';
					break;
				case 'diamonds':
					cardSymbol = '&diams;';
					break;
				case 'hearts':
					cardSymbol = '&hearts;';
					break;
				case 'clubs':
					cardSymbol = '&clubs;';
					break;
			}

			$('#gamer-hand .inner').append('<div class="card '+s+'"><div class="top">'+n+' '+cardSymbol+'</div><div class="middle">'+cardSymbol+'</div><div class="bottom">'+n+' '+cardSymbol+'</div></div>');

		},
		stick: function() {
			if(dealerScore > playerScore) {
				if(dealerScore > 21) {
					// Dealer lost
					app.game.gameWon();
				} else {
					// Dealer won
					app.game.gameOver();
				}
			} else {
				// Player won
				app.game.gameWon();
			}
		},
		gameOver: function() {
			$('#gamer-score').append('<p>Dealer has '+dealerScore+'</p><p>You lost!</p>');
		},
		gameWon: function() {
			$('#gamer-score').append('<p>Dealer has '+dealerScore+'</p><p>You Won!</p>');
		},
	};

	//-
	// Document ready function
	//-
	$(document).ready(app.initialize.init);

}(jQuery);

