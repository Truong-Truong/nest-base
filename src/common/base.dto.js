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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseDto = void 0;
var class_transformer_1 = require("class-transformer");
var BaseDto = function () {
    var _a;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _created_at_decorators;
    var _created_at_initializers = [];
    var _created_at_extraInitializers = [];
    var _created_by_decorators;
    var _created_by_initializers = [];
    var _created_by_extraInitializers = [];
    var _updated_at_decorators;
    var _updated_at_initializers = [];
    var _updated_at_extraInitializers = [];
    var _updated_by_decorators;
    var _updated_by_initializers = [];
    var _updated_by_extraInitializers = [];
    var _deleted_at_decorators;
    var _deleted_at_initializers = [];
    var _deleted_at_extraInitializers = [];
    return _a = /** @class */ (function () {
            function BaseDto() {
                this.id = __runInitializers(this, _id_initializers, void 0);
                this.created_at = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _created_at_initializers, void 0));
                this.created_by = (__runInitializers(this, _created_at_extraInitializers), __runInitializers(this, _created_by_initializers, void 0));
                this.updated_at = (__runInitializers(this, _created_by_extraInitializers), __runInitializers(this, _updated_at_initializers, void 0));
                this.updated_by = (__runInitializers(this, _updated_at_extraInitializers), __runInitializers(this, _updated_by_initializers, void 0));
                this.deleted_at = (__runInitializers(this, _updated_by_extraInitializers), __runInitializers(this, _deleted_at_initializers, void 0));
                __runInitializers(this, _deleted_at_extraInitializers);
            }
            BaseDto.plainToClass = function (obj) {
                return (0, class_transformer_1.plainToClass)(this, obj, { excludeExtraneousValues: true });
            };
            BaseDto.plainToInstance = function (obj) {
                return (0, class_transformer_1.plainToInstance)(this, obj);
            };
            return BaseDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _id_decorators = [(0, class_transformer_1.Expose)()];
            _created_at_decorators = [(0, class_transformer_1.Expose)()];
            _created_by_decorators = [(0, class_transformer_1.Expose)()];
            _updated_at_decorators = [(0, class_transformer_1.Expose)()];
            _updated_by_decorators = [(0, class_transformer_1.Expose)()];
            _deleted_at_decorators = [(0, class_transformer_1.Expose)()];
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
            __esDecorate(null, null, _created_at_decorators, { kind: "field", name: "created_at", static: false, private: false, access: { has: function (obj) { return "created_at" in obj; }, get: function (obj) { return obj.created_at; }, set: function (obj, value) { obj.created_at = value; } }, metadata: _metadata }, _created_at_initializers, _created_at_extraInitializers);
            __esDecorate(null, null, _created_by_decorators, { kind: "field", name: "created_by", static: false, private: false, access: { has: function (obj) { return "created_by" in obj; }, get: function (obj) { return obj.created_by; }, set: function (obj, value) { obj.created_by = value; } }, metadata: _metadata }, _created_by_initializers, _created_by_extraInitializers);
            __esDecorate(null, null, _updated_at_decorators, { kind: "field", name: "updated_at", static: false, private: false, access: { has: function (obj) { return "updated_at" in obj; }, get: function (obj) { return obj.updated_at; }, set: function (obj, value) { obj.updated_at = value; } }, metadata: _metadata }, _updated_at_initializers, _updated_at_extraInitializers);
            __esDecorate(null, null, _updated_by_decorators, { kind: "field", name: "updated_by", static: false, private: false, access: { has: function (obj) { return "updated_by" in obj; }, get: function (obj) { return obj.updated_by; }, set: function (obj, value) { obj.updated_by = value; } }, metadata: _metadata }, _updated_by_initializers, _updated_by_extraInitializers);
            __esDecorate(null, null, _deleted_at_decorators, { kind: "field", name: "deleted_at", static: false, private: false, access: { has: function (obj) { return "deleted_at" in obj; }, get: function (obj) { return obj.deleted_at; }, set: function (obj, value) { obj.deleted_at = value; } }, metadata: _metadata }, _deleted_at_initializers, _deleted_at_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.BaseDto = BaseDto;
