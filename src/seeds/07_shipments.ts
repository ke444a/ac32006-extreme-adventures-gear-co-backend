/**
 * Ingesting data with dependencies on factory and products:
 * - Factory product item
 * - Shipment
 * - Shipment item
 */
import { Knex } from "knex";
import { faker } from "@faker-js/faker";

export async function seed(knex: Knex): Promise<void> {
    await knex("shipment_item").del();
    await knex("shipment").del();
    await knex("factory_product_item").del();

    const factories = await knex("factory").select("*");
    const products = await knex("product").select("*");

    const factoryProductItemsIngestData = [];
    for (const factory of factories) {
        const numberOfProducts = faker.number.int({ min: 5, max: 10 });
        const selectedProducts = faker.helpers.arrayElements(products, numberOfProducts);

        for (const product of selectedProducts) {
            // Generate a random number of manufacturing batches per product
            const numberOfBatches = faker.number.int({ min: 1, max: 5 });
            for (let i = 0; i < numberOfBatches; i++) {
                factoryProductItemsIngestData.push({
                    factory_id: factory.id,
                    product_id: product.id,
                    quantity: faker.number.int({ min: 5, max: 50 }),
                    manufactured_at: faker.date.between({
                        from: "2021-01-01",
                        to: new Date()
                    })
                });
            }
        }
    }

    // Insert factory product items and get their IDs
    await knex("factory_product_item").insert(factoryProductItemsIngestData);
    const insertedFactoryProductItems = await knex("factory_product_item").select("*");

    const branches = await knex("branch").select("*");
    const shipmentItemsIngestData = [];
    for (const factory of factories) {
        const numberOfShipments = faker.number.int({ min: 5, max: 20 });
        for (let i = 0; i < numberOfShipments; i++) {
            // Select a random branch
            const branch = faker.helpers.arrayElement(branches);
            // 40% chance of shipment being delivered
            const isDelivered = faker.number.int({ min: 1, max: 10 }) <= 4;
            let shipmentStatus;
            let arrivedAt = null;
            let shippedAt = null;
            if (isDelivered) {
                shippedAt = faker.date.between({
                    from: "2020-01-01",
                    to: new Date()
                });
                arrivedAt = new Date(shippedAt);
                arrivedAt.setDate(arrivedAt.getDate() + faker.number.int({ min: 3, max: 10 }));
                shipmentStatus = "delivered";
            } else {
                shipmentStatus = faker.helpers.arrayElement(["preparing_to_ship", "in_transit", "shipped"]);
                if (shipmentStatus !== "preparing_to_ship") {
                    shippedAt = faker.date.between({
                        from: "2020-01-01",
                        to: new Date()
                    });
                }
            }

            const shipment = {
                factory_id: factory.id,
                branch_id: branch.id,
                shipment_status: shipmentStatus,
                shipped_at: shippedAt,
                arrived_at: arrivedAt
            };
            // Insert shipment and get its ID
            const [shipmentId] = await knex("shipment").insert(shipment);

            // Create shipment items
            const factoryProductItems = insertedFactoryProductItems.filter(fpi => fpi.factory_id === factory.id);
            const numberOfShipmentItems = faker.number.int({ min: 2, max: 5 });
            const selectedFactoryProductItems = faker.helpers.arrayElements(factoryProductItems, numberOfShipmentItems);
            
            for (const factoryProductItem of selectedFactoryProductItems) {
                const totalQuantityManufactured = factoryProductItems
                    .filter(fpi => fpi.product_id === factoryProductItem.product_id)
                    .reduce((acc, curr) => acc + curr.quantity, 0);
                
                shipmentItemsIngestData.push({
                    shipment_id: shipmentId,
                    factory_product_id: factoryProductItem.id,
                    quantity_shipped: faker.number.int({ min: 5, max: totalQuantityManufactured })
                });
            }
        }
    }

    await knex("shipment_item").insert(shipmentItemsIngestData);
};
