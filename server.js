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
const tempData = require("./temp-data/reviews.json")
const expressHandlebars = require('express-handlebars');

dotenv.config();
const app = express();
const database = knex({
    client: 'pg',
    connection: process.env.DATABASE_URL || 'postgres://localhost:5432/chickeneaters'
})

app.engine('hbs', expressHandlebars({
    defaultLayout: 'main',
    extname: '.hbs'
}));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.static(__dirname + '/static'));

app.get('/', (req, res) => {
    res.render('home', {
        title: "chickeneaters.",
        subtitle: "A guide for eaters of chicken.",
        mainImage: "/images/chicken1.jpg"
    });
});
app.get('/about', (req, res) => {
    res.render('about', {
        title: "about chickeneaters.",
        mainImage:"/images/chicken2.jpg"
    });
});
app.get('/reviews', (req, res) => {
    res.render('reviews', {
        title: "the chicken.",
        mainImage:"/images/reviews1.jpg",
        reviews:tempData
    });
});
app.get('/reviews/:slug', (req, res, next) => {
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
app.get('/admin/addReview', (req, res) => {
    res.render('admin/addReview');
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Listening on http://localhost:' + (process.env.PORT || 3000));
});
