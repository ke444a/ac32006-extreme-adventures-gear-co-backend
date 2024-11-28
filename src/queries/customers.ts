import knex from "@/config/db";
import { SalesRepresentativeViews } from "@/config/enums";

const createCustomerQuery = async (customer: RequestBodyPOST["CUSTOMER"]) => {
    const [customerId] = await knex(SalesRepresentativeViews.MODIFY_CUSTOMER).insert({
        name: customer.name,
        phone_number: customer?.phoneNumber,
        email: customer?.email,
        address: customer?.address
    });
    return customerId;
};

const getAllCustomersQuery = async () => {
    return await knex<ISalesRepAllCustomersView>(SalesRepresentativeViews.ALL_CUSTOMERS);
};

const getCustomersByBranchQuery = async (branchId: number) => {
    return await knex<ISalesRepBranchCustomersView>(SalesRepresentativeViews.CUSTOMERS_IN_BRANCH).where("branch_id", branchId);
};

const updateCustomerQuery = async (customerId: number, customer: RequestBodyPATCH["CUSTOMER"]) => {
    await knex<ISalesRepModifyCustomerView>(SalesRepresentativeViews.MODIFY_CUSTOMER)
        .where("id", customerId)
        .update({
            name: customer.name,
            phone_number: customer?.phoneNumber,
            email: customer?.email,
            address: customer?.address
        });
};

const deleteCustomerQuery = async (customerId: number) => {
    await knex<ISalesRepModifyCustomerView>(SalesRepresentativeViews.MODIFY_CUSTOMER)
        .where({ id: customerId })
        .delete();
};

export {
    createCustomerQuery,
    getAllCustomersQuery,
    getCustomersByBranchQuery,
    updateCustomerQuery,
    deleteCustomerQuery
};
