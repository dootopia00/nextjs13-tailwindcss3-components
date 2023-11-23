import React, { ReactNode, useState, useEffect, isValidElement } from 'react'
import { useRouter } from "next/router";

type Props = {
  totalCount: number,
  perPage: number
};
export default function Pagination({totalCount, perPage}: Props) {

  const router = useRouter();

  const [isPageList, setPageList] = useState([]);
  const [isCurrentPage, setCurrentPage] = useState(router.query.page ? router.query.page : 1);
  const [isPerPage, setPerPage] = useState(router.query.perPage ? router.query.perPage : 10);
  const pageLength = Math.ceil(totalCount/perPage)+1;

  const pageOnClick = (page: number) => {

    if(page){
      if(page < 1) return;
      if(page === isCurrentPage) return;
      if(page === pageLength) return;

      router.push({
        pathname: "location",
        query: {
          page: `${page}`,
          perPage: isPerPage
        },
      },
      undefined,
      { scroll: false }
      )
      setCurrentPage(page);
      setPerPage(isPerPage);
    }
  }

  useEffect(()=>{

    if(isCurrentPage){
      // console.log('child isCurrentPage : ', isCurrentPage)
      let currentPage = isCurrentPage;

      // 최대 7개의 페이지를 노출하기 위한 계산
      let startPage = Math.max(1, Number(currentPage)-3);
      let endPage = Math.min(pageLength, Number(currentPage)+3);
      
      // 현재 페이지가 뒤쪽 범위에 있는 경우 조절
      if (endPage - startPage < 10) {
        endPage = Math.min(pageLength, startPage + 7);
        startPage = Math.max(1, endPage - 7);
      }
  
      let pagesList = [];
      for (let i = startPage; i < endPage; i++) {
        pagesList.push(i);
      }
      // console.log('child pagesList : ', pagesList)
      setPageList(pagesList);
    }

    // 최초 도메인으로 query 값 없이 접근시 쿼리값 세팅
    if(window.location.search === '' || window.location.search === undefined){
      if(!router.query.page || !router.query.perPage){
  
        let query={};
        if(!router.query.page) query['page'] = isCurrentPage;
        if(!router.query.perPage) query['perPage'] = isPerPage;
  
        router.push({
          pathname: "location",
          query: query
        })
      }
    }

    if(router.query.perPage) setPerPage(router.query.perPage);
    if(router.query.page) setCurrentPage(router.query.page);

  }, [isCurrentPage, totalCount, router.query])

  return (
    <div className="py-4">
      <nav aria-label="Page navigation">
        <ul className="flex justify-center -space-x-px text-base h-10">
          {/* Previous 버튼 모바일에서 숨기기 */}
          <li className="hidden sm:flex">
            <a className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" onClick={() => pageOnClick(Number(isCurrentPage)-1)}>Previous</a>
          </li>
          { 
            isPageList.map((item) => (
              Number(isCurrentPage) === item ? (
                <li key={item}>
                  <a aria-current="page" className="flex items-center justify-center px-4 h-10 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white" onClick={() => pageOnClick(item)}>{item}</a>
                </li>
              )
              :
              (
                <li key={item}>
                  <a className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" onClick={() => pageOnClick(item)} >{item}</a>
                </li>
              )
            ))
          }
          {/* Previous 버튼 모바일에서 숨기기 */}
          <li className="hidden sm:flex">
            <a className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" onClick={() => pageOnClick(Number(isCurrentPage)+1)}>Next</a>
          </li>
        </ul>
      </nav>
    </div>

  )
}
