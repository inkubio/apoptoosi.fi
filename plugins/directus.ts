import { createDirectus, rest, readItem, readItems, readFieldsByCollection, createItem, aggregate} from '@directus/sdk';

const directus = createDirectus("http://localhost:8055").with(rest());

export default defineNuxtPlugin(() => {
    return {
        provide: { directus, readItem, readItems, readFieldsByCollection, createItem, aggregate},
    };
});