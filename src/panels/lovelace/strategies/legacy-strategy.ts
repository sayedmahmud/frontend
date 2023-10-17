import {
  LovelaceConfig,
  LovelaceStrategyConfig,
  LovelaceViewConfig,
} from "../../../data/lovelace";
import { HomeAssistant } from "../../../types";

export const isLegacyStrategy = (
  strategy: any
): strategy is LovelaceDashboardStrategy | LovelaceViewStrategy =>
  !("generate" in strategy);

export interface LovelaceDashboardStrategy {
  generateDashboard(info: {
    config?: LovelaceConfig;
    hass: HomeAssistant;
  }): Promise<LovelaceConfig>;
}

export interface LovelaceViewStrategy {
  generateView(info: {
    view: LovelaceViewConfig;
    config: LovelaceConfig;
    hass: HomeAssistant;
  }): Promise<LovelaceViewConfig>;
}

export const cleanLegacyStrategyConfig = (config: LovelaceStrategyConfig) => {
  if (!(Object.keys(config).length === 2 && "options" in config)) {
    return config;
  }
  const cleanedConfig = {
    ...config,
    ...config.options,
  };

  delete cleanedConfig.options;
  return cleanedConfig;
};
