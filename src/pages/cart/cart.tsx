import { AnimatePresence, Variants, motion } from "framer-motion";
import { CartList } from "../../cartList/cartList";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import styles from "./Cart.module.scss";
import { Loader } from "../../loader/loader";
import { Button } from "../../button/button";
import { useCallback, useEffect, useState } from "react";
import { Modal } from "../../modal/modal";
import { RawItem } from "../../api/mockApi";
import { plusCount, reset } from "./card.slice";
import { useNavigate } from "react-router-dom";
import { paths } from "../../App";
import { api } from "../../api/api";

export function Cart() {
    const count = useAppSelector(state => state.cartSlice.count);
    const [modalOpen, setModalOpen] = useState(false);
    const [waitingMinLoading, setWaitingMinLoading] = useState(true);
    const items = useAppSelector(state => state.cartSlice.items);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [postProduct, { isLoading, isSuccess }] = api.usePostProductMutation();

    const variants: Variants = {
        nothingMount: {
            y: [20, 0],
            opacity: [0, 1],
            transition: {
                duration: 1,
                ease: "easeInOut"
            }
        },
        resultMount: {
            opacity: 1,
            transition: {
                duration: 1,
                ease: "easeInOut"
            }
        },
        resultInitial: {
            opacity: 0,
        }
    }

    const callbacks = {
        inc: useCallback((item: RawItem) => {
            dispatch(plusCount({ item, plus: 1 }));
        }, []),
        dec: useCallback((item: RawItem) => {
            dispatch(plusCount({ item, plus: -1 }));
        }, []),
        closeModal: useCallback(() => {
            setModalOpen(false);
        }, []),
        homeNavigate: useCallback(() => {
            setTimeout(() => navigate(paths.home), 300)
        }, []),
        onCheckOut: useCallback(async () => {
            setWaitingMinLoading(true);
            setModalOpen(state => !state);
            await postProduct(items);

            setTimeout(() => {
                setWaitingMinLoading(false);
            }, 2500)
        }, [items])
    }

    useEffect(() => {
        isSuccess && dispatch(reset());
    }, [isSuccess])

    return (
        <>
            <AnimatePresence mode="wait">
                {modalOpen && <Modal
                    closeModal={callbacks.closeModal}
                    actionButtonText="Go Home"
                    actionButtonCb={callbacks.homeNavigate}
                    actionButtonIsDisabled={waitingMinLoading || isLoading}
                >
                    <AnimatePresence mode="wait">
                        {waitingMinLoading || isLoading ? <Loader key={1} />
                            : isSuccess ? <motion.h3
                                className={styles.result}
                                key={3}
                                variants={variants}
                                initial="resultInitial"
                                animate="resultMount">
                                Order successfully sent!
                            </motion.h3>
                                : <motion.h3
                                    className={styles.result}
                                    key={2}
                                    variants={variants}
                                    initial="resultInitial"
                                    animate="resultMount">
                                    Oops, something went wrong.
                                </motion.h3>

                        }
                    </AnimatePresence>
                </Modal>}
            </AnimatePresence>

            <div className={styles.cart}>
                <div className={styles.call}>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M8.20049 15.799C1.3025 8.90022 2.28338 5.74115 3.01055 4.72316C3.10396 4.55862 5.40647 1.11188 7.87459 3.13407C14.0008 8.17945 6.5 8 11.3894 12.6113C16.2788 17.2226 15.8214 9.99995 20.8659 16.1249C22.8882 18.594 19.4413 20.8964 19.2778 20.9888C18.2598 21.717 15.0995 22.6978 8.20049 15.799Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                    <div className={styles.callText}>
                        <span>Accent</span>
                        <h3>123 456 789</h3>
                    </div>
                </div>
                <AnimatePresence mode="wait">
                    {!count ?
                        <motion.h3 key={1}
                            className={styles.noItems}
                            variants={variants}
                            animate={"nothingMount"}>
                            There's nothing here yet
                        </motion.h3>
                        : <>
                            <Button cb={callbacks.onCheckOut}>
                                Check Out
                            </Button>
                            <div className={styles.lists}>
                                <CartList
                                    key={2}
                                    items={items}
                                    inc={callbacks.inc}
                                    dec={callbacks.dec}
                                />
                            </div>

                        </>}
                </AnimatePresence>
            </div>
        </>
    )
}