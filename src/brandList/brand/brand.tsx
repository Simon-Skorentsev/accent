import { Link, useLocation } from "react-router-dom";
import styles from "./Brand.module.scss";
import { motion, useAnimationControls, Variants } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { colors } from "../../config";

export function Brand({ name, q, cb }: Props) {
  const [isActive, setIsActive] = useState(false);
  const [mounted, setMounted] = useState(false);
  const controls = useAnimationControls();
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  query.set("page", "1");
  const to = `${location.pathname}?${query.toString()}`;

  const onClick = useCallback(() => {
    setIsActive(prev => !prev);
    cb && cb();
  }, [cb])

  const variants: Variants = {
    initial: {
      opacity: .85,
      backgroundColor: "#1D1D1D",
      color: colors.white,
      borderRadius: "20px",
      scale: 1,
      y: "0px"
    },
    mount: (custom: number) => ({
      opacity: [0, .85],
      y: ["100px", "0px"],
      transition: {
        delay: custom * .25,
        duration: 1.2,
      }
    }),
    hover: {
      opacity: 1,
      scale: 1.1
    },
    active: {
      opacity: 1,
      backgroundColor: "#08FDD8",
      color: colors.background,
      borderRadius: "5px",
      transition: {
      }
    }
  }

  useEffect(() => {
    controls.start("mount")
      .then(() => setMounted(true));
  }, [])

  return (
    <Link
    to={to}
    draggable={false}
    className={styles.link}>
      <motion.span
        className={styles.brand}
        variants={variants}
        whileHover={"hover"}
        animate={!mounted ? controls : isActive ? "active" : "initial"}
        initial={"initial"}
        custom={q}
        onTap={onClick}
      >
        {name}
      </motion.span>
    </Link>

  )
}

interface Props {
  name: string,
  q: number,
  cb?: () => void,
}