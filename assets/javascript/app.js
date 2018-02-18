var correctAnswers = 0;
var incorrectAnswers = 0;
var unanswered = 0;
var counter = 90;
var intervalId;

var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');

var myQuestions = [
    {
        question: "Which of these bands is widely attributed with the creation of Death Metal?",
        answers: {
            a: 'Black Sabbath',
            b: 'Metallica',
            c: 'Possessed',
            d: 'Mayhem'
        },
        correctAnswer: 'c'
    },
    {
        question: "Iron Maiden was a pioneer of what subgenre of heavy metal?",
        answers: {
            a: 'New Wave of British Heavy Metal',
            b: 'Sludge Metal',
            c: 'Glam Metal',
            d: 'Power Metal'
        },
        correctAnswer: 'a'
    },
    {
        question: "Which of these bands is one of the pioneers of Swedish Death Metal?",
        answers: {
            a: 'Sepultura',
            b: 'Entombed',
            c: 'Celtic Frost',
            d: 'Autopsy'
        },
        correctAnswer: 'b'
    },
    {
        question: "Which of these bands holds the Guinness World Record for shortest song at 1.316 seconds long?",
        answers: {
            a: 'Brutal Truth',
            b: 'Discharge',
            c: 'Carcass',
            d: 'Napalm Death'
        },
        correctAnswer: 'd'
    },
    {
        question: "Which of these countries has the most metal bands per capita?",
        answers: {
            a: 'United Kingdom',
            b: 'Finland',
            c: 'Sweden',
            d: 'America'
        },
        correctAnswer: 'b'
    },
    {
        question: "Which metal vocalist is known for having an incredibly wide vocal range?",
        answers: {
            a: 'Ozzy Osbourne of Black Sabbath',
            b: 'Phil Anselmo of Pantera',
            c: 'Rob Halford of Judas Priest',
            d: 'James Hetfield of Metallica'
        },
        correctAnswer: 'c'
    },
    {
        question: "Who was the first metal musician to use the \"devil horns\" gesture?",
        answers: {
            a: 'Bruce Dickinson',
            b: 'Axl Rose',
            c: 'Gene Simmons',
            d: 'Ronnie James Dio'
        },
        correctAnswer: 'd'
    }
];

$("#submit").hide();
$(".quiz-end").hide();
$(".timer-div").hide();

function createQuiz(questions, quizContainer, resultsContainer, submitButton) {

    run();

    function showQuestions(questions, quizContainer) {
        var output = [];
        var answers;

        for (var i = 0; i < questions.length; i++) {

            answers = [];

            for (letter in questions[i].answers) {

                answers.push(
                    '<label>'
                    + '<input type="radio" name="question' + i + '" value="' + letter + '">'
                    + questions[i].answers[letter]
                    + '</label>'
                );
            }

            output.push(
                '<div class="question">' + questions[i].question + '</div>'
                + '<div class="answers">' + answers.join('') + '</div>'
            );
        }

        // finally combine our output list into one string of html and put it on the page
        quizContainer.innerHTML = output.join('');
    }


    function showResults(questions, quizContainer, resultsContainer) {

        var answerContainers = quizContainer.querySelectorAll('.answers');

        // keep track of user's answers
        var userAnswer = '';

        // for each question...
        for (var i = 0; i < questions.length; i++) {

            // find selected answer
            userAnswer = (answerContainers[i].querySelector('input[name=question' + i + ']:checked') || {}).value;

            // if answer is correct
            if (userAnswer === questions[i].correctAnswer) {
                // add to the number of correct answers
                correctAnswers++;
            } else if (userAnswer != questions[i].correctAnswer) {
                incorrectAnswers++;
            } else if (userAnswer == {}) {
                unanswered++;
            } else {
                console.log("Error");
            }
        }

        // show number of correct answers out of total
        resultsContainer.innerHTML = "<p>" + "Correct Answers: " + correctAnswers + "</p>" + "<p>" + "Incorrect Answers: " + incorrectAnswers + "</p>" + "<p>" + "Unaswered Questions: " + unanswered + "</p>";
    }

    showQuestions(questions, quizContainer);

    $("#submit").show();
    $(".timer-div").show();

    submitButton.onclick = function () {
        showResults(questions, quizContainer, resultsContainer);
        $("#submit").hide();
        $(".quiz-end").show();
        $(".timer-div").hide();
    }

    function run() {
        clearInterval(intervalId);
        intervalId = setInterval(decrement, 1000);
    }

    function stop() {
        clearInterval(intervalId);
    }

    //  The decrement function.
    function decrement() {

        //  Decrease number by one.
        counter--;

        //  Show the number in the #show-number tag.
        $("#timer").html(counter);

        //  Once number hits zero...
        if (counter === 0) {

            stop();
            $("#submit").hide();
            $(".quiz-end").show();
            $(".timer-div").hide();
            showResults(questions, quizContainer, resultsContainer);
            
        }
    }
};

$(".start-button").click(function () {
    correctAnswers = 0;
    incorrectAnswers = 0;
    unanswered = 0;
    counter = 90;
    $("#timer").text(counter);
    $(".game-start").hide();
    $(".timer-div").show();
    $(".quiz-end").hide();
    createQuiz(myQuestions, quizContainer, resultsContainer, submitButton);
});