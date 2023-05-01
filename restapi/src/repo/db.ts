import * as mongoDB from "mongodb";

let client:mongoDB.MongoClient

export async function connectToDatabase(connectionURL:string) {
    if(client) return client.db('lomap')
    client = new mongoDB.MongoClient(connectionURL);
    client =  await client.connect();
    return client.db('lomap')
}