import {
  ImpactCategories,
  ImpactCategoryManufactureWithUnit,
  ManufactureImpacts
} from "../../configs/types";
import { Component } from "../main";
import { CPUInputType } from "../types";

export class ComponentCPU implements Component {
  private _input: CPUInputType;

  constructor({
    cores,
    die_size,
    die_size_per_core,
    constants,
    units = 1
  }: CPUInputType) {
    this._input = {
      cores,
      die_size,
      die_size_per_core,
      constants,
      units
    };
  }

  computeGwpManufacture(withUnits?: boolean): ImpactCategoryManufactureWithUnit<"gwp"> | number {
    return this.getManufactureImpactFromImpactCategory("gwp", { withUnits: withUnits ?? true });
  }

  computePeManufacture(withUnits?: boolean): ImpactCategoryManufactureWithUnit<"pe"> | number {
    return this.getManufactureImpactFromImpactCategory("pe", { withUnits: withUnits ?? true });
  }

  computeAdpManufacture(withUnits?: boolean): ImpactCategoryManufactureWithUnit<"adp"> | number {
    return this.getManufactureImpactFromImpactCategory("adp", { withUnits: withUnits ?? true });
  }

  computeManufacture(): ManufactureImpacts {
    return this.getCPUManufactureImpact();
  }

  private getManufactureImpactFromImpactCategory<K extends ImpactCategories>(
    impactCategory: K,
    props?: { withUnits: boolean }
  ): ImpactCategoryManufactureWithUnit<K> | number {
    const core_impact = this._input.constants.core_impact;
    const die_impact = this._input.constants[impactCategory].die_impact;
    const base_impact = this._input.constants[impactCategory].base_impact;
    const manufacture = ((this._input.cores * this._input.die_size_per_core + core_impact) * die_impact + base_impact) * this._input.units!;
    const unit =
      impactCategory === "gwp"
        ? "kgCO2eq"
        : impactCategory === "pe"
        ? "MJ"
        : "kgSbeq";

    if (!props?.withUnits) return manufacture;
    return {
      [impactCategory]: {
        manufacture,
        unit,
      },
    } as ImpactCategoryManufactureWithUnit<K>;
  }

  private getCPUManufactureImpact(): ManufactureImpacts {
    const impacts: ManufactureImpacts = {
      gwp: {
        manufacture: this.getManufactureImpactFromImpactCategory(
          "gwp"
        ) as number,
        unit: "kgCO2eq",
      },
      pe: {
        manufacture: this.getManufactureImpactFromImpactCategory(
          "pe"
        ) as number,
        unit: "MJ",
      },
      adp: {
        manufacture: this.getManufactureImpactFromImpactCategory(
          "adp"
        ) as number,
        unit: "kgSbeq",
      },
    };

    return impacts;
  }
}
