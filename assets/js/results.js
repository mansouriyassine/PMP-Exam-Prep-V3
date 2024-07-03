document.addEventListener('DOMContentLoaded', function() {
    const score = getUrlParameter('score');
    const total = getUrlParameter('total');
    const time = getUrlParameter('time');
    const answers = JSON.parse(getUrlParameter('answers'));
    const group = getUrlParameter('group');

    document.getElementById('results-summary').innerHTML = `
        <p>Your score: ${score} out of ${total}</p>
        <p>Time taken: ${Math.floor(time / 60)} minutes ${time % 60} seconds</p>
    `;

    fetchQuestions(group).then(() => {
        displayQuestionReview(answers);
    });

    document.getElementById('retake-btn').addEventListener('click', retakeQuiz);
    document.getElementById('choose-group-btn').addEventListener('click', chooseAnotherGroup);
});

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
        })
        .catch(error => {
            console.error('Error fetching questions:', error);
            document.getElementById('results-summary').innerHTML = `<p>Error loading questions: ${error.message}. Please try again.</p>`;
        });
}

function displayQuestionReview(userAnswers) {
    const reviewContainer = document.getElementById('question-review');
    questions.forEach((question, index) => {
        const isCorrect = userAnswers[index] === question.answer;
        const answerText = isCorrect ? 'Correct' : `Incorrect (Correct answer: ${question[`choice${question.answer}`]})`;

        const questionElement = document.createElement('div');
        questionElement.className = 'mb-4';
        questionElement.innerHTML = `
            <h3 class="font-bold">${question.question}</h3>
            <p>Your answer: ${question[`choice${userAnswers[index]}`]} - <span class="${isCorrect ? 'text-green-600' : 'text-red-600'}">${answerText}</span></p>
        `;

        reviewContainer.appendChild(questionElement);
    });
}

function getUrlParameter(name) {
    name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

function retakeQuiz() {
    const group = getUrlParameter('group');
    window.location.href = `quiz.html?group=${group}`;
}

function chooseAnotherGroup() {
    window.location.href = 'index.html';
}
