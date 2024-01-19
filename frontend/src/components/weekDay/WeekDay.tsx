import React, { useState } from "react";

import "./weekDay.css";
import { Days } from "../model/Model";


interface WeekDays{
    days : Days[]
    selectDay:( index: number)=>void
}



const WeekDay: React.FC<WeekDays> = ({days,selectDay}) => {

    const handleDayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        let weekIndex = Number(e.currentTarget.dataset.index)
          selectDay(weekIndex) 
       
      };
 
  return (
    <div className="weekly-container">
      {days.map((ele,index) => (
        <div 
        key={index}
        onClick={handleDayClick}
        data-index={index}
        className={ele.status ? "border" : ""
        }
>         
          <img src={ele.svg}  alt='img' />
        </div>
      ))}
    </div>
  );
};

export default WeekDay;
