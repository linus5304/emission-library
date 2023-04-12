import {
  ImpactCategoryManufactureWithUnit,
  ManufactureImpacts
} from "../configs/types";

export interface Component {
  computeGwpManufacture(withUnits?: boolean): ImpactCategoryManufactureWithUnit<"gwp"> | number;
  computePeManufacture(withUnits?: boolean): ImpactCategoryManufactureWithUnit<"pe"> | number;
  computeAdpManufacture(withUnits?: boolean): ImpactCategoryManufactureWithUnit<"adp"> | number;
  computeManufacture(): ManufactureImpacts;
}