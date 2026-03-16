import { supabase } from './supabase';

/**
 * Extracts the storage path from a Supabase public URL.
 * @param url The public URL of the file.
 * @param bucket The bucket name.
 * @returns The storage path relative to the bucket.
 */
export const getStoragePathFromUrl = (url: string, bucket: string = 'product-images'): string | null => {
  if (!url) return null;
  const parts = url.split(`/public/${bucket}/`);
  return parts.length > 1 ? parts[1] : null;
};

/**
 * Deletes a file from Supabase Storage given its public URL.
 * @param url The public URL of the file.
 * @param bucket The bucket name.
 */
export const deleteFileFromStorage = async (url: string, bucket: string = 'product-images') => {
  const path = getStoragePathFromUrl(url, bucket);
  if (!path) return;

  const { error } = await supabase.storage.from(bucket).remove([path]);
  if (error) {
    console.error(`Error deleting file ${path} from bucket ${bucket}:`, error);
  }
};

/**
 * Deletes multiple files from Supabase Storage given their public URLs.
 * @param urls Array of public URLs.
 * @param bucket The bucket name.
 */
export const deleteFilesFromStorage = async (urls: string[], bucket: string = 'product-images') => {
  const paths = urls
    .map(url => getStoragePathFromUrl(url, bucket))
    .filter((path): path is string => path !== null);

  if (paths.length === 0) return;

  const { error } = await supabase.storage.from(bucket).remove(paths);
  if (error) {
    console.error(`Error deleting files from bucket ${bucket}:`, error);
  }
};
