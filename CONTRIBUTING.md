## Contributing

Animotion is a monorepo using [pnpm workspaces](https://pnpm.io/workspaces) for easier organization.

| Package     | Description   |
| ----------- | ------------- |
| `create`    | Animotion CLI |
| `docs`      | Documentation |
| `animotion` | Animotion     |

### Clone or fork the project

```sh
git clone https://github.com/animotionjs/animotion
```

### Docs

```sh
pnpm i
```

### If you want to make changes to the docs

```sh
pnpm docs:dev
```

### Animotion

```sh
pnpm animotion:dev
```

You can also `cd` into the respective package directory and run `pnpm run dev`, or `pnpm run build` and `pnpm run preview` for the package.
