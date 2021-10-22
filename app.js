const express = require("express");

const userRoutes = require('./user-routes');

const PORT = 4000;

const app = express();

// Route config middleware
app.use('/', userRoutes);

app.listen(PORT, () => console.log(`Server up and running at port ${PORT}`));
