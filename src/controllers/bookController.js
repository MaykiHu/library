const { MongoClient, ObjectID } = require('mongodb');

function bookController(bookService, nav) {
  function getIndex(req, res) {
    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryApp';

    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        console.log('Connected correctly to server'); // eslint-disable-line

        const db = client.db(dbName);

        const col = await db.collection('books');

        const books = await col.find().toArray();

        res.render(
          'bookListView',
          {
            nav,
            title: 'Library',
            books,
          },
        );
      } catch (err) {
        console.log(err.stack); // eslint-disable-line
      }
      client.close();
    }());
  }

  function getById(req, res) {
    const { id } = req.params;
    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryApp';

    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        console.log('Connected correctly to server'); // eslint-disable-line

        const db = client.db(dbName);

        const col = await db.collection('books');

        const book = await col.findOne({ _id: new ObjectID(id) });
        console.log(book); // eslint-disable-line

        book.details = await bookService.getBookById(book.bookId);
        res.render(
          'bookView',
          {
            nav,
            title: 'Library',
            book,
          },
        );
      } catch (err) {
        console.log(err.stack); // eslint-disable-line
      }
    }());
  }

  function middleware(req, res, next) {
    //if (req.user) {
    next();
    //} else {
    // res.redirect('/');
    // }
  }

  return {
    getIndex,
    getById,
    middleware,
  };
}

module.exports = bookController;
