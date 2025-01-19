// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    app: {
        pageTransition: {name: 'page', mode: 'out-in'},
        layoutTransition: {name: 'layout', mode: 'out-in'},
        head: {
            title: 'Apoptoosi',
            meta: [
                {name: 'description', content: 'Inkubion vuosijuhlien Apoptoosin nettisivut'},
                {name: "viewport", content: 'width=device-width, initial-scale=1'},
            ],
            link: [
                {rel: 'preconnect', href: 'https://fonts.googleapis.com'},
                {rel: 'preconnect', href: 'https://fonts.gstatic.com'},
                {
                    rel: 'stylesheet',
                    href: 'https://fonts.googleapis.com/css2?family=Poppins&display=swap',
                    crossorigin: ''
                },
                {rel: "icon", href: 'favicon.svg'}
            ]
        }
    },

    runtimeConfig: {
        public: {
            //baseURL: 'https://directus.apoptoosi.fi/',
            BASE_URL: 'http://localhost:8055',
            //apiBase: 'https://directus.apoptoosi.fi/api/',
        },
    },

    css: ['@/assets/theme.css'],

    nitro: {
        azure: {
            config: {
                platform: {
                    apiRuntime: 'node:18'
                }
            }
        }
    },

    compatibilityDate: '2025-01-15',
    modules: ['@nuxtjs/i18n'],
    i18n: {
        locales: ['en', 'fi'],
        defaultLocale: 'fi'
    }

})