const range = (start = 0, end) => {
  const length = end - start;
  return Array.from({ length }, (_, i) => start + i);
};

const parseRelativeDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();

  // console.log(dateString);
  // console.log(date);

  const diffMilliseconds = now - date;
  const diffSeconds = Math.floor(diffMilliseconds / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffSeconds < 60) {
    return "방금 전";
  } else if (diffMinutes < 60) {
    return `${diffMinutes}분 전`;
  } else if (diffHours < 24) {
    return `${diffHours}시간 전`;
  } else if (diffDays < 7) {
    return `${diffDays}일 전`;
  } else if (diffWeeks < 4) {
    return `${diffWeeks}주 전`;
  } else if (diffMonths < 12) {
    return `${diffMonths}개월 전`;
  } else {
    return `${diffYears}년 전`;
  }
};

export { range, parseRelativeDate };
