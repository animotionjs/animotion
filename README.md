<div align="center">
 <img width="240" src="packages/docs/static/logo.png" alt="Animotion logo">
</div>

## Animotion

Animotion is a presentational framework for creating beautiful slides and visualizing ideas with code.

## Contributing

Animotion is a monorepo using [pnpm workspaces](https://pnpm.io/workspaces) for easier organization.

| Package     | Description   |
| ----------- | ------------- |
| `create`    | Animotion CLI |
| `docs`      | Documentation |
| `animotion` | Animotion     |

### Clone the project

```sh
git clone https://github.com/mattcroat/animotion
```

### Install dependencies for every package

```sh
pnpm i
```

### Make changes to the docs

```sh
pnpm docs:dev
```

### Make changes to Animotion

```sh
pnpm animotion:dev
```

You can also `cd` into the respective package directory and run `pnpm run dev`, or `pnpm run build` and `pnpm run preview` for the package.
