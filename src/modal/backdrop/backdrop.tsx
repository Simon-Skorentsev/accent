import { Variants, motion } from "framer-motion";
import { ReactNode } from "react";
import styles from "./Backdrop.module.scss";

export function Backdrop({ children, onClick }: Props) {

    const variants: Variants = {
        initial: {
            opacity: 0
        },
        animate: {
            opacity: 1
        },
    }

    return (
        <motion.div
            className={styles.backdrop}
            onClick={onClick}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="initial"
        >
            {children}
        </motion.div>
    )
}

interface Props {
    children: ReactNode,
    onClick?: () => void,
}