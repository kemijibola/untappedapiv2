"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Environment_1 = require("../app/models/interfaces/custom/Environment");
// import * as development from "./development.json";
var dotenv = __importStar(require("dotenv"));
dotenv.config();
var environment = process.env.NODE_ENV || "";
switch (environment) {
    case Environment_1.Environment.ci:
        // Object.seal(ci);
        // module.exports = ci;
        break;
    case Environment_1.Environment.staging:
        // Object.seal(production);
        // module.exports = production;
        break;
    case Environment_1.Environment.production:
        module.exports = {
            NODE_ENV: process.env.NODE_ENV,
            RSA_PUBLIC: [
                {
                    Secret: process.env.RSA_PUBLIC_SECRET_AUTH,
                    key: process.env.RSA_PUBLIC_KEY_AUTH,
                    rsaAlgType: process.env.RSA_PUBLIC_RSA_ALG_TYPE_AUTH,
                    type: process.env.RSA_PUBLIC_TYPE_AUTH,
                },
                {
                    Secret: process.env.RSA_PUBLIC_SECRET_VERIFY,
                    key: process.env.RSA_PUBLIC_KEY_VERIFY,
                    rsaAlgType: process.env.RSA_PUBLIC_RSA_ALG_TYPE_VERIFY,
                    type: process.env.RSA_PUBLIC_TYPE_VERIFY,
                },
            ],
            RSA_PRIVATE: [
                {
                    Secret: process.env.RSA_PRIVATE_SECRET_AUTH,
                    key: process.env.RSA_PRIVATE_KEY_AUTH,
                    rsaAlgType: process.env.RSA_PRIVATE_RSA_ALG_TYPE_AUTH,
                    type: process.env.RSA_PRIVATE_TYPE_AUTH,
                },
                {
                    Secret: process.env.RSA_PRIVATE_SECRET_VERIFY,
                    key: process.env.RSA_PRIVATE_KEY_VERIFY,
                    rsaAlgType: process.env.RSA_PRIVATE_RSA_ALG_TYPE_VERIFY,
                    type: process.env.RSA_PRIVATE_TYPE_VERIFY,
                },
            ],
            PORT: process.env.PORT,
            DATABASE_HOST: process.env.DATABASE_HOST,
            DATABASE_PORT: process.env.DATABASE_PORT,
            DATABASE_NAME: process.env.DATABASE_NAME,
            DATABASE_USER: process.env.DATABASE_USER,
            DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
            REDIS_HOST: process.env.REDIS_HOST,
            REDIS_PORT: process.env.REDIS_PORT,
            REDIS_USER: process.env.REDIS_USER,
            REDIS_PASSWORD: process.env.REDIS_PASSWORD,
            REDIS_URI: process.env.REDIS_URI,
            ISSUER: process.env.ISSUER,
            AUTH_EXPIRESIN: process.env.AUTH_EXPIRESIN,
            MAIL_EXPIRESIN: process.env.MAIL_EXPIRESIN,
            JUDGE_EVALUATION_EXP: process.env.JUDGE_EVALUATION_EXP,
            IMAGE_BUCKET: {
                bucket: process.env.IMAGE_BUCKET_BUCKET,
                access_key_id: process.env.IMAGE_BUCKET_ACCESS_KEY_ID,
                secret_access_key: process.env.IMAGE_BUCKET_SECRET_ACCESS_KEY,
                region: process.env.IMAGE_BUCKET_REGION,
                accelerate_endpoint: process.env.IMAGE_BUCKET_ACCELERATE_ENDPOINT,
                cloudformation_api_endpoint: process.env.IMAGE_BUCKET_CLOUDFORMATION_API_ENDPOINT,
            },
            VIDEO_BUCKET: {
                bucket: process.env.VIDEO_BUCKET_BUCKET,
                access_key_id: process.env.VIDEO_BUCKET_ACCESS_KEY_ID,
                secret_access_key: process.env.VIDEO_BUCKET_SECRET_ACCESS_KEY,
                region: process.env.VIDEO_BUCKET_REGION,
                accelerate_endpoint: process.env.VIDEO_BUCKET_ACCELERATE_ENDPOINT,
            },
            AUDIO_BUCKET: {
                bucket: process.env.AUDIO_BUCKET_BUCKET,
                access_key_id: process.env.AUDIO_BUCKET_ACCESS_KEY_ID,
                secret_access_key: process.env.AUDIO_BUCKET_SECRET_ACCESS_KEY,
                region: process.env.AUDIO_BUCKET_REGION,
                accelerate_endpoint: process.env.AUDIO_BUCKET_ACCELERATE_ENDPOINT,
            },
            APP_BUCKET: {
                bucket: process.env.APP_BUCKET_BUCKET,
                access_key_id: process.env.APP_BUCKET_ACCESS_KEY_ID,
                secret_access_key: process.env.APP_BUCKET_SECRET_ACCESS_KEY,
                region: process.env.APP_BUCKET_REGION,
                bucketUrl: process.env.APP_BUCKET_BUCKET_URL,
            },
            SCHEDULED_EMAIL_SQS: {
                access_key_id: process.env.SCHEDULED_EMAIL_SQS_ACCESS_KEY_ID,
                secret_access_key: process.env.SCHEDULED_EMAIL_SQS_SECRET_ACCESS_KEY,
                version: process.env.SCHEDULED_EMAIL_SQS_VERSION,
                region: process.env.SCHEDULED_EMAIL_SQS_REGION,
                accountId: process.env.SCHEDULED_EMAIL_SQS_ACCOUNT_ID,
                url: process.env.SCHEDULED_EMAIL_SQS_URL,
                queueName: process.env.SCHEDULED_EMAIL_SQS_QUEUE_NAME,
            },
            SERVERLESS: {
                access_key_id: process.env.SERVERLESS_ACCESS_KEY_ID,
                secret_access_key: process.env.SERVERLESS_SECRET_ACCESS_KEY,
            },
            AUTH_ISSUER_SERVER: process.env.AUTH_ISSUER_SERVER,
            VERIFICATION_URI: "",
            PAYMENT_SECRETS: {
                paystack_secret: process.env.PAYSTACK_SECRET_KEY,
            },
            PUSHER: {
                channel: process.env.PUSHER_CHANNEL,
                app_id: process.env.PUSHER_APP_ID,
                key: process.env.PUSHER_KEY,
                secret: process.env.PUSHER_SECRET,
                cluster: process.env.PUSHER_CLUSTER,
            },
            PAYSTACKBASEURL: process.env.PAYSTACKBASEURL,
            KEY: process.env.KEY,
            MiNIMUM_PRIZE_CASH: process.env.MiNIMUM_PRIZE_CASH,
            CEASER_AUDIENCE: process.env.CEASER,
            CONTEST_KEYWORD: process.env.CONTEST_KEYWORD,
            UNTAPPED_SUPPORT_EMAIL: process.env.UNTAPPED_SUPPORT_EMAIL,
            UNTAPPED_TALENT_EMAIL: process.env.UNTAPPED_TALENT_EMAIL,
            UNTAPPED_PROFESSIONAL_EMAIL: process.env.UNTAPPED_PROFESSIONAL_EMAIL,
            UNTAPPED_BILLING_EMAIL: process.env.UNTAPPED_BILLING_EMAIL,
            UNTAPPED_COMPETITION_EMAIL: process.env.UNTAPPED_COMPETITION_EMAIL,
            UNTAPPED_CEO_EMAIL: process.env.UNTAPPED_CEO_EMAIL,
            UNTAPPED_ADMIN_EMAIL: process.env.UNTAPPED_ADMIN_EMAIL,
            NODE_APP_INSTANCE: process.env.NODE_APP_INSTANCE,
            CEASER_SECRET: process.env.CEASER_SECRET,
        };
        break;
    default:
        // Object.seal(development);
        // module.exports = development;
        break;
}
//# sourceMappingURL=keys.js.map