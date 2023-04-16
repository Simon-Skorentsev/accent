import { Link, useLocation } from "react-router-dom";

export const PaginationLink: React.FC<Props> = ({ children }) => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);

    query.set("page", children.toString());
    const to = `${location.pathname}?${query.toString()}`;

    return (
        <Link style={{ textDecoration: 'none' }} to={to}>
            {children}
        </Link>
    )
}


interface Props {
    children: number | string,
}
