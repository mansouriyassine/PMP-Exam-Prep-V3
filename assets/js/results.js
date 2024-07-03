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
        if (userAnswers[currentQuestionIndex] === index + 1) {
            button.classList.add('bg-gray-300');
        }
        choicesContainer.appendChild(button);
    });
    updateNavigationButtons();
    updateProgressBar();
}

function selectAnswer(selectedIndex) {
    const choicesContainer = document.getElementById('choices');
    const choiceButtons = choicesContainer.getElementsByTagName('button');
    Array.from(choiceButtons).forEach(button => {
        button.classList.remove('bg-gray-300');
    });

    choiceButtons[selectedIndex].classList.add('bg-gray-300');

    userAnswers[currentQuestionIndex] = selectedIndex + 1;
    updateNavigationButtons();
}

function updateNavigationButtons() {
    document.getElementById('prev-button').disabled = currentQuestionIndex === 0;
    document.getElementById('next-button').disabled = currentQuestionIndex === questions.length - 1 || userAnswers[currentQuestionIndex] === null;
}

function updateProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    progressBar.style.width = `${((currentQuestionIndex + 1) / questions.length) * 100}%`;
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion(questions[currentQuestionIndex]);
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion(questions[currentQuestionIndex]);
    }
}

function startTimer() {
    timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endQuiz();
        } else {
            timeLeft--;
            updateTimerDisplay();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('timer').textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function endQuiz() {
    clearInterval(timerInterval);
    const score = calculateScore();
    document.getElementById('quiz-container').innerHTML = `<p>Your score is ${score}/${questions.length}</p>`;
}

function calculateScore() {
    let score = 0;
    questions.forEach((question, index) => {
        if (userAnswers[index] === question.correctAnswer) {
            score++;
        }
    });
    return score;
}

// Event listeners for navigation buttons
document.getElementById('next-button').addEventListener('click', nextQuestion);
document.getElementById('prev-button').addEventListener('click', prevQuestion);

// Fetch questions based on URL parameter
const group = getUrlParameter('group');
fetchQuestions(group);
