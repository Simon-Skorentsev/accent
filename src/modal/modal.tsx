import { Variants, motion } from "framer-motion";
import { ReactNode, useEffect } from "react";
import styles from "./Modal.module.scss";
import { Backdrop } from "./backdrop/backdrop";
import { Button } from "../button/button";
import { isDesktop } from "../utils/checkDevice";

export function Modal({ children, actionButtonCb, actionButtonText, actionButtonIsDisabled, closeModal }: Props) {
    const buttonCb = () => {
        actionButtonCb && actionButtonCb();
        closeModal();
    }

    const variants: Variants = {
        initial: {
            y: "-100vh",
            opacity: 0,
        },
        visible: {
            y: "0vh",
            opacity: 1,
            transition: {
                duration: .6,
                ease: "easeOut"
            }
        },
        exit: {
            y: "100vh",
            opacity: 0,
            transition: {
                duration: .6,
                ease: "easeIn"
            }
        }
    }

    useEffect(() => {
        if (isDesktop()) {
            document.body.classList.add("modal-open");
            return () => {
                document.body.classList.remove("modal-open");
            }
        } else {
            document.body.classList.add("modal-open--mobile");
            return () => {
                document.body.classList.remove("modal-open--mobile");
            }
        }
    }, [])

    return (
        <Backdrop onClick={closeModal}>
            <motion.div
                onClick={(e) => e.stopPropagation()}
                className={styles.modal}
                variants={variants}
                initial="initial"
                animate="visible"
                exit="exit"
            >
                {children}
                <Button
                    disabled={actionButtonIsDisabled}
                    cb={buttonCb}
                    size="s">
                    {actionButtonText || "dfdf"}
                </Button>
            </motion.div>
        </Backdrop>
    )
}

interface Props {
    children: ReactNode,
    closeModal: () => void,
    actionButtonCb?: () => void,
    actionButtonText?: string,
    actionButtonIsDisabled?: boolean,
}