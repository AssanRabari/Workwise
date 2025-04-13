import React, { useEffect, useRef, useState } from "react";
import "./Gigs.scss";
import GigCard from "../../components/gigCard/GigCard";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useLocation } from "react-router-dom";
  
function Gigs() {
  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);
  const minRef = useRef();
  const maxRef = useRef();

  const { search } = useLocation();

  const buildQueryURL = () => {
    const min = minRef.current?.value || "";
    const max = maxRef.current?.value || "";
    const params = new URLSearchParams();

    if (min) params.append("min", min);
    if (max) params.append("max", max);
    if (sort) params.append("sort", sort);

    const connector = search.includes("?") ? "&" : "?";
    return `/gigs${search}${params.toString() ? connector + params.toString() : ""}`;
  };

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gigs", sort], // add `sort` as dependency
    queryFn: () =>
      newRequest.get(buildQueryURL()).then((res) => res.data),
  });

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  const apply = () => {
    refetch();
  };

  return (
    <div className="gigs">
      <div className="container">
        <span className="breadcrumbs">Workwiswe Gigs</span>
        <p>
          Explore the boundaries of art and technology with Workwiswe’s AI
          artists
        </p>
        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input ref={minRef} type="number" placeholder="min" />
            <input ref={maxRef} type="number" placeholder="max" />
            <button onClick={apply}>Apply</button>
          </div>
          <div className="right">
            <span className="sortBy">Sort by</span>
            <span className="sortType">
              {sort === "sales" ? "Best Selling" : "Newest"}
            </span>
            <img src="./img/down.png" alt="" onClick={() => setOpen(!open)} />
            {open && (
              <div className="rightMenu">
                {sort !== "sales" && (
                  <span onClick={() => reSort("sales")}>Best Selling</span>
                )}
                {sort !== "createdAt" && (
                  <span onClick={() => reSort("createdAt")}>Newest</span>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="cards">
          {isLoading
            ? "Loading..."
            : error
            ? "Something went wrong!"
            : data?.map((gig) => <GigCard key={gig._id} item={gig} />)}
        </div>
      </div>
    </div>
  );
}

export default Gigs;
