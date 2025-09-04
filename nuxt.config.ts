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
            apiBaseDev: 'http://ftapi.test/api',
            discordAuthUrl: 'https://discord.com/oauth2/authorize?client_id=1404489513681686588&response_type=code&redirect_uri=https%3A%2F%2Ftest.forkedtower.com%2Fauth%2Fcallback&scope=email+identify',
            discordAuthUrlDev: 'https://discord.com/oauth2/authorize?client_id=1404489513681686588&response_type=code&redirect_uri=http%3A%2F%2Fftapi.test%2Fauth%2Fcallback&scope=email+identify'
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
        }, {
			code: 'ja',
			name: '日本語'
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