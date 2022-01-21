import React from "react";
import StarRating from "react-star-ratings";
// [1, 4, 6, 7]
// 1 + 4 = 5
// 5 + 6 = 11
// 11 + 7 = 18
export const showAverage = (p, type = "star") => {
  if (p && p.ratings) {
    let ratingsArray = p && p.ratings;
    let total = [];
    let length = ratingsArray.length;
    // console.log("length", length);

    ratingsArray.map((r) => total.push(r.star));
    let totalReduced = total.reduce((p, n) => p + n, 0);
    // console.log("totalReduced", totalReduced);

    let highest = length * 5;
    // console.log("highest", highest);

    let result = (totalReduced * 5) / highest;
    // console.log("result", result);
    if (type === "star") {
      return (
        <span>
          <StarRating starDimension="24px" starRatedColor="#fadb14" starSpacing="2px" rating={result} />
        </span>
      );
    } else {
      return result;
    }
  }
};
