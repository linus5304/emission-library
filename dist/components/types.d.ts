import { ImpactCategories } from "../configs/types";
declare type ImpactConstants = {
    die_impact: number;
    base_impact: number;
};
export declare type ImpactCategoryConstants = {
    [Category in ImpactCategories]: ImpactConstants;
};
export declare type CPUInputType = {
    cores: number;
    die_size: number;
    die_size_per_core: number;
    constants: ImpactCategoryConstants & {
        core_impact: number;
    };
    units?: number;
};
export declare type RAMInputType = {
    capacity: number;
    density: number;
    constants: ImpactCategoryConstants;
    units?: number;
};
export declare type SSDInputType = {
    capacity: number;
    density: number;
    constants: ImpactCategoryConstants;
    units?: number;
};
export {};
