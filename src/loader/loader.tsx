import { Variants, motion } from "framer-motion"
import styles from "./Loader.module.scss";

export function Loader() {
    const circles = [];
    for (let i = 0; i < 3; i++) {
        circles.push(<Circle key={i} q={i} />);
    }

    return (
        <div className={styles.loader}>
            {circles}
        </div>
    )
}

function Circle({ q = 0 }) {
    const loadingCircleVariants: Variants = {
        animate: (q: number) => ({
            opacity: [0, 1],
            y: ["0%", "100%"],
            transition: {
                y: {
                    delay: q * .125,
                    duration: 0.5,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "mirror",
                },
                duration: .5,
                delay: q * .125,
                ease: "easeInOut",
            }
        }),
        exit: (q: number) => ({
            y: ["100%", "0%"],
            opacity: [1, 0],
            transition: {
                duration: .5,
                ease: "easeInOut",
                delay: q * .125,
            }
        })
    }

    return (
        <motion.span
            className={styles.circle}
            variants={loadingCircleVariants}
            animate="animate"
            exit="exit"
            custom={q}
        />
    )
}