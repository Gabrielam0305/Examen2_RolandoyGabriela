// mongodb-config.js
const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://roloordonez2001:gTPsoE4t9Of7IMVC@examen2db.jnrq2f0.mongodb.net/';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch((error) => {
  console.error('Error connecting to MongoDB Atlas:', error);
});

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  date: { type: Date, default: Date.now }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;