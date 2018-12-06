(function () {
    function Question (questionArg, answersArg, correctAnswerArg) {
        this.q = questionArg;
        this.a = answersArg;
        this.c = correctAnswerArg;
    }

    Question.prototype.printToConsole = function () {
        console.log(this.q);
        for(var i = 0; i < this.a.length; i++) {
            console.log(i+1 + ' ' + this.a[i]);
        }
    };

    Question.prototype.checkAnswer = function (el, callback) {
        var sc1 = 0;
        if(el === (this.c + 1)) {
            console.log('Correct Answer');
            sc1 = callback(true);
        }
        else {
            console.log('Wrong Answer');
            sc1 = callback(false);
        }

        this.displayScore(sc1);
    };

    Question.prototype.displayScore = function (score) {
        console.log('Your score is '+ score);
    };

    function keepScore() {
        var sc = 0;
        return function (success) {
            if(success) sc++;
            return sc;
        };
    }

    var score = keepScore();


    var questionsArray = [
        new Question('Question 1', ['ans 1','ans 2','ans 3', 'ans 4'], 2),
        new Question('Question 2', ['ans 1','ans 2'], 0),
        new Question('Question 3', ['ans 1','ans 2','ans 3'], 1)
    ];


    function nextQuestion() {
        var randomQuestion = Math.floor(Math.random() * questionsArray.length);
        var question = questionsArray[randomQuestion];
        question.printToConsole();
        var promptAns = prompt('Please enter number of correct answer');

        if (promptAns !== 'exit') {
            question.checkAnswer(parseInt(promptAns), score);
            nextQuestion();
        }
    }
    
    nextQuestion();

}());
