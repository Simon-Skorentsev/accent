import { Brand, RawItem } from "../api/mockApi";
import styles from "./ProductList.module.scss";
import { Product } from "./product/product";

export function ProductList({ products, activeBrands, brands, onCartClick, from = "left" }: Props) {

  return (
    <div
      className={styles.productList}
      style={{
      }}>
      {products.map((el, i) => {
        const brand = brands.find(brand => brand.id === el.brand);

        if (activeBrands.length < 1 || (brand && activeBrands.includes(brand.id.toString()))) {
          return (
            <Product
              key={el.id}
              image={el.image}
              q={i}
              title={el.title}
              price={el.regular_price.value}
              currency={el.regular_price.currency}
              brand={brand?.title || ""}
              onCartClick={() => onCartClick(el)}
              from={from}
            />
          )
        } else {
          return null
        }
      })}
    </div>
  )
}

interface Props {
  products: RawItem[],
  brands: Brand[],
  activeBrands: string[],
  onCartClick: (item: RawItem) => void,
  from?: FromProductMount,
}

export type FromProductMount = ["left", "right"][number];