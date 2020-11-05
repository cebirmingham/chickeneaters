const neo4j = require('neo4j-driver')


async function fetchFromNeo() {
  const { GRAPHENEDB_BOLT_USER, GRAPHENEDB_BOLT_PASSWORD, GRAPHENEDB_BOLT_URL} = process.env;

  const queryString = 'MATCH (n:Review) RETURN n';


  const driver = neo4j.driver(GRAPHENEDB_BOLT_URL, neo4j.auth.basic(GRAPHENEDB_BOLT_USER, GRAPHENEDB_BOLT_PASSWORD),{ encrypted : true})
	const session = driver.session()
	const result = await session.run(queryString)
		.catch(error => {
			console.log('Error fetching from Neo database: ' , error);
		});
	await session.close()

	// on application exit:
  await driver.close()

  const reviews = result.records.map(record => {
    console.log(record._fields[0].properties)
    return record._fields[0].properties
  });
  console.log({reviews});
  
  return reviews;
}

module.exports = {
  fetchFromNeo
};

