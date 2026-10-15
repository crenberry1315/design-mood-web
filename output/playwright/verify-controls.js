// eslint-disable-next-line no-unused-expressions -- Playwright CLI evaluates this function expression.
async (page) => {
  const results = [];
  const assert = (condition, message) => { if (!condition) throw new Error(message); };
  const slider = page.getByRole('slider', { name: '2. 시공 평수 선택' });
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await slider.scrollIntoViewIfNeeded();
    const geometry = await slider.evaluate((el) => {
      const rect = el.getBoundingClientRect();
      const marks = el.closest('.pyeong-control').querySelectorAll('.pyeong-mark');
      return [...marks].map((mark) => {
        const box = mark.getBoundingClientRect();
        const expected = rect.x + 10 + (rect.width - 20) * (parseInt(mark.textContent) - 15) / 45;
        return { mark: mark.textContent, error: Math.abs(box.x + box.width / 2 - expected) };
      });
    });
    assert(geometry.length === 5, 'Five correctly positioned marks required');
    assert(geometry.every((x) => x.error < 1), `Misaligned marks at ${width}px: ${JSON.stringify(geometry)}`);
    for (const value of [15, 24, 32, 45, 60]) {
      await page.getByRole('button', { name: `${value}평 선택`, exact: true }).click();
      assert(await slider.inputValue() === String(value), `Mark ${value} did not select its value`);
      assert((await page.locator('.pyeong-value').innerText()).includes(`${value} 평`), 'Readout mismatch');
      assert((await page.locator('.pyeong-value').innerText()).includes(`${Math.round(value * 3.3)}㎡`), 'Area mismatch');
      assert((await page.locator('.calc-result-box').innerText()).includes(`${value}평형 기준`), 'Summary mismatch');
      const min = Math.round(145 * value * 0.9 / 10) * 10;
      const max = Math.round(145 * value * 1.1 / 10) * 10;
      assert((await page.locator('.calc-price-main').innerText()).includes(min.toLocaleString('en-US')), 'Minimum estimate mismatch');
      assert((await page.locator('.calc-price-sub').innerText()).includes(max.toLocaleString('en-US')), 'Maximum estimate mismatch');
    }
    await slider.focus();
    await slider.press('Home');
    assert(await slider.inputValue() === '15', 'Home failed');
    await slider.press('End');
    assert(await slider.inputValue() === '60', 'End failed');
    await page.getByRole('button', { name: '32평 선택', exact: true }).click();
    await slider.focus();
    await slider.press('ArrowRight');
    assert(await slider.inputValue() === '33', 'ArrowRight failed');
    await slider.press('ArrowLeft');
    assert(await slider.inputValue() === '32', 'ArrowLeft failed');
    const box = await slider.boundingBox();
    // Reproduce the reported mid-track 37-pyeong case with real pointer input.
    const x = box.x + 10 + (box.width - 20) * 22 / 45;
    await page.mouse.click(x, box.y + box.height / 2);
    assert(await slider.inputValue() === '37', 'Pointer position must select 37');
    await page.mouse.move(x, box.y + box.height / 2);
    await page.mouse.down();
    await page.mouse.move(box.x + 10 + (box.width - 20) * 30 / 45, box.y + box.height / 2, { steps: 8 });
    await page.mouse.up();
    assert(await slider.inputValue() === '45', 'Drag must select 45');
    const map = page.getByRole('img', { name: '디자인무드 오시는 길 약도' });
    assert(await map.count() === 1, 'Accessible vector map missing');
    const mapSize = await map.boundingBox();
    assert(Math.abs(mapSize.width / mapSize.height - 900 / 640) < 0.01, 'Map aspect ratio changed');
    const overflow = await page.locator('.calc-card, .location-card').evaluateAll((cards) => cards.map((card) => ({
      width: card.clientWidth, scrollWidth: card.scrollWidth,
      left: card.getBoundingClientRect().left, right: card.getBoundingClientRect().right,
    })));
    assert(overflow.every((r) => r.scrollWidth <= r.width + 1 && r.left >= 0 && r.right <= width), `Card overflow at ${width}`);
    results.push({ width, maxTickErrorPx: Math.max(...geometry.map((x) => x.error)), marks: '5 passed', keyboard: 'passed', pointerAndDrag: 'passed', estimate: 'passed', mapAspectAndOverflow: 'passed' });
  }
  for (const space of ['단독주택', '상가 / 오피스', '아파트']) {
    await page.getByRole('button', { name: space, exact: true }).click();
    assert((await page.locator('.calc-result-box').innerText()).includes('45평형 기준'), 'Space change lost selected area');
  }
  await page.getByRole('button', { name: '이 견적으로 디테일 상담 신청' }).click();
  assert((await page.locator('textarea').inputValue()).includes('45평형'), 'Consultation preset lost area');
  assert((await page.locator('.location-card a', { hasText: '네이버 지도' }).getAttribute('href')).includes('21-20'), 'Naver map target changed');
  assert((await page.locator('.location-card a', { hasText: '카카오맵' }).getAttribute('href')).includes('21-20'), 'Kakao map target changed');
  await page.getByRole('button', { name: '32평 선택', exact: true }).click();
  await page.evaluate((report) => { window.__designMoodVerification = report; }, { results, consultationPreset: 'passed', mapLinks: 'passed' });
}
