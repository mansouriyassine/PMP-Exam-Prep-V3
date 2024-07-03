let questions = [];
let userAnswers = [];

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
            displayResults();
        })
        .catch(error => {
            console.error('Error fetching questions:', error);
            document.getElementById('results-container').innerHTML = `<p>Error loading questions: ${error.message}. Please try again.</p>`;
        });
}

function displayResults() {
    const score = parseInt(getUrlParameter('score'));
    const total = questions.length;
    const timeTaken = parseInt(getUrlParameter('time'));
    userAnswers = JSON.parse(getUrlParameter('answers'));

    displaySummary(score, total, timeTaken);
    displayQuestionReview();
}

function displaySummary(score, total, timeTaken) {
    const summaryElement = document.getElementById('results-summary');
    const minutes = Math.floor(timeTaken / 60);
    const seconds = timeTaken % 60;
    const percentage = ((score / total) * 100).toFixed(2);

    summaryElement.innerHTML = `
        <h2 class="text-2xl font-bold mb-4">Quiz Summary</h2>
        <p>Score: ${score} out of ${total}</p>
        <p>Percentage: ${percentage}%</p>
        <p>Time taken: ${minutes} minutes ${seconds} seconds</p>
    `;
}

function displayQuestionReview() {
    const reviewElement = document.getElementById('question-review');
    reviewElement.innerHTML = '<h2 class="text-2xl font-bold mb-4">Question Review</h2>';

    questions.forEach((question, index) => {
        const userAnswer = userAnswers[index];
        const isCorrect = userAnswer === question.answer;
        
        const questionDiv = document.createElement('div');
        questionDiv.className = 'mb-4 p-4 border rounded';
        questionDiv.innerHTML = `
            <p class="font-bold">${index + 1}. ${question.question}</p>
            <p>Your answer: ${question[`choice${userAnswer}`]}</p>
            <p>Correct answer: ${question[`choice${question.answer}`]}</p>
            <p class="${isCorrect ? 'text-green-600' : 'text-red-600'}">${isCorrect ? 'Correct' : 'Incorrect'}</p>
        `;
        reviewElement.appendChild(questionDiv);
    });
}

function retakeQuiz() {
    window.location.href = `quiz.html?group=${getUrlParameter('group')}`;
}

function chooseAnotherGroup() {
    window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', function() {
    const group = getUrlParameter('group');
    if (group) {
        fetchQuestions(group);
    } else {
        document.getElementById('results-container').innerHTML = `<p>Error: No group specified. Please go back and select a question group.</p>`;
    }
});

// Make sure these functions are accessible globally
window.retakeQuiz = retakeQuiz;
window.chooseAnotherGroup = chooseAnotherGroup;