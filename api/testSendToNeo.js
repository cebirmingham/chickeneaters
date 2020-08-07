const neo4j = require('neo4j-driver')


async function sendToNeo() {

const driver = neo4j.driver('bolt://hobby-kcgkmndbhbhagbkelcedmpel.dbs.graphenedb.com:24787', neo4j.auth.basic('app107006927-9Pd9L5', 'b.8CKvujBRgG2P.GOZzj1eMAutfgIet'))
const session = driver.session()
const personName = 'Alice'

  const result = await session.run(
    'CREATE (a:Person {name: $name}) RETURN a',
    { name: personName }
  ).catch(e => {
    console.log('****************' , e);
  })
  console.log('****************result' , result);


  // const singleRecord = result.records[0]
  // const node = singleRecord.get(0)

  // console.log(node.properties.name)
  
  // await session.close()

// on application exit:
await driver.close()
}


sendToNeo();