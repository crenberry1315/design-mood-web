import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
export const isBackendConfigured = Boolean(url && key);
// Only the publishable key belongs in this app. Never use a service-role/secret key.
if (key?.startsWith("sb_secret_"))
  throw new Error("서버 전용 키는 브라우저에 사용할 수 없습니다.");
export const supabase = isBackendConfigured
  ? createClient(url, key, {
      auth: {
        storage: window.sessionStorage,
        storageKey: "design-mood-admin",
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;
