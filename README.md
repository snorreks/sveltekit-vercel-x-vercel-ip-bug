# Vercel sveltekit x-vercel-ip-country bug

This repo is a minimal reproduction of a bug I'm seeing with Vercel and sveltekit.

## Steps to reproduce

1. Deploy this repo to Vercel.
2. Visit the deployed site.
3. If you go to index page, then click on "test" in Header, you'll see the correct country code.
4. If you directly load the /test page, you'll see the wrong country code.