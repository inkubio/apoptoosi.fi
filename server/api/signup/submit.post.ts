import {createDirectus, rest, staticToken, createItem} from "@directus/sdk";

export default defineEventHandler(async (event) => {
    const api_token = process.env.SIGNUP_API_TOKEN || "";
    const base_url = process.env.DIRECTUS_BASE_URL || "http://localhost:8055";
    const body = await readBody(event);

    console.log(Date.now())

    const directus = createDirectus(base_url)
        .with(staticToken(api_token))
        .with(rest());
    const res= await directus.request(createItem("participants", body))

    return {body: body, success: res.ok, status: res.status};
})