import appDataSource from "./models/index.js";
import createApp from "./app.js";
import dotenv from "dotenv";
dotenv.config();

const startServer = async () => {
  const app = createApp();
  const PORT = process.env.PORT || 3000;

  await appDataSource
    .initialize()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`server is listen on port ${PORT}🟢`);
      });
    })
    .catch((err) => {
      console.log(`failed connect server❌`);
      console.error(err);
      appDataSource.destroy();
    });
};

startServer();
