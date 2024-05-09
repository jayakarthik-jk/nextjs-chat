import { Language, Strings } from '../types'
import english from './english'
import hindi from './hindi'
import malayalam from './malayalam'
import tamil from './tamil'
import telugu from './telugu'
export const stringMap = {
  English: english,
  தமிழ்: tamil,
  हिंदी: hindi,
  తెలుగు: telugu,
  മലയാളം: malayalam
} satisfies Record<Language, Strings>
