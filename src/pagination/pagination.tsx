import { useCallback } from "react";
import styles from './Pagination.module.scss';
import { usePagination } from "../utils/usePagination";
import { useLocation } from "react-router-dom";
import { Variants, motion } from "framer-motion";
import { useAppSelector } from "../store/hooks";
import { getProductsCount } from "../api/mockApi";
import { PaginationButton } from "./paginationButton/PaginationButton";

export function Pagination({ contentPerPage, gapsStyle = "..." }: Props) {
    const activeBrands = useAppSelector(state => state.brandListSlice.activeBrands);
    const count = getProductsCount(activeBrands);
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const page: number = Number(query.get("page") ?? 1);
    const {
        gaps,
        setPage,
        totalPages,
    } = usePagination({
        contentPerPage,
        count
    });

    const variants: Variants = {
        mount: {
            opacity: [0, 1],
            transition: {
                duration: 1.5,
                ease: "easeInOut",
            }
        }
    }

    const onClick = useCallback((page: number) => {
        setPage(page);
    }, []);

    return (
        <motion.div
            variants={variants}
            animate="mount"
            className={styles.pagination}>
            <PaginationButton key={1}
                isActive={page === 1}
                onClick={() => onClick(1)}
                page={1}
                className={styles.rockButton}
            />
            {gaps.before ?
                <PaginationButton
                    notLink={true}
                    page={gapsStyle}
                    className={styles.gaps} /> : null}
            {gaps.paginationGroup.map((el, i) => (
                <PaginationButton
                    key={i}
                    isActive={page === el}
                    onClick={() => onClick(el)}
                    page={el}
                    className={styles.button}
                />
            ))}
            {gaps.after ?
                <PaginationButton
                    notLink={true}
                    page={gapsStyle}
                    className={styles.gaps} /> : null}
            {totalPages > 1 && <PaginationButton
                key={totalPages}
                isActive={page === totalPages}
                onClick={() => onClick(totalPages)}
                page={totalPages}
                className={styles.rockButton}
            />}
        </motion.div>
    )
}

interface Props {
    contentPerPage: number,
    gapsStyle?: string,
}