import app from "./app";
import { runDb } from "./repositories/db";
import { config } from "./config";

const port = config.server.port;

const startApp = async () => {
  await runDb();

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

startApp();
