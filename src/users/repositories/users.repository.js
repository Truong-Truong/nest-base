"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRepository = void 0;
var UsersRepository = /** @class */ (function () {
    function UsersRepository() {
    }
    UsersRepository.prototype.insertUser = function (userClear) {
        console.log('insert user', userClear);
        return userClear;
    };
    return UsersRepository;
}());
exports.UsersRepository = UsersRepository;
