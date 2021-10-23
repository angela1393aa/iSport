import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../../../utils/config';
import { withRouter, useParams } from 'react-router-dom';

//component import
import ProductFilter from './ProductFilter';
import ProductCard from './ProductCard';

//fake data
// import ProductList from '../../data/ProductList';
import UserLike from '../../data/UserLike';

function ProductMain(props) {
    const { refresh } = props;
    const { category } = useParams();

    const [data, setData] = useState([]);
    const [brandList, setBrandList] = useState(null);
    const [categoryProduct, setCategoryProduct] = useState([]);
    const [displayProducts, setDisplayProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState({
        minPrice: '',
        maxPrice: '',
        brand: '0',
    });
    const [priceSort, setPriceSort] = useState(true);
    const [sort, setSort] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log(filter);
    }, [filter]);

    useEffect(() => {
        const getProductList = async () => {
            try {
                let response = await axios.get(`${API_URL}/products/all`);
                setData(response.data.allProduct);
                setBrandList(response.data.brandList);
            } catch (e) {
                setError(e.message);
            }
        };
        getProductList();
    }, []);

    //change category
    useEffect(() => {
        const filter = (categoryId) => {
            return data.filter((item) => {
                return item.product_category_id === categoryId;
            });
        };

        const toCategory = () => {
            if (data) {
                switch (category) {
                    case 'allProduct':
                        setCategoryProduct(data);
                        setDisplayProducts(data);
                        break;
                    case 'clothe':
                        setCategoryProduct(filter(1));
                        setDisplayProducts(filter(1));

                        break;
                    case 'shoes':
                        setCategoryProduct(filter(2));
                        setDisplayProducts(filter(2));

                        break;
                    case 'equipment':
                        setCategoryProduct(filter(3));
                        setDisplayProducts(filter(3));

                        break;
                    case 'food':
                        setCategoryProduct(filter(4));
                        setDisplayProducts(filter(4));

                        break;
                    default:
                        console.log('error');
                }
            }
        };
        toCategory();
    }, [category, data, refresh]);

    //keyword search
    const doSearch = () => {
        let handelData = categoryProduct.filter((item) => {
            return item.product_name.indexOf(search) !== -1;
        });
        setDisplayProducts(handelData);
    };

    const clearFilter = () => {
        let newObj = {
            minPrice: '',
            maxPrice: '',
            brand: '0',
        };
        setFilter(newObj);
    };

    //filter
    const doFilter = () => {
        // console.log(priceFilter(categoryProduct));
        let filterData = priceFilter(categoryProduct);
        filterData = brandFilter(filterData);
        setDisplayProducts(filterData);
        clearFilter();
    };
    const priceFilter = (value) => {
        let minPrice = filter.minPrice !== '' ? Number(filter.minPrice) : 0;
        let maxPrice =
            filter.maxPrice !== '' ? Number(filter.maxPrice) : 9999999;
        return value.filter((item) => {
            return (
                Number(item.minPrice) >= minPrice &&
                Number(item.maxPrice) <= maxPrice
            );
        });
    };

    const brandFilter = (value) => {
        let brand = Number(filter.brand);
        console.log(brand);
        if (brand !== 0) {
            return value.filter((item) => {
                return item.brand_id === brand;
            });
        } else {
            return value;
        }
    };

    //sort
    const doSort = (productData) => {
        let newData = [...productData];
        if (priceSort) {
            newData = [...newData].sort((a, b) => a.minPrice - b.minPrice);
        } else {
            newData = [...newData].sort((a, b) => b.minPrice - a.minPrice);
        }
        console.log(newData);

        setDisplayProducts(newData);
    };

    useEffect(() => {
        doSort(displayProducts);
    }, [priceSort]);

    const doSortNew = () => {
        let newData = [...displayProducts].sort(
            (a, b) =>
                new Date(a.create_time).getTime() -
                new Date(b.create_time).getTime()
        );

        console.log(newData);

        setDisplayProducts(newData);
    };

    const doSortHot = () => {
        let newData = [...displayProducts].sort(
            (a, b) => b.total_sale - a.total_sale
        );

        console.log(newData);

        setDisplayProducts(newData);
    };

    /**
     *
     * @param {string} id 商品的id
     * @returns {boolean}
     */
    const isLike = (id) => {
        return UserLike.includes(id);
    };

    return (
        <>
            <main className="px-3 max-w-screen-xl my-0 mx-auto">
                <ProductFilter
                    brandList={brandList}
                    setSearch={setSearch}
                    search={search}
                    doSearch={doSearch}
                    setFilter={setFilter}
                    filter={filter}
                    doFilter={doFilter}
                    priceSort={priceSort}
                    setPriceSort={setPriceSort}
                    doSort={doSort}
                    doSortNew={doSortNew}
                    doSortHot={doSortHot}
                />
                <section className="my-5 grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
                    {displayProducts &&
                        displayProducts.map((item) => {
                            return (
                                <ProductCard
                                    key={item.product_id}
                                    id={item.product_id}
                                    productName={item.product_name}
                                    category={item.product_category_name}
                                    brand={item.brand_name}
                                    photo={item.img_name}
                                    price={item.product_price}
                                    sale={item.total_sale}
                                    like={isLike(item.product_id)}
                                />
                            );
                        })}
                </section>
            </main>
        </>
    );
}

export default ProductMain;
