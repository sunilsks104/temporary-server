require('dotenv').config();
const Airtable = require('airtable-node');

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base('appW0VK2cIUrc8gAC')
  .table('products');

exports.handler = async (event, context) => {
  console.log(event);
  const { id } = event.queryStringParameters;
  if (id) {
    const product = await airtable.retrieve(id);
    try {
      if (product.error) {
        return {
          header: {
            'Access-Control-Allow-Origin': '*',
          },
          statusCode: 404,
          body: 'No product with id ' + id,
        };
      }
    } catch (error) {
      return { statusCode: 500, body: 'Server Error' };
    }
    return {
      header: {
        'Access-Control-Allow-Origin': '*',
      },
      statusCode: 200,
      body: JSON.stringify(product),
    };
  }
  return {
    header: {
      'Access-Control-Allow-Origin': '*',
    },
    statusCode: 200,
    body: 'Please provide product id',
  };
};
