// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    app: {
        pageTransition: {name: 'page', mode: 'out-in'},
        layoutTransition: {name: 'layout', mode: 'out-in'},
        head: {
            title: 'Apoptoosi XIX',
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
                {rel: "icon", href: 'favicon.png'}
            ]
        }
    },
    runtimeConfig: {
        public: {
            baseURL: 'https://ut70usrx.directus.app/',
        },
    },
    css: ['@/assets/theme.css']
})

