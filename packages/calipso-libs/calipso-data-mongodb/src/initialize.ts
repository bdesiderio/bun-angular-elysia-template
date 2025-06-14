import { connect } from "mongoose";

export class MongoDBInitialize {

    static initialize(connection: string) {
        connect(connection);
    }
}