// hooks/useUserId.ts
"use client";

/**
 * Storage key for the user ID
 */
const USER_ID_STORAGE_KEY = "dextora_user_id";

/**
 * Utility function to manually set user ID (useful for URL params)
 */
export const setUserIdCookie = (userId: string): void => {
  if (!userId || userId.trim() === "") {
    console.error("Cannot set empty userId");
    return;
  }

  try {
    sessionStorage.setItem(USER_ID_STORAGE_KEY, userId.trim());
    console.log("✅ User ID saved to sessionStorage:", userId.trim());
  } catch (err) {
    console.error("❌ Failed to set sessionStorage:", err);
  }
};

/**
 * Utility function to get user ID synchronously
 */
export const getUserIdCookie = (): string | null => {
  try {
    const value = sessionStorage.getItem(USER_ID_STORAGE_KEY);
    if (value) console.log("✅ User ID retrieved from sessionStorage:", value);
    return value;
  } catch (err) {
    console.error("❌ Failed to read sessionStorage:", err);
    return null;
  }
};

/**
 * Optional: Clear user ID
 */
export const clearUserIdCookie = (): void => {
  try {
    sessionStorage.removeItem(USER_ID_STORAGE_KEY);
    console.log("🧹 User ID cleared from sessionStorage");
  } catch (err) {
    console.error("❌ Failed to clear sessionStorage:", err);
  }
};
