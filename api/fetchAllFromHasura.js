const fetch = require('node-fetch');

const operationsDoc = `
query MyQuery {
  chicken_shop {
    id
    name
  }
}`;

const fetchGraphQL = async (operationsDoc, operationName, variables) => {
  const result = await fetch(
    process.env.HASURA_URL,
    {
      method: "POST",
      body: JSON.stringify({
        query: operationsDoc,
        variables: variables,
        operationName: operationName
      }),
      headers: {
        'Content-Type': 'application/json',
        'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET
      }
    }
  );
  const json = await result.json();
  const { chicken_shop } = json.data;
  return chicken_shop;
}


const fetchAllFromHasura = () => {
  return fetchGraphQL(
    operationsDoc,
    "MyQuery",
    {}
  );
}

module.exports = { fetchAllFromHasura }