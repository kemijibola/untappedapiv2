"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var AWS = __importStar(require("aws-sdk"));
var SqsScheduler = /** @class */ (function () {
    function SqsScheduler(config) {
        this.config = config;
        this.accountId = '';
        this.sendMessageParams = {
            MessageBody: '',
            QueueUrl: ''
        };
        this.recieveParams = {
            QueueUrl: '',
            MaxNumberOfMessages: 0,
            VisibilityTimeout: 0,
            WaitTimeSeconds: 0
        };
        this.deleteParams = { QueueUrl: '', ReceiptHandle: '' };
        this.dataToProcess = {};
        AWS.config.update({
            region: config.region
        });
        this.sqs = new AWS.SQS({
            apiVersion: config.version
        });
        this.accountId = config.accountId;
    }
    SqsScheduler.setup = function (config) {
        return new SqsScheduler(config);
    };
    SqsScheduler.prototype.create = function (name, createParams) {
        this.sendMessageParams = Object.assign(this.sendMessageParams, createParams);
        this.sendMessageParams = {
            MessageBody: this.sendMessageParams.MessageBody,
            QueueUrl: this.sendMessageParams.QueueUrl + "/" + this.accountId + "/" + name
        };
        this.sqs.sendMessage(this.sendMessageParams, function (err, data) {
            if (err) {
                console.log('Error', err);
            }
            else {
                console.log('Successfully added message', data.MessageId);
            }
        });
    };
    SqsScheduler.prototype.process = function (name, processParams) {
        var _this = this;
        this.recieveParams = Object.assign(this.recieveParams, processParams);
        this.recieveParams = {
            QueueUrl: this.recieveParams.QueueUrl + "/" + this.accountId + "/" + name,
            MaxNumberOfMessages: this.recieveParams.MaxNumberOfMessages,
            VisibilityTimeout: this.recieveParams.VisibilityTimeout,
            WaitTimeSeconds: this.recieveParams.WaitTimeSeconds
        };
        this.sqs.receiveMessage(this.recieveParams, function (err, data) {
            if (err) {
                console.log(err.stack);
            }
            else {
                if (!data.Message) {
                    console.log('Nothing to process');
                    return Object();
                }
                _this.dataToProcess = JSON.parse(data.Messages[0].Body);
            }
        });
        return this.dataToProcess;
    };
    SqsScheduler.prototype.delete = function (params) {
        this.deleteParams = Object.assign(this.deleteParams, params);
        this.sqs.deleteMessage(this.deleteParams, function (err, data) {
            if (err) {
                console.log(err, err.stack);
            }
            else {
                console.log('Successfully deleted message from queue');
            }
        });
    };
    return SqsScheduler;
}());
exports.SqsScheduler = SqsScheduler;
//# sourceMappingURL=SqsScheduler.js.map