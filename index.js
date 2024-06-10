const express = require("express");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");
// const bodyParser = require('body-parser')

const app = express();
app.use(express.json());
app.use(cors());

const prisma = new PrismaClient();

dotenv.config();
PORT = process.env.PORT || 3000;

console.log(process.env);

app.get("/users", async (req, res) => {
  try {
    const allUser = await prisma.user.findMany();
    console.log(`Fetching All User : ${JSON.stringify(allUser)}`);
    res.send(allUser);
  } catch (error) {
    console.error(error);
    res.send(error);
  }
});

app.get("/users/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const userDetail = await prisma.user.findUnique({
      where: {
        id: parseInt(userId),
      },
    });

    if (userDetail) {
      console.log(`user found: ${JSON.stringify(userDetail)}`);
      res.json(userDetail);
    } else {
      console.log("User not found");
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error(`Error : ${error.message}`);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Server are running on PORT : ${PORT}`);
});

// module.exports = app;

// "builds":[
//     {
//       "src":"package.json",
//       "use":"@now/node",
//       "config":{
//         "includeFiles": "prisma/**"
//       }
//     }
//   ],
//   "routes": [
//     {
//       "src":"/.",
//       "dest":"package.json"
//     }
//   ]
