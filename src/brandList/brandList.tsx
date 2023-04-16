import styles from "./BrandList.module.scss";
import { getAllBrands } from "../api/mockApi";
import { Brand } from "./brand/brand";
import { useCallback } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
// @ts-ignore
import useDimensions from "react-use-dimensions";
import { useAppDispatch } from "../store/hooks";
import { switchBrand } from "./brandList.slice";
import { setPaginationPage } from "../App.slice";
import { colors, layoutMaxWidth, layoutPading } from "../config";

export function BrandList() {
  const scrollX = useMotionValue(0);
  const scale = useTransform(scrollX, [0, 100], [0, 1]);
  const opacity = useTransform(scrollX, [0, 100], [0, 1]);
  // const [containerWidth, setContainerWidth] = useState("100vw");

  //на этом месте должен быть хук от createApi потипу "useGetAllBrandsQuery()" если бы данные приходили с сервера, +он закешируется
  const brands = getAllBrands();
  const [trackRef, trackDimensions] = useDimensions();
  const dispatch = useAppDispatch();

  const onClick = useCallback((brandId: string) => {
    dispatch(switchBrand(brandId));
    dispatch(setPaginationPage(1));
  }, [])

  return (
    <div className={styles.brandList}>
      <motion.div
        style={{
          width: 20,
          height: 20,
          borderRadius: 20,
          backgroundColor: colors.white,
          position: "absolute",
          left: "4rem",
          scale: scale,
          opacity: opacity,
        }}
      />
      <motion.div
        style={{
          width: "100%",
          height: "auto",
          overflow: "hidden",
          position: "relative",
          cursor: "grab"
        }}
        whileTap={{ cursor: "grabbing" }}
      >
        <motion.div ref={trackRef}
          style={{
            display: "inline-flex",
            flexWrap: "nowrap",
            whiteSpace: "nowrap",
            x: scrollX
          }}
          drag="x"
          dragConstraints={{
            left: -trackDimensions.width + Math.min(window.innerWidth, layoutMaxWidth) - layoutPading.horizontal * 3,
            right: 0
          }}
          dragElastic={.25}
        >
          {brands.map((brand, i) => (
            <Brand key={brand.id}
              name={brand.title}
              q={i}
              cb={() => onClick(brand.id.toString())}
            />
          ))}
        </motion.div>
      </motion.div>

    </div>
  )
}
