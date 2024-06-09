const express = require("express");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");
// const bodyParser = require('body-parser')



const app = express();
app.use(express.json());

const prisma = new PrismaClient();

dotenv.config();
PORT = process.env.PORT;

app.get("/users", async (req, res) => {
  const allUser = await prisma.user.findMany();

  res.send(allUser);
});

app.get("/users/:id", async (req, res) => {
  const userId = req.params.id;

  const userDetail = await prisma.user.findUnique({
    where: {
      id: parseInt(userId)
    },
  });

  res.send(userDetail);
});

app.listen(PORT, () => {
  console.log(`Server are running on PORT : ${PORT}`);
});

module.exports = app;