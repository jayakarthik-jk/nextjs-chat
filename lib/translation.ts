import { LanguageCode } from './types'
import { translate as translateApi } from '@vitalets/google-translate-api';

export async function translate(
  query: string,
  from: LanguageCode,
  to: LanguageCode = 'en'
) {
  if (from === to) {
    return query
  }

  const { text } = await translateApi(query, { to });

  return text;
}
