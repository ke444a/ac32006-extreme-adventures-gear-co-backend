import knex from "@/config/db";
import { SalesRepresentativeViews } from "@/config/enums";

const createCustomer = async (customer: ICustomer): Promise<number> => {
    const [customerId] = await knex(SalesRepresentativeViews.MODIFY_CUSTOMER).insert({
        name: customer.name,
        phone_number: customer.phoneNumber,
        email: customer.email,
        address: customer.address
    });
    return customerId;
};

const getAllCustomers = async (): Promise<ISalesRepCustomerView[]> => {
    return await knex<ISalesRepCustomerView>(SalesRepresentativeViews.ALL_CUSTOMERS);
};

const getCustomersByBranch = async (branchId: number): Promise<ISalesRepCustomerView[]> => {
    return await knex<ISalesRepCustomerView>(SalesRepresentativeViews.ALL_CUSTOMERS_IN_BRANCH)
        .where("branch_id", branchId);
};

const updateCustomer = async (customerId: number, customer: ICustomer): Promise<void> => {
    await knex<ICustomerDatabase>(SalesRepresentativeViews.MODIFY_CUSTOMER)
        .where("id", customerId)
        .update({
            name: customer.name,
            phone_number: customer.phoneNumber,
            email: customer.email,
            address: customer.address
        });
};

const deleteCustomer = async (customerId: number): Promise<void> => {
    await knex<IPurchaseDatabase>("purchase")
        .where("customer_id", customerId)
        .update({ customer_id: null });

    await knex<ICustomerDatabase>(SalesRepresentativeViews.MODIFY_CUSTOMER)
        .where("id", customerId)
        .delete();
};

export {
    createCustomer,
    getAllCustomers,
    getCustomersByBranch,
    updateCustomer,
    deleteCustomer
};
