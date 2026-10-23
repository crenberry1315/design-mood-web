/* oxlint-disable no-unused-expressions -- Playwright CLI evaluates this function. */
async (page) => {
  // Local UI verification only: no production writes or real authentication.
  const state = {
    project: {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', title: '워터마크 검증용 시공 사례',
      category: 'apartment', location: '', area: 32, description: '로컬 검증용 데이터',
      status: 'published', sort_order: 0, updated_at: '2026-10-23T00:00:00Z',
      images: [
        { path: 'projects/aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa/11111111-1111-4111-8111-111111111111.webp', caption: '가로 사진', description: '첫 사진' },
        { path: 'projects/aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa/22222222-2222-4222-8222-222222222222.webp', caption: '세로 사진', description: '두 번째 사진', watermark: false },
      ],
    },
    hero: { id: 'main', updated_at: '2026-10-23T00:00:00Z', slides: [
      {path: '/hero/hero-site-1-crisp.jpg', title: '메인 사진 검증', badge: '로컬 미리보기', fit: 'cover'},
      {path: '/hero/hero-site-2-crisp.jpg', title: '두 번째 메인 사진', badge: '로컬 미리보기', fit: 'contain'},
    ]},
    saves: [], errors: [], uploads: [],
  };
  page.__wmState = state;
  page.on('pageerror', (error) => state.errors.push(error.message));
  const user = { id: '11111111-1111-4111-8111-111111111111', aud: 'authenticated', role: 'authenticated', email: 'local-qa@example.invalid', user_metadata: {}, app_metadata: {} };
  await page.addInitScript((user) => {
    sessionStorage.setItem('design-mood-admin', JSON.stringify({
      access_token: 'local-qa-token', refresh_token: 'local-qa-refresh', token_type: 'bearer',
      expires_at: Math.floor(Date.now()/1000)+3600, expires_in: 3600, user,
    }));
  }, user);
  await page.route('https://*.supabase.co/**', async (route) => {
    const req = route.request();
    const url = new URL(req.url());
    const json = (data) => route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(data) });
    if (url.pathname.startsWith('/auth/')) return json(url.pathname.endsWith('/user') ? user : { user });
    if (url.pathname.endsWith('/rpc/is_portfolio_admin')) return json(true);
    if (url.pathname.endsWith('/portfolio_projects')) {
      if (req.method() === 'PATCH' || req.method() === 'POST') {
        state.project = { ...state.project, ...req.postDataJSON(), updated_at: new Date().toISOString() };
        state.saves.push({ type: 'portfolio', payload: req.postDataJSON() });
      }
      return json([state.project]);
    }
    if (url.pathname.endsWith('/homepage_hero')) {
      if (req.method() === 'PATCH') {
        state.hero = { ...state.hero, ...req.postDataJSON(), updated_at: new Date().toISOString() };
        state.saves.push({ type: 'hero', payload: req.postDataJSON() });
        return json([state.hero]);
      }
      return json(state.hero);
    }
    if (url.pathname === '/storage/v1/object/sign/portfolio-images') {
      return json(req.postDataJSON().paths.map((path) => ({ path, error: null, signedURL: '/object/sign/portfolio-images/'+path+'?token=local-qa' })));
    }
    if (url.pathname.startsWith('/storage/v1/object/sign/')) {
      if (url.pathname.includes('22222222-2222')) return route.fulfill({ contentType: 'image/svg+xml', body: '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1600"><rect width="800" height="1600" fill="#796653"/><rect x="90" y="90" width="620" height="1420" fill="#443b30"/><path d="M90 600H710 M90 1000H710" stroke="#bba88c" stroke-width="8"/></svg>' });
      return route.fulfill({path: 'D:/Design Mood/design-mood-web/public/hero/hero-site-1-crisp.jpg'});
    }
    if (url.pathname.startsWith('/storage/v1/object/')) {
      if (req.method() === 'POST') state.uploads.push(url.pathname);
      return json({ Key: 'local-qa', Id: 'local-qa' });
    }
    throw new Error('Unexpected Supabase request: '+req.method()+' '+url.pathname);
  });
  // Preview bundled hero images locally as well.
  await page.route('https://designmood.kr/hero/**', (route) => route.fulfill({ path: 'D:/Design Mood/design-mood-web/public'+new URL(route.request().url()).pathname }));
  await page.setViewportSize({width: 1440, height: 1000});
  await page.reload();
}
