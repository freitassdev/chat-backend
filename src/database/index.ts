import mongoose, { ConnectOptions } from "mongoose";
import colors from "colors";

class Database {
  constructor() {
  }
  public init() {
    this.connect();
  }

  private connect() {
    const MONGO_URI: string = process.env.MONGODB_ACCESS || "";

    mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
    } as ConnectOptions).then((resp) => {
        console.log(colors.bgGreen("[DATABASE] - Database connected"));
    }).catch((error) => {
        console.log(error);
    });
  }
}

export default Database;