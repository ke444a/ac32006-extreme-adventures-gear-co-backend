import knex from "@/config/db";
import { AdminAnalyticsViews, AdminViews } from "@/config/enums";

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

const getCategorySalesAnalyticsQuery = async () => {
    return await knex<IAdminCategorySalesView>(AdminAnalyticsViews.CATEGORY_SALES);
};

const getFactoryShippingAnalyticsQuery = async () => {
    return await knex<IAdminFactoryShippingView>(AdminAnalyticsViews.FACTORY_SHIPPING);
};

const getYearlySummaryAnalyticsQuery = async () => {
    return await knex<IAdminYearlySummaryView>(AdminAnalyticsViews.YEARLY_SUMMARY);
};

export {
    getAllLocationsQuery,
    getLocationByIdQuery,
    updateBranchDetailsQuery,
    updateFactoryDetailsQuery,
    getCategorySalesAnalyticsQuery,
    getFactoryShippingAnalyticsQuery,
    getYearlySummaryAnalyticsQuery
};
