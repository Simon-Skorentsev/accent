import { AnimatePresence, Variants, motion } from "framer-motion";
import styles from "./CartItem.module.scss";
import { useCallback, useRef, useState } from "react";

export function CartItem({ currency, image, price, q, title, count, decCb, incCb, }: Props) {
    const side = useRef({ s: 1 }); //важно чтобы current была ссылкой
    const [toggled, setToggled] = useState(false);

    const variants: Variants = {
        initialCount: ({ s }: typeof side.current) => ({
            y: `${-40 * s}%`,
            scale: .9,
            opacity: 0,
            rotateX: `${-90 * s}deg`,
        }),
        mountCount: {
            y: "0%",
            rotateX: "0deg",
            opacity: 1,
            scale: 1,

            transition: {
                duration: .5,
                ease: "easeInOut",
            },
        },
        unMountCount: ({ s }: typeof side.current) => ({
            y: `${40 * s}%`,
            rotateX: `${90 * s}deg`,
            opacity: 0,
            scale: .9,

            transition: {
                duration: .5,
                ease: "easeInOut",
            },
        }),
        initial: {
            x: "-50vh",
            opacity: 0,
        },
        mount: (q: number) => ({
            x: "0vh",
            opacity: 0.9,
            transition: {
                delay: q * 0.3,
                duration: 0.8,
                ease: "easeOut"
            },
        }),
        unMount: {
            scale: 0,
            opacity: 0,
            transition: {
                duration: .6,
                ease: "easeIn",
            }
        },
        priceMount: {
            opacity: [0, 1],
            transition: {
                duration: .6,
                ease: "easeInOut",
            }
        }
    };

    const callBacks = {
        inc: useCallback(() => {
            incCb && incCb();
            side.current.s = 1;
            setToggled(state => !state);
        }, [incCb]),
        dec: useCallback(() => {
            decCb && decCb();
            side.current.s = -1;
            setToggled(state => !state);
        }, [decCb]),
    };

    return (
        <div className={styles.wrapper}>
            <motion.div
                className={styles.cartItem}
                variants={variants}
                initial="initial"
                animate="mount"
                custom={q}
                exit="unMount"
            >
                <div className={styles.left}>
                    <img src={image} alt="product image" />
                    <h3 className={styles.title}>{title}</h3>
                </div>
                <div className={styles.right}>
                    <div className={styles.count}>
                        <span onClick={callBacks.dec}>-</span>
                        <AnimatePresence mode={"popLayout"}>
                            <motion.span
                                className={styles.counter}
                                key={count}
                                variants={variants}
                                initial="initialCount"
                                animate="mountCount"
                                exit="unMountCount"
                                custom={side.current}
                            >
                                {count}
                            </motion.span>
                        </AnimatePresence>
                        <span onClick={callBacks.inc}>+</span>
                    </div>
                    <div className={styles.total}>
                        <span className={styles.totalTitle}>total:</span>
                        <motion.h3
                            key={toggled ? "done" : "ready"}
                            variants={variants}
                            animate={"priceMount"}
                        >
                            {`${Math.round(price * count * 100) / 100} ${currency}`}
                        </motion.h3>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

interface Props {
    image: string;
    q: number;
    title: string;
    price: number;
    currency: string;
    count: number;
    incCb?: () => void;
    decCb?: () => void;
}
