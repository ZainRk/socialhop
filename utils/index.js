export const getFileTypeFromUrl = (url) => {
  if (url === null || url === undefined) return "unknown";

  const extension = url.split(".").pop();

  switch (extension) {
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
      return "image";
    case "mp4":
    case "avi":
    case "mov":
      return "video";
    default:
      return "unknown";
  }
};

export const updateQueryCacheLikes = (
  postLikes,
  postId,
  userId,
  actionType
) => {
  if (actionType === "like") {
    return [...postLikes, { authorId: userId, postId }];
  } else {
    return postLikes.filter((like) => like.authorId !== userId);
  }
};

export const checkPostForTrends = (postText = "") => {
  // 1. split post text into words that have hashtags
  const firstSplit = postText
    .trim()
    .split(/\s+/)
    .filter((word) => word.startsWith("#"))
    .map((word) => word.toLowerCase());
  let res = firstSplit;
  // 2. check if there are any words that have multiple hashtags
  firstSplit.map((word) => {
    const secondSplit = word.split("#");
    if (secondSplit.length > 1) {
      res = [...res, ...secondSplit.slice(1, secondSplit.length)].filter(
        (el) => el !== word
      );
    }
  });
  // if array contains same hashtags, remove duplicates
  res = [...new Set(res)];
  return res;
};
