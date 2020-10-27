var firstButton = document.getElementById('first');
var secondButton = document.getElementById('second');
var thirdButton = document.getElementById('third');
var fourthButton = document.getElementById('fourth');
var changeQuestion = document.getElementsByClassName('question')[0];
var changeNumberQuestion = document.querySelector('.main-text');
var answerCorrect = document.getElementsByClassName('center-correct')[0];
var allIcons = document.querySelectorAll('.icon');
var congrats = document.querySelector('.congratulations');
var subheader = document.getElementById('subheader');
var currentQuestionIndex = 0;


// open quiz start
document.querySelector('.main-button').addEventListener('click', function () {
    hideElement();
    console.log('check');
    openQuiz();
})

function hideElement() {
    document.getElementById('enter-page').style.display = 'none';
}

function openQuiz() {
    document.getElementById('enter-quiz').style.display = 'block';
}
function closeQuiz() {
    document.getElementById('enter-quiz').style.display = 'none';
}

function wrongAnswer() {
    changeQuestion.style.color = 'red';
    changeQuestion.style.textAlign = 'center';
}

function questionStylesBack() {
    changeQuestion.style.color = 'white';
    changeQuestion.style.textAlign = 'left';
}

function rightAnswer() {
    changeQuestion.style.textAlign = 'center';
}

function questionSecond() {
    changeQuestion.innerHTML = 'What is the most traded currency in the foreign currencies market?';
}
function questionThird() {
    changeQuestion.innerHTML = 'When are the financial markets open?';
}


function renderCorrectAnswer() {
    answerCorrect.style.display = 'block';
}

function hideCorrectAnswer() {
    answerCorrect.style.display = 'none';
}

function changeIcon() {
    var currentQuestionIconContainer = allIcons[currentQuestionIndex];
    var currentQuestionIcon =  currentQuestionIconContainer.querySelector('img');

    currentQuestionIconContainer.classList.add('correct');

    currentQuestionIconContainer.style.background = '#dfc55b';
    currentQuestionIconContainer.style.border = 'none';
    currentQuestionIcon.src = currentQuestionIcon.src.replace('white','black');

}


// open quiz end
// add event listeners to the buttons start
firstButton.addEventListener('click', function (e) {
    handleAnswerButtonClick(e.target);

})
secondButton.addEventListener('click', function (e) {
    handleAnswerButtonClick(e.target);
})
thirdButton.addEventListener('click', function (e) {
    handleAnswerButtonClick(e.target);
})
fourthButton.addEventListener('click', function (e) {
    console.log(e.target);
    handleAnswerButtonClick(e.target);
})
// add event listeners to the buttons end

//function watching to existing class'correct' in classlist start
function handleAnswerButtonClick(answerElement) {
    if (answerElement.classList.contains('correct')) {
// correct handling
        console.log('correct');
        disableAllQuestions();
        rightAnswer();
        console.log('answer');
        renderCorrectAnswer();
        changeIcon();
        bonusMessage();
        correctMessage();
        setTimeout(showNextQuestion, 1500);
        setTimeout(openRegistrationForm, 3000);
    } else {
        disableAllQuestions();
        wrongAnswer();
        wrongMessage();
        console.log('wrong');
        setTimeout(showNextQuestion, 1500);
        setTimeout(openRegistrationForm, 3000);
    }
}
function disableAllQuestions() {
    document.querySelector('.versions').style.pointerEvents = 'none';
}
function enableAllQuestions() {
    document.querySelector('.versions').style.pointerEvents = 'auto';
}

function  showNextQuestion(){
    if(currentQuestionIndex === 0 ){
        showSecondQuestion();
    }
    else if(currentQuestionIndex === 1 ){
        showThirdQuestion();
    }

    currentQuestionIndex++;
}
function bonusMessage() {
    if(currentQuestionIndex === 0) {
        changeQuestion.innerHTML = 'You will receive: Free educational course about trading gold';
    }else if(currentQuestionIndex === 1) {
        changeQuestion.innerHTML = 'You will receive: “Attack on the Forex Market” free e-book';
    }else if(currentQuestionIndex === 2) {
        changeQuestion.innerHTML = 'You will receive: A $50,000 demo account';
    }
}
function correctMessage() {
    if(currentQuestionIndex === 1) {
        answerCorrect.innerHTML = 'excellent!';
    }else if(currentQuestionIndex === 2 ) {
        answerCorrect.innerHTML = 'well done! '
    }
}
function wrongMessage() {
    if(currentQuestionIndex === 2) {
        changeQuestion.innerHTML = 'Tough luck...';
    }else {
        changeQuestion.innerHTML = 'Wrong answer, better luck in the next one';
    }
}


//function watching to existing class'correct' in classlist end

function showSecondQuestion() {
    hideCorrectAnswer();
    questionStylesBack();
    changeNumberQuestion.textContent = 'Second question:';
    changeQuestion.innerHTML = 'What is the most traded currency in the foreign currencies market?';
    questionSecond();
    firstButton.innerHTML = '1.EUR';
    secondButton.innerHTML = '2.USD';
    thirdButton.innerHTML = '3.CHF ';
    fourthButton.innerHTML = '4.JPY';
    removeAnswerType(thirdButton);
    addCorrectClass(secondButton);
    enableAllQuestions();
}

function showThirdQuestion() {
    hideCorrectAnswer();
    questionStylesBack();
    changeNumberQuestion.textContent = 'Third question:';
    changeQuestion.innerHTML = 'When are the financial markets open?';
    questionThird();
    firstButton.innerHTML = '1.15 hours/7 days';
    secondButton.innerHTML = '2.24 hours/6 days';
    thirdButton.innerHTML = '3.12 hours/3 days';
    fourthButton.innerHTML = '4.24 hours/5 days';
    removeAnswerType(secondButton);
    addCorrectClass(fourthButton);
    enableAllQuestions();
}

function removeAnswerType(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

// function changeElementHtml(element, html) {
//     element.innerHTML = html;
// }

function addCorrectClass(element) {
    element.classList.add('correct');
}
function registrationForm() {
    closeQuiz();
    document.querySelector('#enter-form').style.display = 'block';
}
function openRegistrationForm() {
    if(currentQuestionIndex === 3) {
        registrationForm();
        document.querySelector('.final-block .block-images').innerHTML = document.querySelector('.block-images').innerHTML;
        collectCorrectAnswers();
        checkIncorrect();
    }
}
function collectCorrectAnswers() {
    var isAllAnswersFalse = true;

    document.querySelectorAll(".final-block .icon").forEach(function(element, index){
        if(element.classList.contains('correct')) {
            isAllAnswersFalse = false;
        } else {
            document.querySelectorAll('.list-answers .text')[index].style.display = 'none';
        }
    })

    if(isAllAnswersFalse) {
        subheader.innerHTML = 'At least you had the courage to try.';
    }
}
function checkIncorrect() {
    var atOnesIsTrue = false;

    document.querySelectorAll(".final-block .icon").forEach(function(element, index){
        console.log('checkIncorrect for ');

        if (element.classList.contains('correct')) {
            atOnesIsTrue = true;
        }
    });

    if (atOnesIsTrue) {
        congrats.innerHTML = 'congratulations'.toUpperCase();
        document.querySelector('.for-incorrect .text').style.display = 'none';
    }
}
var language = document.querySelector('.arabian a');
language.href += location.search;
