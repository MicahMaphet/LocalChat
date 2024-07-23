import * as _ from 'lodash';
import { ConfigType } from "./types/Config";

function Config(): ConfigType {
    let config: ConfigType = {
        dbUrl: process.env.DB_URL || '',
        dbHost: process.env.DB_HOST || '127.0.0.1',
        dbName: process.env.DB_NAME || 'localchat',
        dbPort: process.env.DB_PORT || '27017'
    }

    let foundConfig = require('../../db.config.json');

    const mergeCopyArray = (objVal, srcVal) => (objVal instanceof Array ? srcVal : undefined);
    config = _.mergeWith(config, foundConfig, mergeCopyArray);

    return config;
};

export default Config();