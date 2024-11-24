import knex from "@/config/db";

const createCustomer = async (customer: ICustomer): Promise<number> => {
    const [customerId] = await knex<ICustomerDatabase>("sales_rep_create_customer_view").insert({
        name: customer.name,
        phone_number: customer.phoneNumber,
        email: customer.email,
        address: customer.address
    });
    return customerId;
};

const getAllCustomers = async (): Promise<ISalesRepCustomerView[]> => {
    return await knex<ISalesRepCustomerView>("sales_rep_all_customers_view");
};

const getCustomersByBranch = async (branchId: number): Promise<ISalesRepCustomerView[]> => {
    return await knex<ISalesRepCustomerView>("sales_rep_branch_customers_view")
        .where("branch_id", branchId);
};

const updateCustomer = async (customerId: number, customer: ICustomer): Promise<void> => {
    await knex<ICustomerDatabase>("sales_rep_create_customer_view")
        .where("id", customerId)
        .update({
            name: customer.name,
            phone_number: customer.phoneNumber,
            email: customer.email,
            address: customer.address
        });
};

const deleteCustomer = async (customerId: number): Promise<void> => {
    await knex<ICustomerDatabase>("sales_rep_create_customer_view")
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
