const axios = require('axios');
const xml2js = require('xml2js');

// by default, xml2js makes everything into array, so turn off
const parser = xml2js.Parser({ explicitArray: false });
function goodreadsService() {
  function getBookById(id) {
    return new Promise((resolve, reject) => {
      axios.get(`insert api key here w/ ${id} goodread disabled their api :(`)
        .then((response) => {
          parser.parseString(response.data, (err, result) => {
            if (err) {
              console.log(err); // eslint-disable-line
            } else {
              console.log(result); // eslint-disable-line
              resolve(result.GoodreadsResponse.book);
            }
          });
        })
        .catch((error) => {
          reject(error);
          console.log(error); // eslint-disable-line
        });
      resolve({ description: 'our description' });
    });
  }
  return { getBookById };
}

module.exports = goodreadsService();
