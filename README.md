# PMP Exam Prep Quiz
## Description

This project is a web-based quiz application designed to help aspiring Project Management Professionals (PMP) prepare for their certification exam. It provides a series of multiple-choice questions across various project management topics, allowing users to test their knowledge and practice for the PMP exam.
Features

Multiple question groups to cover different aspects of project management
Randomized question order for varied practice sessions
Immediate feedback on correct and incorrect answers
Score calculation and display at the end of each quiz
Option to restart the quiz and try again

# Installation

Clone the repository:
git clone https://github.com/mansouriyassine/PMP-Exam-Prep.git

Navigate to the project directory:
cd PMP-Exam-Prep

No additional installation is required as this is a client-side application.

## Usage

Start a local server in the project directory. You can use Python's built-in HTTP server:

python -m http.server 8000

or if you're using Python 3:

python3 -m http.server 8000

Open a web browser and go to:
http://localhost:8000

You will see the main page with different question groups. Click on a group to start the quiz.
Answer the questions by clicking on your chosen option. You will receive immediate feedback on whether your answer is correct or incorrect.
After completing all questions in a group, you will see your final score.
You can restart the quiz or go back to the main page to select a different question group.

## Project Structure

- index.html: The main page with links to different question groups
- quiz.html: The page where the quiz is displayed and taken
- results.html: Displays the quiz results
- assets/css/quiz.css: Styling for the quiz
- assets/js/quiz.js: JavaScript file handling quiz logic
- questions/: Directory containing JSON files with quiz questions for each group

## Contributing
Contributions to improve the quiz or add more questions are welcome. Please follow these steps:

Fork the repository
Create a new branch (git checkout -b feature/AmazingFeature)
Make your changes
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request

## License
This project is open source and available under the MIT License.
Contact : https://github.com/mansouriyassine
Project Link: https://github.com/mansouriyassine/PMP-Exam-Prep

## Acknowledgments

PMP is a registered mark of the Project Management Institute, Inc.
Questions are based on the PMP Examination Content Outline
Thanks to all contributors who have helped to create and improve this project