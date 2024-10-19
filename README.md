# Ask Odin
A tool for finding Twitch raid targets based on your followed channels.

I made this because it would be useful to me, and potentially others. Also, I wanted to try Svelte. It's pretty good.

## Twitch API

[Reference](https://dev.twitch.tv/docs/api/reference/) (this app uses the "Get Users" (for current user) and and "Get Followed Streams")

[Auth](https://dev.twitch.tv/docs/authentication/getting-tokens-oauth/) (this app uses Implicit grant flow)

## Svelte stuff

### Developing

Once you've installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

### Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

This app is deployed to Github pages via Github Action Workflows.
