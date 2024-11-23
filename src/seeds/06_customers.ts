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
    await knex("customer").del();
    await knex("purchase").del();
    await knex("purchase_item").del();

    const customersIngestData = [];
    const CUSTOMERS_COUNT = 105;
    for (let i = 0; i < CUSTOMERS_COUNT; i++) {
        // Create a customer
        customersIngestData.push({
            name: faker.person.fullName(),
            phone_number: faker.phone.number({ style: "national" }),
            email: faker.internet.email(),
            address: faker.location.streetAddress(),
            joined_at: faker.date.between({
                from: "2020-01-01",
                to: "2024-10-29"
            })
        });
    }
    await knex("customer").insert(customersIngestData);
    const insertedCustomers = await knex("customer").select("*");

    // Get branches, employees and products for creating purchases
    const branches = await knex("branch").select("*");
    const salesEmployees = await knex("employee")
        .select("*")
        .whereIn("role_id", knex("employee_role").select("id").where("name", "sales_representative"));
    const branchItems = await knex("branch_item")
        .select("*")
        .where("quantity", ">", 0);
    
    // Generate purchases for each customer
    const purchaseItemsIngestData = [];
    for (const customer of insertedCustomers) {
        // Each customer makes 1-10 purchases
        const numberOfPurchases = faker.number.int({ min: 1, max: 10 });

        for (let i = 0; i < numberOfPurchases; i++) {
            // Create payment for each purchase with 0 amount
            const paymentDraft = {
                payment_type: "customer",
                payment_method: faker.helpers.arrayElement(["credit_card", "debit_card", "cash"]),
                payment_status: faker.helpers.arrayElement(["completed", "pending", "failed"]),
                payment_date: faker.date.between({
                    from: customer.joined_at,
                    to: new Date().toISOString().split("T")[0]
                }),
                amount: 0
            };
            const [insertedPaymentId] = await knex("payment").insert(paymentDraft);
            const insertedPayment = await knex("payment").select("*").where("id", insertedPaymentId).first();

            // Create purchase itself with 0 total amount
            const branchForPurchase = faker.helpers.arrayElement(branches);
            const employeeForPurchase = faker.helpers.arrayElement(salesEmployees);
            const purchaseDraft = {
                branch_id: branchForPurchase.id,
                customer_id: customer.id,
                employee_id: employeeForPurchase.id,
                payment_id: insertedPayment.id,
                total_amount: 0,
                purchase_date: insertedPayment.payment_date
            };
            const [insertedPurchaseId] = await knex("purchase").insert(purchaseDraft);
            const insertedPurchase = await knex("purchase").select("*").where("id", insertedPurchaseId).first();

            // Create 1-5 purchase items to associate with the purchase
            const numberOfItems = faker.number.int({ min: 1, max: 5 });
            // Select random items available at the branch
            const availableItems = branchItems.filter(item => item.branch_id === branchForPurchase.id);
            const selectedItems = faker.helpers.arrayElements(availableItems, numberOfItems);

            let totalAmount = 0;
            for (const branchItem of selectedItems) {
                const product = await knex("product").select("*").where("id", branchItem.product_id).first();
                const quantity = faker.number.int({ min: 1, max: Math.min(5, branchItem.quantity) });
                const purchaseItem = {
                    product_id: branchItem.product_id,
                    purchase_id: insertedPurchase.id,
                    quantity: quantity,
                    total_price: quantity * product.price
                };
                totalAmount += purchaseItem.total_price;
                purchaseItemsIngestData.push(purchaseItem);
            }

            // Update purchase and payment with total amount
            await knex("purchase")
                .where("id", insertedPurchase.id)
                .update({ total_amount: totalAmount });
            await knex("payment")
                .where("id", insertedPayment.id)
                .update({ amount: totalAmount });
        }
    }

    await knex("purchase_item").insert(purchaseItemsIngestData);
};
