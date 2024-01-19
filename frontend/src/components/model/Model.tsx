// MyModal.tsx
import React, { useEffect, useState } from "react";
import "./model.css";
import { Data } from "../../utils/arr";
import WeekDay from "../weekDay/WeekDay";
import Sun from "./../../utils/icons/weekDay/sun.svg";
import Mon from "./../../utils/icons/weekDay/mon.svg";
import Tue from "./../../utils/icons/weekDay/tue.svg";
import Wed from "./../../utils/icons/weekDay/wed.svg";
import Thu from "./../../utils/icons/weekDay/thu.svg";
import Fri from "./../../utils/icons/weekDay/fri.svg";
import Sat from "./../../utils/icons/weekDay/sat.svg";
import { patchTodosApi } from "../../utils/patchTodos";
import { postTodosApi } from "../../utils/postTodos";

export type Days = {
  svg: string;
  status: boolean;
  val?: string;
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  modelName: "submit" | "update";
  updateVal?: Data;
  addTodo?: (data: Data) => void;
  updateTodoFn?: (updateTodo: Data) => void;
}
//schedules-backend.onrender.com/schedu
const MyModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  modelName,
  updateVal,
  updateTodoFn,
  addTodo,
}) => {
  const [data, setData] = useState({
    _id:"",
    title:"",
    description:"",
    subject:"",
    frequency:"Daily",
    repeat:"",
    time:""
  });

  let [days, setDays] = useState([
    { svg: Sun, status: false, val: "Sun" },
    { svg: Mon, status: false, val: "Mon" },
    { svg: Tue, status: false, val: "Tue" },
    { svg: Wed, status: false, val: "Wed" },
    { svg: Thu, status: false, val: "Thu" },
    { svg: Fri, status: false, val: "Fri" },
    { svg: Sat, status: false, val: "Sat" },
  ]);

  const handleWeeklyChange = (index: number) => {
    setDays((prevDays) =>
      prevDays.map((day, i) =>
        i === index ? { ...day, status: !day.status } : day
      )
    );
  };
  const handleFrequencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newFrequency = event.target.value;
    setData((prevData) => ({
      ...prevData,
      frequency: newFrequency,
    }));
  };
  const handleRepeatChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newFrequency = event.target.value;
    setData((prevData) => ({
      ...prevData,
      repeat: newFrequency,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]:value
    });
  };

  function generateString(days: Days[]): string {
    let string = "";
    for (let i = 0; i < days.length; i++) {
      if (days[i].status === true) {
        string += days[i].val +",";
      }
    }
    return string;
  }

  const handleSubmit = (str: string) => {
    if (str === "submit" && addTodo) {
      data._id =String( Math.floor(Math.random() * 10000));
      let updatedRepeat: string;
      if (data.frequency === "Weekly") {
        updatedRepeat = generateString(days);
        let newDataWithRepeat = { ...data, repeat: updatedRepeat };
        postTodosApi(newDataWithRepeat)
        addTodo(newDataWithRepeat);
      } else {
        postTodosApi(data)
        addTodo(data);
      }
      onClose();
    } else if (str === "close") {
      onClose();
    } else if (str === "update" && updateTodoFn) {
      let updatedRepeat: string;
      updateTodoFn(data);
      
      if (data.frequency === "Weekly") {
        
        updatedRepeat = generateString(days);
        let newDataWithRepeat = { ...data, repeat: updatedRepeat };
        updateTodoFn(newDataWithRepeat);
        patchTodosApi(newDataWithRepeat,newDataWithRepeat._id)
      } else {
        updateTodoFn(data);
        patchTodosApi(data,data._id)
      }
      onClose();
    }
  };

  useEffect(() => {
    if (modelName === "update" && updateVal) {
      setData(updateVal);
    }

  }, []);

  return (
    <div className={`modal ${isOpen ? "open" : ""} model-container`}>
      <div className='model-innerContainer'>
        <h2>Add Schedule</h2>
        <div className='inputs-val'>
          <div className='input-title'>
            <div>Title:</div>
            <div>
              <input
                type='text'
                value={data.title}
                name='title'
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className='input-title'>
            <div>Description:</div>
            <div>
              <input
                type='text'
                value={data.description}
                name='description'
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className='input-title'>
            <div>Subject:</div>
            <div>
              <input
                type='text'
                value={data.subject}
                name='subject'
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className='input-title'>
            <div>Frequency:</div>
            <div>
              <select
                id='frequency'
                value={data.frequency}
                onChange={handleFrequencyChange}>
                <option value='Daily'>Daily</option>
                <option value='Weekly'>Weekly</option>
                <option value='Monthly'>Monthly</option>
              </select>
            </div>
          </div>

          {data.frequency != "Daily" && (
            <div className='input-title'>
              <div>Repeat:</div>
              <div>
                {/* <input
                type='text'
                value={data.repeat}
                name='repeat'
                onChange={handleInputChange}
              /> */}

                {data.frequency === "Weekly" && (
                  <div>
                    <WeekDay days={days} selectDay={handleWeeklyChange} />
                  </div>
                )}

                {data.frequency === "Monthly" && (
                  <select
                    className='monthly'
                    id='repeat'
                    value={data.repeat}
                    onChange={handleRepeatChange}>
                    <option value='Monday'>At Monday</option>
                    <option value='Friday'>At Friday</option>
                  </select>
                )}
              </div>
            </div>
          )}
          <div className='input-title'>
            <div>Time:</div>
            <div>
              <input
                type='time'
                value={data.time}
                name='time'
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className='input-title'>
            <div>
              <button className='cal-btn' onClick={() => handleSubmit("close")}>
                Cancel
              </button>
            </div>
            <div>
              {modelName === "submit" ? (
                <button
                  className='sub-btn'
                  onClick={() => handleSubmit("submit")}>
                  Submit
                </button>
              ) : (
                <button
                  className='sub-btn'
                  onClick={() => handleSubmit("update")}>
                  Update
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyModal;
