import {
    createDirectus,
    rest,
    staticToken,
    readFieldsByCollection,
} from '@directus/sdk';

import type {Participants} from '~/types/directus';

interface Schema {
    participants: Participants[];
}
export default defineEventHandler((event) => {
    const api_token = process.env.SIGNUP_API_TOKEN || "";
    const base_url = process.env.DIRECTUS_BASE_URL || "http://localhost:8055";

    const directus = createDirectus<Schema>(base_url)
        .with(staticToken(api_token))
        .with(rest());
    return directus.request(readFieldsByCollection('participants'))
})