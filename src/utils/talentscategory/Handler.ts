import { Handler, Context, Callback } from 'aws-lambda';

export const fetchTalentsByCategory: Handler = async (
  event: any = {},
  context: Context,
  cb: Callback
): Promise<any> => {
  // do the fetching here
};
