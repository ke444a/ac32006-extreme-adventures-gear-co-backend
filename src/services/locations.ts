import { PaymentStatus } from "@/config/enums";
import { getEmployeesByLocationIdQuery } from "@/queries/employees";
import { getAllLocationsQuery, getLocationByIdQuery, updateBranchDetailsQuery, updateFactoryDetailsQuery } from "@/queries/locations";
import { getAllPayrollsByLocationQuery } from "@/queries/payments";
import { getAllPurchasesByLocationQuery } from "@/queries/purchases";

class LocationsService {
    public async getAllLocations() {
        return await getAllLocationsQuery();
    }

    public async getBranchDetails(locationId: number) {
        const [branchDetails] = await getLocationByIdQuery(locationId);
        const branchEmployees = await getEmployeesByLocationIdQuery(locationId);
        const branchPurchases = await getAllPurchasesByLocationQuery(locationId);

        const completedPurchases = branchPurchases.filter((purchase) => purchase.payment_status === PaymentStatus.COMPLETED || purchase.payment_status === PaymentStatus.PENDING);
        const totalSales = completedPurchases.reduce((acc, curr) => acc + curr.total_price, 0);

        const recentYear = new Date().getFullYear() - 1;
        const recentYearPurchases = completedPurchases.filter((purchase) => purchase.purchase_date.getFullYear() === recentYear);
        const recentYearSales = recentYearPurchases.reduce((acc, curr) => acc + curr.total_price, 0);

        const branchPayrolls = await getAllPayrollsByLocationQuery(locationId);

        return {
            ...branchDetails,
            employees: branchEmployees,
            purchases: branchPurchases,
            totalSales,
            recentYearSales,
            payrolls: branchPayrolls
        };
    }

    public async updateBranchDetails(branchId: number, salesTarget: number) {
        return await updateBranchDetailsQuery(branchId, salesTarget);
    }

    public async updateFactoryDetails(factoryId: number, productionTarget: number) {
        return await updateFactoryDetailsQuery(factoryId, productionTarget);
    }
}

export default new LocationsService();
