export const PORTFOLIO_CHAT_ERROR_MESSAGE =
  "I couldn't generate an answer right now. Please try again.";

export const toPublicChatErrorMessage = (_error: unknown) => PORTFOLIO_CHAT_ERROR_MESSAGE;

export const logPortfolioChatError = (context: string, error: unknown) => {
  console.error(`[portfolio-chat] ${context}`, error);
};
