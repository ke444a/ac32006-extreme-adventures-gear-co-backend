import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    // View all employees
    await knex.schema.createView("admin_all_employees_view", (view) => {
        view.columns([
            "employee_id",
            "name",
            "role",
            "phone_number",
            "age",
            "salary",
            "hire_date",
            "employment_type",
            "location_id",
            "location_type",
            "location_city",
            "location_address",
            "shift_type",
            "shift_start",
            "shift_end"
        ]);
        view.as(
            knex.select([
                "e.id as employee_id",
                "e.name",
                "er.name as role",
                "e.phone_number",
                "e.age",
                "e.salary",
                "e.hire_date",
                "e.employment_type",
                "e.location_id",
                "l.location_type",
                "l.city as location_city",
                "l.address as location_address",
                "ws.shift_type",
                "ws.start_time as shift_start",
                "ws.end_time as shift_end"
            ])
                .from("employee as e")
                .join("employee_role as er", "e.role_id", "er.id")
                .join("work_schedule as ws", "e.work_schedule_id", "ws.id")
                .join("location as l", "e.location_id", "l.id")
                .orderBy("e.hire_date", "desc")
        );
    });

    // View all payrolls
    await knex.schema.createView("admin_all_payrolls_view", (view) => {
        view.columns([
            "payroll_id",
            "employee_id",
            "employee_name",
            "employee_role",
            "payment_date",
            "payment_method",
            "payment_status",
            "amount",
            "location_id"
        ]);
        view.as(
            knex.select([
                "pr.id as payroll_id",
                "e.id as employee_id",
                "e.name as employee_name",
                "er.name as employee_role",
                "p.payment_date",
                "p.payment_method",
                "p.payment_status",
                "p.amount",
                "l.id as location_id",
            ])
                .from("payroll as pr")
                .join("employee as e", "pr.employee_id", "e.id")
                .join("employee_role as er", "e.role_id", "er.id")
                .join("payment as p", "pr.payment_id", "p.id")
                .join("location as l", "e.location_id", "l.id")
                .where("p.payment_type", "payroll")
                .orderBy("p.payment_date", "desc")
        );
    });

    // View all payments
    await knex.schema.createView("admin_all_payments_view", (view) => {
        view.columns([
            "payment_id",
            "payment_type",
            "payment_method",
            "payment_status",
            "payment_date",
            "amount",
            "recipient_name",
            "recipient_role"
        ]);
        view.as(
            knex.select([
                "p.id as payment_id",
                "p.payment_type",
                "p.payment_method",
                "p.payment_status",
                "p.payment_date",
                "p.amount",
                knex.raw(`
                    CASE 
                        WHEN p.payment_type = 'employee' THEN e.name
                        WHEN p.payment_type = 'customer' THEN c.name
                    END as recipient_name
                `),
                knex.raw(`
                    CASE 
                        WHEN p.payment_type = 'employee' THEN er.name
                        WHEN p.payment_type = 'customer' THEN 'customer'
                    END as recipient_role
                `)
            ])
                .from("payment as p")
                .leftJoin("payroll as pr", "p.id", "pr.payment_id")
                .leftJoin("employee as e", "pr.employee_id", "e.id")
                .leftJoin("employee_role as er", "e.role_id", "er.id")
                .leftJoin("purchase as pu", "p.id", "pu.payment_id")
                .leftJoin("customer as c", "pu.customer_id", "c.id")
                .orderBy("p.payment_date", "desc")
        );
    });

    // View all purchases
    await knex.schema.createView("admin_all_purchases_view", (view) => {
        view.columns([
            "purchase_id",
            "branch_id",
            "branch_code",
            "customer_name",
            "sales_rep_id",
            "sales_rep_name",
            "total_amount",
            "payment_status",
            "payment_method",
            "purchase_date"
        ]);
        view.as(
            knex.select([
                "p.id as purchase_id",
                "b.id as branch_id",
                "b.branch_code",
                "c.name as customer_name",
                "e.id as sales_rep_id",
                "e.name as sales_rep_name",
                "p.total_amount",
                "pay.payment_status",
                "pay.payment_method",
                "p.purchase_date"
            ])
                .from("purchase as p")
                .join("branch as b", "p.branch_id", "b.id")
                .leftJoin("customer as c", "p.customer_id", "c.id")
                .join("employee as e", "p.employee_id", "e.id")
                .join("payment as pay", "p.payment_id", "pay.id")
                .orderBy("p.purchase_date", "desc")
        );
    });

    // Insert/update/delete employees
    await knex.schema.createView("admin_modify_employee_view", (view) => {
        view.columns([
            "id",
            "name",
            "phone_number",
            "age",
            "salary",
            "hire_date",
            "employment_type",
            "work_schedule_id",
            "location_id",
            "role_id"
        ]);
        view.as(
            knex.select([
                "id",
                "name",
                "phone_number",
                "age",
                "salary",
                "hire_date",
                "employment_type",
                "work_schedule_id",
                "location_id",
                "role_id"
            ])
                .from("employee")
        );
        view.checkOption();
    });

    // Insert/update/delete payrolls
    await knex.schema.createView("admin_modify_payroll_view", (view) => {
        view.columns([
            "id",
            "employee_id",
            "payment_id"
        ]);
        view.as(
            knex.select([
                "id",
                "employee_id",
                "payment_id"
            ])
                .from("payroll")
        );
        view.checkOption();
    });

    // Insert/update/delete payments
    await knex.schema.createView("admin_modify_payment_view", (view) => {
        view.columns([
            "id",
            "payment_type",
            "payment_method",
            "payment_status",
            "amount",
            "payment_date"
        ]);
        view.as(
            knex.select([
                "id",
                "payment_type",
                "payment_method",
                "payment_status",
                "amount",
                "payment_date"
            ])
                .from("payment")
        );
        view.checkOption();
    });

    // View all locations with their details
    await knex.schema.createView("admin_all_locations_view", (view) => {
        view.columns([
            "id",
            "location_type",
            "city",
            "address",
            "branch_code",
            "factory_code",
            "latitude",
            "longitude"
        ]);
        view.as(
            knex.select([
                "l.id",
                "l.location_type",
                "l.city",
                "l.address",
                "b.branch_code",
                "f.factory_code",
                "l.latitude",
                "l.longitude"
            ])
                .from("location as l")
                .leftJoin("branch as b", "l.id", "b.location_id")
                .leftJoin("factory as f", "l.id", "f.location_id")
        );
    });

    // View location details
    await knex.schema.createView("admin_location_details_view", (view) => {
        view.columns([
            "branch_id",
            "factory_id",
            "location_id",
            "location_type",
            "city",
            "address",
            "branch_code",
            "factory_code",
            "sales_target",
            "production_target"
        ]);
        view.as(
            knex.select([
                "b.id as branch_id",
                "f.id as factory_id",
                "l.id as location_id",
                "l.location_type",
                "l.city",
                "l.address",
                "b.branch_code",
                "f.factory_code",
                "b.sales_target",
                "f.production_target"
            ])
                .from("location as l")
                .leftJoin("branch as b", "l.id", "b.location_id")
                .leftJoin("factory as f", "l.id", "f.location_id")
        );
    });

    // View purchase summary: info about each purchase without purchase items
    await knex.schema.createView("admin_purchase_summary_view", (view) => {
        view.columns([
            "id",
            "customer_name",
            "customer_email",
            "total_price",
            "payment_status",
            "purchase_date",
            "branch_id",
            "sales_rep_id",
            "sales_rep_name",
            "location_id",
            "location_type"
        ]);
        view.as(
            knex.select([
                "p.id as purchase_id",
                "c.name as customer_name",
                "c.email as customer_email",
                "p.total_amount as total_price",
                "pay.payment_status",
                "p.purchase_date",
                "p.branch_id",
                "e.id as sales_rep_id",
                "e.name as sales_rep_name",
                "l.id as location_id",
                "l.location_type"
            ])
                .from("purchase as p")
                .leftJoin("customer as c", "p.customer_id", "c.id")
                .join("payment as pay", "p.payment_id", "pay.id")
                .leftJoin("employee as e", "p.employee_id", "e.id")
                .join("location as l", "p.branch_id", "l.id")
                .orderBy("p.purchase_date", "desc")
        );
    });

    // Update branch sales target
    await knex.schema.createView("admin_modify_branch_view", (view) => {
        view.columns([
            "id",
            "sales_target"
        ]);
        view.as(
            knex.select([
                "id",
                "sales_target"
            ])
                .from("branch")
        );
    });

    // Update factory production target
    await knex.schema.createView("admin_modify_factory_view", (view) => {
        view.columns([
            "id",
            "production_target"
        ]);
        view.as(
            knex.select([
                "id",
                "production_target"
            ])
                .from("factory")
        );
    });

    // View all products
    await knex.schema.createView("admin_all_products_view", (view) => {
        view.columns([
            "id",
            "name",
            "description",
            "image_url",
            "price",
            "warranty_duration",
            "product_category_id",
            "product_category_name"
        ]);
        view.as(
            knex.select([
                "p.id",
                "p.name",
                "p.description",
                "p.image_url",
                "p.price",
                "p.warranty_duration",
                "pc.id as product_category_id",
                "pc.name as product_category_name"
            ])
                .from("product as p")
                .join("product_category as pc", "p.product_category_id", "pc.id")
        );
    });

    // Update/delete product
    await knex.schema.createView("admin_modify_product_view", (view) => {
        view.columns([
            "id",
            "name",
            "description",
            "price",
            "warranty_duration",
            "product_category_id"
        ]);
        view.as(
            knex.select([
                "id",
                "name",
                "description",
                "price",
                "warranty_duration",
                "product_category_id"
            ])
                .from("product")
        );
    });
}

export async function down(knex: Knex): Promise<void> {
    const views = [
        "admin_all_employees_view",
        "admin_all_payrolls_view",
        "admin_all_payments_view",
        "admin_all_purchases_view",
        "admin_all_products_view",
        "admin_modify_employee_view",
        "admin_modify_payroll_view",
        "admin_modify_payment_view",
        "admin_all_locations_view",
        "admin_location_details_view",
        "admin_purchase_summary_view",
        "admin_modify_branch_view",
        "admin_modify_factory_view",
        "admin_modify_product_view"
    ];

    for (const view of views) {
        await knex.schema.dropViewIfExists(view);
    }
} 
