document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const score = urlParams.get('score');
    const total = urlParams.get('total');
    const time = urlParams.get('time');
    const userAnswers = JSON.parse(urlParams.get('answers'));
    const selectedGroup = urlParams.get('group');

    if (score !== null && total !== null && time !== null && userAnswers !== null && selectedGroup !== null) {
        fetchQuestions(selectedGroup)
            .then(() => {
                displayResults(score, total, time, userAnswers);
            })
            .catch(error => {
                console.error('Error fetching questions:', error);
                document.getElementById('results-summary').innerHTML = `<p>Error loading questions: ${error.message}. Please try again.</p>`;
            });
    } else {
        document.getElementById('results-summary').innerHTML = `<p>Error: Missing query parameters. Please complete a quiz and try again.</p>`;
    }
});

function fetchQuestions(group) {
    return fetch(`questions/group${group}.json`)
        .then(response => response.json())
        .then(data => {
            window.questions = data;
        });
}

function displayResults(score, total, time, userAnswers) {
    const resultsSummary = document.getElementById('results-summary');
    resultsSummary.innerHTML = `
        <p>Your Score: ${score} / ${total}</p>
        <p>Time Taken: ${Math.floor(time / 60)} minutes ${time % 60} seconds</p>
    `;

    const questionReview = document.getElementById('question-review');
    questionReview.innerHTML = window.questions.map((question, index) => {
        const userAnswer = userAnswers[index];
        const correctAnswer = question.answer;
        const isCorrect = userAnswer === correctAnswer;
        return `
            <div class="mb-4">
                <h3 class="text-lg font-semibold">${question.question}</h3>
                <p>Your Answer: ${question['choice' + userAnswer]} (${isCorrect ? 'Correct' : 'Incorrect'})</p>
                ${!isCorrect ? `<p>Correct Answer: ${question['choice' + correctAnswer]}</p>` : ''}
            </div>
        `;
    }).join('');
}

function retakeQuiz() {
    window.location.href = 'quiz.html?group=' + getUrlParameter('group');
}

function chooseAnotherGroup() {
    window.location.href = 'index.html';
}

function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}
