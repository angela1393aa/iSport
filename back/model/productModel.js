const connection = require('../utils/db');

//all products query
const getAllProduct = async () => {
    return await connection.queryAsync(
        `SELECT product.id AS product_id, product.name AS product_name, brand.id AS brand_id, 
                brand.name AS brand_name, product_category.id AS product_category_id, 
                product_category.name AS product_category_name, product.creat_time AS create_time, 
                product.price AS product_price, sum(product_sku.sale) AS total_sale
        FROM product 
        INNER JOIN brand 
        ON product.brand=brand.id
        INNER JOIN product_category 
        ON product.category=product_category.id
        INNER JOIN product_sku
        ON product.id=product_sku.product_id
        WHERE product.valid=1
        GROUP BY product.id
        `
    );
}

const getImgList = async () => {
    return await connection.queryAsync(
        `SELECT * FROM product_img`
    );
}

const getBrandList = async () => {
    return await connection.queryAsync(
        `SELECT id, name FROM brand WHERE valid=1`
    )
}

//get product detail with product id
const getOneProduct = async (id) => {
    return await connection.queryAsync(
        `SELECT product.id AS product_id, product.name AS product_name, 
                product.intro AS product_intro, brand.id AS brand_id, brand.name AS brand_name,
                product_category.id AS product_category_id, product_category.name AS product_category_name,
                sum(product_sku.sale) AS total_sale
        FROM product 
        INNER JOIN brand 
        ON product.brand=brand.id
        INNER JOIN product_category 
        ON product.category=product_category.id
        INNER JOIN product_sku
        ON product.id=product_sku.product_id
        WHERE product.valid=1 && product.id=?
        GROUP BY product.id`,
        [id]
    )
}

const getSkuDetail = async (id) => {
    return await connection.queryAsync(
        `SELECT id AS sku_id, sku_code, stock,  sku_group, price
        FROM product_sku
        WHERE product_id=?`,
        [id]
    )
}

const getSkuType = async (id) => {
    return await connection.queryAsync(
        `SELECT * FROM product_type_value WHERE product_id=?`,
        [id]
    )
}

const getTypeList = async () => {
    return await connection.queryAsync(
        `SELECT * FROM product_type`
    )
}

const getProductImg = async (id) => {
    return await connection.queryAsync(
        `SELECT img_name, id FROM product_img WHERE product_id=?`,
        [id]
    )
}

module.exports={
    getAllProduct,
    getImgList,
    getBrandList,
    getOneProduct,
    getSkuDetail,
    getSkuType,
    getTypeList,
    getProductImg
}

// SELECT table_column1, table_column2...
// FROM table_name1
// INNER JOIN table_name2 
// ON table_name1.column_name=table_name2.column_name;

// 'SELECT * FROM product INNER JOIN brand on product.brand=brand.id'
// 'SELECT brand.name AS brand_name, brand, product.id AS prduct_id FROM product INNER JOIN brand on product.brand=brand.id' 

// select 單別aa,單號bb,sum(生產數量dd) as 生產數量加總,sum(報廢數量ee) as 報廢數量加總
// from yourTable
// where 單別aa='123' and 單號bb='456'
// group by 單別aa,單號bb