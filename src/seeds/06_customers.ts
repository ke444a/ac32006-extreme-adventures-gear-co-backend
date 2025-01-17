/**
 * Ingesting data with dependencies on branches, employees, and products:
 * - Customers
 * - Purchases
 * - Purchase items
 * - Payments
 */
import { Knex } from "knex";
import { faker } from "@faker-js/faker";

export async function seed(knex: Knex): Promise<void> {
    console.log("Seeding customers...");
    await knex("customer").del();
    await knex("purchase").del();
    await knex("purchase_item").del();

    const customersIngestData = [];
    const CUSTOMERS_COUNT = 120;
    for (let i = 0; i < CUSTOMERS_COUNT; i++) {
        // Create a customer
        customersIngestData.push({
            name: faker.person.fullName(),
            phone_number: faker.phone.number({ style: "national" }),
            email: faker.internet.email(),
            address: faker.location.streetAddress(),
            joined_at: faker.date.between({
                from: "2018-01-01",
                to: "2024-11-01"
            })
        });
    }
    await knex("customer").insert(customersIngestData);
    const insertedCustomers = await knex("customer").select("*");
    console.log("Seeding customers completed.");

    // Get branches, employees and products for creating purchases
    const branches = await knex("branch").select("*");
    const salesEmployees = await knex("employee")
        .select("*")
        .whereIn("role_id", knex("employee_role").select("id").where("name", "sales_representative"));
    const branchItems = await knex("branch_item")
        .select("*")
        .where("quantity", ">", 0);


    console.log("Generating purchases...");
    let counter = 0;
    // Generate purchases for each customer
    const purchaseItemsIngestData = [];
    for (const customer of insertedCustomers) {
        // Each customer makes 1-20 purchases
        const MAX_PURCHASES_PER_CUSTOMER = 5;
        const numberOfPurchases = faker.number.int({ min: 1, max: MAX_PURCHASES_PER_CUSTOMER });

        if (counter % 100 === 0) {
            console.log(`Processed ${counter} customers...`);
        }

        for (let i = 0; i < numberOfPurchases; i++) {
            // Create payment for each purchase with 0 amount
            const paymentDraft = {
                payment_type: "customer",
                payment_method: faker.helpers.arrayElement(["credit_card", "debit_card", "cash"]),
                payment_status: faker.helpers.arrayElement(["completed", "completed", "completed", "pending", "failed", "refunded"]),
                payment_date: faker.date.between({
                    from: customer.joined_at,
                    to: new Date().toISOString().split("T")[0]
                }),
                amount: 0
            };
            const [insertedPaymentId] = await knex("payment").insert(paymentDraft);
            // const insertedPayment = await knex("payment").select("*").where("id", insertedPaymentId).first();

            // Create purchase itself with 0 total amount
            const branchForPurchase = faker.helpers.arrayElement(branches);
            const employeeForPurchase = faker.helpers.arrayElement(salesEmployees);
            const purchaseDraft = {
                branch_id: branchForPurchase.id,
                customer_id: customer.id,
                employee_id: employeeForPurchase.id,
                payment_id: insertedPaymentId,
                total_amount: 0,
                purchase_date: paymentDraft.payment_date
            };
            const [insertedPurchaseId] = await knex("purchase").insert(purchaseDraft);
            // const insertedPurchase = await knex("purchase").select("*").where("id", insertedPurchaseId).first();

            // Create 1-5 purchase items to associate with the purchase
            const numberOfItems = faker.number.int({ min: 1, max: 5 });
            // Select random items available at the branch
            const availableItems = branchItems.filter(item => item.branch_id === branchForPurchase.id);
            const selectedItems = faker.helpers.arrayElements(availableItems, numberOfItems);

            let totalAmount = 0;
            const selectedItemsProductIds = selectedItems.map(item => item.product_id);
            const selectedProducts = await knex("product").select("*").whereIn("id", selectedItemsProductIds);
            for (const branchItem of selectedItems) {
                const product = selectedProducts.find(product => product.id === branchItem.product_id);
                const quantity = faker.number.int({ min: 1, max: Math.min(7, branchItem.quantity) });
                const purchaseItem = {
                    product_id: branchItem.product_id,
                    purchase_id: insertedPurchaseId,
                    quantity: quantity,
                    total_price: quantity * product.price
                };
                totalAmount += purchaseItem.total_price;
                purchaseItemsIngestData.push(purchaseItem);
            }

            // Update purchase and payment with total amount
            await knex("purchase")
                .where("id", insertedPurchaseId)
                .update({ total_amount: totalAmount });
            await knex("payment")
                .where("id", insertedPaymentId)
                .update({ amount: totalAmount });
        }
        counter++;
    }

    await knex("purchase_item").insert(purchaseItemsIngestData);
    console.log("Seeding purchases completed.");
};
