# Getting started

Animotion uses [pnpm](https://pnpm.io/) as the package manager. If you don't have pnpm installed the easiest method to install it is using npm
assuming you have [Node.js](https://nodejs.org/en) installed:

```text
npm install -g pnpm
```

## Create a new Animotion presentation

Run the Animotion CLI:

```text
npm create @animotion@latest
```

If you're using Windows and it doesn't work:

```text
npx @animotion/create
```

This is going to copy the [Animotion template](https://github.com/animotionjs/animotion/tree/main/packages/create/template) and install the dependencies for you.

```text
┌ Welcome to Animotion!
│
◇ Where should I create your project?
│  (press Enter to use the current directory)
│
◇ Pick the template you want to use:
│  Default
│
◇ Install dependencies? (requires pnpm)
│  Yes
│
◇ Installed dependencies.
│
└  Done. 🪄

💿️ Start the development server:
pnpm run dev

💬 Discord
https://joyofcode.xyz/invite
```

Install the dependencies if you haven't during the setup:

```text
pnpm i
```

Start the development server:

```text
pnpm run dev
```

Open [http://localhost:5173/](http://localhost:5173/) in your browser.