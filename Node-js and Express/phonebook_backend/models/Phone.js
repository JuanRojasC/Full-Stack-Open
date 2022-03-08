const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

mongoose.connect(url)
  .then(() => {
    /* eslint no-console: ["error", { allow: ["log"] }] */
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    /* eslint no-console: ["error", { allow: ["log"] }] */
    console.log('error connecting to MongoDB:', error.message);
  });

const phoneSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: (v) => /^[0-9]{2,3}-\d*$/.test(v),
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: [true, 'User phone number required'],
  },
});

phoneSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    const result = returnedObject;
    result.id = result._id.toString();
    delete result._id;
    delete result.__v;
  },
});

// OWN MODULE (3.13)
module.exports = mongoose.model('Phone', phoneSchema);
