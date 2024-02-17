const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON requests

// Placeholder for storing user favorites
const favorites = [];

// Endpoint for getting favorites
app.get('/api/user-favorites', (req, res) => {
  res.json(favorites);
});

// Endpoint for adding a favorite
app.post('/api/add-favorite', (req, res) => {
  const { id, name } = req.body;
  favorites.push({ id, name });
  res.json({ success: true, message: `${name} (#${id}) added to favorites` });
});

// Endpoint for removing a favorite
app.post('/api/remove-favorite', (req, res) => {
  const { id } = req.body;
  const index = favorites.findIndex((favorite) => favorite.id === id);
  if (index !== -1) {
    const removedFavorite = favorites.splice(index, 1)[0];
    res.json({ success: true, message: `${removedFavorite.name} (#${id}) removed from favorites` });
  } else {
    res.json({ success: false, message: `Favorite with id ${id} not found` });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// v14.21.3