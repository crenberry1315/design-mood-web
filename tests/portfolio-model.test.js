import { test } from "node:test";
import assert from "node:assert/strict";
import {
  newProject,
  projectPayload,
  projectSignature,
} from "../src/lib/portfolioModel.js";

test("published content requires a valid image while incomplete drafts can be saved", () => {
  const project = { ...newProject(), title: "  우두동 현장  " };
  assert.equal(projectPayload(project).title, "우두동 현장");
  assert.equal(projectPayload(project).area, null);
  assert.throws(
    () => projectPayload({ ...project, status: "published" }),
    /사진을 1장/,
  );
});
test("rejects image paths from another project and invalid area values", () => {
  const project = { ...newProject(), title: "현장" };
  assert.throws(
    () =>
      projectPayload({
        ...project,
        images: [{ path: "https://example.com/photo.webp" }],
      }),
    /사진 경로/,
  );
  for (const area of ["abc", 0, -1, 1001, 1.5])
    assert.throws(() => projectPayload({ ...project, area }), /평수/);
});
test("payload excludes ephemeral signed URLs and server timestamps", () => {
  const project = { ...newProject(), title: "현장" };
  project.images = [
    {
      path: `projects/${project.id}/11111111-1111-4111-8111-111111111111.webp`,
      caption: "거실",
      url: "https://signed.example/photo",
    },
  ];
  const saved = projectPayload({ ...project, updated_at: "yesterday" });
  assert.equal(saved.images[0].url, undefined);
  assert.equal(saved.updated_at, undefined);
  assert.equal(
    projectSignature(project),
    projectSignature({
      ...project,
      images: [{ ...project.images[0], url: "new" }],
    }),
  );
});
