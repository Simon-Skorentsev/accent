import { AnimatePresence, Variants, motion } from "framer-motion";
import styles from "./CartList.module.scss";
import { CartItem } from "./cartItem/cartItem";
import { Item } from "../pages/cart/card.slice";

export function CartList({ items, inc, dec }: Props) {

    const variants: Variants = {
        unMount: {
            scale: 0,
            opacity: 0,
            transition: {
                duration: .6,
                ease: "easeIn",
            }
        },
    }

    return (
        <motion.div
            className={styles.cartList}
            variants={variants}
            exit={"unMount"}
        >
            <AnimatePresence>
                {items.map((item, i) => (
                        <CartItem
                            key={item.id}
                            currency={item.regular_price.currency}
                            image={item.image}
                            price={item.regular_price.value}
                            q={i}
                            title={item.title}
                            count={item.count}
                            incCb={() => inc(item)}
                            decCb={() => dec(item)}
                        />
                    )
                )}
            </AnimatePresence>
        </motion.div>
    )
}

interface Props {
    items: Item[],
    inc: (item: Item) => void,
    dec: (item: Item) => void,
}