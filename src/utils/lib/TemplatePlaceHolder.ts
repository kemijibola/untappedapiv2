const PlaceHolders: { [x: string]: string } = {
  _____Twitter_____: 'htmtps://twitter.com/untappedpool',
  _____Facebook_____: 'https://facebook.com/untappedpool'
};

export enum PlaceHolderKeys {
  _____Twitter_____ = '_____Twitter_____',
  _____Facebook_____ = '_____Facebook_____'
}

export interface TemplatePlaceHolder {
  template: string;
  placeholders: PlaceHolderKeys[];
}

export function replaceTemplateString(param: TemplatePlaceHolder): string {
  for (const key of param.placeholders) {
    param.template.replace(key, PlaceHolders[key]);
  }
  return param.template;
}
