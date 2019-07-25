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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var EmailService_1 = require("./EmailService");
var Sender_1 = require("./aws/Sender");
var AWS = __importStar(require("aws-sdk"));
var lib_1 = require("../lib");
AWS.config.update({ region: 'us-east-1' });
var awsSes = new AWS.SES();
var mailParams = {
    receivers: [],
    subject: '',
    mail: '',
    senderEmail: '',
    senderName: ''
};
exports.mailHandler = function (event, context, cb) {
    if (event === void 0) { event = {}; }
    return __awaiter(_this, void 0, void 0, function () {
        var headers, escapeReceivers, escapesubject, escapebody, escapesenderEmail, escapeCcAddresses, escapebbccAddresses, escapeSenderName, body, _i, _a, email, _b, _c, email, _d, _e, email, mailer, result, err_1;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    headers = { 'Access-Control-Allow-Origin': '*' };
                    _f.label = 1;
                case 1:
                    _f.trys.push([1, 3, , 4]);
                    escapeReceivers = [];
                    escapesubject = void 0;
                    escapebody = void 0;
                    escapesenderEmail = void 0;
                    escapeCcAddresses = [];
                    escapebbccAddresses = [];
                    escapeSenderName = '';
                    body = event.email;
                    escapesubject = JSON.parse(lib_1.escapeJSON(body.subject));
                    escapebody = JSON.parse(lib_1.escapeJSON(body.mail));
                    escapesenderEmail = JSON.parse(lib_1.escapeJSON(body.senderEmail));
                    body.receivers = lib_1.escapeJSON(body.receivers).split(',');
                    for (_i = 0, _a = body.receivers; _i < _a.length; _i++) {
                        email = _a[_i];
                        escapeReceivers = escapeReceivers.concat([JSON.parse(email)]);
                    }
                    if (body.ccAddresses) {
                        body.ccAddresses = lib_1.escapeJSON(body.ccAddresses).split(',');
                        for (_b = 0, _c = body.ccAddresses; _b < _c.length; _b++) {
                            email = _c[_b];
                            escapeCcAddresses = escapeCcAddresses.concat([JSON.parse(email)]);
                        }
                    }
                    if (body.bccAddresses) {
                        body.bccAddresses = lib_1.escapeJSON(body.bccAddresses).split(',');
                        for (_d = 0, _e = body.ccAddresses; _d < _e.length; _d++) {
                            email = _e[_d];
                            escapebbccAddresses = escapebbccAddresses.concat([JSON.parse(email)]);
                        }
                    }
                    if (body.senderName) {
                        escapeSenderName = JSON.parse(lib_1.escapeJSON(body.senderName));
                    }
                    mailParams = {
                        receivers: escapeReceivers,
                        subject: escapesubject,
                        mail: escapebody,
                        senderEmail: escapesenderEmail,
                        ccAddresses: escapeCcAddresses,
                        bccAddresses: escapebbccAddresses,
                        senderName: escapeSenderName
                    };
                    mailer = EmailService_1.EmailService.mailer(mailParams);
                    return [4 /*yield*/, mailer.sendMail(Sender_1.ses)];
                case 2:
                    result = _f.sent();
                    cb(null, {
                        statusCode: 200,
                        headers: headers,
                        body: JSON.stringify({ message: result })
                    });
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _f.sent();
                    cb(null, {
                        statusCode: 500,
                        headers: headers,
                        body: JSON.stringify({ error: err_1 })
                    });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
};
//# sourceMappingURL=Handler.js.map