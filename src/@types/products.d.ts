interface IProductDatabase {
    id: number;
    name: string;
    description: string;
    image_url: string;
    price: number;
    warranty_duration: number;
    product_category_id: number;
    created_at: Date;
    updated_at: Date;
}
