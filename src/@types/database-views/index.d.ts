interface IGlobalProductCategoriesView {
    id: number;
    name: string;
}

interface IGlobalAllProductsView {
    id: number;
    name: string;
    description: string;
    image_url: string | null;
    price: number;
    warranty_duration: number;
    product_category_id: number;
    product_category_name: string;
}

interface IAuthenticatedEmployeeDetailsView {
    id: number;
    name: string;
    email: string;
    role: string;
    location_type: string;
    location_city: string;
    location_address: string;
    branch_id: number;
    factory_id: number;
}
