import SibApiV3Sdk from 'sib-api-v3-sdk'

const NGC_LIST_ID = 22

exports.handler = async () => {
  const defaultClient = SibApiV3Sdk.ApiClient.instance

  // Configure API key authorization: api-key
  const apiKey = defaultClient.authentications['api-key']
  apiKey.apiKey = process.env.BREVO_API_KEY

  const contactApiInstance = new SibApiV3Sdk.ContactsApi()

  try {
    const data = await contactApiInstance.getList(NGC_LIST_ID)

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',

        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(data.totalSubscribers),
    }
  } catch (e) {
    return {
      statusCode: 404,
    }
  }
}
