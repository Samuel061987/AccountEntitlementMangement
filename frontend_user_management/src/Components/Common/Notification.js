import React,{ useState }  from "react";
import { RxCross2, RxInfoCircled } from "react-icons/rx"
import "./Notification.css";

export default function Notification({type, description}) {
    const [show,setShow]= useState(true);
    const handleClick =()=>{
        setShow(false);
    }
    return (
        <>
        {show &&(
      <div className={`notification notification__${type}`}>
          <div className={`notification__left`}>
              <RxInfoCircled className={`notification__icon__${type}`}/>
              <div className="notification__content">
                  <div className={`notification__description notification__description__${type}`}>{description}</div>
              </div>
          </div>
          <RxCross2 className={`notification__icon__${type}`} onClick={handleClick}/>
      </div>
        )}
      </>
    )
  }