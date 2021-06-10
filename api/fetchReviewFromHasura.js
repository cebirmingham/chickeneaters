const { fetchFromHasura } = require('./fetchFromHasura');

async function fetchReviewFromHasura(id) {
  const query = `
  query MyQuery {
    review(where: {id: {_eq: "${id}"}}) {
      id
      chicken_shop {
        name
      }
      comment
      drink_rating
      fry_rating
      overall_rating
      sauce_rating
      chicken_wing_rating
      chicken_shop_id
      chicken_piece_rating
    }
  }`;
  const result = await fetchFromHasura(query);
  //todo handle errors
  return result.data.review;
}

module.exports = {fetchReviewFromHasura}