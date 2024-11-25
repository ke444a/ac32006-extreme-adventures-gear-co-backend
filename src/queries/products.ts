import knex from "@/config/db";

const getProductsByIdsQuery = (ids: number[]) => {
    return knex("product").whereIn("id", ids).select<IProductDatabase[]>("*");
};

export { 
    getProductsByIdsQuery
};
