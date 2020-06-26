import Pusher from "pusher";
import { AppConfig } from "../../app/models/interfaces/custom/AppConfig";
const config: AppConfig = module.require("../../config/keys");

class PusherHelper {
  pusher: Pusher;
  private constructor() {
    this.pusher = new Pusher({
      appId: config.PUSHER.app_id,
      key: config.PUSHER.key,
      secret: config.PUSHER.secret,
      cluster: config.PUSHER.cluster,
      useTLS: true,
    });
  }
  static init(): PusherHelper {
    return new PusherHelper();
  }

  publish(channel: string, event: string, data: any): void {
    console.log("pusher message", data);
    this.pusher.trigger(channel, event, data);
  }
}

Object.seal(PusherHelper);
export = PusherHelper;
