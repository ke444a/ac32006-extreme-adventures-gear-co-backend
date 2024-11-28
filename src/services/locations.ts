import { PaymentStatus } from "@/config/enums";
import { getEmployeesByLocationIdQuery } from "@/queries/employees";
import { getAllFactoryProductItemsQuery } from "@/queries/factory-products";
import { getAllLocationsQuery, getLocationByIdQuery, getCategorySalesAnalyticsQuery, getYearlySummaryAnalyticsQuery, updateBranchDetailsQuery, updateFactoryDetailsQuery, getFactoryShippingAnalyticsQuery } from "@/queries/locations";
import { getAllPayrollsByLocationQuery } from "@/queries/payments";
import { getAllPurchasesByLocationQuery } from "@/queries/purchases";
import { getAllShipmentsForFactoryQuery, getShipmentItemsByShipmentIdsQuery } from "@/queries/shipments";

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

    public async getFactoryDetails(locationId: number) {
        const [factoryDetails] = await getLocationByIdQuery(locationId);
        if (!factoryDetails.factory_id) {
            throw new Error("Factory ID is required");
        }

        const factoryEmployees = await getEmployeesByLocationIdQuery(locationId);
        const factoryProducts = await getAllFactoryProductItemsQuery(factoryDetails.factory_id);

        const recentYear = new Date().getFullYear() - 1;
        const recentYearProducts = factoryProducts.filter((product) => product.manufactured_at.getFullYear() === recentYear);
        const recentYearProduction = recentYearProducts.reduce((acc, curr) => acc + curr.quantity, 0);
        const totalProduction = factoryProducts.reduce((acc, curr) => acc + curr.quantity, 0);
        const factoryShipments = await getAllShipmentsForFactoryQuery(factoryDetails.factory_id);
        const shipmentItems = await getShipmentItemsByShipmentIdsQuery(factoryShipments.map((shipment) => shipment.shipment_id));
        const factoryShipmentsWithItems = factoryShipments.map((shipment) => {
            return {
                ...shipment,
                items: shipmentItems.filter((item) => item.shipment_id === shipment.shipment_id)
            };
        });
        const factoryPayrolls = await getAllPayrollsByLocationQuery(locationId);

        return {
            ...factoryDetails,
            employees: factoryEmployees,
            manufacturedProducts: factoryProducts,
            shipments: factoryShipmentsWithItems,
            payrolls: factoryPayrolls,
            recentYearProduction,
            totalProduction
        };
    }

    public async updateBranchDetails(branchId: number, salesTarget: number) {
        return await updateBranchDetailsQuery(branchId, salesTarget);
    }

    public async updateFactoryDetails(factoryId: number, productionTarget: number) {
        return await updateFactoryDetailsQuery(factoryId, productionTarget);
    }

    public async getHeadquarterStatistics() {
        const [
            categorySales,
            factoryShippings,
            yearlySummary
        ] = await Promise.all([
            getCategorySalesAnalyticsQuery(),
            getFactoryShippingAnalyticsQuery(),
            getYearlySummaryAnalyticsQuery()
        ]);

        const groupedCategorySalesData = categorySales.reduce((acc, row) => {
            if (!acc[row.category_id]) {
                acc[row.category_id] = {
                    category_id: row.category_id,
                    category_name: row.category_name,
                    yearly_data: {}
                };
            }

            acc[row.category_id].yearly_data[row.year] = {
                total_purchases: row.total_purchases,
                unique_products: row.unique_products,
                total_quantity_sold: row.total_quantity_sold,
                total_revenue: row.total_revenue
            };

            return acc;
        }, {} as Record<number, {
            category_id: number;
            category_name: string;
            yearly_data: Record<number, Omit<IAdminCategorySalesView, "category_id" | "category_name" | "year">>;
        }>);

        const groupedFactoryShippingData = factoryShippings.reduce((acc, row) => {
            if (!acc[row.factory_id]) {
                acc[row.factory_id] = {
                    factory_id: row.factory_id,
                    factory_code: row.factory_code,
                    factory_city: row.factory_city,
                    yearly_data: {}
                };
            }

            acc[row.factory_id].yearly_data[row.year] = {
                total_shipments: row.total_shipments,
                completed_shipments: row.completed_shipments,
                active_shipments: row.active_shipments,
                total_items_shipped: row.total_items_shipped
            };

            return acc;
        }, {} as Record<number, {
            factory_id: number;
            factory_code: number;
            factory_city: string;
            yearly_data: Record<number, Omit<IAdminFactoryShippingView, "factory_id" | "factory_code" | "factory_city" | "year">>;
        }>);

        // console.log(groupedFactoryShippingData);
        
        return {
            categorySales: Object.values(groupedCategorySalesData),
            factoryShippings: Object.values(groupedFactoryShippingData),
            yearlySummary
        };
    }
}

export default new LocationsService();
