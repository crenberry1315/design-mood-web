import { test } from "node:test";
import assert from "node:assert/strict";
import {
  newProject,
  projectPayload,
  projectSignature,
} from "../src/lib/portfolioModel.js";

test("per-photo watermarks default OFF, survive save/reorder, and mark edits dirty", () => {
  const project = { ...newProject(), title: "현장" };
  const image = { path: `projects/${project.id}/11111111-1111-4111-8111-111111111111.webp` };
  project.images = [image];
  assert.equal(projectPayload(project).images[0].watermark, false);
  assert.equal(projectSignature(project), projectSignature({ ...project, images: [{ ...image, watermark: false }] }));
  const enabled = { ...project, images: [{ ...image, watermark: true }] };
  assert.equal(projectPayload(enabled).images[0].watermark, true);
  assert.notEqual(projectSignature(project), projectSignature(enabled));
  const second = { ...image, path: `projects/${project.id}/22222222-2222-4222-8222-222222222222.webp`, watermark: false };
  const reordered = projectPayload({ ...project, images: [second, enabled.images[0]] });
  assert.deepEqual(reordered.images.map((photo) => photo.watermark), [false, true]);
  for (const watermark of ["false", 1, null])
    assert.throws(() => projectPayload({ ...project, images: [{ ...image, watermark }] }), /워터마크/);
});

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

test("per-slide descriptions survive save and reordering, and mark edits dirty", () => {
  const project = {
    ...newProject(),
    title: "아파트 인테리어",
    location: "공개하지 않을 위치",
  };
  project.images = [
    "11111111-1111-4111-8111-111111111111",
    "22222222-2222-4222-8222-222222222222",
  ].map((id, i) => ({
    path: `projects/${project.id}/${id}.webp`,
    caption: `사진 ${i + 1}`,
    description: `설명 ${i + 1}\n자재 디테일`,
  }));
  const before = projectSignature(project);
  const saved = projectPayload({
    ...project,
    images: [...project.images].reverse(),
  });
  assert.equal(saved.location, "");
  assert.equal(saved.images[0].description, "설명 2\n자재 디테일");
  assert.notEqual(
    before,
    projectSignature({
      ...project,
      images: [
        { ...project.images[0], description: "수정" },
        project.images[1],
      ],
    }),
  );
  assert.throws(
    () =>
      projectPayload({
        ...project,
        images: [{ ...project.images[0], description: "가".repeat(2001) }],
      }),
    /부연설명/,
  );
});
