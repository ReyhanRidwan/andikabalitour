/**
 * Utility to optimize image URLs.
 * Adds f_auto,q_auto,w_800 transformation parameters to Cloudinary URLs
 * directly following '/upload/' for modern formats (WebP/AVIF), auto compression,
 * and responsive width sizing.
 */
export function optimizeCloudinaryUrl(url: string, params: string = 'f_auto,q_auto,w_800'): string {
  if (!url || typeof url !== 'string') return url;
  if (!url.includes('res.cloudinary.com') || !url.includes('/upload/')) {
    return url;
  }

  // Avoid duplicating if already transformed
  if (url.includes('/upload/f_auto') || url.includes('/upload/q_auto') || url.includes('/upload/' + params + '/')) {
    return url;
  }

  return url.replace('/upload/', `/upload/${params}/`);
}

/**
 * Deeply transforms any string or object containing Cloudinary URLs
 */
export function optimizeExperienceImages<T>(item: T): T {
  if (!item || typeof item !== 'object') return item;
  
  if (Array.isArray(item)) {
    return item.map(optimizeExperienceImages) as unknown as T;
  }

  const result: any = { ...item };
  for (const key of Object.keys(result)) {
    const val = result[key];
    if (typeof val === 'string' && val.includes('res.cloudinary.com') && val.includes('/upload/')) {
      result[key] = optimizeCloudinaryUrl(val);
    } else if (typeof val === 'object' && val !== null) {
      result[key] = optimizeExperienceImages(val);
    }
  }
  return result;
}
