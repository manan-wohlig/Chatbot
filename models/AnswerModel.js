import Answer from "../mongooseModel/Answers.js";
import mongoose from "mongoose";
import SerpApi from "google-search-results-nodejs";
import "dotenv/config";
const search = new SerpApi.GoogleSearch(process.env.SerpApi_KEY);

export default {
  check: async (data) => {
    let que = await Answer.find({ question: data });
    if (Object.keys(que).length === 0) {
      search.json({ q: data }, async (result) => {
        let storeData = new Answer({
          _id: new mongoose.Types.ObjectId(),
          question: data,
          answer: result.knowledge_graph.description,
        });
        console.log(result);
        console.log(storeData);
        await storeData.save();
        return storeData.answer;
      });
    } else {
      console.log(que[0].answer);
      return que[0].answer;
    }
  },
};
