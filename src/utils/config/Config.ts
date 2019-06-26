import { AppConfig } from '../../app/models/interfaces/custom/AppConfig';

export interface Configuration {
  setConfig(config: AppConfig): void;
}

export class AppSettings {
  constructor(public configuration: Configuration) {}

  configureAppSettings(config: AppConfig): void {
    this.configuration.setConfig(config);
  }
}
