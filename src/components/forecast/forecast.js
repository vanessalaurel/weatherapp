import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "./forecast.css";
import React from "react";

const WEEKDAYS = [
  "Monday",
  "tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const Forecast = ({ data }) => {
  const dayinaweek = new Date().getDay();
  const forecastdays = WEEKDAYS.slice(dayinaweek, WEEKDAYS.length).concat(
    WEEKDAYS.slice(0, dayinaweek)
  );

  return (
    <>
      <label className="title">daily</label>
      <Accordion allowZeroExpanded>
        {data.list.splice(0, 7).map((item, idx) => (
          <AccordionItem key={idx}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className="dailyweather">
                  <img
                    src={`icons/${item.weather[0].icon}.png`}
                    className="icon-small"
                    alt="weather"
                  />
                  <label className="day">{forecastdays[idx]}</label>
                  <label className="description">
                    {item.weather[0].description}
                  </label>
                  <label className="minmax">
                    {Math.round(item.main.temp_min)}°C /{" "}
                    {Math.round(item.main.temp_max)}°C
                  </label>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="dailydetailgrid">
                <div className="dailydetailgriditem">
                  <label>Pressure</label>
                  <label>{item.main.pressure} hPa</label>
                </div>
                <div className="dailydetailgriditem">
                  <label>Humidity</label>
                  <label>{item.main.humidity} %</label>
                </div>
                <div className="dailydetailgriditem">
                  <label>Clouds</label>
                  <label>{item.clouds.all} %</label>
                </div>
                <div className="dailydetailgriditem">
                  <label>Wind Speed</label>
                  <label>{item.wind.speed} m/s</label>
                </div>
                <div className="dailydetailgriditem">
                  <label>Sea level</label>
                  <label>{item.main.sea_level} m</label>
                </div>
                <div className="dailydetailgriditem">
                  <label>Feels Like</label>
                  <label>{Math.round(item.main.feels_like)} °C</label>
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default Forecast;
