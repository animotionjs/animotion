import { Slide } from '@animotion/core';
import type { ComponentProps, SvelteComponent } from 'svelte';

export type Props<T extends SvelteComponent = Slide> = ComponentProps<T>;
