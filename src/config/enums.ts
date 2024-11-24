export enum ResponseStatus {
    SUCCESS = "success",
    INVALID_REQUEST_BODY = "invalid_request_body",
    INTERNAL_SERVER_ERROR = "internal_error",
    INVALID_TOKEN = "invalid_token",
    ACCESS_DENIED_EMPLOYEE = "access_denied_for_employee"
}

export enum EmployeeRole {
    SALES_REP = "sales_rep",
    INVENTORY_MANAGER = "inventory_manager",
    FACTORY_MANAGER = "factory_manager",
    ADMIN = "admin"
}

export enum SalesRepresentativeViews {
    ALL_CUSTOMERS = "sales_represenative_all_customers_view",
    ALL_CUSTOMERS_IN_BRANCH = "sales_represenative_branch_customers_view",
    PURCHASE_SUMMARY = "sales_represenative_purchase_summary_view",
    PURCHASE_DETAILS = "sales_represenative_purchase_details_view",
    MODIFY_CUSTOMER = "sales_represenative_modify_customer_view",
    MODIFY_PAYMENT = "sales_represenative_modify_payment_view",
    MODIFY_PURCHASE = "sales_represenative_modify_purchase_view",
    MODIFY_PURCHASE_ITEM = "sales_represenative_modify_purchase_item_view"
}

export enum InventoryManagerViews {
    MODIFY_BRANCH_ITEM = "inventory_manager_modify_branch_item_view",
    ALL_BRANCH_ITEMS_IN_BRANCH = "inventory_manager_all_branch_items_in_branch_view",
    ALL_SHIPMENTS_TO_BRANCH = "inventory_manager_all_shipments_to_branch_view",
    UPCOMING_SHIPMENTS_TO_BRANCH = "inventory_manager_upcoming_shipments_to_branch_view",
    SHIPMENT_DETAILS = "inventory_manager_shipment_details_view",
    UPDATE_SHIPMENT_STATUS = "inventory_manager_update_shipment_status_view"
}
