import { supabase } from "./supabase";
import { heroPayload, isHeroUpload } from "./heroModel";
import { withImageUrls } from "./portfolioRepository";

async function withHeroUrls(config) {
  const [{ images }] = await withImageUrls([
    { images: config.slides.filter((slide) => isHeroUpload(slide.path)) },
  ]);
  const urls = new Map(images.map((image) => [image.path, image.url]));
  return {
    ...config,
    slides: config.slides.map((slide) => ({
      ...slide,
      url: isHeroUpload(slide.path)
        ? urls.get(slide.path) || ""
        : `https://designmood.kr${slide.path}`,
    })),
  };
}
export async function loadHero() {
  const { data, error } = await supabase
    .from("homepage_hero")
    .select("*")
    .eq("id", "main")
    .single();
  if (error) throw error;
  return withHeroUrls(data);
}
export async function saveHero(config) {
  const { data, error } = await supabase
    .from("homepage_hero")
    .update(heroPayload(config))
    .eq("id", "main")
    .eq("updated_at", config.updated_at)
    .select();
  if (error) throw error;
  if (!data.length)
    throw new Error(
      "다른 창에서 수정되었거나 권한이 변경되었습니다. 입력 내용을 보관한 뒤 다시 불러와 주세요.",
    );
  return withHeroUrls(data[0]);
}
export async function uploadHero(blob) {
  const path = `hero/${crypto.randomUUID()}.webp`;
  const { error } = await supabase.storage
    .from("portfolio-images")
    .upload(path, blob, { contentType: "image/webp", upsert: false });
  if (error) throw error;
  return {
    path,
    url: URL.createObjectURL(blob),
    badge: "",
    title: "",
    fit: "cover",
  };
}
