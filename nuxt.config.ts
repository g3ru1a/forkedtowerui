// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    css: ['~/assets/css/main.css'],
    modules: ['@nuxt/eslint', '@nuxt/test-utils', '@nuxt/ui', '@nuxtjs/i18n', '@nuxt/content'],
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
        }
    }
});