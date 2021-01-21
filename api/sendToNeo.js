const neo4j = require('neo4j-driver')
const { uuid } = require('uuidv4');

//TODO escape strings to allow apostrophes

async function sendToNeo(query) {
	const { GRAPHENEDB_BOLT_USER, GRAPHENEDB_BOLT_PASSWORD, GRAPHENEDB_BOLT_URL} = process.env;

	// Converting data
	// Before: [{name:'sauceRating',value:'2'}]
	// After: [{sauceRating: '2'}]
	const data = query.reduce((accumulator, row) => {
		accumulator[row.name] = row.value
		return accumulator
	},{})

	const {
		title,
		comments,
		chickenPieceRating,
		chickenWingRating,
		fryRating,
		sauceRating,
		drinkRating,
		overallRating,
	 } = data

	  const slug = title.replace(/\s+/g, '-').toLowerCase();
	  const id = uuid();

	const reviewData = `{
		title: '${title}',
		comment: '${comments}',
		chickenPieceRating: '${chickenPieceRating}',
		chickenWingRating: '${chickenWingRating}',
		fryRating: '${fryRating}',
		sauceRating: '${sauceRating}',
		drinkRating: '${drinkRating}',
		overallRating: '${overallRating}',
		slug: '${slug}',
		id: '${id}'
	}`

	const queryString = `CREATE (n:Review ${reviewData}) WITH n
		MERGE (r:ChickenShop {title: '${title}'})
		MERGE (n)-[:REVIEWS]-(r)`

	const driver = neo4j.driver(GRAPHENEDB_BOLT_URL, neo4j.auth.basic(GRAPHENEDB_BOLT_USER, GRAPHENEDB_BOLT_PASSWORD),{ encrypted : true})
	const session = driver.session()
	const result = await session.run(queryString)
		.catch(error => {
			console.log('Error updating Neo database: ' , error);
		});
	await session.close()

	// on application exit:
	await driver.close()
}

module.exports = {
	sendToNeo
};
