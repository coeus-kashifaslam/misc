var scores, roundScore, activePlayer, gamePlaying, dicePrevious, finalScore;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {

    if (document.querySelector('.final-score').value !== '') finalScore = document.querySelector('.final-score').value;

    if(gamePlaying === 1) {
        var dice = Math.floor(Math.random() * 6 + 1);
        var dice2 = Math.floor(Math.random() * 6 + 1);
        var diceDOM = document.querySelector('.dice-1');
        var dice2DOM = document.querySelector('.dice-2');
        var playerDOM = document.querySelector('#current-' + activePlayer);

        diceDOM.style.display = 'block';
        dice2DOM.style.display = 'block';
        diceDOM.src = 'images/dice-' + dice + '.png';
        dice2DOM.src = 'images/dice-' + dice2 + '.png';

        if (dice !== 1 && dice2 !== 1){
            if(dice === 6 && dicePrevious === 6) {
                roundScore = 0;
                togglePlayer();
            } else {
                dicePrevious = dice;
                playerDOM.textContent = roundScore += (dice + dice2);
            }
        } else {
            togglePlayer();
        }
    }

});

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) togglePlayer();
});

document.querySelector('.btn-new').addEventListener('click', function () {
    init();
});


function toggleClasses (activePlayer, active) {
    if (active === 'winner') {
        for (var i = 0; i < 2; i++) {
            document.querySelector('.player-'+i+'-panel').classList.remove('active');
        }
    }
    document.querySelector('.player-' + activePlayer + '-panel').classList.toggle(active);
}

function togglePlayer() {

    var playerDOM = document.querySelector('#current-' + activePlayer);
    var activePlayerScore = document.querySelector('#score-' + activePlayer);

    activePlayerScore.textContent = scores[activePlayer] += roundScore;

    if (scores[activePlayer] > finalScore) {
        gamePlaying = 0;
        toggleClasses (activePlayer, 'winner');
        document.querySelector('.winner .player-name').textContent = 'Winner!';
    }

    playerDOM.textContent = roundScore = 0;

    if (gamePlaying) {
        toggleClasses(activePlayer, 'active');
        activePlayer = activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        toggleClasses(activePlayer, 'active');
    }
}

function init() {
    document.querySelector('.dice-1').style.display = 'none';
    document.querySelector('.dice-2').style.display = 'none';
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = 1;
    dicePrevious = 0;
    finalScore = 100;
    document.querySelector('.player-0-panel').classList.add('active');
    for (var i = 0; i < 2; i++) {
        document.querySelector('#current-' + i).textContent = 0;
        document.querySelector('#score-' + i).textContent = 0;
        document.querySelector('.player-'+i+'-panel').classList.remove('winner');
        document.querySelector('.player-'+i+'-panel .player-name').textContent = "Player " + i;
    }
}
