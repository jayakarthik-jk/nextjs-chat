import { translate as translateApi } from '@vitalets/google-translate-api';
import { TooManyRequests } from 'http-errors';
import { LanguageCode } from './types';

export async function translate(
  query: string,
  from: LanguageCode,
  to: LanguageCode = 'en'
) {
  if (from === to) {
    return query
  }
  try {
    const { text } = await translateApi(query, { to });
  
    return text;
    
  } catch (error) {
    if (error instanceof TooManyRequests) {
      // tODO: handle this
    }
  }
}
