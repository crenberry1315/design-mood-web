/* oxlint-disable no-unused-expressions -- Playwright CLI evaluates this function. */
async (page) => {
  const pattern = '**/storage/v1/object/sign/portfolio-images/projects/**/11111111-1111-4111-8111-111111111111.webp*';
  await page.route(pattern, route => route.fulfill({contentType:'image/svg+xml',body:'<svg xmlns="http://www.w3.org/2000/svg" width="240" height="160"><rect width="240" height="160" fill="#705d48"/></svg>'}));
  await page.getByRole('button',{name:'확대보기 닫기',exact:true}).click();
  await page.getByRole('button',{name:'상세보기 닫기',exact:true}).click();
  await page.setViewportSize({width:1440,height:1000});
  await page.reload();
  await page.getByRole('button',{name:'워터마크 검증용 시공 사례 상세보기',exact:true}).click();
  await page.getByRole('button',{name:'사진 1 크게 보기',exact:true}).click();
  const layer = page.locator('.photo-lightbox-viewport .watermarked-image__bounds');
  await layer.waitFor();
  const dimensions = await layer.boundingBox();
  if (dimensions.width!==240 || dimensions.height!==160) throw new Error('Small photo must keep intrinsic dimensions in fitted view');
  await page.screenshot({path:'output/playwright/watermark-small-photo.png'});
  await page.unroute(pattern);
  page.__wmState.smallPhotoPassed = true;
  return {smallPhoto:'PASS', width:dimensions.width,height:dimensions.height};
}
