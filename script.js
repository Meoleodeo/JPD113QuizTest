document.addEventListener('DOMContentLoaded', function () {
    // Load data from JSON file
    fetch('kana_data.json')
        .then(response => response.json())
        .then(data => {
            const hiragana = data.hiragana;
            const katakana = data.katakana;
            const kanji = data.kanji;

            // Event listeners for quiz buttons
            document.getElementById('hiragana-btn').addEventListener('click', () => startQuiz(shuffleArray(hiragana)));
            document.getElementById('katakana-btn').addEventListener('click', () => startQuiz(shuffleArray(katakana)));
            document.getElementById('kanji-btn').addEventListener('click', () => startKanjiQuiz(shuffleArray(kanji)));
        });

    const questionContainer = document.getElementById('question-container');
    const questionElement = document.getElementById('question');
    const answerInput = document.getElementById('answer-input');
    const submitAnswerButton = document.getElementById('submit-answer');
    const showAnswerButton = document.getElementById('show-answer');
    const goBackButton = document.getElementById('go-back');
    const nextContainer = document.getElementById('next-container');
    const nextButton = document.getElementById('next-btn');
    const feedbackElement = document.createElement('div');
    feedbackElement.id = 'feedback';
    questionContainer.appendChild(feedbackElement);

    let currentQuestionIndex = 0;
    let currentQuizSet = [];
    let answerShown = false; // Variable to track if the answer was shown

    // Function to shuffle the quiz questions
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Start quiz function
    function startQuiz(quizSet) {
        currentQuizSet = quizSet;
        currentQuestionIndex = 0;
        document.getElementById('quiz-options').classList.add('hide');
        questionContainer.classList.remove('hide');
        nextContainer.classList.remove('hide');
        answerInput.classList.remove('hide');
        submitAnswerButton.classList.remove('hide');
        showAnswerButton.classList.remove('hide');
        goBackButton.classList.remove('hide');
        showQuestion(currentQuizSet[currentQuestionIndex]);
        feedbackElement.innerText = '';
    }

    // Show question
    function showQuestion(question) {
        questionElement.innerText = question.character;
        answerInput.value = '';  // Clear the input field
        answerInput.focus();
        feedbackElement.innerText = ''; // Clear previous feedback
        answerShown = false; // Reset the answer shown flag
    }

    // Event listener for submit answer button
    submitAnswerButton.addEventListener('click', submitAnswer);

    // Event listener for Enter key to submit answer
    answerInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            submitAnswer();
        }
    });

    // Submit answer function
    function submitAnswer() {
        const userAnswer = answerInput.value.trim().toLowerCase();
        const correctAnswer = currentQuizSet[currentQuestionIndex].romaji;

        if (userAnswer === correctAnswer) {
            feedbackElement.innerText = 'Correct!';
            feedbackElement.classList.remove('wrong');
            feedbackElement.classList.add('correct');
        } else {
            feedbackElement.innerText = 'Try again!';
            feedbackElement.classList.remove('correct');
            feedbackElement.classList.add('wrong');
            answerInput.value = '';  // Clear the input field to try again
            answerInput.focus();
        }
    }

    // Event listener for show answer button
    showAnswerButton.addEventListener('click', () => {
        if (!answerShown) {
            const correctAnswer = currentQuizSet[currentQuestionIndex].romaji;
            feedbackElement.innerText = `The correct answer is: ${correctAnswer}`;
            feedbackElement.classList.remove('wrong');
            feedbackElement.classList.add('correct');
            answerShown = true;  // Mark that the answer was shown
        }
    });

    // Event listener for next button to go to the next question
    nextButton.addEventListener('click', () => {
        if (currentQuestionIndex < currentQuizSet.length - 1) {
            currentQuestionIndex++;
            showQuestion(currentQuizSet[currentQuestionIndex]);
        } else {
            feedbackElement.innerText = 'Quiz finished!';
            resetQuiz();
        }
    });

    // Reset the quiz after finishing
    goBackButton.addEventListener('click', resetQuiz);

    function resetQuiz() {
        document.getElementById('quiz-options').classList.remove('hide');
        questionContainer.classList.add('hide');
        nextContainer.classList.add('hide');
        answerInput.classList.add('hide');
        submitAnswerButton.classList.add('hide');
        showAnswerButton.classList.add('hide');
        goBackButton.classList.add('hide');
    }
});
