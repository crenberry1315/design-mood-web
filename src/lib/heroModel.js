export const MAX_HERO_SLIDES = 10;
export const DEFAULT_HERO_SLIDES = [
  {
    path: "/hero/store-real-opt.jpg",
    badge: "춘천 우두동 매장 실제 모습",
    title: "실제 장판, 마루, 벽지, 타일 샘플 직접 확인이 가능한 매장",
    fit: "cover",
  },
  {
    path: "/hero/hero-site-1-crisp.jpg",
    badge: "모던 미니멀 인테리어",
    title: "간접조명과 화이트 톤으로 확장감을 극대화한 모던 미니멀 인테리어",
    fit: "cover",
  },
  {
    path: "/hero/hero-site-2-crisp.jpg",
    badge: "모던 화이트 주방",
    title: "600각 포세린 타일과 간접 조명으로 완성한 모던 화이트 주방",
    fit: "cover",
  },
  {
    path: "/hero/hero-site-3-opt.jpg",
    badge: "거실 시공 연출",
    title: "실링팬과 우물천장 간접조명으로 완성한 거실",
    fit: "cover",
  },
];
const bundled = new Set(DEFAULT_HERO_SLIDES.map((slide) => slide.path));
export function isHeroUpload(path) {
  return /^hero\/[a-f0-9-]{36}\.webp$/.test(path);
}
export function heroPayload(config) {
  if (
    !Array.isArray(config.slides) ||
    config.slides.length < 1 ||
    config.slides.length > MAX_HERO_SLIDES
  )
    throw new Error(`메인 사진은 1~${MAX_HERO_SLIDES}장으로 구성해 주세요.`);
  const slides = config.slides.map(
    ({ path, title, badge = "", fit = "cover" }) => {
      if (!bundled.has(path) && !isHeroUpload(path))
        throw new Error("메인 사진 경로를 확인해 주세요.");
      if (
        typeof title !== "string" ||
        !title.trim() ||
        title.trim().length > 200
      )
        throw new Error("사진 문구를 1~200자로 입력해 주세요.");
      if (typeof badge !== "string" || badge.length > 80)
        throw new Error("짧은 제목은 80자까지 입력해 주세요.");
      if (!["cover", "contain"].includes(fit))
        throw new Error("사진 표시 방식을 선택해 주세요.");
      return { path, title: title.trim(), badge: badge.trim(), fit };
    },
  );
  if (new Set(slides.map((slide) => slide.path)).size !== slides.length)
    throw new Error("같은 메인 사진을 중복 등록할 수 없습니다.");
  return { slides };
}
export function heroSignature(config) {
  return JSON.stringify(
    config.slides.map(({ path, title, badge, fit }) => ({
      path,
      title,
      badge,
      fit,
    })),
  );
}
