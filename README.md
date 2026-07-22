# NISMO EV 3.0

Replace these files in the repository root:

- `index.html`
- `manifest.json`
- `sw.js`

Keep these existing files:

- `OneSignalSDKWorker.js`
- `icon-192.svg`
- `icon-512.svg`

After committing, wait for GitHub Pages to deploy. Delete the existing Home Screen app and add it again.

The app includes OneSignal permission setup, a persistent countdown, sound, vibration, local notification support, and charging history. A unique push notification scheduled for a future finish time while the app is fully closed requires a secure backend. Never put a OneSignal REST API key in the public website.
