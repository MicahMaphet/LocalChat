"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = exports.ConfigService = void 0;
const config_1 = __importDefault(require("../config"));
class ConfigService {
    constructor({ _config = config_1.default } = {}) {
        this._config = config_1.default;
    }
    get() {
        return this._config;
    }
}
exports.ConfigService = ConfigService;
exports.Config = new ConfigService();
