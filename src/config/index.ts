import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const config = {
    connection_str: process.env.CONNECTED_STR,
    port: process.env.PORT,
    jwtToken: process.env.JWT_SECRET
}

export default config;