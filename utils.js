// utils.js
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Create and expose shuffled questions
questions = shuffleArray((function() {
  // Create a deep copy of original questions
  const questionsCopy = JSON.parse(JSON.stringify(window.questions));
  
  // Shuffle question order
  shuffleArray(questionsCopy);
  
  // Shuffle options for each question and update answer index
  return questionsCopy.map(question => {
    const correctAnswer = question.options[question.answer];
    shuffleArray(question.options);
    return {
      ...question,
      answer: question.options.indexOf(correctAnswer)
    };
  });
})());
