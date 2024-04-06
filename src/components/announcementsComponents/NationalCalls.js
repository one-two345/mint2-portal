// src/components/announcementsComponents/NationalCalls.js

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import { Link } from 'react-router-dom';


const NationalCalls = (props) => {
  const[calls, setCalls] = useState([]);
  const[loaded, setLoaded] = useState(false);
  const[currentPage, setCurrentPage] = useState(1);
  let count = 0;
  let category = props.category;
  let noOfPages = 0;
  let data = [];

  console.log(category);
  useEffect(function(){
    axios.get("https://research-portal-server-9.onrender.com/announcements/fetchCalls")
    .then(result=>setCalls(result.data))
    .then(result=>console.log(result))
    .catch(err=>console.log(err))
    setLoaded(true);
  
  },[]);

function display() {
  if (loaded) {
    const cards = calls
      .filter(call =>
        call.callType.toLowerCase() === "national" &&
        (call.field.toLowerCase() === category.toLowerCase() || category === " ")
      )
      .map(call => (
        <div className="card quickCard mb-3" key={call._id}>
          <div className="card-body">
            <h3 style={{ textTransform: 'uppercase' }} className="card-title">{call.title}</h3>
            <p style={{ color: "black", fontWeight: "bold", fontSize: "18px" }} className="card-text">
              Description: <span style={{ color: "black", fontWeight: "normal" }}>{call.description}</span>
            </p>
            <p style={{ color: "black", fontWeight: "bold", fontSize: "18px" }} className='card-text'>
              Field of Study: <span style={{ color: "black", fontWeight: "normal" }}>{call.field}</span>
            </p>
            <p style={{ color: "black", fontWeight: "bold", fontSize: "18px" }} className='card-text'>
              Start Date: <span style={{ color: "black", fontWeight: "normal" }}>{call.startDate.split("T")[0]}</span>
            </p>
            <p style={{ color: "black", fontWeight: "bold", fontSize: "18px" }} className='card-text'>
              End Date: <span style={{ color: "black", fontWeight: "normal" }}>{call.endDate.split("T")[0]}</span>
            </p>
            <p style={{ color: "black", fontWeight: "bold", fontSize: "18px" }} className='card-text'>
              Award(Monetary): <span style={{ color: "black", fontWeight: "normal" }}>{call.prizes}</span>
            </p>
            <p style={{ color: "black", fontWeight: "bold", fontSize: "18px" }} className='card-text'>
              Instructions: <span style={{ color: "black", fontWeight: "normal" }}>{call.instructions}</span>
            </p>
            <p style={{ color: "black", fontWeight: "bold", fontSize: "18px" }} className='card-text'>
              Guidelines on how to fill the application: <span style={{ color: "black", fontWeight: "normal" }}>{call.guideline}</span>
            </p>
            <div className="apply-now-btn">
              <a href='/auth/register' style={{ backgroundColor: "gray", color:"white" }} className="btn">
                APPLY NOW
              </a>
            </div>
          </div>
        </div>
      ));

    return cards.reverse();
  }
}


  function pageLogic(list){
    const displayedCalls = [];
    const selectBox = document.getElementById("pageNo");
    selectBox.value = currentPage;
    for(let i=((currentPage-1)*4); i<(currentPage*4); i++){
      displayedCalls.push(list[i]);
    }
    return displayedCalls;
  }
  function generatePageNo(){
    const pages = [];
    for(let i=1; i<=noOfPages; i++){
      pages.push(
        <option value={i}>{i}</option>
      );
    }
    return pages;
  }

  return (
    <div>
      {loaded && pageLogic(display())}
      {(noOfPages===0 && loaded) && 
      <div>
        <h3 style={{color:"black", marginBottom:"50%"}}>No calls in that category</h3>
      </div> }
      <div
        style={{
          width: "100%",
          textAlign: "center",
          marginTop: "10px",
          marginBottom: "50px",
        }}
      >
        {(currentPage > 1) && <Link
          style={{
            backgroundColor: "#11676d",
            color: "white",
            marginRight: "20px",
            width: "100px",
          }}
          className="btn "
          onClick={function(e){setCurrentPage(currentPage-1)}}
        >
          Previous
        </Link>}
        <select name="pageNo" id="pageNo" style={{ borderRadius: "5px" }}
        onChange={function(e){setCurrentPage(parseInt(e.target.value))}}>
          {loaded && generatePageNo()}
        </select>
        {(currentPage < noOfPages) && <Link
          style={{
            backgroundColor: "#11676d",
            color: "white",
            marginLeft: "20px",
            width: "100px",
          }}
          onClick={function(e){setCurrentPage(currentPage+1)}}
          className="btn "
        >
          Next
        </Link>}
      </div>
    </div>
  );
}

export default NationalCalls;