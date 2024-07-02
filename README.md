# PMP Exam Prep Quiz

## Description

This project is a web-based quiz application designed to help aspiring Project Management Professionals (PMP) prepare for their certification exam. It provides a series of multiple-choice questions across various project management topics, allowing users to test their knowledge and practice for the PMP exam.

## Features

- Multiple question groups to cover different aspects of project management
- Randomized question order for varied practice sessions
- Immediate feedback on selected answers
- Score calculation and display at the end of each quiz
- Option to restart the quiz and try again
- Timer to simulate real exam conditions

## Installation

### Clone the repository:

```bash
git clone https://github.com/mansouriyassine/PMP-Exam-Prep.git
```

Navigate to the project directory:

```bash
cd PMP-Exam-Prep
```

No additional installation is required as this is a client-side application.

## Usage

Start a local server in the project directory. You can use Python's built-in HTTP server:

```bash
python -m http.server 8000
```

or if you're using Python 3:

```bash
python3 -m http.server 8000
```

Open a web browser and go to:

```
http://localhost:8000
```

### Main Page:
You will see the main page with different question groups. Click on a group to start the quiz.

### Quiz Page:
Answer the questions by clicking on your chosen option. The selected answer will be highlighted in gray. You can navigate through the questions using the "Next" and "Previous" buttons. The "Next" button will change to "Finish" on the last question.

### Results Page:
After completing all questions in a group, you will see your final score, the time taken, and a review of each question with your selected answers.

### Restart or Select Another Group:
You can restart the quiz or go back to the main page to select a different question group.

## Project Structure

- `index.html`: The main page with links to different question groups
- `quiz.html`: The page where the quiz is displayed and taken
- `results.html`: Displays the quiz results
- `assets/css/app.css`: General styling for the application
- `assets/css/quiz.css`: Styling specific to the quiz page
- `assets/css/results.css`: Styling specific to the results page
- `assets/js/quiz.js`: JavaScript file handling quiz logic
- `assets/js/results.js`: JavaScript file handling the results display logic
- `questions/`: Directory containing JSON files with quiz questions for each group

## Future Improvements

- Improve the styling and user interface for a better user experience
- Add more question groups and questions
- Implement a feature to save progress and resume the quiz later
- Allow users to review their incorrect answers and provide explanations

## Contributing

Contributions to improve the quiz or add more questions are welcome. Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
5. Push to the branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Contact

- GitHub: [mansouriyassine](https://github.com/mansouriyassine)
- Project Link: [PMP Exam Prep](https://github.com/mansouriyassine/PMP-Exam-Prep)

## Acknowledgments

- PMP is a registered mark of the Project Management Institute, Inc.
- Questions are based on the PMP Examination Content Outline
- Thanks to all contributors who have helped to create and improve this project