export enum ResponseStatus {
    SUCCESS = "success",
    INVALID_REQUEST_BODY = "invalid_request_body",
    INTERNAL_SERVER_ERROR = "internal_error",
    INVALID_TOKEN = "invalid_token",
    ACCESS_DENIED_EMPLOYEE = "access_denied_for_employee"
}

export enum EmployeeRole {
    SALES_REP = "sales_representative",
    INVENTORY_MANAGER = "inventory_manager",
    FACTORY_MANAGER = "factory_manager",
    ADMIN = "admin"
}

export enum PaymentStatus {
    COMPLETED = "completed",
    PENDING = "pending",
    FAILED = "failed",
    REFUNDED = "refunded"
}

export enum SalesRepresentativeViews {
    ALL_CUSTOMERS = "sales_represenative_all_customers_view",
    CUSTOMERS_IN_BRANCH = "sales_represenative_branch_customers_view",
    PRODUCTS_IN_BRANCH = "sales_representative_branch_products_view",
    PURCHASE_SUMMARY = "sales_represenative_purchase_summary_view",
    PURCHASE_DETAILS = "sales_represenative_purchase_details_view",
    MODIFY_CUSTOMER = "sales_represenative_modify_customer_view",
    MODIFY_PAYMENT = "sales_represenative_modify_payment_view",
    MODIFY_PURCHASE = "sales_represenative_modify_purchase_view",
    MODIFY_PURCHASE_ITEM = "sales_represenative_modify_purchase_item_view",
    MODIFY_PRODUCT = "sales_representative_modify_product_view",
}

export enum InventoryManagerViews {
    MODIFY_BRANCH_ITEM = "inventory_manager_modify_branch_item_view",
    BRANCH_ITEMS_IN_BRANCH = "inventory_manager_branch_items_in_branch_view",
    ALL_SHIPMENTS_TO_BRANCH = "inventory_manager_all_shipments_to_branch_view",
    UPCOMING_SHIPMENTS_TO_BRANCH = "inventory_manager_upcoming_shipments_to_branch_view",
    SHIPMENT_DETAILS = "inventory_manager_shipment_details_view",
    UPDATE_SHIPMENT_STATUS = "inventory_manager_update_shipment_status_view"
}

export enum FactoryManagerViews {
    ALL_SHIPMENTS = "factory_manager_all_shipments_view",
    MANUFACTURED_PRODUCTS = "factory_manager_manufactured_products_view",
    FACTORY_EMPLOYEES = "factory_manager_employees_view",
    MODIFY_SHIPMENT = "factory_manager_modify_shipment_view",
    MODIFY_MANUFACTURED_PRODUCT = "factory_manager_modify_manufactured_product_view",
    MODIFY_FACTORY_EMPLOYEE = "factory_manager_modify_employee_view",
    SHIPMENT_DETAILS = "factory_manager_shipment_details_view",
    MODIFY_SHIPMENT_ITEM = "factory_manager_modify_shipment_item_view",
    UPDATE_SHIPMENT_STATUS = "factory_manager_update_shipment_status_view"
}

export enum AdminViews {
    ALL_LOCATIONS = "admin_all_locations_view",
    ALL_EMPLOYEES = "admin_all_employees_view",
    ALL_PAYROLLS = "admin_all_payrolls_view",
    ALL_PAYMENTS = "admin_all_payments_view",
    ALL_PURCHASES = "admin_all_purchases_view",
    MODIFY_EMPLOYEE = "admin_modify_employee_view",
    MODIFY_PAYROLL = "admin_modify_payroll_view",
    MODIFY_PAYMENT = "admin_modify_payment_view",
    PURCHASE_SUMMARY = "admin_purchase_summary_view",
    LOCATION_DETAILS = "admin_location_details_view",
    MODIFY_BRANCH = "admin_modify_branch_view",
    MODIFY_FACTORY = "admin_modify_factory_view",
    // ALL_PRODUCTS = "admin_all_products_view",
    MODIFY_PRODUCT = "admin_modify_product_view"
}

export enum AdminAnalyticsViews {
    CATEGORY_SALES = "admin_category_sales_view",
    YEARLY_SUMMARY = "admin_yearly_summary_view",
    FACTORY_SHIPPING = "admin_factory_shipping_view"
}

export enum GlobalViews {
    PRODUCT_CATEGORIES = "global_product_categories_view",
    ALL_PRODUCTS = "global_all_products_view",
    AUTHENTICATED_EMPLOYEE_DETAILS = "authenticated_employee_details_view"
}
