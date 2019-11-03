"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WelcomeEmail = /** @class */ (function () {
    function WelcomeEmail() {
    }
    Object.defineProperty(WelcomeEmail, "template", {
        get: function () {
            return "\n      <style type=\"text/css\">\n      body,\n      html, \n      .body {\n          background: #f3f3f3 !important;\n      }\n      .container.header {\n          background: #f3f3f3;\n      }\n      .body-border {\n          border-top: 8px solid #663399;\n      }\n      </style>\n      <!-- move the above styles into your custom stylesheet -->\n    \n      <spacer size=\"16\"></spacer>\n    \n      <container class=\"header\">\n      <row>\n          <columns>\n          <h1 class=\"text-center\">Welcome [Name] to Untapped Pool</h1>    \n          </columns>\n      </row>\n      </container>\n    \n      <container class=\"body-border\">\n      <row>\n          <columns>\n    \n          <spacer size=\"32\"></spacer>\n    \n          <spacer size=\"16\"></spacer>\n    \n          <h4>Thank you for signing up on Untapped Pool Portal.</h4>\n          <p>Click <a href=\"[VerifyToken]\">here</a> to verify your mail or paste the following link into your browser <columns>[FullVerifyToken]</columns> </p>\n    \n          <center>\n              <menu>\n              <a href=\"[PlatformUrl]\">Website</a>\n              <a href=\"[Facebook]\">Facebook</a>\n              <a href=\"[Twitter]\">Twitter</a>\n              <a href=\"#\">+234 808 0737373</a>\n              </menu>\n          </center>\n    \n          </columns>\n      </row>\n    \n      <spacer size=\"16\"></spacer>\n      </container>\n      ";
        },
        enumerable: true,
        configurable: true
    });
    return WelcomeEmail;
}());
exports.WelcomeEmail = WelcomeEmail;
//# sourceMappingURL=welcomeEmail.js.map