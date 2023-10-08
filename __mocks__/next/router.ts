// Solusi untuk mock `next/router`: https://github.com/vercel/next.js/issues/7479
export const useRouter = () => {
  return {
    basePath: '.',
  };
};
