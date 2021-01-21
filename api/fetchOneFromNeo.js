const neo4j = require('neo4j-driver')

async function fetchOneFromNeo(reviewId) {
  
  const { GRAPHENEDB_BOLT_USER, GRAPHENEDB_BOLT_PASSWORD, GRAPHENEDB_BOLT_URL} = process.env;
  const driver = neo4j.driver(GRAPHENEDB_BOLT_URL, neo4j.auth.basic(GRAPHENEDB_BOLT_USER, GRAPHENEDB_BOLT_PASSWORD),{ encrypted : true})
  
  const queryString = `MATCH (n:Review) WHERE n.id = '${reviewId}' RETURN n`;
  const session = driver.session()
  

	const result = await session.run(queryString)
		.catch(error => {
			console.log('Error fetching from Neo database: ' , error);
		});
	await session.close()

	// on application exit:
  await driver.close()

  return result.records[0]._fields[0].properties;
}

module.exports = {
  fetchOneFromNeo
};

