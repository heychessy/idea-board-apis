import app from "./app";
import { PORT } from "./config/config";
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
