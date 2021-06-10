/* Todo
    - icons for delivery and drunk reviews
    - handle null values (i.e. if no sauces/drinks ordered. can comment on available selection
)*/

const express = require('express');
const logger = require('morgan');
const dotenv = require('dotenv');
const bodyParser = require('body-parser')
const expressHandlebars = require('express-handlebars');
dotenv.config();
const { sendToHasura } = require('./api/sendToHasura');
const { fetchAllFromHasura } = require('./api/fetchAllFromHasura');
const { fetchReviewsFromHasura } = require('./api/fetchReviewsFromHasura');
const { fetchReviewFromHasura } = require('./api/fetchReviewFromHasura');



// Temporary code to secure live code
const lockEverythingDown = Boolean(process.env.LOCK_EVERYTHING_DOWN === 'true');

const app = express();

app.use(bodyParser.json());

app.engine('hbs', expressHandlebars({
    defaultLayout: 'main',
    extname: '.hbs'
}));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.static(__dirname + '/static'));

app.get('/', async (req, res) => {
    const data = await fetchReviewsFromHasura()
    .catch(console.error);

    res.render('home', {
        title: "chickeneaters.",
        subtitle: "A guide for eaters of chicken.",
        mainImage: "/images/chicken1.jpg",
        reviews:data,
    });
});

app.get('/review/:id', async (req, res, next) => {
    const review = await fetchReviewFromHasura(req.params.id);

    if (review) {
        res.render("review", {
            title: review[0].title,
            review: review[0],
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

if (lockEverythingDown !== true) {

    app.get('/admin/addReview', async (req, res) => {
        const host = process.env.NODE_ENV === 'production' ? 'https://chickeneaters.co.uk' : 'http://localhost:3000';
        const chickenShopList = await fetchAllFromHasura(req.body).catch(console.error);
        res.render('admin/addReview', {
            review: {
                chickenPieceRating: 0,
                chickenWingRating: 0,
                fryRating: 0,
                sauceRating: 0,
                drinkRating: 0,
                overallRating: 0
            },
            chickenShopList,
        });
    });

    app.post('/api/sendToHasura' , async (req, res) => {
        const data = await sendToHasura(req.body)
            .catch(console.error);
        res.json({
             data
        })
    })

    app.get('/api/fetchAllFromHasura' , async (req, res) => {
        const data = await fetchAllFromHasura(req.body)
        .catch(console.error);
    res.json({
         data
        })
    })
}

app.listen(process.env.PORT || 3000, () => {
    console.log('Listening on http://localhost:' + (process.env.PORT || 3000));
});
