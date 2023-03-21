const express = require('express')
const router = new express.Router();

const { 
    surveyCount,
    surveyByEmail,
    surveyBySurveyId,
    surveyCompleted,
    surveyOngoing,
    createSurvey,
    surveyDraft
} 
= require('../controllers/survey_api')

router.get('/', (request, response) => {
    response.send("<h1>Welcome To Forms Home page</h1>")
})

router.get('/:email',surveyByEmail)
router.get('/count/:email',surveyCount)
router.get('/id/:_id',surveyBySurveyId)
router.get('/completed/:email',surveyCompleted)
router.get('/ongoing/:email',surveyOngoing)
router.get('/draft/:email',surveyDraft)

router.post('/',createSurvey)

module.exports = router;
