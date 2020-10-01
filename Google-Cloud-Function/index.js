/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.main = async (req, res) => {
  // Imports the Google Cloud client library
  const language = require('@google-cloud/language');
  const fetch = require('node-fetch');
  const CUSTOM_SEARCH_JSON_API = ""

  // Instantiates a client
  const client = new language.LanguageServiceClient();

  console.log(req);
  const { text } = req.body;

  const document = {
     content: text,
     type: 'PLAIN_TEXT',
  };
  try {
    // Detects the entities of the text
    const [result] = await client.analyzeEntities({document: document});
    const { entities } = result;
    // console.log(entities);
    const search = [];
    const valid_types = ['PERSON', 'LOCATION', 'ORGANIZATION', 'EVENT', 'OTHER'];
    entities.forEach(entity => {
      if (valid_types.includes(entity.type) && entity.salience >= .06) {
        search.push(entity.name);
      }
    });
    // sorry about this
    const key = "key=CUSTOM GOOGLE SEARCH API KEY";
    const cx = "&cx=CUSTOM GOOGLE SEARCH CX";
    const q = "&q=" + search.join("+");
    var url = CUSTOM_SEARCH_JSON_API + key + cx + q
    // console.log(url);
    const query = await fetch(url).then(res => res.json());
    const urls = [];
    query.items.forEach(item => {
      urls.push(item.link);
    })
    return res.status(200).json(urls.slice(0, 3));
  } catch (err) {
    return res.status(400).send(err.message);
  }
};
