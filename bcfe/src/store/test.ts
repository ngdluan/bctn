import { writable } from "svelte/store";

function createTestStore() {
    let { subscribe, update, set } = writable(0)

    return {
        subscribe,
        increment: () => update(e => e + 1),
        decrement: () => update(e => e - 1),
        reset: () => set(0)
    }
}

export const test = createTestStore();