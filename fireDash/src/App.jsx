import { useEffect, useState } from 'react';
import GaugeChart from 'react-gauge-chart'
import axiosReq from './component/httpRequest.js'; //API calling module

import liveIcon from './assets/live-modified.png';
import busyLogo from './assets/busy.png';
import freeLogo from './assets/tickLogo.png';
import './App.css'

async function getStatus() {

  const response = await axiosReq.get("/status.json"); //get status Json

  //console.log(response?.data); //for debug purpose

  return response.data;

}

function App() {
  const [ wafersPerDay, setWafersPerDay ] = useState(0);
  const [ lastCompleted, setLastCompleted ] = useState(0);

  const [ aveTimePerWafer, setAveTimePerWafer ] = useState(0.0);
  const [ aveCleanNQueueTime, setAveCleanNQueueTime] = useState(0.0);
  const [ avePrebakeTime, setAvePrebakeTime] = useState(0.0);
  const [ aveCoatingTime, setAveCoatingTime] = useState(0.0);
  const [ avePreexposureTime, setAvePreexposureTime] = useState(0.0);
  const [ aveExposureTime, setAveExposureTime] = useState(0.0);
  const [ avePostbakeTime, setPostbakeTime] = useState(0.0);
  const [ aveDevelopmentTime, setAveDevelopmentTime ] = useState(0.0);
  const [ aveEtchTime, setAveEtchTime ] = useState(0.0);
  const [ aveFinalizeTime, setFinalizeTime ] = useState(0.0);

  const [ cleanStatus, setCleanStatus ] = useState(false);
  const [ prebakeStatus, setPrebake ] = useState(false);
  const [ coatingStatus, setCoatingStatus ] = useState(false);
  const [ preexposeStatus, setPreexposeStatus ] = useState(false);
  const [ exposeStatus, setExposeStatus ] = useState(false);
  const [ postbakeStatus, setPostbakeStatus ] = useState(false);
  const [ developmentStatus, setDevelopmentStatus ] = useState(false);
  const [ etchStatus, setEtchStatus ] = useState(false);
  const [ finalizeStatus, setFinalizeStatus ] = useState(false);

  const [ timestamp, setTimestamp ] = useState("");
  const [ cpuUtil, setCpuUtil ] = useState(0.0);

  useEffect(() => {

    const interval = setInterval(() => {

      getStatus().then((result) => {
        
        const statusJson = result;

        setWafersPerDay(parseInt(statusJson.wafersPerDay));
        setLastCompleted(parseInt(statusJson.lastComplete));
    
        setAveTimePerWafer(parseFloat(statusJson.aveTimePerWafer));
        setAveCleanNQueueTime(parseFloat(statusJson.aveCleanNQueueTime));
        setAvePrebakeTime(parseFloat(statusJson.avePrebakeTime));
        setAveCoatingTime(parseFloat(statusJson.aveCoatingTime));
        setAvePreexposureTime(parseFloat(statusJson.avePreexposureTime));
        setAveExposureTime(parseFloat(statusJson.aveExposureTime));
        setPostbakeTime(parseFloat(statusJson.avePostbakeTime));
        setAveDevelopmentTime(parseFloat(statusJson.aveDevelopmentTime));
        setAveEtchTime(parseFloat(statusJson.aveEtchTime));
        setFinalizeTime(parseFloat(statusJson.aveFinalizeTime));
    
        setCleanStatus(parseInt(statusJson.cleanStatus));
        setPrebake(parseInt(statusJson.prebakeStatus));
        setCoatingStatus(parseInt(statusJson.coatingStatus));
        setPreexposeStatus(parseInt(statusJson.preexposeStatus));
        setExposeStatus(parseInt(statusJson.exposeStatus));
        setPostbakeStatus(parseInt(statusJson.postbakeStatus));
        setDevelopmentStatus(parseInt(statusJson.developmentStatus));
        setEtchStatus(parseInt(statusJson.etchStatus));
        setFinalizeStatus(parseInt(statusJson.finalizeStatus));
    
        setTimestamp(statusJson.timestamp);
        setCpuUtil(parseFloat(statusJson.cpuUtil));

      }).catch(console.error)

    }, 1000); //refresh data every 1 second
  
    return () => clearInterval(interval);

  }, []);

  return (
    <>
      <div class="wrapper">
        <div class="utilization">

          <label><strong>Last Updated: {timestamp}</strong></label>

          <div class="gauge">
            <GaugeChart id="gauge-chart4" 
              nrOfLevels = {3} 
              arcPadding = {0.1} 
              cornerRadius = {3} 
              percent = {cpuUtil} 
              colors = {["#77C371", "#FF5F6D"]} 
              textColor = "#101010"
              animate={false} 
            />
          </div>
          <h1 class="utilText">CPU Utilization</h1>
        </div>
        <div class="averageVal">

          <div class="averageItem">
            <label><strong>Last Completed Wafer: </strong></label>
            <p style={{textAlign: "end", backgroundColor: "white", borderRadius: "10px", padding: "0.25rem", paddingInline: "2rem"}}>#{timestamp.substring(0,9)}_{lastCompleted}</p>
          </div>

          <div class="averageItem">
            <label><strong>Wafer(s) Completed today: </strong></label>
            <p style={{textAlign: "end", backgroundColor: "white", borderRadius: "10px", padding: "0.25rem", paddingInline: "2rem"}}>{wafersPerDay}</p>
          </div>

          <div class="averageItem">
            <label><strong>Average Time Taken Per Wafer: </strong></label>
            <p style={{textAlign: "end", backgroundColor: "white", borderRadius: "10px", padding: "0.25rem", paddingInline: "2rem"}}>{aveTimePerWafer}</p>
          </div>

          <div class="averageItem">
            <label><strong>Average Clean and Queue Time: </strong></label>
            <p style={{textAlign: "end", backgroundColor: "white", borderRadius: "10px", padding: "0.25rem", paddingInline: "2rem"}}>{aveCleanNQueueTime}</p>
          </div>

          <div class="averageItem">
            <label><strong>Average Drying and Prebaking Time: </strong></label>
            <p style={{textAlign: "end", backgroundColor: "white", borderRadius: "10px", padding: "0.25rem", paddingInline: "2rem"}}>{avePrebakeTime}</p>
          </div>
          <div class="averageItem">
            <label><strong>Average Photoresist Coating Time: </strong></label>
            <p style={{textAlign: "end", backgroundColor: "white", borderRadius: "10px", padding: "0.25rem", paddingInline: "2rem"}}>{aveCoatingTime}</p>
          </div>

        </div>
        <div class="averageVal">

          <div class="averageItem">
            <label><strong>Average Pre-exposure Baking Time: </strong></label>
            <p style={{textAlign: "end", backgroundColor: "white", borderRadius: "10px", padding: "0.25rem", paddingInline: "2rem"}}>{avePreexposureTime}</p>
          </div>

          <div class="averageItem">
            <label><strong>Average Lithography Exposure Time: </strong></label>
            <p style={{textAlign: "end", backgroundColor: "white", borderRadius: "10px", padding: "0.25rem", paddingInline: "2rem"}}>{aveExposureTime}</p>
          </div>

          <div class="averageItem">
            <label><strong>Average Postbaking Time: </strong></label>
            <p style={{textAlign: "end", backgroundColor: "white", borderRadius: "10px", padding: "0.25rem", paddingInline: "2rem"}}>{avePostbakeTime}</p>
          </div>

          <div class="averageItem">
            <label><strong>Average Development Time: </strong></label>
            <p style={{textAlign: "end", backgroundColor: "white", borderRadius: "10px", padding: "0.25rem", paddingInline: "2rem"}}>{aveDevelopmentTime}</p>
          </div>

          <div class="averageItem">
            <label><strong>Average Etch Time: </strong></label>
            <p style={{textAlign: "end", backgroundColor: "white", borderRadius: "10px", padding: "0.25rem", paddingInline: "2rem"}}>{aveEtchTime}</p>
          </div>

          <div class="averageItem">
            <label><strong>Average Photoresist Cleaning and Finalizing Time: </strong></label>
            <p style={{textAlign: "end", backgroundColor: "white", borderRadius: "10px", padding: "0.25rem", paddingInline: "2rem"}}>{aveFinalizeTime}</p>
          </div>

        </div>
      </div>

      <div class="statusWrapper">
        <div class="status" style={cleanStatus ? {backgroundColor: "#FF5F6D"} : {backgroundColor: "#77C371"}}>
          <img class="statusIndicator" style={{transform: "translateY(30%)", backgroundColor: "whitesmoke", padding: "5px", borderRadius: "50px", marginBottom: "1rem"}} src={cleanStatus ? busyLogo : freeLogo}></img>
          <h2>Cleaning Zone</h2>
        </div>
        <div class="status" style={prebakeStatus ? {backgroundColor: "#FF5F6D"} : {backgroundColor: "#77C371"}}>
          <img class="statusIndicator" style={{transform: "translateY(30%)", backgroundColor: "whitesmoke", padding: "5px", borderRadius: "50px", marginBottom: "1rem"}} src={prebakeStatus ? busyLogo : freeLogo}></img>
          <h2>Drying and Prebaking Zone</h2>
        </div>
        <div class="status" style={coatingStatus ? {backgroundColor: "#FF5F6D"} : {backgroundColor: "#77C371"}}>
          <img class="statusIndicator" style={{transform: "translateY(30%)", backgroundColor: "whitesmoke", padding: "5px", borderRadius: "50px", marginBottom: "1rem"}} src={coatingStatus ? busyLogo : freeLogo}></img>
          <h2>PR Coating Zone</h2>
        </div>
        <div class="status" style={preexposeStatus ? {backgroundColor: "#FF5F6D"} : {backgroundColor: "#77C371"}}>
          <img class="statusIndicator" style={{transform: "translateY(30%)", backgroundColor: "whitesmoke", padding: "5px", borderRadius: "50px", marginBottom: "1rem"}} src={preexposeStatus ? busyLogo : freeLogo}></img>
          <h2>Pre-exposure Baking Zone</h2>
        </div>
        <div class="status" style={exposeStatus ? {backgroundColor: "#FF5F6D"} : {backgroundColor: "#77C371"}}>
          <img class="statusIndicator" style={{transform: "translateY(30%)", backgroundColor: "whitesmoke", padding: "5px", borderRadius: "50px", marginBottom: "1rem"}} src={exposeStatus ? busyLogo : freeLogo}></img>
          <h2>Lithography Exposure Zone</h2>
        </div>
        <div class="status" style={postbakeStatus ? {backgroundColor: "#FF5F6D"} : {backgroundColor: "#77C371"}}>
          <img class="statusIndicator" style={{transform: "translateY(30%)", backgroundColor: "whitesmoke", padding: "5px", borderRadius: "50px", marginBottom: "1rem"}} src={postbakeStatus ? busyLogo : freeLogo}></img>
          <h2>Postbaking Zone</h2>
        </div>
        <div class="status" style={developmentStatus ? {backgroundColor: "#FF5F6D"} : {backgroundColor: "#77C371"}}>
          <img class="statusIndicator" style={{transform: "translateY(30%)", backgroundColor: "whitesmoke", padding: "5px", borderRadius: "50px", marginBottom: "1rem"}} src={developmentStatus ? busyLogo : freeLogo}></img>
          <h2>Development Zone</h2>
        </div>
        <div class="status" style={etchStatus ? {backgroundColor: "#FF5F6D"} : {backgroundColor: "#77C371"}}>
          <img class="statusIndicator" style={{transform: "translateY(30%)", backgroundColor: "whitesmoke", padding: "5px", borderRadius: "50px", marginBottom: "1rem"}} src={etchStatus ? busyLogo : freeLogo}></img>
          <h2>Etching Zone</h2>
        </div>
        <div class="status" style={finalizeStatus ? {backgroundColor: "#FF5F6D"} : {backgroundColor: "#77C371"}}>
          <img class="statusIndicator" style={{backgroundColor: "whitesmoke", padding: "5px", borderRadius: "50px", marginBottom: "1rem"}} src={finalizeStatus ? busyLogo : freeLogo}></img>
          <h2>PR Cleaning and Finalizing Zone</h2>
        </div>
      </div>

      <div style={{position: "fixed", left: "3%", bottom: "21%", width: "10px", height: "10px", scale: "0.05"}}>
        <a href="http://192.168.108.57/">
          <img class="livebutton" src={liveIcon}></img>
        </a>
      </div>
    </>
  )
}

export default App
