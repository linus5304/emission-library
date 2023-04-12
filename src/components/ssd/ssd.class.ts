import {
  ImpactCategories,
  ImpactCategoryManufactureWithUnit,
  ManufactureImpacts,
} from "../../configs/types";
import { Component } from "../main";
import { SSDInputType } from "../types";

export class ComponentSSD implements Component {
  private _input: SSDInputType;

  constructor({ capacity, density, constants, units = 1 }: SSDInputType) {
    this._input = {
      capacity,
      density,
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
    return this.getRAMManufactureImpact();
  }

  private getManufactureImpactFromImpactCategory<K extends ImpactCategories>(
    impactCategory: K,
    props?: { withUnits: boolean }
  ): ImpactCategoryManufactureWithUnit<K> | number {
    const die_impact = this._input.constants[impactCategory].die_impact;
    const base_impact = this._input.constants[impactCategory].base_impact;
    const manufacture = ((this._input.capacity / this._input.density) * die_impact + base_impact) * this._input.units!;
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

  private getRAMManufactureImpact(): ManufactureImpacts {
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
