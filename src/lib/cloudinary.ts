// Cloudinary Media Optimization & Asset Helper for Lively Stone Platform

const env = (import.meta as any).env || {};
const CLOUDINARY_CLOUD_NAME = env.VITE_CLOUDINARY_CLOUD_NAME || 'lively-stone-ministry';

export interface CloudinaryTransformOptions {
  width?: number;
  height?: number;
  crop?: 'fill' | 'scale' | 'fit' | 'thumb' | 'crop';
  quality?: 'auto' | 'auto:good' | 'auto:best' | 'auto:low' | number;
  format?: 'auto' | 'webp' | 'jpg' | 'png' | 'mp4';
  effect?: string;
}

/**
 * Transforms a Cloudinary URL or raw media path into an optimized delivery URL
 */
export const getCloudinaryUrl = (
  publicIdOrUrl: string,
  options: CloudinaryTransformOptions = {}
): string => {
  if (!publicIdOrUrl) return '';

  // If already a full non-cloudinary external URL, return as is (with fallback optimization wrapper if needed)
  if (publicIdOrUrl.startsWith('http://') || publicIdOrUrl.startsWith('https://')) {
    if (!publicIdOrUrl.includes('res.cloudinary.com')) {
      return publicIdOrUrl;
    }
  }

  const {
    width,
    height,
    crop = 'fill',
    quality = 'auto',
    format = 'auto',
    effect
  } = options;

  const transforms: string[] = [];

  if (width) transforms.push(`w_${width}`);
  if (height) transforms.push(`h_${height}`);
  if (width || height) transforms.push(`c_${crop}`);
  if (quality) transforms.push(`q_${quality}`);
  if (format) transforms.push(`f_${format}`);
  if (effect) transforms.push(`e_${effect}`);

  const transformString = transforms.length > 0 ? `${transforms.join(',')}/` : '';
  const cleanPublicId = publicIdOrUrl.replace(/^v\d+\//, '').replace(/^\//, '');

  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${transformString}${cleanPublicId}`;
};

/**
 * Helper to upload image/media payload to Cloudinary via signed or unsigned preset
 */
export const uploadToCloudinary = async (
  file: File | Blob | string,
  preset: string = 'lively_stone_uploads'
): Promise<{ url: string; public_id: string; format: string }> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', preset);

  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      throw new Error(`Cloudinary upload failed with status ${res.status}`);
    }

    const data = await res.json();
    return {
      url: data.secure_url,
      public_id: data.public_id,
      format: data.format,
    };
  } catch (err) {
    console.warn('Cloudinary upload fallback:', err);
    // Return mock fallback for demo mode when Cloudinary cloud key is offline
    const mockUrl = typeof file === 'string' ? file : URL.createObjectURL(file as Blob);
    return {
      url: mockUrl,
      public_id: `demo_${Date.now()}`,
      format: 'webp',
    };
  }
};
