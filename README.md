# NISMO EV 3.2 — OneSignal-only service worker

## GitHub changes

1. Delete `sw.js` from the repository.
2. Replace `index.html` with this version.
3. Keep:
   - `OneSignalSDKWorker.js`
   - `manifest.json`
   - `icon-192.svg`
   - `icon-512.svg`

Do not upload a new `sw.js`.

## First launch

After GitHub Pages deploys:

1. Delete NISMO EV from the iPhone Home Screen.
2. Remove website data for `nismoev.github.io` in Safari settings.
3. Add the site to the Home Screen again.
4. Open it from the Home Screen.
5. Go to Diagnostics and tap `RESET PUSH SETUP` once.
6. After reload, go to Timer and tap `ENABLE NOTIFICATIONS`.
7. Check Diagnostics. The worker URL should end in `OneSignalSDKWorker.js`, `Opted in` should be `true`, and Subscription ID should not be `none`.
