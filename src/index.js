const express = require("express");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");

dotenv.config();

const app = express();
app.use(express.json());
const prisma = new PrismaClient()

PORT = process.env.PORT;

app.get('/users', async(req, res) => {
    const allUser = await prisma.user.findMany()

    res.send(allUser)
})

app.listen(PORT, () => {
  console.log(`Server are running on PORT : ${PORT}`);
});
