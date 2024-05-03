import Layout from "../../layout";
import { useState } from "react";
// const aqiResponse = {
//     "dateTime": "2023-06-15T10:00:00Z",
//     "regionCode": "us",
//     "indexes": [
//         {
//             "code": "uaqi",
//             "displayName": "Universal AQI",
//             "aqi": 89,
//             "aqiDisplay": "89",
//             "color": {
//                 "red": 48,
//                 "green": 175,
//                 "blue": 55,
//                 "alpha": 255
//             },
//             "category": "Excellent air quality",
//             "dominantPollutant": "o3"
//         },
//         {
//             "code": "usa_epa",
//             "displayName": "AQI (US)",
//             "aqi": 41,
//             "aqiDisplay": "41",
//             "color": {
//                 "green": 228,
//                 "alpha": 255
//             },
//             "category": "Good air quality",
//             "dominantPollutant": "pm25"
//         }
//     ],
//     "pollutants": [
//         {
//             "code": "co",
//             "displayName": "CO",
//             "fullName": "Carbon monoxide",
//             "concentration": {
//                 "value": 334.24,
//                 "units": "PARTS_PER_BILLION"
//             },
//             "additionalInfo": {
//                 "sources": "Typically originates from incomplete combustion...",
//                 "effects": "When inhaled, carbon monoxide can prevent the blood from..."
//             }
//         },
//         {
//             "code": "no2",
//             "displayName": "NO2",
//             "fullName": "Nitrogen dioxide",
//             "concentration": {
//                 "value": 13.12,
//                 "units": "PARTS_PER_BILLION"
//             },
//             "additionalInfo": {
//                 "sources": "Main sources are fuel burning processes, such as...",
//                 "effects": "Exposure may cause increased bronchial reactivity..."
//             }
//         },
//         {
//             "code": "o3",
//             "displayName": "O3",
//             "fullName": "Ozone",
//             "concentration": {
//                 "value": 13.88,
//                 "units": "PARTS_PER_BILLION"
//             },
//             "additionalInfo": {
//                 "sources": "Ozone is created in a chemical reaction between atmospheric oxygen...",
//                 "effects": "Ozone can irritate the airways and cause coughing, a burning..."
//             }
//         },
//         {
//             "code": "pm10",
//             "displayName": "PM10",
//             "fullName": "Inhalable particulate matter (<10µm)",
//             "concentration": {
//                 "value": 5.07,
//                 "units": "MICROGRAMS_PER_CUBIC_METER"
//             },
//             "additionalInfo": {
//                 "sources": "Main sources are combustion processes (e.g. indoor heating, wildfires)...",
//                 "effects": "Inhalable particles can penetrate into the lungs. Short term exposure..."
//             }
//         },
//         {
//             "code": "pm25",
//             "displayName": "PM2.5",
//             "fullName": "Fine particulate matter (<2.5µm)",
//             "concentration": {
//                 "value": 2.83,
//                 "units": "MICROGRAMS_PER_CUBIC_METER"
//             },
//             "additionalInfo": {
//                 "sources": "Main sources are combustion processes (e.g. power plants, indoor heating...",
//                 "effects": "Fine particles can penetrate into the lungs and bloodstream. Short term..."
//             }
//         },
//         {
//             "code": "so2",
//             "displayName": "SO2",
//             "fullName": "Sulfur dioxide",
//             "concentration": {
//                 "value": 0.02,
//                 "units": "PARTS_PER_BILLION"
//             },
//             "additionalInfo": {
//                 "sources": "Main sources are burning processes of sulfur-containing fuel in industry...",
//                 "effects": "Exposure causes irritation of the respiratory tract, coughing and generates..."
//             }
//         }
//     ],
//     "healthRecommendations": {
//         "generalPopulation": "With this level of air quality, you have no limitations. Enjoy the outdoors!",
//         "elderly": "If you start to feel respiratory discomfort such as coughing or breathing difficulties...",
//         "lungDiseasePopulation": "...",
//         "heartDiseasePopulation": "...",
//         "athletes": "...",
//         "pregnantWomen": "...",
//         "children": "..."
//     }
// }
export default function Home (){
    const [aqiError, setAqiError] = useState("")
    const[aqiData, setAqiData] = useState()
     const getAQIData = async (e:any) =>{
        e.preventDefault()
        await fetch('http://localhost:3000/aqi?latitude=37.419734&longitude=-122.0827784')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            else{
                console.log(response.json())
                setAqiData(response)
            }
        })
        .then(data => console.log(data))
        .catch((error) => {
            setAqiError(error)
            console.error('Error fetching data:', error)

        });
     }
     return(
        <Layout action = {getAQIData}>
            {aqiData ?
            <>
            <div className="border p-6 w-auto rounded-full lg:p-8 ">
                <h1 className="">{aqiData.indexes[0].aqiDisplay}</h1>
            </div>
            <p className={`text-lg`}>{aqiData.indexes[0].category}</p>
            <div className="rounded-lg flex flex-col items-center space-x-3 hover:shadow">
                <div className=" w-full flex flex-col items-center p-4">
                    <p>Pollutants</p>
                    <div className="flex items-center flex-wrap">
                        {
                            aqiData.pollutants.map((pollutant, id) =>
                            <div key={id} className=" flex items-center justify-center w-1/2 lg:w-1/6 lg:mt-3 p-2 mb-3">
                               <span className="rounded-full p-4 border text-sm"> {pollutant.displayName}</span>
                            </div>)
                        }
                    </div>
                    
                </div>
                <div className="flex items-center space-x-4">
                    <p className="flex flex-col items-center">
                        <span>Country</span>
                        <span className="uppercase">{aqiData.regionCode}</span>
                    </p>
                    <p className="flex flex-col items-center">
                        <span>Dominant Pollutant</span>
                        <span className="uppercase">{aqiData.indexes[0].dominantPollutant}</span>
                    </p>
                </div>
            </div>
            <div>
                <p>Remark</p>
                <p>{aqiData.healthRecommendations.generalPopulation}</p>
            </div></>
             :(<>
                <div className="border p-6 w-auto rounded-full lg:p-8 ">
                <h1 className="">--</h1>
            </div>
            <p className={`text-lg`}>--</p>
            <div className="rounded-lg flex flex-col items-center space-x-3 hover:shadow">
                <div className=" w-full flex flex-col items-center p-4">
                    <p>Pollutants</p>
                    <div className="flex items-center flex-wrap">
                            <div className=" flex items-center justify-center w-1/2 lg:w-1/3  p-2 mb-3">
                               <span className="rounded-full p-4 border text-sm">--</span>
                            </div>

                            <div className=" flex items-center justify-center w-1/2 lg:w-1/3  p-2 mb-3">
                               <span className="rounded-full p-4 border text-sm">--</span>
                            </div>

                            <div className=" flex items-center justify-center w-1/2 lg:w-1/3  p-2 mb-3">
                               <span className="rounded-full p-4 border text-sm">--</span>
                            </div>
                    </div>
                    
                </div>
                <div className="flex items-center space-x-6 lg:space-x-8">
                    <p className="flex flex-col items-center">
                        <span>Country</span>
                        <span className="uppercase">--</span>
                    </p>
                    <p className="flex flex-col items-center">
                        <span>Dominant Pollutant</span>
                        <span className="uppercase">--</span>
                    </p>
                </div>
            </div>
            <div className="text-center">
                <p>Remark</p>
                <p>{aqiError ? "Google Air Quailty feature is not available in your region": "--"}</p>
            </div>
            </>)}
            
        </Layout>
    )
}