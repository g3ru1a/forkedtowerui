// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    css: ['~/assets/css/main.css'],
    modules: [
        '@nuxt/eslint',
        '@nuxt/test-utils',
        '@nuxt/ui',
        '@nuxtjs/i18n',
        '@nuxt/content',
        '@pinia/nuxt',
        'pinia-plugin-persistedstate/nuxt'
    ],
    runtimeConfig: {
        public: {
            apiBase: 'https://test.forkedtower.com/api', // API base,
            apiBaseDev: 'http://ftapi.test/api'
        }
    },
    typescript: {
        typeCheck: true
    },
    i18n: {
        locales: [{
            code: 'de',
            name: 'Deutsch'
        }, {
            code: 'en',
            name: 'English'
        }, {
            code: 'fr',
            name: 'Français'
        }],
        defaultLocale: 'en',
        strategy: 'prefix',
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: 'i18n_redirected',
            redirectOn: 'root',
            alwaysRedirect: false
        },
        pages: {
            'auth/callback': false
        }
    },
    app: {
        head: {
            link: [
                { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap' }
            ]
        }
    },
});