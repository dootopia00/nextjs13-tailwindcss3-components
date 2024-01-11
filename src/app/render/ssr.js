import { useEffect, useState } from 'react';
import { apiAddress } from "../../common/common";

// 깜빡임 없이 API 변경사항 적용됨.
function Ssr({ lists }) {

  return (
    <div>
      <h1>Servier Side Rendering</h1>
      <ul>
      {
        lists.map(index => (
          <li key={index.id}> {index.name} </li>
        ))
      }
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  
  // let lists = [];
  console.log('in getServerSideProps : ');
  let url = 'http://localhost:8000/admin/product/searchProductList?page=1&perPage=10';
  console.log('url : ', url)
  const res = await fetch(url);
  const list = await res.json();
  const lists = list.data.list;
  
  return {
    props: {
      lists,
    },
  };
}

export default Ssr;