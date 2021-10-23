const productModel = require('../model/productModel');

//list all product
const listAllProduct = async (req, res, next) => {
    let allProduct = await productModel.getAllProduct(); //array
    let allImg = await productModel.getImgList();
    let brandList = await productModel.getBrandList();

    let imgList = new Map();

    //group img with product_id
    allProduct.forEach(product => {
        let arr = [];
        //TODO:用find重構
        arr = allImg.filter(img => {
            return product.product_id === img.product_id;
        });
        imgList.set(product.product_id, arr);
    });

    allProduct.forEach(item => {
        let arr = item.product_price.split('~')
        if (arr.length === 1) arr.push(arr[0]);

        item.img_name = imgList.get(item.product_id)[0].img_name;
        item.minPrice = arr[0];
        item.maxPrice = arr[1];
    })

    
    res.json({'allProduct':allProduct , 'brandList':brandList})
}

const productItem = async (req, res, next) => {
    const productId = req.params.productId
    const product = await productModel.getOneProduct(productId);
    const skuDetail = await productModel.getSkuDetail(productId);
    const skuType = await productModel.getSkuType(productId);
    const typeList = await productModel.getTypeList();
    const productImg = await productModel.getProductImg(productId);


    let typeValueArr = [];
    // console.log(typeList)
    typeList.forEach((item) => {
        // console.log(item.id)
        let arr = skuType.filter((typeValue) => {
            return typeValue.type_id === item.id
        })
        if(arr.length > 0) {
            let obj = {
                type_id:item.id,
                type_name:item.name_frontend,
                type_name_back:item.name_backend,
                typeValue:arr
            }
            typeValueArr.push(obj)
        }
    })

    // console.log(typeValueArr)
    
    res.json({'product':product, 'skuDetail':skuDetail, 'typeValue':typeValueArr, 'productImg':productImg})
}

module.exports = {
    listAllProduct,
    productItem
};