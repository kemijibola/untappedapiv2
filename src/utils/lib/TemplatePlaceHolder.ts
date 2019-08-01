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
