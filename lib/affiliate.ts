export function withAffiliate(url: string) {
  const tag = process.env.NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG;
  if (!tag || !url.includes("amazon.fr")) return url;

  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}tag=${encodeURIComponent(tag)}`;
}
