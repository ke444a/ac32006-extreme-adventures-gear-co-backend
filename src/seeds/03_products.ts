/**
 * Ingesting data with no dependencies:
 * - Products
 * - Product categories
 */

import { Knex } from "knex";
import { faker } from "@faker-js/faker";

const PRODUCT_CATEGORIES = [
    "Clothing",
    "Footwear",
    "Tents",
    "First Aid Kits",
    "Sleeping Bags",
    "Walking & Trekking Poles",
    "Climbing & Alpinism",
    "Axes, Knives & Saws",
    "Rucksacks, Packs & Luggage",
    "Navigation",
    "Camping Accessories"
];

const IMAGE_URLS: Record<typeof PRODUCT_CATEGORIES[number], string[]> = {
    "Clothing": [
        "https://static.wixstatic.com/media/063e79_e8ea0582706146cb9c443722bdd0fbb2~mv2.png",
        "https://static.wixstatic.com/media/063e79_ba3838c0bd814a699bf46aa883b2c99f~mv2.png",
        "https://static.wixstatic.com/media/063e79_0a2f22e1ba9840c580047ab4d9373018~mv2.png"
    ],
    "Footwear": [
        "https://static.wixstatic.com/media/063e79_b3c8000811a34dde8f05d52f49ff0439~mv2.png",
        "https://static.wixstatic.com/media/d09b2a_9b09fd3f8266432383db8b2e39e8ff8b~mv2.png",
        "https://static.wixstatic.com/media/063e79_4363190d93df4235b397b3f80e3a10dd~mv2.png"
    ],
    "Tents": [
        "https://static.wixstatic.com/media/d09b2a_78b044b00f1045299c069abed1489003~mv2.jpg",
        "https://static.wixstatic.com/media/063e79_dffbe9f783df43269a513bb9f11eec2f~mv2.jpg",
        "https://static.wixstatic.com/media/063e79_b5f6d475ebee48068a7335a8e6bb6b67~mv2.jpeg"
    ],
    "First Aid Kits": [
        "https://static.wixstatic.com/media/d09b2a_a409f8f07bad4d85a9c508bb4d17fa24~mv2.jpg",
        "https://static.wixstatic.com/media/d09b2a_ae4b766f5a2c4e6f90ae6b2e336dca92~mv2.jpg",
        "https://static.wixstatic.com/media/d09b2a_54f4cd991e1b4c398203a36269f6fce4~mv2.jpg"
    ],
    "Sleeping Bags": [
        "https://static.wixstatic.com/media/063e79_a7356a4dc4694df281a74d201efc0f62~mv2.jpeg",
        "https://static.wixstatic.com/media/063e79_68194b78edff47c09eb6826be901899b~mv2.jpg",
        "https://static.wixstatic.com/media/d09b2a_cfd9e42ba0364603a7784c9e19178573~mv2.jpg"
    ],
    "Walking & Trekking Poles": [
        "https://static.wixstatic.com/media/063e79_47926179952a407f8906590ea23fa4d3~mv2.jpg",
        "https://static.wixstatic.com/media/d09b2a_49ab85ad686b4a299376f94a9594d95a~mv2.png"
    ],
    "Climbing & Alpinism": [
        "https://static.wixstatic.com/media/d09b2a_fc99b74008e94893973591bb9b53dc68~mv2.jpeg",
        "https://static.wixstatic.com/media/063e79_09aa3b9dd1e345a4b38bd21d34c1fd9c~mv2.jpeg",
        "https://static.wixstatic.com/media/063e79_84f8bc6319d44381ac61c97ab97c403f~mv2.jpeg",
        "https://static.wixstatic.com/media/d09b2a_81cf1aa4ad324d2e9c1fd299c0230494~mv2.jpg"
    ],
    "Axes, Knives & Saws": [
        "https://static.wixstatic.com/media/d09b2a_59348471827540f2968f5b5fb8ab3551~mv2.jpg",
        "https://static.wixstatic.com/media/063e79_8db7f84a2de4453f9cd62c02c5cd8d8b~mv2.jpeg",
        "https://static.wixstatic.com/media/063e79_3c50dc2519a9442496a746d85b1263fe~mv2.jpeg"
    ],
    "Rucksacks, Packs & Luggage": [
        "https://static.wixstatic.com/media/d09b2a_8971e1b131144f83a48bb7f854c2713e~mv2.png",
        "https://static.wixstatic.com/media/d09b2a_85240268a4724a1a82a5c833bc5149fc~mv2.jpg",
        "https://static.wixstatic.com/media/063e79_1e6b741fadd24f55be68d3e32f8a9318~mv2.png"
    ],
    "Navigation": [
        "https://static.wixstatic.com/media/d09b2a_454887a7c77e4c37b36e59cd22265933~mv2.jpg",
        "https://static.wixstatic.com/media/d09b2a_dd3329255e0a427a8d09c36d31635744~mv2.jpg"
    ],
    "Camping Accessories": [
        "https://static.wixstatic.com/media/d09b2a_7ea3a69005cb473dac120e93214d38d1~mv2.jpg",
        "https://static.wixstatic.com/media/063e79_233f815ededa4ffaa5d4e1aff94b31df~mv2.jpeg",
        "https://static.wixstatic.com/media/063e79_b35eb38b764d4c60926a53fcae69a8a2~mv2.jpeg",
        "https://static.wixstatic.com/media/063e79_3a9f1d8843104ecdad58336ffee80c4e~mv2.jpeg"
    ]
};

export async function seed(knex: Knex): Promise<void> {
    console.log("Seeding products...");
    // Deletes ALL existing entries
    await knex("product").del();
    await knex("product_category").del();

    // Insert product categories
    await knex("product_category")
        .insert(PRODUCT_CATEGORIES.map(name => ({ name })));
    const productCategories = await knex("product_category").select("*");

    // Generate products
    const productsIngestData = [];
    for (const category of productCategories) {
        // Generate a random number of products for each category
        const numberOfProducts = faker.number.int({ min: 8, max: 12 });
        for (let i = 0; i < numberOfProducts; i++) {
            // Get a random image URL for the product
            const randomImageUrl = faker.helpers.arrayElement(IMAGE_URLS[category.name]);
            // Generate additional product data
            productsIngestData.push({
                name: faker.commerce.productName(),
                description: faker.commerce.productDescription(),
                price: parseFloat(faker.commerce.price()),
                warranty_duration: faker.number.int({ min: 1, max: 5 }),
                image_url: randomImageUrl,
                product_category_id: category.id
            });
        }
    }

    await knex("product").insert(productsIngestData);

    console.log("Seeding products completed.");
};
