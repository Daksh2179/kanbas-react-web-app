export const ENROLL = 'ENROLL';
export const UNENROLL = 'UNENROLL';

export const enroll = (userId: string, courseId: string) => ({
  type: ENROLL,
  payload: { userId, courseId },
});

export const unenroll = (userId: string, courseId: string) => ({
  type: UNENROLL,
  payload: { userId, courseId },
});