# NISMO EV Worker diagnostic update

Replace `worker.js` in the GitHub repository with this file.

This update:
- Removes the extra `web_url` field
- Keeps the supported `url` field
- Logs OneSignal's exact HTTP status and response body in Cloudflare Logs
- Returns the OneSignal status to the app when scheduling fails

Cloudflare should automatically deploy after the GitHub commit.
