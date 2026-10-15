export const CATEGORIES = {
  apartment: "아파트",
  house: "단독주택",
  commercial: "상가 / 오피스",
};
export const MAX_IMAGES = 20;
export const MAX_UPLOAD_BYTES = 20 * 1024 * 1024;
export const MAX_STORED_BYTES = 5 * 1024 * 1024;

export function newProject() {
  return {
    id: crypto.randomUUID(),
    title: "",
    category: "apartment",
    location: "",
    area: "",
    description: "",
    images: [],
    status: "draft",
    sort_order: 0,
  };
}

export function projectPayload(project) {
  const area =
    project.area === "" || project.area == null ? null : Number(project.area);
  const order = Number(project.sort_order);
  const title = project.title.trim();
  if (!title || title.length > 100)
    throw new Error("현장명을 1~100자로 입력해 주세요.");
  if (!CATEGORIES[project.category])
    throw new Error("공간 유형을 선택해 주세요.");
  if (area !== null && (!Number.isInteger(area) || area < 1 || area > 1000))
    throw new Error("평수는 1~1,000 사이의 정수로 입력해 주세요.");
  if (!Number.isInteger(order) || Math.abs(order) > 100000)
    throw new Error(
      "표시 순서는 -100,000~100,000 사이의 정수로 입력해 주세요.",
    );
  if (project.location.length > 160 || project.description.length > 10000)
    throw new Error("위치는 160자, 설명은 10,000자까지 입력할 수 있습니다.");
  if (!["draft", "published"].includes(project.status))
    throw new Error("공개 상태를 선택해 주세요.");
  if (project.images.length > MAX_IMAGES)
    throw new Error(`사진은 최대 ${MAX_IMAGES}장까지 등록할 수 있습니다.`);
  const images = project.images.map(({ path, caption = "" }) => {
    if (!new RegExp(`^projects/${project.id}/[a-f0-9-]+\\.webp$`).test(path))
      throw new Error("사진 경로를 확인해 주세요.");
    if (caption.length > 200)
      throw new Error("사진 설명은 200자까지 입력해 주세요.");
    return { path, caption: caption.trim() };
  });
  if (new Set(images.map((image) => image.path)).size !== images.length)
    throw new Error("중복된 사진이 있습니다.");
  if (project.status === "published" && !images.length)
    throw new Error("공개하려면 사진을 1장 이상 등록해 주세요.");
  return {
    id: project.id,
    title,
    category: project.category,
    location: project.location.trim(),
    area,
    description: project.description.trim(),
    status: project.status,
    sort_order: order,
    images,
  };
}

export function projectSignature(project) {
  return JSON.stringify({
    ...project,
    updated_at: undefined,
    created_at: undefined,
    images: project.images.map(({ path, caption = "" }) => ({ path, caption })),
  });
}
