// ============================================================
//  GitHub OAuth handler for the Decap CMS admin login.
//  The client secret lives in Netlify env vars (server-side) —
//  it is never sent to the browser. This is the real security
//  behind the "Owner" login.
//
//  Needs two Netlify environment variables:
//    OAUTH_CLIENT_ID      (from your GitHub OAuth app)
//    OAUTH_CLIENT_SECRET  (from your GitHub OAuth app)
// ============================================================

const CLIENT_ID = process.env.OAUTH_CLIENT_ID;
const CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET;

exports.handler = async (event) => {
  const host = event.headers.host;
  const redirectUri = `https://${host}/.netlify/functions/auth`;
  const params = event.queryStringParameters || {};

  // ---- Phase 2: GitHub sent us back here with ?code=... ----
  if (params.code) {
    try {
      const resp = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          code: params.code,
          redirect_uri: redirectUri,
        }),
      });
      const data = await resp.json();
      if (data.access_token) {
        return page("success", { token: data.access_token, provider: "github" });
      }
      return page("error", { error: data.error_description || "No access token returned" });
    } catch (err) {
      return page("error", { error: String(err) });
    }
  }

  // ---- Phase 1: start the login — bounce to GitHub ----
  const authUrl =
    "https://github.com/login/oauth/authorize" +
    `?client_id=${CLIENT_ID}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    "&scope=repo" +
    "&state=decap";
  return { statusCode: 302, headers: { Location: authUrl }, body: "" };
};

// Renders the tiny page that hands the token back to the CMS window.
function page(status, content) {
  const payload = JSON.stringify(content);
  const html = `<!doctype html><html><head><meta charset="utf-8"></head><body>
<script>
  (function () {
    function receive(e) {
      window.opener.postMessage(
        'authorization:github:${status}:' + ${JSON.stringify(payload)},
        e.origin
      );
      window.removeEventListener('message', receive, false);
    }
    window.addEventListener('message', receive, false);
    window.opener.postMessage('authorizing:github', '*');
  })();
</script>
<p>Signing you in… you can close this window.</p>
</body></html>`;
  return { statusCode: 200, headers: { "Content-Type": "text/html" }, body: html };
}
