# Owner editor (Decap CMS) — setup

This turns your site into one you can edit from a friendly `/admin` panel: log in, change
any heading / caption / photo, hit **Publish**, and the live site rebuilds itself in ~30 sec.

It works in **three phases**. Do Phase A and B; I'll walk you through Phase C (login) live,
because it needs the site to be online first.

The site has been built and tested locally already — it builds cleanly. ✅

---

## Phase A — Put the project on GitHub  (~5 min)

You need the project in a GitHub repository so the CMS has somewhere to save edits.

1. Go to **[github.com/new](https://github.com/new)**
2. **Repository name:** `mainline-plumbing-site`  ← must match this exactly (the config points here)
3. Set it to **Public** (or Private — both work), **don't** add a README, then **Create repository**
4. On the next page, click the link **"uploading an existing file"**
5. Open the **`cms`** folder on your Mac. Select **everything inside it** (the files *and* the `src` folder) and **drag it all onto the GitHub upload area.**
   - Upload the *contents* of `cms/`, not the `cms` folder itself — so `package.json` and `src/` land at the top level of the repo.
6. Scroll down, click **Commit changes**.

✅ When done, your repo should show `package.json`, `netlify.toml`, `.eleventy.js`, and the `src/` folder.

---

## Phase B — Connect it to Netlify so it auto-builds  (~3 min)

1. Go to **[app.netlify.com](https://app.netlify.com)** → **Add new site** → **Import an existing project**
2. Choose **GitHub**, authorize if asked, and pick your **`mainline-plumbing-site`** repo
3. Netlify reads the build settings automatically (from `netlify.toml`) — you should see:
   - **Build command:** `npm run build`
   - **Publish directory:** `_site`
   Leave those as-is.
4. Click **Deploy**. Wait ~1 minute — watch it say "Published."
5. Open the new site URL it gives you. It should look **exactly** like your current site.

> **Your old drag-and-drop site stays untouched** at `inquisitive-fairy-83876d.netlify.app` as a safety net.
> Once this new one looks right, we make it the main one (and can even move your custom name over).

**Tell me when Phase B is live** (paste the new URL). Then we do Phase C together.

---

## Phase C — Turn on the Owner login  (we'll do this live)

This is the one fiddly part — the `/admin` panel needs a GitHub login so only you can edit.
It needs the site to be online first (Phase B), so we'll do it step-by-step like the Google Sheet.
Roughly, it involves:
- Registering a small "OAuth app" in your GitHub settings (I give you every field)
- Pasting two values into Netlify
- Then visiting `your-site.netlify.app/admin` and logging in with GitHub

After that: **`/admin` → log in → edit anything → Publish → live.** That's the whole vision.

---

## How editing will work (once Phase C is done)

- Go to **`your-site.netlify.app/admin`**
- Log in with GitHub (only you can — that's the "Owner" gate, and it's *real* security, not a JS password)
- You'll see **7 sections**: Business details · Hero · Services · How it works · Reviews · Photo gallery · Service area
- Click any one, edit the text or **upload a new photo**, then **Publish**
- ~30 seconds later the live site shows your change

## A note on the password idea
You originally wanted an "Owner" button with the password `12345`. I built it the secure way instead:
a real GitHub login. A typed-in password on a public page can be read by anyone who views the page
source — so it wouldn't actually protect your site. GitHub login is the genuine version of what you wanted.
