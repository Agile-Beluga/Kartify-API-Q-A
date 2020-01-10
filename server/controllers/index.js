const models = require('../models/index.js');

module.exports = {
  questions: {
    get: (req, res) => {
      const id = req.params.product_id;
      let response = {
        product_id: id,
        results: []
      };

      models.questions.findAll(id)
      .then(({rows:questions}) => {
        response.results = questions;
        if (questions.length === 0) {
          res.json(response);
        }
      
        let questionsDone = 0;
        let totalAnswers = 0;
        let answersDone = 0;
        for (let question of questions) {
          question.answers = {};
          models.answers.findAllAnswers(question.question_id)
          .then(({rows:answers}) => {
            questionsDone += 1;
            totalAnswers += answers.length;
            if (questionsDone === questions.length && totalAnswers === 0) {
              res.json(response);
            }
            for (let answer of answers) {
              question.answers[answer.id] = answer;
              question.answers[answer.id].photos = [];
              models.answers.findAnswerPhotos(answer.id)
              .then(({rows:photos}) => {
                answersDone += 1;
                for (let photo of photos) {
                  answer.photos.push(photo.url);
                }
                if (answersDone === totalAnswers && questionsDone === questions.length) {
                  res.json(response);
                } 
              })
              .catch(e => {
                console.error(e);
                res.sendStatus(404);
              })
            }
          })
          .catch(e => {
            console.error(e);
            res.sendStatus(404);
          })
        }
      })
      .catch(e => {
        console.error(e);
        res.sendStatus(404);
      })
    },
    post: (req, res) => {
      const id = req.params['product_id'];
      const question = req.body;

      models.questions.add(id, question)
      .then(() => {
        res.sendStatus(201);
      })
      .catch(e =>{
        res.sendStatus(500);
        console.error(e);
      });
    },
    putHelpful: (req, res) => {
      const id = parseInt(req.params.question_id);

      models.questions.markAsHelpful(id)
      .then(() => res.sendStatus(204))
      .catch(e => {
        res.sendStatus(500);
        console.error(e);
      });
    },
    putReport: (req, res) => {
      const id = parseInt(req.params.question_id);

      models.questions.report(id)
      .then(() => res.sendStatus(204))
      .catch(e => {
        res.sendStatus(500);
        console.error(e);
      });
    }
  },

  answers: {
    get: (req, res) => {
      const id = req.params.question_id;
      const response = {
        question: id,
        page: 0,
        count: 0,
        results: []
      };
      models.answers.findAllAnswers(id)
      .then(({rows:answers}) => {
        response.count = answers.length;

        for (let answer of answers) {
          answer['answer_id'] = answer.id;
          delete answer.id;
          response.results.push(answer);
        }
        res.json(response);
      })
      .catch(e => {
        res.sendStatus(404);
        console.error(e);
      })
    },
    post: (req, res) => {
      const id = parseInt(req.params.question_id);
      const answer = req.body;

      models.answers.add(id, answer)
      .then(({rows}) => models.answers.addPhotos(rows[0].id, answer.photos))
      .then(() => res.sendStatus(201))
      .catch(e => {
        res.sendStatus(500)
        console.error(e)
      });
    },
    putHelpful: (req, res) => {
      const id = req.params.answer_id;

      models.answers.markAsHelpful(id)
      .then(() => res.sendStatus(204))
      .catch(e => console.error(e));
    },
    putReport: (req, res) => {
      const id = parseInt(req.params.answer_id);

      models.answers.report(id)
      .then(() => res.sendStatus(204))
      .catch(e => {
        res.sendStatus(500);
        console.error(e);
      });
    }
  }
};