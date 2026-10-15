import { loadEnv } from "vite";
const config = {
  ...loadEnv(process.argv[2] || "production", process.cwd(), "VITE_"),
  ...process.env,
};
const url = config.VITE_SUPABASE_URL;
const key = config.VITE_SUPABASE_PUBLISHABLE_KEY;
if (
  !url ||
  !key?.startsWith("sb_publishable_") ||
  !/^https:\/\/[a-z0-9]+\.supabase\.co\/?$/.test(url)
) {
  console.error(
    "Set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY before deploying. Only a publishable key is accepted.",
  );
  process.exit(1);
}
console.log("Supabase public connection settings validated.");
