import { test } from "node:test";
import assert from "node:assert/strict";
import {
  DEFAULT_HERO_SLIDES,
  heroPayload,
  heroSignature,
} from "../src/lib/heroModel.js";

test("main slideshow preserves order and user text but excludes signed URLs", () => {
  const config = {
    slides: DEFAULT_HERO_SLIDES.map((slide) => ({
      ...slide,
      url: "https://temporary.example/image",
    })),
  };
  const payload = heroPayload({
    ...config,
    slides: [...config.slides].reverse(),
  });
  assert.equal(payload.slides[0].path, DEFAULT_HERO_SLIDES[3].path);
  assert.equal(payload.slides[0].title, DEFAULT_HERO_SLIDES[3].title);
  assert.equal(payload.slides[0].url, undefined);
  assert.equal(
    heroSignature(config),
    heroSignature({
      slides: config.slides.map((slide) => ({ ...slide, url: "new" })),
    }),
  );
  assert.notEqual(
    heroSignature(config),
    heroSignature({
      slides: config.slides.map((slide, i) =>
        i === 0 ? { ...slide, title: "수정" } : slide,
      ),
    }),
  );
});
test("main slideshow rejects empty, oversized, external, duplicate and invalid photo settings", () => {
  const first = DEFAULT_HERO_SLIDES[0];
  for (const slides of [
    [],
    Array(11).fill(first),
    [{ ...first, path: "https://example.com/image.jpg" }],
    [first, first],
    [{ ...first, title: " " }],
    [{ ...first, badge: "가".repeat(81) }],
    [{ ...first, fit: "stretch" }],
  ])
    assert.throws(() => heroPayload({ slides }));
  assert.equal(
    heroPayload({
      slides: [
        {
          ...first,
          path: "hero/11111111-1111-4111-8111-111111111111.webp",
          fit: "contain",
        },
      ],
    }).slides[0].fit,
    "contain",
  );
});
