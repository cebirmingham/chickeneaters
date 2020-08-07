const neo4j = require('neo4j-driver')


async function sendToNeo(query) {
	// console.log('zzZZquery**************************************' , query);
	const { GRAPHENEDB_BOLT_USER, GRAPHENEDB_BOLT_PASSWORD, GRAPHENEDB_BOLT_URL} = process.env;

	console.log('env vars ' , GRAPHENEDB_BOLT_USER, GRAPHENEDB_BOLT_PASSWORD, GRAPHENEDB_BOLT_URL );

	const [piece, wing, fry, sauce, drink, overall] = query.chickenRange;
	console.log('piece', piece);


	const driver = neo4j.driver(GRAPHENEDB_BOLT_URL, neo4j.auth.basic(GRAPHENEDB_BOLT_USER, GRAPHENEDB_BOLT_PASSWORD),{ encrypted : true})
	const session = driver.session()
	const queryString = `CREATE (n:Review {title: 'Rooster House', comment: 'amazing, love a number 3'})  WITH n
	MERGE (r:ChickenShop {title: 'Rooster House'})
	MERGE (n)-[:REVIEWS]-(r)`

		const result = await session.run(queryString)
		.catch(error => {
			console.log('I AM THE ERROR' , error);
		});
		console.log('result ' , result);
		

		const singleRecord = result.records[0]
		const node = singleRecord.get(0)

		console.log(node.properties.name)
		await session.close()
	

	// on application exit:
	await driver.close()
}

module.exports = {
	sendToNeo
};