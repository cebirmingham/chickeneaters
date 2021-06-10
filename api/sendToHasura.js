const fetch = require('node-fetch');


async function fetchGraphQL(operationsDoc, operationName, variables) {
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

  return await result.json();
}
//WE will need to generate this from form page in future 
const operationsDoc = `
  mutation MyMutation {
    insert_review(objects: {chicken_piece_rating: 10, chicken_shop_id: "2a20e55d-f0cf-4a9a-b9ea-857dc31a42f5", chicken_wing_rating: 10, comment: "best chicken ever no 2", drink_rating: 10, fry_rating: 10, overall_rating: 10, sauce_rating: 10}) {
      returning {
        id
        comment
      }
    }
  }
`;

function executeMyMutation() {
  return fetchGraphQL(
    operationsDoc,
    "MyMutation",
    {}
  );
}

async function fetchAllFromHasura() {
  const { errors, data } = await executeMyMutation();

  if (errors) {
    // handle those errors like a pro
    console.error(errors);
  }

  // do something great with this precious data
  console.log(data);
}

module.exports = { fetchAllFromHasura }

