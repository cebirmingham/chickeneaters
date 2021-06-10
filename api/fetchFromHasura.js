const fetch = require('node-fetch');

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
  return json;
}


const fetchFromHasura = operationsDoc => {
  return fetchGraphQL(
    operationsDoc,
    "MyQuery",
    {}
  );
}

module.exports = { fetchFromHasura }