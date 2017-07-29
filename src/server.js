const path = require('path');
const bodyParser = require('body-parser');
const flatfile = require('flat-file-db');
const shortid = require('shortid');
const validate = require('jsonschema').validate;

const db = flatfile('./database/main.db');
const userSchema = {
  type: 'object',
  properties: {
    fullName: { type: 'string', minLength: 1 },
    description: { type: 'string', minLength: 1 },
    tags: { type: 'string' },
    contacts: { type: 'string'},
  },
  required: ['fullName', 'description'],
};

const routes = (app) => {
  app.post('/api/users', (req, res) => {
    const validateResult = validate(req.body, userSchema);
    if (validateResult.errors.length === 0) {
      const { fullName, description, tags, contacts } = req.body;
      const user = { id: shortid.generate(), fullName, description, tags, contacts };
      const users = db.get('/users') || [];
      users.push(user);
      db.put('/users', users, () => {
        res.send(user);
      });
    } else {
      const errors = validateResult.errors.map(error => (error.stack));
      res.status(400).send({ errors });
    }
  });

  app.get('/api/users', (req, res) => {
    const users = db.get('/users') || [];
    res.send(users);
  });
  
  
  app.put('/api/users/:userId', (req, res) => {
    const validateResult = validate(req.body, userSchema);
    if (validateResult.errors.length === 0) {
      const userId = req.params.userId;
      const { fullName, description, tags, contacts } = req.body;      
      const users = db.get('/users') || [];
      const user = users.filter(usr => usr.id == userId);
      Object.assign(user, { fullName, description, tags, contacts });
      db.put('/users', users, () => {
        res.send(user);
      });
    } else {
      const errors = validateResult.errors.map(error => (error.stack));
      res.status(400).send({ errors });
    }
  })
};

module.exports = function apiServer(app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  db.on('open', () => {
    console.log('db open');
    routes(app);
  });
};
