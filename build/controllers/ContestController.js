"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var decorators_1 = require("../decorators");
var error_1 = require("../utils/error");
var Contest_1 = require("../app/data/schema/Contest");
var date_fns_1 = require("date-fns");
var ContestRepository = require("../app/repository/ContestRepository");
var ContestController = /** @class */ (function () {
    function ContestController() {
    }
    ContestController.prototype.create = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var item, endDate, isGrandFinaleDateAfter, contest, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        item = req.body;
                        endDate = date_fns_1.addDays(item.startDate, item.duration);
                        if (item.contestType === Contest_1.ContestType.Offline) {
                            if (item.maxContestant === undefined || item.maxContestant < 1)
                                return [2 /*return*/, next(new error_1.InvalidContent('Invalid number of contestant to be selected', 400))];
                            isGrandFinaleDateAfter = date_fns_1.isAfter(new Date(1989, 6, 10), endDate);
                            if (!isGrandFinaleDateAfter) {
                                return [2 /*return*/, next(new error_1.InvalidContent('Grand finale date must be after end of contest', 400))];
                            }
                            if (!item.grandFinaleDate)
                                return [2 /*return*/, next(new error_1.InvalidContent('Please provide Grand finale event location.', 400))];
                            if (!item.evaluations)
                                return [2 /*return*/, next(new error_1.InvalidContent('Please provide Grand finale event location.', 400))];
                        }
                        return [4 /*yield*/, new ContestRepository().create(item)];
                    case 1:
                        contest = _a.sent();
                        return [2 /*return*/, res.status(201).json({
                                message: 'Operation successful',
                                data: contest
                            })];
                    case 2:
                        err_1 = _a.sent();
                        // TODO:: When this happens, create a schedule email to remind user of transaction
                        new error_1.InternalServerError('Internal Server error occured', 500);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ContestController.prototype.update = function () { };
    ContestController.prototype.delete = function () { };
    ContestController.prototype.fetch = function () { };
    ContestController.prototype.findById = function () { };
    __decorate([
        decorators_1.post('/'),
        decorators_1.requestValidators('title', 'information', 'eligibleCategories', 'eligibilityInfo', 'submissionRules', 'startDate', 'contestType', 'duration', 'redeemable'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], ContestController.prototype, "create", null);
    ContestController = __decorate([
        decorators_1.controller('/contests')
    ], ContestController);
    return ContestController;
}());
//# sourceMappingURL=ContestController.js.map