import type { App } from 'vue'

import { plugin, myConfig } from './formKit'

export function registerPlugins(app: App) {
  app.use(plugin, myConfig)
}
