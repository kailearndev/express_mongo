"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserByid = exports.deleteUserByid = exports.createUser = exports.getUserById = exports.getUserBySession = exports.getUserByEmail = exports.getUsers = exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    authentication: {
        password: {
            type: String, required: true, select: true
        },
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false },
    }
});
exports.UserModel = mongoose_1.default.model('User', UserSchema);
const getUsers = () => exports.UserModel.find();
exports.getUsers = getUsers;
const getUserByEmail = (email) => exports.UserModel.findOne({ email });
exports.getUserByEmail = getUserByEmail;
const getUserBySession = (sessionToken) => exports.UserModel.findOne({
    'authentication.sessionToken': sessionToken
});
exports.getUserBySession = getUserBySession;
const getUserById = (id) => exports.UserModel.findById(id);
exports.getUserById = getUserById;
const createUser = (values) => new exports.UserModel(values).save().then((user) => user.toObject());
exports.createUser = createUser;
const deleteUserByid = (id) => exports.UserModel.findByIdAndDelete({ _id: id });
exports.deleteUserByid = deleteUserByid;
const updateUserByid = (id, values) => exports.UserModel.findByIdAndUpdate(id, values);
exports.updateUserByid = updateUserByid;
