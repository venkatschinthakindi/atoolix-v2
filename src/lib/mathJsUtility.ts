let mathPromise: any = null;

export const getMath = async () => {
  if (!mathPromise) {
    mathPromise = import("mathjs");
  }
  return mathPromise;
};