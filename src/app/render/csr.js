import { useEffect, useState } from 'react';
import { apiAddress } from "../../common/common";

// 깜빡이면서 API 변경사항 적용됨.
export default function Csr() {

  const [isList, setList] = useState([]);

  useEffect(() => {

    const getListApi = async () => {
      console.log('getListApi : ')
      let url = '/admin/product/searchProductList?page=1&perPage=10';
      const res = await fetch(apiAddress()+url);
      const lists = await res.json();
      setList(lists.data.list);
    }
    getListApi();
  }, []);
  
  return (

    <div>
      <h1>Client Side Rendering</h1>
      <ul>
      {
        isList.map(index => (
          <li key={index.id}> {index.name} </li>
        ))
      }
      </ul>
    </div>
  )
}