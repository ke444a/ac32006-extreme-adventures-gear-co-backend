import { 
    getAllCustomersQuery, 
    getCustomersByBranchQuery, 
    updateCustomerQuery, 
    deleteCustomerQuery 
} from "@/queries/customers";


class CustomersService {
    public async getAllCustomers() {
        return await getAllCustomersQuery();
    }

    public async getCustomersByBranch(branchId: number) {
        return await getCustomersByBranchQuery(branchId);
    }

    public async updateCustomer(customerId: number, customer: RequestBodyPATCH["CUSTOMER"]) {
        await updateCustomerQuery(customerId, customer);
    }

    public async deleteCustomer(customerId: number) {
        await deleteCustomerQuery(customerId);
    }
}

export default new CustomersService();
