import React from 'react'
import dayjs from "dayjs";


const advancedFormat = require("dayjs/plugin/advancedFormat");
dayjs.extend(advancedFormat);


export const JournalEntry = ( {id, date, title, body, url}) => {

    
    const noteDate = dayjs(date);

    return (
        <div className="journal__entry pointer">

        {    
            url &&
            <div 
                className="journal__entry-picture"
                style={{ 
                    backgroundSize: 'cover',
                    backgroundImage: `url(${url})`
                }}
            ></div>
        }

            <div className="journal__entry-body">

                <p className="journal__entry-title">
                    {title}
                </p>
                <p className="journal__entry-content">
                    {body}
                </p>
            </div>

            <div className="journal__entry-date-box">
                <span>{noteDate.format("dddd")}</span>
                <h4>{noteDate.format('D')}</h4>
            </div>


        </div>
    )
}
