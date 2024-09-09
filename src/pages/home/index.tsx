import Layout from "../../layout";
import { useEffect, useState } from "react";

interface Location {
  latitude: number;
  longitude: number;
}

interface AQIData {
  indexes: Array<{
    aqiDisplay: string;
    category: string;
    dominantPollutant: string;
  }>;
  pollutants: Array<{
    displayName: string;
  }>;
  regionCode: string;
  healthRecommendations: {
    generalPopulation: string;
  };
}

export default function Home() {
  const [aqiError, setAqiError] = useState<string>("");
  const [aqiData, setAqiData] = useState<AQIData | null>();
  const [userLocation, setUserLocation] = useState<Location | {}>({});
  const apiKey = import.meta.env.VITE_APP_AQI_API_KEY;

  const [darkMode, setDarkMode] = useState(false);

  const activateDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const getAQIData = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const url = `https://airquality.googleapis.com/v1/currentConditions:lookup?key=${apiKey}`;
    const data = {
      location: {
        latitude: 36.778259,
        longitude: -119.417931,
      },
      extraComputations: [
        "HEALTH_RECOMMENDATIONS",
        "DOMINANT_POLLUTANT_CONCENTRATION",
        "POLLUTANT_CONCENTRATION",
        "LOCAL_AQI",
        "POLLUTANT_ADDITIONAL_INFO",
      ],
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(url, options);
      console.log("response", response);

      // if (!response.ok) {
      //   // throw new Error(`HTTP error! status: ${response.status}`);
      // }

      const json = (await response.json()) as AQIData;
      console.log("json", json);
      setAqiData(json);
    } catch (error: any) {
      setAqiError(error.message);
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const fetchUserLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Geolocation Error:", error);
        }
      );
    };

    fetchUserLocation();
    console.log(userLocation);
  }, []);
  return (
    <Layout
      action={getAQIData}
      darkMode={darkMode}
      activateDarkMode={activateDarkMode}
    >
      {aqiData ? (
        <>
          <div className="border p-6 w-auto rounded-full lg:p-8 ">
            <span
              className={`${darkMode ? "text-[#14ADF9]" : "text-[#108CCA]"}`}
            >
              {aqiData.indexes[0].aqiDisplay}
            </span>
          </div>
          <p className={`text-lg`}>{aqiData.indexes[0].category}</p>
          <div className="rounded-lg flex flex-col items-center space-x-3 hover:shadow">
            <div className=" w-full flex flex-col items-center p-4">
              <h2>Pollutants</h2>
              <div className="flex items-center flex-wrap">
                {aqiData.pollutants.map((pollutant, id) => (
                  <div
                    key={id}
                    className=" flex items-center justify-center w-1/2 lg:w-1/6 lg:mt-3 p-2 mb-3"
                  >
                    <span
                      className={`rounded-full p-4 border text-sm ${
                        darkMode ? "text-[#14ADF9]" : "text-[#108CCA]"
                      }`}
                    >
                      {" "}
                      {pollutant.displayName}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex flex-col items-center">
                <h2>Country</h2>
                <span className="uppercase">{aqiData.regionCode}</span>
              </div>
              <p className="flex flex-col items-center">
                <h2>Dominant Pollutant</h2>
                <span className="uppercase">
                  {aqiData.indexes[0].dominantPollutant}
                </span>
              </p>
            </div>
          </div>
          <div className="text-center">
            <h2>Remark</h2>
            <p>{aqiData.healthRecommendations.generalPopulation}</p>
          </div>
        </>
      ) : (
        <>
          <div className="border p-6 w-auto rounded-full lg:p-8 ">
            <h1 className="">--</h1>
          </div>
          <p className={`text-lg`}>--</p>
          <div className="rounded-lg flex flex-col items-center space-x-3 p-3 hover:shadow">
            <div className=" w-full flex flex-col items-center p-4">
              <h2>Pollutants</h2>
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
                <h2>Country</h2>
                <span className="uppercase">--</span>
              </p>
              <p className="flex flex-col items-center">
                <h2>Dominant Pollutant</h2>
                <span className="uppercase">--</span>
              </p>
            </div>
          </div>
          <div className="text-center">
            <h2>Remark</h2>
            <p>
              {aqiError
                ? "Google Air Quailty feature is not available in your region"
                : "--"}
            </p>
          </div>
        </>
      )}
    </Layout>
  );
}
