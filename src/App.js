import React, {useState, useEffect} from "react";
import octo from './octo.png';
import Datatable from "./datatable";

require("es6-promise").polyfill();
require("isomorphic-fetch");

export default function App(){
  const [data, setData] = useState([]);
  const [q, setQ] = useState("");
  const [searchColumns, setSearchColumns] = useState(["word","jword"]);
  useEffect(() =>{
    fetch("https://projectelapi.herokuapp.com/posts/")
    .then(response => response.json())
    .then((json) => setData(json));
  },[]);


  function search(rows){
    // return rows.filter(row => row.word.toLowerCase().indexOf(q) > -1 ||
    // row.jword.toLowerCase().indexOf(q) > -1 ||
    // row.imglink.toLowerCase().indexOf(q) > -1 ||
    // row.n.toString().toLowerCase().indexOf(q) > -1
    // );

    return rows.filter((row) => 
      searchColumns.some((column) => row[column].toString().toLowerCase().indexOf(q.toLowerCase()) > -1)
    );
  }

  const columns = data[0] && Object.keys(data[0]);
  return <div>
    <div id="customers">
    
    <img src={octo} alt="Logo" width="300" height="500"/>

    <h1 class="App-Header">Welcome to the public database of MELA</h1>
    <h5>Type your query in search-box, brought to you by <a href="http://github.com/Tamaghno" target="_blank">Tamaghno</a> & <a href="http://github.com/Saswata01071998" target="_blank">Saswata</a> </h5>
      <br></br>
      <br></br>
      <input type="text" value={q} onChange={(e)=> setQ(e.target.value)}/>

      <br></br>
      <br></br>

      <br></br>

      {
        columns && columns.map(column => <label>
          <input type="checkbox" checked={searchColumns.includes(column)}
            onChange={(e)=>{
              const checked = searchColumns.includes(column);
              setSearchColumns((prev) => checked
              ? prev.filter((sc) => sc!== column) : [...prev, column]);
            }}
          />
          {column}&emsp; &emsp; 
          </label>)
            
      }
      <br></br>
    </div>
    <div>
      <Datatable data={search(data)}/>
    </div>

  </div>;
}