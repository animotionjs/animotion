# Contributing

Animotion is a monorepo using [pnpm workspaces](https://pnpm.io/workspaces) for easier organization.

| Package     | Description   |
| ----------- | ------------- |
| `create`    | Animotion CLI |
| `docs`      | Documentation |
| `animotion` | Animotion     |

## Clone or Fork the Project

```sh
git clone https://github.com/animotionjs/animotion
```

## Install Dependencies

If you run this at the root of your project it's going to install the dependecies for every package.

```sh
pnpm i
```

## Docs

The docs use [SvelteKit](https://kit.svelte.dev/) but you don't have to know SvelteKit to contribute. If you find a mistake you can use the GitHub UI or the web editor if you press `.` in the browser for quick edits.

```sh
pnpm docs:dev
```

This is going to start the development server for the docs at http://localhost:5173/.

## Animotion

Animotion is just a Svelte project using Vite as the build tool.

```sh
pnpm animotion:dev
```

This is going to start the development server for Animotion at http://localhost:5173/.

These scripts are something I made up but it's the same as using `cd` to navigate into the respective package directory and using `pnpm run dev`, or `pnpm run build` and `pnpm run preview` for the package but it's easier being able to do it from the root of your project.
