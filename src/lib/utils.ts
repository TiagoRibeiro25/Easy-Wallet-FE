const getUserAgent = () => {
  return navigator.userAgent;
};

export const isUserOnMobile = () => {
  const userAgent = getUserAgent();
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
};

export const isUserOnDesktop = () => {
  return !isUserOnMobile();
};
