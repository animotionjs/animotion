# Getting started

The project uses [pnpm](https://pnpm.io/) as the package manager — if you don't have pnpm installed the easiest method to install it is using npm
assuming you have [Node.js](https://nodejs.org/en) installed.

```bash
npm install -g pnpm
```

## Create a new Animotion presentation

Run the Animotion CLI:

```bash
npm create @animotion
```

If the Animotion CLI doesn't work on Windows try:

```bash
npx @animotion/create
```

This is going to copy the [Animotion template](https://github.com/animotionjs/animotion/tree/main/packages/create/template) and install the dependencies for you.

```text
┌ Welcome to Animotion!
│
◇ Where should I create your project?
│  (press Enter to use the current directory)
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

```bash
pnpm i
```

Start the development server:

```bash
pnpm run dev
```

Open [http://localhost:5173/](http://localhost:5173/) in your browser.