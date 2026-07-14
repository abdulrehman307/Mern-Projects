import { nanoid } from 'nanoid';
import { SESSION_ID_KEY } from './constants';

/**
 * Returns the session ID stored in localStorage.
 * Generates and persists a new one if none exists.
 */
export function getOrCreateSessionId(): string {
  let sessionId = localStorage.getItem(SESSION_ID_KEY);
  if (!sessionId) {
    sessionId = nanoid(21);
    localStorage.setItem(SESSION_ID_KEY, sessionId);
  }
  return sessionId;
}
