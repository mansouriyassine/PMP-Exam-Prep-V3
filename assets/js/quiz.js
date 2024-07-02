let questions = [];
let currentQuestionIndex = 0;
let userAnswers = [];
let timeLeft = 600; // 10 minutes in seconds
let timerInterval;

function getUrlParameter(name) {
    name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
    let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    let results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

function fetchQuestions(group) {
    return fetch(`questions/group${group}.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (!Array.isArray(data) || data.length === 0) {
                throw new Error('Invalid or empty question data');
            }
            questions = data;
            startQuiz();
        })
        .catch(error => {
            console.error('Error fetching questions:', error);
            document.getElementById('quiz-container').innerHTML = `<p>Error loading questions: ${error.message}. Please try again.</p>`;
        });
}

function startQuiz() {
    userAnswers = new Array(questions.length).fill(null);
    showQuestion(questions[currentQuestionIndex]);
    startTimer();
}

function showQuestion(question) {
    document.getElementById('question').textContent = question.question;
    const choicesContainer = document.getElementById('choices');
    choicesContainer.innerHTML = '';
    const choices = [question.choice1, question.choice2, question.choice3, question.choice4];
    choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.className = 'w-full text-left px-4 py-2 border rounded mb-2 hover:bg-gray-100';
        button.textContent = choice;
        button.onclick = () => selectAnswer(index);
        // Highlight the button if it was previously selected
        if (userAnswers[currentQuestionIndex] === index + 1) {
            button.classList.add('selected-choice');
        }
        choicesContainer.appendChild(button);
    });
    updateNavigationButtons();
    updateProgressBar();
}

function selectAnswer(selectedIndex) {
    // Remove highlight from all buttons
    const choicesContainer = document.getElementById('choices');
    const choiceButtons = choicesContainer.getElementsByTagName('button');
    Array.from(choiceButtons).forEach(button => {
        button.classList.remove('selected-choice');
    });

    // Set grey background to the clicked button
    choiceButtons[selectedIndex].classList.add('selected-choice');

    // Store the selected answer
    userAnswers[currentQuestionIndex] = selectedIndex + 1;
    updateNavigationButtons();
}

function updateNavigationButtons() {
    document.getElementById('prev-btn').disabled = currentQuestionIndex === 0;
    const nextBtn = document.getElementById('next-btn');
    if (currentQuestionIndex === questions.length - 1) {
        nextBtn.textContent = 'Finish';
        nextBtn.onclick = finishQuiz;
    } else {
        nextBtn.textContent = 'Next';
        nextBtn.onclick = () => {
            currentQuestionIndex++;
            showQuestion(questions[currentQuestionIndex]);
        };
    }
}

function updateProgressBar() {
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    document.getElementById('progress-bar').style.width = `${progress}%`;
    document.getElementById('question-progress').textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
}

function startTimer() {
    const timerElement = document.getElementById('timer');
    timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            finishQuiz();
        } else {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            timeLeft--;
        }
    }, 1000);
}

function finishQuiz() {
    clearInterval(timerInterval);
    const score = calculateScore();
    const timeTaken = 600 - timeLeft;
    window.location.href = `results.html?score=${score}&total=${questions.length}&time=${timeTaken}&answers=${JSON.stringify(userAnswers)}`;
}

function calculateScore() {
    return userAnswers.reduce((score, answer, index) => {
        return score + (answer === questions[index].answer ? 1 : 0);
    }, 0);
}

document.addEventListener('DOMContentLoaded', function() {
    const selectedGroup = getUrlParameter('group');
    if (selectedGroup) {
        fetchQuestions(selectedGroup);
    } else {
        document.getElementById('quiz-container').innerHTML = `<p>No group selected. Please go back and choose a group.</p>`;
    }
});

document.getElementById('prev-btn').onclick = () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion(questions[currentQuestionIndex]);
    }
};