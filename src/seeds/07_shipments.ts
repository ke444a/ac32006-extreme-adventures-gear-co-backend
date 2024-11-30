/**
 * Ingesting data with dependencies on factory and products:
 * - Factory product item
 * - Shipment
 * - Shipment item
 */
import { Knex } from "knex";
import { faker } from "@faker-js/faker";

export async function seed(knex: Knex): Promise<void> {
    console.log("Seeding shipments...");

    await knex("shipment_item").del();
    await knex("shipment").del();
    await knex("factory_product_item").del();

    const factories = await knex("factory").select("*");
    const products = await knex("product").select("*");

    console.log("Generating factory product items...");
    const factoryProductItemsIngestData = [];
    for (const factory of factories) {
        console.log("Generating factory product items for factory 1...");
        const numberOfProducts = faker.number.int({ min: 40, max: 60 });
        const selectedProducts = faker.helpers.arrayElements(products, numberOfProducts);
        console.log(`Selected ${selectedProducts.length} products for factory 1`);
        for (const product of selectedProducts) {
            // Generate a random number of manufacturing batches per product
            const numberOfBatches = faker.number.int({ min: 1, max: 7 });
            for (let i = 0; i < numberOfBatches; i++) {
                factoryProductItemsIngestData.push({
                    factory_id: factory.id,
                    product_id: product.id,
                    quantity: faker.number.int({ min: 5, max: 50 }),
                    manufactured_at: faker.date.between({
                        from: "2018-01-01",
                        to: new Date()
                    })
                });
            }
        }
        console.log("Generated  product items for factory 1");
    }
    

    // Insert factory product items and get their IDs
    await knex("factory_product_item").insert(factoryProductItemsIngestData);
    const insertedFactoryProductItems = await knex("factory_product_item").select("*");
    console.log("Inserting factory product items completed.");

    console.log("Generating shipments...");
    const branches = await knex("branch").select("*");
    const shipmentItemsIngestData = [];
    for (const factory of factories) {
        const numberOfShipments = faker.number.int({ min: 50, max: 100 });
        for (let i = 0; i < numberOfShipments; i++) {
            // Select a random branch
            const branch = faker.helpers.arrayElement(branches);
            // 60% chance of shipment being delivered
            const isDelivered = faker.number.int({ min: 1, max: 10 }) <= 6;
            let shipmentStatus;
            let arrivedAt = null;
            let shippedAt = null;
            if (isDelivered) {
                shippedAt = faker.date.between({
                    from: "2018-01-01",
                    to: new Date()
                });
                arrivedAt = new Date(shippedAt);
                arrivedAt.setDate(arrivedAt.getDate() + faker.number.int({ min: 3, max: 15 }));
                shipmentStatus = "delivered";
            } else {
                shipmentStatus = faker.helpers.arrayElement(["preparing_to_ship", "in_transit", "shipped"]);
                if (shipmentStatus !== "preparing_to_ship") {
                    shippedAt = faker.date.between({
                        from: "2018-01-01",
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
            const numberOfShipmentItems = faker.number.int({ min: 3, max: 7 });
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
