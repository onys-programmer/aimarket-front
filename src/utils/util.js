const range = (start = 0, end) => {
  const length = end - start;
  return Array.from({ length }, (_, i) => start + i);
};

export { range };