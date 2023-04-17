import { useCallback, useEffect, useState } from "react";
import { BrandList } from "../../brandList/brandList";
import { itemsPerPage } from "../../config";
import { Pagination } from "../../pagination/pagination";
import { ProductList } from "../../productList/productList";
import styles from "./Main.module.scss";
import { RawItem, getAllBrands, getProducts } from "../../api/mockApi";
import { setProductsCount, toggleTestMode } from "../../App.slice";
import { plusCount } from "../cart/card.slice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useLocation } from "react-router-dom";
import { splitEvenOdd } from "../../utils/splitEvenOdd";
import { checkDeviceByWidth } from "../../utils/checkDevice";
import { Button } from "../../button/button";

export function Main() {
    const { activeBrands, devTest } = useAppSelector(state => ({
        activeBrands: state.brandListSlice.activeBrands,
        devTest: state.appSlice.paginationTest,
    }));

    const [products, setProducts] = useState<RawItem[][]>([[], []]);
    const dispatch = useAppDispatch();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const page = query.get("page") || 1;
    const [isTwoColumns, setIsTwoColumns] = useState(false);
    //в реальном проекте этот запрос взялся бы из кеша
    const brands = getAllBrands();

    const callbacks = {
        onCartClick: useCallback((item: RawItem) => {
            dispatch(plusCount({ item, plus: 1 }));
        }, []),
        devTest: useCallback(() => {
            dispatch(toggleTestMode());
        }, [])
    }

    useEffect(() => {
        //на этом месте должен быть хук от createApi потипу "useLazygetProductsQuery()" если бы данные приходили с сервера
        const newProducts = getProducts(itemsPerPage, itemsPerPage * (+page - 1), activeBrands, devTest);

        isTwoColumns ? setProducts(splitEvenOdd(newProducts)) : setProducts([newProducts, []]);
        dispatch(setProductsCount(newProducts.length));
    }, [activeBrands.length, itemsPerPage, page, isTwoColumns, devTest])

    useEffect(() => {
        const handleResize = () => {
            const isMobile = checkDeviceByWidth("mobile");
            setIsTwoColumns(!isMobile);
        }
        handleResize()

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])

    return (
        <>
            <h2>Our Brands:</h2>
            <div
                className={styles.develop}
                style={devTest ? {} : { opacity: .5 }}>
                <Button
                    size="s"
                    cb={callbacks.devTest}>
                    dev test
                </Button>
            </div>
            <BrandList />
            <Pagination contentPerPage={itemsPerPage} />
            <div className={styles.lists}>
                <ProductList
                    products={products[0]}
                    activeBrands={activeBrands}
                    brands={brands}
                    onCartClick={callbacks.onCartClick}
                />
                {isTwoColumns &&
                    <ProductList
                        from="right"
                        products={products[1]}
                        activeBrands={activeBrands}
                        brands={brands}
                        onCartClick={callbacks.onCartClick}
                    />}
            </div>
        </>
    )
}
