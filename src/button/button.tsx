import { Variants, motion, useAnimationControls } from "framer-motion"
import styles from "./Button.module.scss";
import { colors } from "../config";
import { useEffect, useState } from "react";
import cn from "classnames";

export function Button({ children, cb, size = "m", isDisabled = false }: Props) {
    const [mounted, setMounted] = useState(false);
    const controls = useAnimationControls();

    const variants: Variants = {
        initial: {
            opacity: .85,
            scale: 1,
        },
        mount: (custom: number) => ({
            opacity: [0, .85],
            transition: {
                delay: custom * .25,
                duration: 1.2,
            }
        }),
        hover: {
            boxShadow: [`inset 0 0 20px ${colors.darkRgba(.2)}, 0 0 20px ${colors.darkRgba(.3)}`, `inset 0 0 20px ${colors.whiteRgba(.2)}, 0 0 20px ${colors.whiteRgba(.3)}`],
            opacity: 1,
            transition: {
                duration: .2,
                ease: "easeInOut"
            }
        },
        tap: {
            scale: .95,
        },
        exit: {
            opacity: 0,
            transition: {
                duration: .6,
                ease: "easeIn",
            }
        }
    }

    useEffect(() => {
        controls.start("mount")
            .then(() => setMounted(true));
    }, [])

    return (
        <div className={styles.wrapper}>
            <motion.button
                disabled={isDisabled}
                className={cn(styles.button, styles[`button--${size}`], {
                    [styles["button--disabled"]]: isDisabled,
                })}
                variants={variants}
                whileHover={mounted && !isDisabled ? "hover" : ""}
                animate={!mounted ? controls : "initial"}
                initial={"initial"}
                exit="exit"
                whileTap={"tap"}
                onClick={cb ? (e) => { e.preventDefault; cb() } : undefined}
            >
                <h3 className={styles.title}>
                    {children}
                </h3>
            </motion.button>
        </div>
    )
}

interface Props {
    children: string,
    cb?: () => void,
    size?: ["s", "m", "l"][number],
    isDisabled?: boolean,
}