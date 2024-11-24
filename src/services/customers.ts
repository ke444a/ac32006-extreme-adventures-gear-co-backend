import { 
    getAllCustomers, 
    getCustomersByBranch, 
    updateCustomer, 
    deleteCustomer 
} from "@/queries/customers";


class CustomersService {
    public async getAllCustomers() {
        return await getAllCustomers();
    }

    public async getCustomersByBranch(branchId: number) {
        return await getCustomersByBranch(branchId);
    }

    public async updateCustomer(customerId: number, customer: ICustomer) {
        await updateCustomer(customerId, customer);
    }

    public async deleteCustomer(customerId: number) {
        await deleteCustomer(customerId);
    }
}

export default new CustomersService();
