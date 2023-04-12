import { ImpactCategories } from "../configs/types";

type ImpactConstants = {
  die_impact: number;
  base_impact: number;
};

export type ImpactCategoryConstants = {
  [Category in ImpactCategories]: ImpactConstants;
};

export type CPUInputType = {
  cores: number;
  die_size: number;
  die_size_per_core: number;
  constants: ImpactCategoryConstants & { core_impact: number };
  units?: number;
};

export type RAMInputType = {
  capacity: number;
  density: number;
  constants: ImpactCategoryConstants;
  units?: number;
};

export type SSDInputType = {
  capacity: number;
  density: number;
  constants: ImpactCategoryConstants;
  units?: number;
};
