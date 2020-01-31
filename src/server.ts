import app from "./app";
import { PORT } from "./config/config";
import { logger } from "./config/winston";
app.listen(PORT, () => logger.info(`Listening on port ${PORT}`));
