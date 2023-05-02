const express = require("express");
const cors = require("cors");
const { connection } = require("./Config/db");
const { userRouter } = require("./Routes/User.route");
const { socialRouter } = require("./Routes/Social.route");
const { Auth } = require('./Middleware/Auth');
const app = express();
app.use(express.json());
app.use(cors());

app.use("/users", userRouter);
app.use(Auth);
app.use("/posts", socialRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connect to DB!!");
    console.log(`Server running on port ${process.env.PORT}`);
  } catch (error) {
    console.log(error);
    console.log("Something wrong!!");
  }
});
