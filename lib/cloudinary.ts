export function getOptimizedUrl(url: string, width: number = 800) {
  // If it's not a Cloudinary URL, just return it as is
  if (!url || url.includes("cloudinary.com")) return url

  const parts = url.split("/upload/")

  if (parts.length < 2) return url

  // return the URL based on the custom width provided
  return `${parts[0]}/upload/f_auto,q_auto,w_${width}/${parts[1]}`
}
