import { createDirectus, rest, readItem, readItems, readFieldsByCollection, createItem} from '@directus/sdk';

const directus = createDirectus('https://directus.apoptoosi.fi').with(rest());

export default defineNuxtPlugin(() => {
    return {
        provide: { directus, readItem, readItems, readFieldsByCollection, createItem},
    };
});