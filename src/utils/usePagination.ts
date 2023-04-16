import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setPaginationPage } from "../App.slice";

/*
  Основано на https://github.com/damiisdandy/use-pagination,
*/
export const usePagination = ({ contentPerPage, count }: Args) => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const initPage = Number(query.get("page") ?? 1);
  // const [page, setPage] = useState(+initPage);
  const dispatch = useAppDispatch();
  const page = useAppSelector(state => state.appSlice.paginationPage);
  const setPage = (page: number) => dispatch(setPaginationPage(page))

  useEffect(() => {
    setPage(+initPage);
  }, [])

  // like 3 dots that surrounds the immediate pages
  const [gaps, setGaps] = useState({
    before: false,
    paginationGroup: [] as number[],
    after: true,
  });
  // number of pages in total (total items / content on each page)
  const pageCount = Math.ceil(count / contentPerPage);
  // index of last item of current page
  const lastContentIndex = page * contentPerPage;
  // index of first item of current page
  const firstContentIndex = lastContentIndex - contentPerPage;
  //Pages between the first and last pages
  const [pagesInBetween, setPagesInBetween] = useState<number[]>([]);

  const b = useAppSelector(state => state.brandListSlice.activeBrands);
  useEffect(() => {
    // console.log("Aaa", "pagesInBetween:", pagesInBetween, "pageCount:", pageCount, "b:", b, "count:", count, "page:", page)
    if (pageCount > 2) {
      const temp = new Array(pageCount - 2).fill(1).map((_, i) => i + 2);
      // console.log("pagesInBetween:", pagesInBetween, "temp:", temp);
      setPagesInBetween(temp);
    } else {
      setPagesInBetween([]);
    }
  }, [pageCount, page]);

  // to set the pages between the gaps depending on position of current page
  //and to setGaps Depending on position of current page
  useEffect(() => {
    const currentLocation = pagesInBetween.indexOf(page);
    let paginationGroup = [];
    let before = false;
    let after = false;
    if (page === 1) {
      paginationGroup = pagesInBetween.slice(0, 2);
    } else if (
      page === pageCount ||
      page === pageCount - 1
    ) {
      paginationGroup = pagesInBetween.slice(-2, pageCount);
    } else if (page === 2) {
      paginationGroup = pagesInBetween.slice(
        currentLocation,
        currentLocation + 2
      );
    } else {
      paginationGroup = [page - 1, page, page + 1];
    }
    if (pageCount <= 5) {
      before = false;
      after = false;
    } else {
      before = false;
      after = false;
      if (paginationGroup[0] > 2) {
        before = true;
      }
      if (paginationGroup[2] < pageCount - 1 || (paginationGroup.length === 2 && page !== pageCount && page !== pageCount - 1)) {
        after = true;
      }
    }
    setGaps({ paginationGroup, before, after });
  }, [page, pagesInBetween, pageCount])

  // change page based on direction either front or back
  const changePage = (direction: Boolean) => {
    const getNewPage = ((page: number) => {
      // move forward
      if (direction) {
        // if page is the last page, do nothing
        if (page === pageCount) {
          return page;
        }
        return page + 1;
        // go back
      } else {
        // if page is the first page, do nothing
        if (page === 1) {
          return page;
        }
        return page - 1;
      }
    });

    const newPage = getNewPage(page);
    setPage(newPage)
  }

  const setPageSafe = (num: number) => {
    // if number is greater than number of pages, set to last page
    if (num > pageCount) {
      setPage(pageCount);
      // if number is less than 1, set page to first page
    } else if (num < 1) {
      setPage(1);
    } else {
      setPage(num);
    }
  }

  return {
    totalPages: pageCount,
    nextPage: () => changePage(true),
    prevPage: () => changePage(false),
    setPage: setPageSafe,
    firstContentIndex,
    lastContentIndex,
    page,
    gaps,
  }
}

interface Args {
  contentPerPage: number,
  count: number,
}
