import express from 'express';
const app = express();
import bodyParser from 'body-parser';
import AnswerModel from './models/AnswerModel.js'
import mongoose from 'mongoose'

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs")

app.get('/', (req, res) => {
    res.render("bot");
})

app.post("/", async (req, res) => {
    // let ans = req.body.question
    // console.log(ans)
    let ans = await AnswerModel.check(req.body.question)
    res.render("bot", {
        ans
    })
})

mongoose.connect('mongodb://Manan:stupefy@cluster0-shard-00-00.uloph.mongodb.net:27017,cluster0-shard-00-01.uloph.mongodb.net:27017,cluster0-shard-00-02.uloph.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-h6gkjp-shard-0&authSource=admin&retryWrites=true&w=majority', () => {
    console.log('Connected to database.')
})

app.listen(3000);