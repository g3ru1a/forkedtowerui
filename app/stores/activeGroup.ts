// stores/user.ts
import { defineStore } from 'pinia'
import type {Group} from "#shared/types/models";

export const useGroupStore = defineStore('groups', {
	state: () => ({
		groups: null as null | Group[],
		activeGroup: null as null | Group
	}),
	getters: {
		hasActiveGroup: (s) => !!s.activeGroup
	},
	actions: {
		setGroups(g: Group[]) {
			this.groups = g;
		},
		clearGroups() {
			this.groups = null
		},
		setActiveGroup(g: Group | null) {
			this.activeGroup = g;
		},
		clearActiveGroup() {
			this.activeGroup = null;
		}
	},
	persist: {
		storage: piniaPluginPersistedstate.cookies(),
	},
})
