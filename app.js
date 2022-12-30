const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(`${__dirname}/dist`));
// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`App listening to port ${PORT}.`));
