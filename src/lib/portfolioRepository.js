import { supabase } from "./supabase";
import { projectPayload } from "./portfolioModel";

const BUCKET = "portfolio-images";
const requireBackend = () => {
  if (!supabase) throw new Error("관리자 서비스 연결을 준비하고 있습니다.");
  return supabase;
};
const check = ({ data, error }) => {
  if (error) throw error;
  return data;
};

export async function withImageUrls(projects) {
  const paths = [
    ...new Set(
      projects.flatMap((project) => project.images.map((image) => image.path)),
    ),
  ];
  if (!paths.length) return projects;
  // An image-signing outage must not make an already committed save look unsuccessful.
  let signed = [];
  try {
    signed = check(
      await requireBackend().storage.from(BUCKET).createSignedUrls(paths, 600),
    );
  } catch {
    /* Retain the content; retry photo URLs on refresh. */
  }
  const urls = new Map(signed.map((item) => [item.path, item.signedUrl]));
  return projects.map((project) => ({
    ...project,
    images: project.images.map((image) => ({
      ...image,
      url: urls.get(image.path) || "",
    })),
  }));
}

export async function listProjects(admin = false) {
  let query = requireBackend()
    .from("portfolio_projects")
    .select("*")
    .order("sort_order")
    .order("created_at", { ascending: false });
  if (!admin) query = query.eq("status", "published");
  return withImageUrls(check(await query));
}

export async function isPortfolioAdmin() {
  return check(await requireBackend().rpc("is_portfolio_admin")) === true;
}

export async function saveProject(project) {
  const payload = projectPayload(project);
  const query = project.updated_at
    ? requireBackend()
        .from("portfolio_projects")
        .update(payload)
        .eq("id", project.id)
        .eq("updated_at", project.updated_at)
    : requireBackend().from("portfolio_projects").insert(payload);
  const records = check(await query.select());
  if (!records.length)
    throw new Error(
      "다른 창에서 수정되었거나 편집 권한이 변경되었습니다. 목록을 새로 불러와 주세요.",
    );
  return (await withImageUrls(records))[0];
}

export async function deleteProject(project) {
  const records = check(
    await requireBackend()
      .from("portfolio_projects")
      .delete()
      .eq("id", project.id)
      .eq("updated_at", project.updated_at)
      .select("id"),
  );
  if (!records.length)
    throw new Error(
      "삭제되지 않았습니다. 다른 창의 변경 사항이나 관리자 권한을 확인해 주세요.",
    );
}

export async function uploadImage(projectId, blob) {
  const path = `projects/${projectId}/${crypto.randomUUID()}.webp`;
  check(
    await requireBackend()
      .storage.from(BUCKET)
      .upload(path, blob, { contentType: "image/webp", upsert: false }),
  );
  return { path, caption: "", url: URL.createObjectURL(blob) };
}

export async function removeImages(paths) {
  if (paths.length)
    check(await requireBackend().storage.from(BUCKET).remove(paths));
}
