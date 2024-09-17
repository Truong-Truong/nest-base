"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
var common_1 = require("@nestjs/common");
var users_controller_1 = require("./users.controller");
var users_service_1 = require("./services/users.service");
var users_repository_1 = require("./repositories/users.repository");
var FB_CONFIG = {
    appId: 'Fb001',
    appSecret: 'Fb001-secret',
};
var appConfigEdited = function (config) {
    var newConfig = {
        appId: "new - ".concat(config.appId),
        appSecret: "new - ".concat(config.appSecret),
    };
    return newConfig;
};
var configLogger = function (appName) {
    return new common_1.Logger(appName);
};
var UserModule = function () {
    var _classDecorators = [(0, common_1.Module)({
            controllers: [users_controller_1.UsersController],
            providers: [
                users_service_1.UsersService,
                {
                    provide: 'APP_NAME',
                    useValue: 'LQT-USER',
                },
                {
                    provide: 'USER_REPOSITORY',
                    useClass: users_repository_1.UsersRepository,
                },
                {
                    provide: 'APP_FB_CONFIG',
                    useValue: FB_CONFIG,
                },
                {
                    provide: 'APP_FB_CONFIG_EDITED',
                    useFactory: appConfigEdited,
                    inject: [
                        // only inject token in provider
                        {
                            token: 'APP_FB_CONFIG',
                            optional: true,
                        },
                    ],
                },
                {
                    provide: 'MY_LOGGER',
                    useFactory: configLogger,
                    inject: [
                        {
                            token: 'APP_NAME',
                            optional: true,
                        },
                    ],
                },
            ],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var UserModule = _classThis = /** @class */ (function () {
        function UserModule_1() {
        }
        return UserModule_1;
    }());
    __setFunctionName(_classThis, "UserModule");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UserModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UserModule = _classThis;
}();
exports.UserModule = UserModule;
