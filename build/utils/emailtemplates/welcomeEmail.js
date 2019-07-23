"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WelcomeEmail = /** @class */ (function () {
    function WelcomeEmail() {
    }
    Object.defineProperty(WelcomeEmail, "template", {
        get: function () {
            return "\n    <style type=\"text/css\">\n    body,\n    html, \n    .body {\n        background: #f3f3f3 !important;\n    }\n    .container.header {\n        background: #f3f3f3;\n    }\n    .body-border {\n        border-top: 8px solid #663399;\n    }\n    </style>\n    <!-- move the above styles into your custom stylesheet -->\n  \n    <spacer size=\"16\"></spacer>\n  \n    <container class=\"header\">\n    <row>\n        <columns>\n        <h1 class=\"text-center\">Welcome [Name] to Kraken Academy</h1>\n  \n        <center>\n            <menu class=\"text-center\">\n            <item href=\"#\">About</item>\n            <item href=\"#\">Course List</item>\n            <item href=\"#\">Campus Map</item>\n            <item href=\"#\">Contact</item>\n            </menu>\n        </center>\n  \n        </columns>\n    </row>\n    </container>\n  \n    <container class=\"body-border\">\n    <row>\n        <columns>\n  \n        <spacer size=\"32\"></spacer>\n  \n        <center>\n            <img src=\"http://placehold.it/200x200\">\n        </center>\n  \n        <spacer size=\"16\"></spacer>\n  \n        <h4>An exciting future of terrorizing sailors awaits you at Kraken Academy.</h4>\n        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque culpa vel architecto, perspiciatis eius cum autem quidem, sunt consequuntur, impedit dolor vitae illum nobis sint nihil aliquid? Assumenda, amet, officia.</p>\n  \n        <center>\n            <menu>\n            <item href=\"[PlatformUrl]\">krakenacademy.com</item>\n            <item href=\"[Facebook]\">Facebook</item>\n            <item href=\"[Twitter]\">Twitter</item>\n            <item href=\"#\">(408)-555-0123</item>\n            </menu>\n        </center>\n  \n        </columns>\n    </row>\n  \n    <spacer size=\"16\"></spacer>\n    </container>\n    ";
        },
        enumerable: true,
        configurable: true
    });
    return WelcomeEmail;
}());
exports.WelcomeEmail = WelcomeEmail;
//# sourceMappingURL=welcomeEmail.js.map