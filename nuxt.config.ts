// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    app: {
        pageTransition: {name: 'page', mode: 'out-in'},
        layoutTransition: {name: 'layout', mode: 'out-in'},
        head: {
            title: 'Apoptoosi XIX',
            meta: [
                {name: 'description', content: 'Inkubion vuosijuhlien Apoptoosin nettisivut'}
            ],
            link: [
                {rel: 'preconnect', href: 'https://fonts.googleapis.com'},
                {
                    rel: 'stylesheet',
                    href: 'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=Roboto:wght@300&display=swap',
                    crossorigin: ''
                }
            ]
        }
    },
    runtimeConfig: {
        public: {
            baseURL: 'https://ut70usrx.directus.app/',
        },
    }
})

