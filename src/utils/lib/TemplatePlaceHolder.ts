export const SocialMediaHandles = {
  Twitter: 'https://www.twitter.com/untappedpool',
  Facebook: 'https://www.facebook.com/untappedpool',
  Instagram: 'https://www.instagram.com/official_untappedpool'
};
export enum PlaceHolderKey {
  Twitter = '[Twitter]',
  Facebook = '[Facebook]',
  Instagram = '[Instagram]',
  Name = '[Name]',
  PlatformUrl = '[PlatformUrl]',
  VerificationUrl = '[VerificationUrl]'
}
// export enum PlaceHolderKey {
//     Twitter = '[Twitter]'
//   _____Twitter_____ = '_____Twitter_____',
//   _____Facebook_____ = '_____Facebook_____',
//   _____Instagram_____ = '_____Instagram_____',
//   _____Name_____ = '_____Name_____',
//   _____PlatformUrl_____ = '_____PlatformUrl_____',
//   _____VerificationUrl_____ = '_____VerificationUrl_____'
// }

export interface TemplateKeyValue {
  key: PlaceHolderKey;
  value: string;
}
export interface TemplatePlaceHolder {
  template: string;
  placeholders: TemplateKeyValue[];
}

export function replaceTemplateString(param: TemplatePlaceHolder): string {
  let template = param.template;
  for (const item of param.placeholders) {
    template = template.replace(item.key, item.value);
  }
  return template;
}
