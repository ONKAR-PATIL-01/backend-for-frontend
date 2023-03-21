const axios = require('axios');
const { request } = require('express');


const Headers = {
    'x-tenant-id': '63f72bbaf9dfbe6751b8878c',
    'Content-Type': 'application/json'
}


//Get All Survey By Email Address..
const surveyByEmail = async (request, response) => {

    var surveyData;
    await axios.get('https://api.qa.gessa.io/cms/survey/?page=0&size=10'
        , {
            headers: Headers
        })
        .then(responseObj => {
            surveyData = responseObj.data.result.data;
        })
        .catch(error => {
            response.send(error);
        });

        completedSurvey = await total_Completed(surveyData, request.params.email);
        totalSurvey=await total_Survey(surveyData,request.params.email);
        draftSurvey=await total_Draft(surveyData,request.params.email);
        ongoingSurvey=await total_Ongoing(surveyData,request.params.email);
    
        response.status(200).json({
            totalSurvey:totalSurvey.length,
            totalOngoingSurvey: ongoingSurvey.length,
            totalDraftSurvey:draftSurvey.length,
            totalCompletedSurvey: completedSurvey.length,
            
            survey: totalSurvey
        });

}


//Get Survey By Survey ID...

const surveyBySurveyId = async (request, response) => {

    var surveyData;
    await axios.get('https://api.qa.gessa.io/cms/survey/?page=0&size=10'
        , {
            headers: Headers
        })
        .then(responseObj => {
            surveyData = responseObj.data.result.data;
        })
        .catch(error => {
            response.send(error);
        });
    surveyData = surveyData.filter(form => {
        return form._id == request.params._id;
    })
    response.status(200).json(surveyData);

}

//Get No of Survey of a user by its email
const surveyCount = async (request, response) => {

    var surveyData;
    await axios.get('https://api.qa.gessa.io/cms/survey/?page=0&size=10'
        , {
            headers: Headers
        })
        .then(responseObj => {
            surveyData = responseObj.data.result.data;
        })
        .catch(error => {
            response.send(error);
        });
    surveyData = surveyData.filter(form => {
        return form.email == request.params.email;
    })
    response.status(200).json({ "totalSurvey": surveyData.length });

}


//Get Total No of Completed Survey By Email 

const surveyCompleted = async (request, response) => {

    var surveyData;
    await axios.get('https://api.qa.gessa.io/cms/survey/?page=0&size=10'
        , {
            headers: Headers
        })
        .then(responseObj => {
            surveyData = responseObj.data.result.data;
        })
        .catch(error => {
            response.send(error);
        });


    completedSurvey = await total_Completed(surveyData, request.params.email);
    totalSurvey = await total_Survey(surveyData, request.params.email);
    draftSurvey = await total_Draft(surveyData, request.params.email);
    ongoingSurvey = await total_Ongoing(surveyData, request.params.email);

    response.status(200).json({
        totalSurvey: totalSurvey.length,
        totalOngoingSurvey: ongoingSurvey.length,
        totalDraftSurvey: draftSurvey.length,
        totalCompletedSurvey: completedSurvey.length,

        survey: completedSurvey
    });

}


//Get Total No of Ongoing Survey By Email

const surveyOngoing = async (request, response) => {

    var surveyData;
    await axios.get('https://api.qa.gessa.io/cms/survey/?page=0&size=10'
        , {
            headers: Headers
        })
        .then(responseObj => {
            surveyData = responseObj.data.result.data;
        })
        .catch(error => {
            response.send(error);
        });

    completedSurvey = await total_Completed(surveyData, request.params.email);
    totalSurvey = await total_Survey(surveyData, request.params.email);
    draftSurvey = await total_Draft(surveyData, request.params.email);
    ongoingSurvey = await total_Ongoing(surveyData, request.params.email);

    response.status(200).json({
        totalSurvey: totalSurvey.length,
        totalOngoingSurvey: ongoingSurvey.length,
        totalDraftSurvey: draftSurvey.length,
        totalCompletedSurvey: completedSurvey.length,

        survey: ongoingSurvey
    });

}




//Get Total No of Draft Survey By Email

const surveyDraft = async (request, response) => {

    var surveyData;
    await axios.get('https://api.qa.gessa.io/cms/survey/?page=0&size=10'
        , {
            headers: Headers
        })
        .then(responseObj => {
            surveyData = responseObj.data.result.data;
        })
        .catch(error => {
            response.send(error);
        });


    completedSurvey = await total_Completed(surveyData, request.params.email);
    totalSurvey = await total_Survey(surveyData, request.params.email);
    draftSurvey = await total_Draft(surveyData, request.params.email);
    ongoingSurvey = await total_Ongoing(surveyData, request.params.email);

    response.status(200).json({
        totalSurvey: totalSurvey.length,
        totalOngoingSurvey: ongoingSurvey.length,
        totalDraftSurvey: draftSurvey.length,
        totalCompletedSurvey: completedSurvey.length,

        survey: draftSurvey
    });

}


//Create a New Survey Form
const createSurvey = async (request, response) => {

    var surveyData;
    await axios.post('https://api.qa.gessa.io/cms/survey', request.body
        , {
            headers: Headers
        },)
        .then(responseObj => {
            surveyData = responseObj.data;
            console.log("Survey Created Successfully...")
        })
        .catch(error => {
            response.send(error);
        });

    response.status(200).json(surveyData);

}



module.exports = {
    surveyCount,
    surveyByEmail,
    surveyBySurveyId,
    surveyCompleted,
    surveyOngoing,
    surveyDraft,

    createSurvey
}




//Helper Functions
//1.

const total_Completed = async (surveyData, email) => {

    surveyData = await surveyData.filter(form => {

        if (form.email === email) {

            let expiry_date = (new Date(form.expiry_date));
            let current_date = new Date();
            return (current_date > expiry_date) && (form.draft!=="true")
        }
    })

    return surveyData;
}

//2.

const total_Ongoing = async (surveyData, email) => {

    surveyData = await surveyData.filter(form => {

        if (form.email === email) {

            let expiry_date = (new Date(form.expiry_date));
            let current_date = new Date();
            return (current_date <= expiry_date) && (form.draft!=="true");
        }
    })

    return surveyData;
}

//3.

const total_Draft = (surveyData, email) => {

    surveyData = surveyData.filter(form => {
        if(form.email===email)
            return form.draft === "true";
    })
    return surveyData;

}

//4.

const total_Survey = async (surveyData, email) => {

    surveyData = await surveyData.filter(form => {
        return form.email === email;
    })
    return surveyData;

}








/*

//Get All Survey
const getall = async (request, response) => {
    try {
        const result = await formsModel.find({});
        if (result.length <= 0)
            response.status(404).json({ message: "No Survey Found..." })
        else
            response.status(200).json({
                message: `Total ${result.length} Survey`,
                "Survey": result
            })
    } catch (error) {
        response.send(error)
    }
}

//Get Response By a Title/Name
const getSurvey = async (request, response) => {
    try {
        const userid = request.params.userid;
        const result = await formsModel.find({ userid: userid });
        if (result.length <= 0)
            response.status(404).json({ message: "No Survey Found..." })
        else
            response.status(200).json({
                message: `Total ${result.length} Survey`,
                "Survey": result
            })
    } catch (error) {
        response.send(error)
    }
}


//Get Single Survey of a User
const getIndivisualSurvey = async (request, response) => {
    try {
        const survey_id = request.params._id;
        const result = await formsModel.findOne({ _id: survey_id });
        if (result.length <= 0)
            response.status(404).json({ message: "No Survey Found..." })
        else
            response.status(200).json(result)
    } catch (error) {
        response.status(400).json({ message: "Something Went Wrong" })
    }
}

//Add new Response
const createSurvey = async (request, response) => {

    const { title, email, survey } = request.body;
    const existingUser = await userModel.findOne({ email: email })
    if (!existingUser) {
        response.status(403).json({ message: "You are not Authorized User" })
    }
    else {
        const existingSurvey = await formsModel.findOne({ userid: existingUser._id, title: title })
        if (!existingSurvey) {
            const result = await formsModel.create({
                userid: existingUser._id,
                title: title,
                email: email,
                survey: survey
            })
            result.save((error, doc) => {
                if (error)
                    response.send(error);
                else
                    response.status(201).json({
                        message: `Survey Created...`,
                        "Response": doc
                    })
            })
        }
        else {
            response.status(409).json({ message: "You have already Created Survey of same title..." })
        }

    }


}


//Update Survey
const updateSurvey = async (request, response) => {
    const { title, email, survey } = request.body;
    const updatedSurvey = {
        title: title,
        email: email,
        survey: survey
    }
    const id = request.params._id
    try {
        formsModel.findByIdAndUpdate(id, updatedSurvey, (error, doc) => {
            if (error) response.status(400).json(error)
            if (!doc)
                response.status(404).json({ message: "Survey Not Present in Database...." })
            else
                response.status(200).json({
                    message: `Following Survey Updated Succesfully...`,
                    "User": updatedSurvey
                })
        });

    } catch (error) {
        response.status(400).json({ message: "Something Went Wrong ..." })
    }

}



//Delete Survey by Survey_id(_id)
const deleteSurvey = async (request, response) => {

    const id = request.params._id;
    try {
        formsModel.findByIdAndDelete(id, (error, doc) => {
            if (error) response.status(400).json(error)
            if (!doc)
                response.status(404).json({ message: "Survey Not Present in Database...." })
            else {
                //We also deleted all responses releted to given survey ID
                responseModel.deleteMany({survey_id:id},(error,doc)=>{
                    console.log("All Responses Deleted for given Survey ID....")
                })

                response.status(200).json({
                    message: `Following Survey Deleted Succesfully...`,
                    "Survey": doc
                })

            }

        });

    } catch (error) {
        response.status(400).json({ message: "Something Went Wrong ...." })
    }
}


//Get Survey ID
const getSurveyID = async (request, response) => {
    try {
        const { title, email } = request.body;
        const result = await formsModel.findOne({ title: title, email: email });
        if (result.length <= 0)
            response.status(404).json({ message: "No Survey Found..." })
        else
            response.status(200).json({ "survey_id": result._id })
    } catch (error) {
        response.status(400).json({ message: "Something Went Wrong" })
    }
}
*/