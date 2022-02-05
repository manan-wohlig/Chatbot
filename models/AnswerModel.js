import Answer from '../mongooseModel/Answers.js'
import mongoose from 'mongoose'
import SerpApi from 'google-search-results-nodejs'
const search = new SerpApi.GoogleSearch("fc33c641acf76c59fa38861b074206d2b1cab3587907106a42debf4804a16abc")


export default {
    check: async (data) => {
        let que = await Answer.find({ question: data })
        if (Object.keys(que).length === 0) {
            search.json ({"q": data}, async (result) => {
                let storeData = new Answer({
                    "question": data,
                    "answer": result
                })
                await storeData.save()
                return result;
            })
        } else {
            return que.answer;
        }
    }
}

