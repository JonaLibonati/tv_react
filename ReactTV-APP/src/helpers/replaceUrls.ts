export const replaceUrls = (url: string): string => {
  if (url?.includes("twitch.tv")) {
    console.log("Hola");
    console.log(url);
    return url.replace("192.168.1.33", "localhost");
  }

  return url;
};
