"use strict";
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
var ContestEntryBusiness = require("../../../app/business/ContestEntryBusiness");
var ContestBusiness = require("../../../app/business/ContestBusiness");
var WalletBusiness = require("../../../app/business/WalletDataBusiness");
var VoteTransactionBusiness = require("../../../app/business/VoteTransactionBusiness");
var TransactionRequestBusiness = require("../../../app/business/TransactionRequestBusiness");
var date_fns_1 = require("date-fns");
var interfaces_1 = require("../../../app/models/interfaces");
var TransactionDTO_1 = require("../../../app/models/interfaces/custom/TransactionDTO");
var Helper_1 = require("../../lib/Helper");
var contestwinner_1 = require("../../emailtemplates/contestwinner");
var TemplatePlaceHolder_1 = require("../../lib/TemplatePlaceHolder");
var MailBusiness_1 = require("../../../app/business/MailBusiness");
var config = module.require("../../../config/keys");
var Reconciliation = /** @class */ (function () {
    function Reconciliation() {
        var _this = this;
        this.fetchRecentlyEndedContest = function (condition) { return __awaiter(_this, void 0, void 0, function () {
            var contestBusiness, result, _i, _a, contest, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        contestBusiness = new ContestBusiness();
                        return [4 /*yield*/, contestBusiness.fetch({
                                paymentStatus: interfaces_1.PaymentStatus.Completed,
                                approved: true,
                                endDate: { $gte: date_fns_1.startOfToday(), $lte: new Date() },
                            })];
                    case 1:
                        result = _b.sent();
                        if (result.data) {
                            for (_i = 0, _a = result.data; _i < _a.length; _i++) {
                                contest = _a[_i];
                                if (date_fns_1.isFuture(contest.endDate))
                                    return [2 /*return*/];
                                this.fetchContestFinalist(contest);
                            }
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _b.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.fetchContestFinalist = function (contest) { return __awaiter(_this, void 0, void 0, function () {
            var prizeRedeemed, contestEntryBusiness, voteTransactionBusiness, contestEntries, contestFinalist, _i, contestFinalist_1, item, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        console.log("called");
                        prizeRedeemed = false;
                        contestEntryBusiness = new ContestEntryBusiness();
                        voteTransactionBusiness = new VoteTransactionBusiness();
                        return [4 /*yield*/, contestEntryBusiness.fetchContestEntries({
                                contest: contest._id,
                                approved: true,
                            })];
                    case 1:
                        contestEntries = _a.sent();
                        console.log("entries", contestEntries);
                        return [4 /*yield*/, voteTransactionBusiness.fetchTopContestants(contest._id, contestEntries, contest.redeemable.length)];
                    case 2:
                        contestFinalist = _a.sent();
                        for (_i = 0, contestFinalist_1 = contestFinalist; _i < contestFinalist_1.length; _i++) {
                            item = contestFinalist_1[_i];
                            if (item.prizeRedeemed) {
                                prizeRedeemed = true;
                            }
                        }
                        if (!prizeRedeemed)
                            this.updateEntryPosition(contest, contestFinalist);
                        return [3 /*break*/, 4];
                    case 3:
                        err_2 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.updateEntryPosition = function (contest, contestants) { return __awaiter(_this, void 0, void 0, function () {
            var contestEntryBusiness, walletBusiness, contestWinnerTemplateString, i, contestantWallet, prizeMoney, walletBalance, welcomeEmailKeyValues, contestWinnerPlaceHolder, emailBody, contestantEmail, recievers, mailer, contestantWallet, prizeMoney, walletBalance, welcomeEmailKeyValues, contestWinnerPlaceHolder, emailBody, contestantEmail, recievers, mailer, contestantWallet, prizeMoney, walletBalance, welcomeEmailKeyValues, contestWinnerPlaceHolder, emailBody, contestantEmail, recievers, mailer, contestantWallet, prizeMoney, walletBalance, welcomeEmailKeyValues, contestWinnerPlaceHolder, emailBody, contestantEmail, recievers, mailer, contestantWallet, prizeMoney, walletBalance, welcomeEmailKeyValues, contestWinnerPlaceHolder, emailBody, contestantEmail, recievers, mailer, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 38, , 39]);
                        contestEntryBusiness = new ContestEntryBusiness();
                        walletBusiness = new WalletBusiness();
                        contestWinnerTemplateString = contestwinner_1.ContestWinner.template;
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < contestants.length)) return [3 /*break*/, 37];
                        if (!(i === 0 && !contestants[i].prizeRedeemed)) return [3 /*break*/, 8];
                        return [4 /*yield*/, contestEntryBusiness.patch(contestants[i].entryId, {
                                position: interfaces_1.EntryPosition.firstplace,
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, walletBusiness.findByCriteria({
                                user: contestants[i].contestant,
                            })];
                    case 3:
                        contestantWallet = _a.sent();
                        if (!contestantWallet.data) return [3 /*break*/, 8];
                        if (!(contestantWallet.data.status === TransactionDTO_1.PaymentProviderStatus.activated)) return [3 /*break*/, 8];
                        prizeMoney = contest.redeemable.filter(function (x) { return x.name === interfaces_1.PrizePosition.position1; })[0];
                        walletBalance = contestantWallet.data.balance;
                        contestantWallet.data.balance =
                            walletBalance + prizeMoney.prizeCash;
                        return [4 /*yield*/, walletBusiness.update(contestantWallet.data._id, contestantWallet.data)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, contestEntryBusiness.patch(contestants[i].entryId, {
                                prizeRedeemed: true,
                            })];
                    case 5:
                        _a.sent();
                        // create transaction request
                        return [4 /*yield*/, this.createTransaction(contestantWallet.data.user, prizeMoney.prizeCash, "1st Place - " + contest.title)];
                    case 6:
                        // create transaction request
                        _a.sent();
                        welcomeEmailKeyValues = this.ContestWinnerKeyValue(contestants[i].contestantName, contest.title, "1st Place", contestantWallet.data.walletNumber);
                        contestWinnerPlaceHolder = {
                            template: contestWinnerTemplateString,
                            placeholders: welcomeEmailKeyValues,
                        };
                        emailBody = TemplatePlaceHolder_1.replaceTemplateString(contestWinnerPlaceHolder);
                        contestantEmail = contestants[i].contestantEmail || "";
                        recievers = [contestantEmail];
                        mailer = MailBusiness_1.MailBusiness.init();
                        return [4 /*yield*/, mailer.sendMail("UntappedPool Competitions <" + config.UNTAPPED_COMPETITION_EMAIL + ">", "UntappedPool Competitions", recievers, "Untappedpool.com - " + contest.title, emailBody)];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8:
                        if (!(i === 1 && !contestants[i].prizeRedeemed)) return [3 /*break*/, 15];
                        return [4 /*yield*/, contestEntryBusiness.patch(contestants[i].entryId, {
                                position: interfaces_1.EntryPosition.secondplace,
                            })];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, walletBusiness.findByCriteria({
                                user: contestants[i].contestant,
                            })];
                    case 10:
                        contestantWallet = _a.sent();
                        if (!contestantWallet.data) return [3 /*break*/, 15];
                        if (!(contestantWallet.data.status === TransactionDTO_1.PaymentProviderStatus.activated)) return [3 /*break*/, 15];
                        prizeMoney = contest.redeemable.filter(function (x) { return x.name === interfaces_1.PrizePosition.position2; })[0];
                        walletBalance = contestantWallet.data.balance;
                        contestantWallet.data.balance =
                            walletBalance + prizeMoney.prizeCash;
                        return [4 /*yield*/, walletBusiness.update(contestantWallet.data._id, contestantWallet.data)];
                    case 11:
                        _a.sent();
                        return [4 /*yield*/, contestEntryBusiness.patch(contestants[i].entryId, {
                                prizeRedeemed: true,
                            })];
                    case 12:
                        _a.sent();
                        return [4 /*yield*/, this.createTransaction(contestantWallet.data.user, prizeMoney.prizeCash, "2nd Place - " + contest.title)];
                    case 13:
                        _a.sent();
                        welcomeEmailKeyValues = this.ContestWinnerKeyValue(contestants[i].contestantName, contest.title, "2nd Place", contestantWallet.data.walletNumber);
                        contestWinnerPlaceHolder = {
                            template: contestWinnerTemplateString,
                            placeholders: welcomeEmailKeyValues,
                        };
                        emailBody = TemplatePlaceHolder_1.replaceTemplateString(contestWinnerPlaceHolder);
                        contestantEmail = contestants[i].contestantEmail || "";
                        recievers = [contestantEmail];
                        mailer = MailBusiness_1.MailBusiness.init();
                        return [4 /*yield*/, mailer.sendMail("UntappedPool Competitions <" + config.UNTAPPED_COMPETITION_EMAIL + ">", "UntappedPool Competitions", recievers, "Untappedpool.com - " + contest.title, emailBody)];
                    case 14:
                        _a.sent();
                        _a.label = 15;
                    case 15:
                        if (!(i === 2 && !contestants[i].prizeRedeemed)) return [3 /*break*/, 22];
                        return [4 /*yield*/, contestEntryBusiness.patch(contestants[i].entryId, {
                                position: interfaces_1.EntryPosition.thirdplace,
                            })];
                    case 16:
                        _a.sent();
                        return [4 /*yield*/, walletBusiness.findByCriteria({
                                user: contestants[i].contestant,
                            })];
                    case 17:
                        contestantWallet = _a.sent();
                        if (!contestantWallet.data) return [3 /*break*/, 22];
                        if (!(contestantWallet.data.status === TransactionDTO_1.PaymentProviderStatus.activated)) return [3 /*break*/, 22];
                        prizeMoney = contest.redeemable.filter(function (x) { return x.name === interfaces_1.PrizePosition.position3; })[0];
                        walletBalance = contestantWallet.data.balance;
                        contestantWallet.data.balance =
                            walletBalance + prizeMoney.prizeCash;
                        return [4 /*yield*/, walletBusiness.update(contestantWallet.data._id, contestantWallet.data)];
                    case 18:
                        _a.sent();
                        return [4 /*yield*/, contestEntryBusiness.patch(contestants[i].entryId, {
                                prizeRedeemed: true,
                            })];
                    case 19:
                        _a.sent();
                        return [4 /*yield*/, this.createTransaction(contestantWallet.data.user, prizeMoney.prizeCash, "3rd Place - " + contest.title)];
                    case 20:
                        _a.sent();
                        welcomeEmailKeyValues = this.ContestWinnerKeyValue(contestants[i].contestantName, contest.title, "3rd Place", contestantWallet.data.walletNumber);
                        contestWinnerPlaceHolder = {
                            template: contestWinnerTemplateString,
                            placeholders: welcomeEmailKeyValues,
                        };
                        emailBody = TemplatePlaceHolder_1.replaceTemplateString(contestWinnerPlaceHolder);
                        contestantEmail = contestants[i].contestantEmail || "";
                        recievers = [contestantEmail];
                        mailer = MailBusiness_1.MailBusiness.init();
                        return [4 /*yield*/, mailer.sendMail("UntappedPool Competitions <" + config.UNTAPPED_COMPETITION_EMAIL + ">", "UntappedPool Competitions", recievers, "Untappedpool.com - " + contest.title, emailBody)];
                    case 21:
                        _a.sent();
                        _a.label = 22;
                    case 22:
                        if (!(i === 3 && !contestants[i].prizeRedeemed)) return [3 /*break*/, 29];
                        return [4 /*yield*/, contestEntryBusiness.patch(contestants[i].entryId, {
                                position: interfaces_1.EntryPosition.fourthplace,
                            })];
                    case 23:
                        _a.sent();
                        return [4 /*yield*/, walletBusiness.findByCriteria({
                                user: contestants[i].contestant,
                            })];
                    case 24:
                        contestantWallet = _a.sent();
                        if (!contestantWallet.data) return [3 /*break*/, 29];
                        if (!(contestantWallet.data.status === TransactionDTO_1.PaymentProviderStatus.activated)) return [3 /*break*/, 29];
                        prizeMoney = contest.redeemable.filter(function (x) { return x.name === interfaces_1.PrizePosition.position4; })[0];
                        walletBalance = contestantWallet.data.balance;
                        contestantWallet.data.balance =
                            walletBalance + prizeMoney.prizeCash;
                        return [4 /*yield*/, walletBusiness.update(contestantWallet.data._id, contestantWallet.data)];
                    case 25:
                        _a.sent();
                        return [4 /*yield*/, contestEntryBusiness.patch(contestants[i].entryId, {
                                prizeRedeemed: true,
                            })];
                    case 26:
                        _a.sent();
                        return [4 /*yield*/, this.createTransaction(contestantWallet.data.user, prizeMoney.prizeCash, "4th Place - " + contest.title)];
                    case 27:
                        _a.sent();
                        welcomeEmailKeyValues = this.ContestWinnerKeyValue(contestants[i].contestantName, contest.title, "4th Place", contestantWallet.data.walletNumber);
                        contestWinnerPlaceHolder = {
                            template: contestWinnerTemplateString,
                            placeholders: welcomeEmailKeyValues,
                        };
                        emailBody = TemplatePlaceHolder_1.replaceTemplateString(contestWinnerPlaceHolder);
                        contestantEmail = contestants[i].contestantEmail || "";
                        recievers = [contestantEmail];
                        mailer = MailBusiness_1.MailBusiness.init();
                        return [4 /*yield*/, mailer.sendMail("UntappedPool Competitions <" + config.UNTAPPED_COMPETITION_EMAIL + ">", "UntappedPool Competitions", recievers, "Untappedpool.com - " + contest.title, emailBody)];
                    case 28:
                        _a.sent();
                        _a.label = 29;
                    case 29:
                        if (!(i === 4 && !contestants[i].prizeRedeemed)) return [3 /*break*/, 36];
                        return [4 /*yield*/, contestEntryBusiness.patch(contestants[i].entryId, {
                                position: interfaces_1.EntryPosition.fifthplace,
                            })];
                    case 30:
                        _a.sent();
                        return [4 /*yield*/, walletBusiness.findByCriteria({
                                user: contestants[i].contestant,
                            })];
                    case 31:
                        contestantWallet = _a.sent();
                        if (!contestantWallet.data) return [3 /*break*/, 36];
                        if (!(contestantWallet.data.status === TransactionDTO_1.PaymentProviderStatus.activated)) return [3 /*break*/, 36];
                        prizeMoney = contest.redeemable.filter(function (x) { return x.name === interfaces_1.PrizePosition.position5; })[0];
                        walletBalance = contestantWallet.data.balance;
                        contestantWallet.data.balance =
                            walletBalance + prizeMoney.prizeCash;
                        return [4 /*yield*/, walletBusiness.update(contestantWallet.data._id, contestantWallet.data)];
                    case 32:
                        _a.sent();
                        return [4 /*yield*/, contestEntryBusiness.patch(contestants[i].entryId, {
                                prizeRedeemed: true,
                            })];
                    case 33:
                        _a.sent();
                        return [4 /*yield*/, this.createTransaction(contestantWallet.data.user, prizeMoney.prizeCash, "5th Place - " + contest.title)];
                    case 34:
                        _a.sent();
                        welcomeEmailKeyValues = this.ContestWinnerKeyValue(contestants[i].contestantName, contest.title, "5th Place", contestantWallet.data.walletNumber);
                        contestWinnerPlaceHolder = {
                            template: contestWinnerTemplateString,
                            placeholders: welcomeEmailKeyValues,
                        };
                        emailBody = TemplatePlaceHolder_1.replaceTemplateString(contestWinnerPlaceHolder);
                        contestantEmail = contestants[i].contestantEmail || "";
                        recievers = [contestantEmail];
                        mailer = MailBusiness_1.MailBusiness.init();
                        return [4 /*yield*/, mailer.sendMail("UntappedPool Competitions <" + config.UNTAPPED_COMPETITION_EMAIL + ">", "UntappedPool Competitions", recievers, "Untappedpool.com - " + contest.title, emailBody)];
                    case 35:
                        _a.sent();
                        _a.label = 36;
                    case 36:
                        i++;
                        return [3 /*break*/, 1];
                    case 37: return [3 /*break*/, 39];
                    case 38:
                        err_3 = _a.sent();
                        return [3 /*break*/, 39];
                    case 39: return [2 /*return*/];
                }
            });
        }); };
        this.createTransaction = function (userId, amount, narration) { return __awaiter(_this, void 0, void 0, function () {
            var transactionObj, transactionRequestBusiness, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        transactionObj = Object.assign({
                            user: userId,
                            amount: amount,
                            paymentReference: Helper_1.generateRandomNumber(12),
                            narration: narration,
                            paymentChannel: "web",
                            transactionType: TransactionDTO_1.TransctionType.credit,
                            responseCode: 200,
                            responseMessage: "Successful",
                            currency: "NGN",
                            transactionDate: new Date(),
                            transactionStatus: "success",
                        });
                        transactionRequestBusiness = new TransactionRequestBusiness();
                        return [4 /*yield*/, transactionRequestBusiness.create(transactionObj)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_4 = _a.sent();
                        console.log(err_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
    }
    Reconciliation.init = function () {
        return new Reconciliation();
    };
    Reconciliation.prototype.settle = function () {
        return __awaiter(this, void 0, void 0, function () {
            var err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.fetchRecentlyEndedContest({})];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_5 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Reconciliation.prototype.ContestWinnerKeyValue = function (winnerName, contestTitle, position, walletId) {
        return [
            {
                key: TemplatePlaceHolder_1.PlaceHolderKey.Name,
                value: winnerName,
            },
            {
                key: TemplatePlaceHolder_1.PlaceHolderKey.ContestTitle,
                value: contestTitle,
            },
            {
                key: TemplatePlaceHolder_1.PlaceHolderKey.ContestPosition,
                value: position,
            },
            {
                key: TemplatePlaceHolder_1.PlaceHolderKey.ContestantWallet,
                value: walletId,
            },
        ];
    };
    return Reconciliation;
}());
exports.Reconciliation = Reconciliation;
//# sourceMappingURL=Reconciliation.js.map