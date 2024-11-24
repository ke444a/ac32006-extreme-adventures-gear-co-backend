import knex from "@/config/db";

const getProductsByIds = (ids: number[]) => {
    return knex("product").whereIn("id", ids).select<IProductDatabase[]>("*");
};

export { 
    getProductsByIds 
};
