import { ref } from 'vue';
import { defineStore } from 'pinia';
import { AppSettings } from '../types/settings';
import { invoke } from '@tauri-apps/api';
export const useSettingsStore = defineStore('settings', () => {

  const settings = ref<AppSettings>({
    apiKeys: {
      anthropic: "",
      openAi: "",
      customApi: "",
      local: "",
    },
  });

  const readSettings = async (): Promise<void> => {
    const loaded_settings = await invoke("read_settings", {});
    settings.value = loaded_settings as AppSettings
  }

  const saveSettings = async (): Promise<void> => {
    await invoke("save_settings", { settings: settings.value })
  }

  return { settings, readSettings, saveSettings }
});
