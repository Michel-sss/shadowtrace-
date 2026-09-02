import { apiClient } from "./apiClient";
import type { ChatAnswer, ChatRequest } from "../types/chat";

/** glm-5.x event Q&A often exceeds the default 30s Axios timeout. */
export const EVENT_CHAT_TIMEOUT_MS = 180_000;

export function askEventQuestion(eventId: string, request: ChatRequest) {
  return apiClient.post<ChatAnswer>(`/events/${eventId}/chat`, request, {
    timeout: EVENT_CHAT_TIMEOUT_MS,
    skipGlobalErrorToast: true,
  });
}
