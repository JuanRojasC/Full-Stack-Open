require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Phone = require('./models/Phone');

const app = express();
app.use(express.json());
app.use(express.static('build'));
app.use(cors());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

let lastResults = [];

// GET List from database step1 (3.13)
app.get('/api/persons', (request, response) => {
  Phone.find({}).then((result) => {
    response.send(result);
    lastResults = result;
  });
});

// GET List length (3.2)
app.get('/info', (request, response) => {
  const html = `
  <p>Phonebook has info for ${lastResults.length} people</p>
  <p>${new Date()}</p>`;
  response.send(html);
});

// GET Single phonebook step6 (3.18*)
app.get('/api/persons/:id', (request, response, next) => {
  Phone.findById(request.params.id)
    .then((result) => response.json(result))
    .catch((error) => next(error));
});

// DELETE Single phonebook from database step3 (3.15)
app.delete('/api/persons/:id', (request, response, next) => {
  Phone.findByIdAndDelete(request.params.id)
    .then(() => response.status(204).end())
    .catch((error) => next(error));
});

// SAVE into database step7 with validations (3.19*)
app.post('/api/persons', (request, response, next) => {
  const { body } = request;
  if (!body) {
    return response.status(400).json({ error: 'Content Missing' });
  } if (!body.name) {
    return response.status(400).json({ error: 'name is Missing' });
  } if (!body.number) {
    return response.status(400).json({ error: 'number is Missing' });
  }
  Phone.exists({ name: body.name }, (error, result) => {
    if (result) {
      response.status(400).json({ error: 'This name already exists' });
    } else {
      const phone = new Phone({ name: body.name, number: body.number });
      phone.save()
        .then((resultSave) => {
          lastResults = lastResults.concat(resultSave);
          response.json(resultSave);
        })
        .catch((errorSave) => next(errorSave));
    }
  });
  return response;
});

// POST for get Single phonebook by name (3.20*)
app.post('/api/persons/name', (request, response) => {
  const { name } = request.body;
  Phone.exists({ name }, (error, result) => {
    response.json({ _id: result ? result._id : null });
  });
});

// UPDATE phone number with validation step8 (3.20*)
app.put('/api/persons/:id', (request, response, next) => {
  const { body } = request;
  const { id } = request.params;
  if (!body) {
    return response.status(400).json({ error: 'Content Missing' });
  } if (!body.name) {
    return response.status(400).json({ error: 'name is Missing' });
  } if (!body.number) {
    return response.status(400).json({ error: 'number is Missing' });
  }
  const phone = { name: body.name, number: body.number };
  Phone.findByIdAndUpdate(id, phone, { new: true, runValidators: true, context: 'query' })
    .then((result) => response.json(result))
    .catch((error) => next(error));
  return response;
});

// MORGAN (3.7)
morgan((tokens, req, res) => [
  tokens.method(req, res),
  tokens.url(req, res),
  tokens.status(req, res),
  tokens.res(req, res, 'content-length'),
  tokens['response-time'](req, res),
  'ms',
  tokens.body(req, res)].join(' '));

// MORGAN TOKENS (3.8)
morgan.token('body', (req) => JSON.stringify(req.body));

// HEROKU
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  /* eslint no-console: ["error", { allow: ["log"] }] */
  console.log(`running in PORT ${PORT}`);
});

// UNKNOWN ENDPOINT(3.16)
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

// ERROR HANDLER (3.16)
const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }
  return next(error);
};

app.use(errorHandler);
