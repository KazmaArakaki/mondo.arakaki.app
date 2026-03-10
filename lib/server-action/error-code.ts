export const ErrorCode = {
  Unexpected: "UnexpectedError",
  Unauthorized: "UnauthorizedError",
  Bookmark: {
    NotFound: "BookmarkNotFoundError",
  },
  Session: {
    NotFound: "SessionNotFoundError",
  },
  User: {
    NotFound: "UserNotFoundError",
    EmailDuplicated: "UserEmailDuplicatedError",
  },
} as const;
