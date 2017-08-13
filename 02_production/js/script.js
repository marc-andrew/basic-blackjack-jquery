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

	var btnDeal = $('#deal'),
			btnHit = $('#hit'),
			btnStick = $('#stick');

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
			btnDeal.on('click', function(e) {
				if($(this).is(":disabled")) return;
				$(this).attr("disabled", true);
				btnHit.attr("disabled", false);
				btnStick.attr("disabled", false);

				app.game.playedCards(app.game.getRandomNr(cards.length),'player');
				app.game.playedCards(app.game.getRandomNr(cards.length),'dealer');
				app.game.playedCards(app.game.getRandomNr(cards.length),'player');
				app.game.playedCards(app.game.getRandomNr(cards.length),'dealer');
			});

			btnHit.on('click', function(e) {
				if($(this).is(":disabled")) return;
				app.game.playedCards(app.game.getRandomNr(cards.length),'player');
				app.game.playedCards(app.game.getRandomNr(cards.length),'dealer');
			});

			btnStick.on('click', function(e) {
				if($(this).is(":disabled")) return;
				app.game.stick();
			});
		},
		getRandomNr: function(max) {
			return Math.floor(Math.random() * (max - 1 + 1)) + 1;
		},
		playedCards: function(nr,person) {
			// If it is the last card end came
			if(cards.length <= 1) {
				app.game.gameOver();
				return;
			}

			// Push random card into cardsPlayed array
			cardsPlayed.push(cards[nr]);

			//  Check if player or dealer's turn
			if(person === 'player') {
				// Push random card into playerCards array
				playerCards.push(cards[nr]);
				app.game.showHand(nr,'player');
			} else {
				// Push random card into dealerCards array
				dealerCards.push(cards[nr]);
				app.game.showHand(nr,'dealer');
			}

			// Remove card from cards array
			cards.splice(nr,1);

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
					curNr = '10';
					break;
				case 'Q':
					curNr = '10';
					break;
				case 'K':
					curNr = '10';
					break;
				default:
					curNr = n;
					break;
			}

			if(player === 'player') {
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

				console.log('--------------------');
				console.log('player score: ' + playerScore);
				console.log(playerCards);
			} else {
				dealerScore = dealerScore + parseInt(curNr);

				console.log('--------------------');
				console.log('dealer score: ' + dealerScore);
				console.log(dealerCards);
			}

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
			btnStick.attr("disabled", true);
			btnHit.attr("disabled", true);
			$('#gamer-score').append('<p>Dealer has '+dealerScore+'</p><p>You lost!</p>');
		},
		gameWon: function() {
			btnStick.attr("disabled", true);
			btnHit.attr("disabled", true);
			$('#gamer-score').append('<p>Dealer has '+dealerScore+'</p><p>You Won!</p>');
		},
	};

	//-
	// Document ready function
	//-
	$(document).ready(app.initialize.init);

}(jQuery);

