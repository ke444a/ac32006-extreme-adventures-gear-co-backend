import knex from "@/config/db";
import { AdminViews } from "@/config/enums";

const getAllLocationsQuery = () => knex<IAdminAllLocationsView>(AdminViews.ALL_LOCATIONS);


const getLocationByIdQuery = (locationId: number) => {
    return knex<IAdminLocationDetailsView>(AdminViews.LOCATION_DETAILS)
        .where({ location_id: locationId });
};

const updateBranchDetailsQuery = (branchId: number, salesTarget: number) => {
    return knex<IAdminModifyBranchView>(AdminViews.MODIFY_BRANCH)
        .where({ id: branchId })
        .update({ sales_target: salesTarget });
};

const updateFactoryDetailsQuery = (factoryId: number, productionTarget: number) => {
    return knex<IAdminModifyFactoryView>(AdminViews.MODIFY_FACTORY)
        .where({ id: factoryId })
        .update({ production_target: productionTarget });
};  

export {
    getAllLocationsQuery,
    getLocationByIdQuery,
    updateBranchDetailsQuery,
    updateFactoryDetailsQuery
};
