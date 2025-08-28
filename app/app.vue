<script lang="ts" setup>
import * as locales from '@nuxt/ui/locale';

const { locale } = useI18n();

const appConfig = useAppConfig();
appConfig.ui.colors.primary = 'purple';

</script>

<template>
	<UApp :locale="locales[locale]">
		<AppHeader />
		<NuxtPage />
		<AppFooter />
	</UApp>
</template>
