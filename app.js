const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello, DevOps!');
});

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});