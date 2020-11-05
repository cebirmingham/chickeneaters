/* Todo
    - icons for delivery and drunk reviews
    - handle null values (i.e. if no sauces/drinks ordered. can comment on available selection
    - put up on heroku
    - actual reviews in db
)*/

const express = require('express');
const logger = require('morgan');
const dotenv = require('dotenv');
const knex = require('knex');
const axios = require('axios');
const bodyParser = require('body-parser')
const tempData = require("./temp-data/reviews.json");
const expressHandlebars = require('express-handlebars');
const { sendToNeo } = require('./api/sendToNeo');
const { fetchFromNeo } = require('./api/fetchFromNeo');

dotenv.config();
const app = express();
const database = knex({
    client: 'pg',
    connection: process.env.DATABASE_URL || 'postgres://localhost:5432/chickeneaters'
})

app.use(bodyParser.json());

app.engine('hbs', expressHandlebars({
    defaultLayout: 'main',
    extname: '.hbs'
}));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.static(__dirname + '/static'));

app.get('/', async (req, res) => {
    const data = await fetchFromNeo()
    .catch(console.error);

    res.render('home', {
        title: "chickeneaters.",
        subtitle: "A guide for eaters of chicken.",
        mainImage: "/images/chicken1.jpg",
        reviews:data,
    });
});

app.get('/:slug', (req, res, next) => {
    const reviews = tempData.filter((review) => {
       return req.params.slug === review.slug;
    });
    const review = reviews[0];
    if (review) {
        res.render("review", {
            title: review.title,
            review: review,
            mainImage:"/images/reviews1.jpg"
        });
    }
    else{
        next();
    }
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: "about chickeneaters.",
        mainImage:"/images/chicken2.jpg"
    });
});

app.get('/admin/addReview', async (req, res) => {
    const host = process.env.NODE_ENV === 'production' ? 'https://chickeneaters.co.uk' : 'http://localhost:3000';
    res.render('admin/addReview', {
        review: {
            chickenPieceRating: 0,
            chickenWingRating: 0,
            fryRating: 0,
            sauceRating: 0,
            drinkRating: 0,
            overallRating: 0
        }
    });
});

app.post('/api/sendToNeo' , async (req, res) => {

    await sendToNeo(req.body)
        .catch(console.error);
})

app.get('/api/fetchFromNeo' , async (req, res) => {

    const data = await fetchFromNeo()
        .catch(console.error);
    res.json({
        data
    })
})

app.listen(process.env.PORT || 3000, () => {
    console.log('Listening on http://localhost:' + (process.env.PORT || 3000));
});
