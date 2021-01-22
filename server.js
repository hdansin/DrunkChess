const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const { Chess } = new Chess();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/html/index.html'));
});

app.listen(port, () => {
  console.log(`Drunk Chess is listening at http://localhost:${port}`)
})
