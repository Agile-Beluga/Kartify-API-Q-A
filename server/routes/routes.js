const router = require('express').Router();
const controllers = require('../controllers/index.js');

// QUESTIONS:
// Get all questions
router.get('/qa/:product_id', controllers.questions.get);
// Add a question
router.post('/qa/:product_id', controllers.questions.post);
// Mark a question as helpful
router.put('/qa/question/:question_id/helpful', controllers.questions.putHelpful);
// Report a question
router.put('/qa/question/:question_id/report', controllers.questions.putReport);

// ANSWERS
// Get list of answers
router.get('/qa/:question_id/answers', controllers.answers.get);
// Add an answer
router.post('/qa/:question_id/answers', controllers.answers.post);
// Mark answer as helpful
router.put('/qa/answer/:answer_id/helpful', controllers.answers.putHelpful);
// Report an answer
router.put('/qa/answer/:answer_id/report', controllers.answers.putReport);

module.exports = router;