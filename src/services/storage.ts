import { Collection, Db, MongoClient } from 'mongodb';
import { ConfigType } from '../types/Config';
import { MessageType } from '../types/Message';
import { UserType } from '../types/User';
import { Config, ConfigService } from './config';

class StorageService {
    client?: MongoClient;
    db?: Db;
    messages?: Messages;
    users?: Users;
    configService: ConfigService;

    constructor({ configService = Config } = {}) {
        this.configService = configService;
    }

    start(args: Partial<ConfigType> = {}): Promise<MongoClient> {
        return new Promise((resolve, reject) => {
            let options = Object.assign({}, this.configService.get(), args);
            let { dbUrl, dbHost, dbPort, dbName } = options;

            console.log(dbUrl);
            let attemptConnect = async () => {
                return MongoClient.connect(dbUrl);
            };

            let attemptConnectId = setInterval(async () => {
                try {
                    this.client = await attemptConnect();
                    this.db = this.client.db(dbName);
                    this.messages = new Messages(this.db);
                    this.users = new Users(this.db);

                    clearInterval(attemptConnectId);
                    resolve(this.client);
                } catch (err) {
                    clearInterval(attemptConnectId);
                    reject(new Error(`Failed to connect to database\n${err}`));
                }
            }, 2000);
        });
    }

    async stop() {
        if (this.client) {
            await this.client.close();
        }
    }
}

/**
 * Class for manipulating and reading the message data
 */
class Messages {
    collection: Collection
    constructor(db: Db) {
        this.collection = db.collection('messages');
    }
    /**
     * Add a message with a name and content to the messages database
     * 
     * @param {Object} param
     * @param {String} param.name
     * @param {String} param.content
     * {
     *   name: 'james',
     *   content: 'hello'
     * }
     */
    async add({ name, content }) {
        await this.collection.insertOne({ name, content });
    }

    /**
     * 
     * @returns json data of the database
     */
    async get() {
        const cursor = await this.collection.find();

        const messageJson = Array<MessageType>();
        for await (const m of cursor) {
            messageJson.push(
                { 
                    name: m.name,
                    content: m.content
                }
            );
        }
        return messageJson;
    }
}

/**
 * Class for manipulating and reading user data
 */
class Users {
    collection: Collection
    constructor(db: Db) {
        this.collection = db.collection('users');
    }

    /**
     * Adds a name to the users database
     * 
     * @param {*} name
     */
    async add(name: string) {
        await this.collection.insertOne({ name: name });
    }

    /**
     * Returns a list of users
     * 
     * @returns List of users
     */
    async get() {
        const cursor = await this.collection.find();

        const userJson = Array<UserType>();
        for await(const m of cursor) {
            userJson.push({ name: m.name });
        }

        return userJson;
    }
}

export let Storage = new StorageService();