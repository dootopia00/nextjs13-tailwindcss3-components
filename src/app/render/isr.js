import { useEffect, useState } from 'react';
import { apiAddress } from "../../common/common";

// Static이지만 API revalidate 시간 후 변경사항 적용됨.
function Ssr({ lists }) {

  return (
    <div>
      <h1>Increamental Static Regeneration</h1>
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

export async function getStaticProps() {
  
  // let lists = [];
  console.log('in getStaticProps : ');
  let url = 'http://localhost:8000/admin/product/searchProductList?page=1&perPage=10';
  console.log('url : ', url)
  const res = await fetch(url);
  const list = await res.json();
  const lists = list.data.list;
  
  return {
    props: {
      lists,
    },
    revalidate: 20
  };
}

export default Ssr;