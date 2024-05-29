
const quiz = [
    {
        question: "Q. Which of the following is not a CSS box model property?",
        choices: ["margin", "padding", "border-radius", "border-collapse"],
        answer: "border-collapse"
    },
    {
        question: "Q. Which of the following is not a valid way to declare a function in JavaScript?",
        choices: ["function myFunction() {}", " let myFunction = function() {};", "myFunction: function() {}", "const myFunction = () => {};"],
        answer: "myFunction: function() {}"
    },
    {
        question: "Q. Which of the following is not a JavaScript data type?",
        choices: ["string", "boolean", "object", "float"],
        answer: "float"
    },
    {
        question: "Q. What is the purpose of the this keyword in JavaScript?",
        choices: ["It refers to the current function.", "It refers to the current object.", "It refers to the parent object.", " It is used for comments."],
        answer: "It refers to the current object."
    },
    {
        question: "Q. Which of the following function of String object produces an HTML hypertext link for requesting another URL?",
        choices: ["small()", "sup()", "sub()", "link()"],
        answer: "link()"
    },
    {
        question: "Q. Which of the following is used to define a variable in JavaScript?",
        choices: ["var", "let", "const", "All of the above"],
        answer: "All of the above"
    },
    {
        question: "Q. Which of the following methods is used to add an element at the end of an array in JavaScript?",
        choices: ["push()", "pop()", "shift()", "unshift()"],
        answer: "push()"
    },
    {
        question: "Q. Which of the following is not a looping structure in JavaScript?",
        choices: ["for", "while", "do-while", "foreach"],
        answer: "foreach"
    },
    {
        question: "Q. Which built-in method returns the length of a string in JavaScript?",
        choices: ["length()", "size()", "length", "getSize()"],
        answer: "length"
    },
    {
        question: "Q. Which of the following is the correct syntax to create a class in JavaScript?",
        choices: ["class MyClass {}", "MyClass class {}", "new class MyClass {}", "create class MyClass {}"],
        answer: "class MyClass {}"
    }
];



const container = document.querySelector('.container');
const questionBox = document.querySelector('.question');
const choicesBox = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard');
const alert = document.querySelector('.alert');
const startBtn = document.querySelector('.startBtn');
const timer = document.querySelector('.timer');

let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 15;
let timerID = null;

const showQuestions = () => {
    const questionDetails = quiz[currentQuestionIndex];
    questionBox.textContent = questionDetails.question;

    choicesBox.textContent = "";
    questionDetails.choices.forEach(choice => {
        const choiceDiv = document.createElement('div');
        choiceDiv.textContent = choice;
        choiceDiv.classList.add('choice');
        choicesBox.appendChild(choiceDiv);

        choiceDiv.addEventListener('click', () => {
            document.querySelectorAll('.choice').forEach(c => c.classList.remove('selected'));
            choiceDiv.classList.add('selected');
        });
    });

    if (currentQuestionIndex < quiz.length) {
        startTimer();
    }
};

const checkAnswer = () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (!selectedChoice) {
        displayAlert("Select your answer");
        return;
    }

    if (selectedChoice.textContent.trim() === quiz[currentQuestionIndex].answer.trim()) {
        displayAlert("Correct Answer!");
        score++;
    } else {
        displayAlert(`Wrong Answer! ${quiz[currentQuestionIndex].answer} is the Correct Answer`);
    }

    timeLeft = 15;
    currentQuestionIndex++;
    if (currentQuestionIndex < quiz.length) {
        showQuestions();
    } else {
        stopTimer();
        showScore();
    }
};

const showScore = () => {
    questionBox.textContent = "";
    choicesBox.textContent = "";
    scoreCard.textContent = `You Scored ${score} out of ${quiz.length}!`;
    displayAlert("You have completed this quiz!");
    nextBtn.textContent = "Play Again";
    quizOver = true;
    timer.style.display = "none";
};

const displayAlert = (msg) => {
    alert.style.display = "block";
    alert.textContent = msg;
    setTimeout(() => {
        alert.style.display = "none";
    }, 2000);
};

const startTimer = () => {
    clearInterval(timerID);
    timer.textContent = timeLeft;

    const countDown = () => {
        timeLeft--;
        timer.textContent = timeLeft;
        if (timeLeft === 0) {
            const confirmUser = confirm("Time Up!!! Do you want to play the quiz again");
            if (confirmUser) {
                timeLeft = 15;
                startQuiz();
            } else {
                startBtn.style.display = "block";
                container.style.display = "none";
                return;
            }
        }
    };
    timerID = setInterval(countDown, 1000);
};

const stopTimer = () => {
    clearInterval(timerID);
};

const shuffleQuestions = () => {
    for (let i = quiz.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
    }
    currentQuestionIndex = 0;
    showQuestions();
};

const startQuiz = () => {
    timeLeft = 15;
    timer.style.display = "flex";
    score = 0;
    currentQuestionIndex = 0;
    quizOver = false;
    shuffleQuestions();
};

startBtn.addEventListener('click', () => {
    startBtn.style.display = "none";
    container.style.display = "block";
    startQuiz();
});

nextBtn.addEventListener('click', () => {
    if (quizOver) {
        nextBtn.textContent = "Next";
        scoreCard.textContent = "";
        currentQuestionIndex = 0;
        quizOver = false;
        score = 0;
        startQuiz();
    } else {
        checkAnswer();
    }
});
