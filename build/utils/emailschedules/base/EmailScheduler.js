"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EmailScheduler = /** @class */ (function () {
    function EmailScheduler(scheduler) {
        this.scheduler = scheduler;
    }
    EmailScheduler.mailer = function (scheduler) {
        return new EmailScheduler(scheduler);
    };
    EmailScheduler.prototype.send = function (email) {
        this.scheduler.sendEmail(email);
    };
    return EmailScheduler;
}());
exports.EmailScheduler = EmailScheduler;
//# sourceMappingURL=EmailScheduler.js.map