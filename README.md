# Keynote

<div align="center">
 <img src="packages/docs/static/logo.png" alt="Keynote logo">
</div>

## What Is Keynote?

Keynote is a presentational framework for creating beautiful slides and visualizing ideas with code.

## Contributing

Keynote is a monorepo using [pnpm workspaces](https://pnpm.io/workspaces) for easier organization broken down into these packages.

| Package          | Description   |
| ---------------- | ------------- |
| `create-keynote` | Keynote CLI   |
| `docs`           | Documentation |
| `keynote`        | Keynote       |

To set up the project first clone it.

```sh
git clone https://github.com/mattcroat/keynote
```

Install dependencies for every package.

```sh
pnpm i
```

If you want to make changes to the docs.

```sh
pnpm docs:dev
```

If you want to make changes to Keynote.

```sh
pnpm keynote:dev
```

You can also `cd` into the respective package directory and run `pnpm run dev`, or `pnpm run build` and `pnpm run preview` for the package.
