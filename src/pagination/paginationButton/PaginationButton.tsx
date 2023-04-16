import { Variants, motion } from "framer-motion"
import { PaginationLink } from "../paginationLink/PaginationLink"
import { colors } from "../../config"

export function PaginationButton({ className, onClick, isActive, page, notLink }: Props) {
    const variants: Variants = {
        active: {
            color: [colors.white, "#0087E9"],
            transition: {
                duration: .4,
                ease: "easeInOut"
            }
        },
        activeMount: {
            color: "#0087E9",
            opacity: [0, .85],
            transition: {
                duration: 1,
                ease: "easeInOut"
            }
        },
        initial: {
            color: "#fff",
            opacity: .85,

            transition: {
                duration: .4,
                ease: "easeInOut"
            }
        },
        mount: {
            opacity: [0, .85],
            transition: {
                duration: 1,
                ease: "easeInOut"
            }
        },
        unMount: {
            opacity: [.85, 0],
            transition: {
                duration: 2,
            }
        },
        hover: {
            opacity: 1
        }
    }

    return (
        <motion.div
            className={className}
            onClick={onClick}
            variants={variants}
            animate={isActive ? "active" : "initial"}
            initial={"initial"}
            whileHover={notLink ? "" : "hover"}
            exit={{ opacity: 0 }}>
            {notLink ? <>{page}</> : <PaginationLink>{page}</PaginationLink>}
        </motion.div>
    )
}

interface Props {
    page: string | number,
    className?: string,
    onClick?: () => void,
    notLink?: boolean,
    isActive?: boolean,
}