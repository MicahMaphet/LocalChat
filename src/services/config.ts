import config from "../config";
import { ConfigType } from "../types/Config";

export class ConfigService {
    _config: ConfigType;

    constructor({ _config = config } = {}) {
        this._config = config;
    }

    public get() {
        return this._config;
    }
}

export const Config = new ConfigService();