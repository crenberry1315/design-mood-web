import { MAX_UPLOAD_BYTES, MAX_STORED_BYTES } from "./portfolioModel";

export async function prepareImage(file) {
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type))
    throw new Error("JPG, PNG, WebP 사진만 업로드할 수 있습니다.");
  if (file.size > MAX_UPLOAD_BYTES)
    throw new Error("원본 사진은 장당 20MB 이하로 선택해 주세요.");
  let image;
  try {
    image = await createImageBitmap(file);
  } catch {
    throw new Error("사진을 읽을 수 없습니다. 다른 파일을 선택해 주세요.");
  }
  try {
    if (image.width * image.height > 80000000)
      throw new Error(
        "사진 해상도가 너무 큽니다. 크기를 줄여 다시 선택해 주세요.",
      );
    const ratio = Math.min(1, 2400 / Math.max(image.width, image.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(image.width * ratio));
    canvas.height = Math.max(1, Math.round(image.height * ratio));
    const context = canvas.getContext("2d");
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/webp", 0.86),
    );
    if (!blob || blob.type !== "image/webp" || blob.size > MAX_STORED_BYTES)
      throw new Error(
        "사진 변환에 실패했습니다. 크기를 줄여 다시 선택해 주세요.",
      );
    return blob;
  } finally {
    image.close();
  }
}
