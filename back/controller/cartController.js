const cartModel = require("../model/cartModel");
const Promise = require("bluebird");

const cartItemData = async (req, res, next) => {
    try {
        let myCartFromLocalStorage = req.body.cartItems;
        // console.log("myCartFromLocalStorage", myCartFromLocalStorage);
        // myCartFromLocalStorage = [
        //     { id: 2, product_id: 1, sku_code: "10011012", qty: 1 },
        //     { id: 23, product_id: 3, sku_code: "10033105", qty: 1 },
        // ];

        let skuId = myCartFromLocalStorage.map((item) => {
            return item.id;
        });
        // console.log("skuId", skuId);
        // skuId = [ 15, 53, 176 ]

        let cartItems = await cartModel.getCartItems(skuId);
        let cartItemImgs = await cartModel.getImgs(skuId);
        let getTypes = await cartModel.getTypes();

        let cartMap = {};
        myCartFromLocalStorage.map((item) => {
            cartMap[item.id] = item.qty;
        });
        // console.log("cartMap", cartMap);
        // cartMap = { '15': 1, '53': 2, '176': 1 }

        let typeMap = {};
        getTypes.map((type) => {
            typeMap[type.id] = type;
        });
        // console.log("typeMap", typeMap);
        // {'1': { id: 1, name_frontend: '顏色', name_backend: 'color' },{...}}

        let myCart = await Promise.all(
            cartItems.map(async (item) => {
                let rawSkuGroup = item.sku_group;
                let SkuGroup = rawSkuGroup.split(",");
                // console.log("SkuGroup", SkuGroup);
                // [ '3', '8' ]

                let typeValues = await cartModel.getTypeValue(SkuGroup);
                // console.log("typeValues", typeValues);

                typeValues.map((typeValue) => {
                    typeValue.type_name = typeMap[typeValue.type_id].name_frontend;
                    return typeValue;
                });

                item.typeValue = typeValues;
                item.qty = cartMap[item.sku_id];
                item.amount = item.price * cartMap[item.sku_id];
                item.img = cartItemImgs.find((cartItemImg) => {
                    return item.sku_id === cartItemImg.sku_id;
                });
                return item;
            })
        );

        // 計算總金額
        let totalAmount = 0;
        myCart.forEach((item) => {
            totalAmount += item.amount;
        });
        // console.log(totalAmount);

        res.json({ myCart, totalAmount });
    } catch (e) {
        console.error(e);
    }
};

const cartItemImg = async (req, res, next) => {
    try {
        let cartItemImg = await cartModel.getImgs([1, 5, 10]);
        // console.log(cartItemImg);
        res.json({ cartItemImg });
    } catch (e) {
        console.error(e);
    }
};

const userData = async (req, res, next) => {
    try {
        const userId = req.session.member.id;
        // console.log('userId', userId);
        let result = await cartModel.getUserData(userId);
        res.json(result);
    } catch (e) {
        console.error(e);
    }
};

const cartItemType = async (req, res, next) => {
    try {
        let cartItemType = await cartModel.getTypeValue([3, 8]);
        // [
        //     {
        //       "type_id": 1,
        //       "type_value": "黑色"
        //     },
        //     {
        //       "type_id": 2,
        //       "type_value": "S"
        //     }
        // ]

        let getType = await cartModel.getType();
        // [
        //     {
        //       "id": 1,
        //       "name_frontend": "顏色",
        //       "name_backend": "color"
        //     },
        //     {
        //       "id": 2,
        //       "name_frontend": "尺寸",
        //       "name_backend": "size"
        //     },...
        // ]

        cartItemType.map((item) => {
            const index = getType.findIndex(
                (typeItem) => item.type_id === typeItem.id
            );
            item.type_name = getType[index].name_frontend;
        });
        res.json({ cartItemType });
    } catch (e) {
        console.error(e);
    }
};

module.exports = { 
    cartItemData,
    cartItemImg,
    cartItemType,
    userData,
};
