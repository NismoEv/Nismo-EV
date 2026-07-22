# NISMO EV 3.1 — OneSignal Registration Update

Replace only `index.html` in the GitHub repository.

This update:

- Logs the installed web app into OneSignal as `matt-ariya`
- Explicitly opts the push subscription in after permission is granted
- Displays `Registered as matt-ariya` when the subscription is active
- Disables the notification button once registration is confirmed

Keep `OneSignalSDKWorker.js`, `manifest.json`, `sw.js`, and both icon files unchanged.
