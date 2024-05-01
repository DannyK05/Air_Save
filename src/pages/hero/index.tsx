import { useEffect, useState } from "react";
import Layout from "../../layout";
const goals = [
    "Pick up some trash",
    "Service your exhaust",
    "Clean the sea",
    "Buy Light saving bulbs"
]
export default function HeroPage (){
    const[userLocation, setUserLocation] = useState("")
    const[score, setScore] = useState(0);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation(`Latitude: ${latitude}, Longitude: ${longitude}`);
            console.log(position);
        }, (error) => {
            console.error("Geolocation Error:", error);
        });
    }, []);

    const addScore = (e:any) => {
        e.preventDefault()
        if (e.target.checked) {
            let prevScore = 0 
            prevScore += parseInt(e.target.value) 
            setScore(prevScore);
        } else {
            let prevScore = 0 
            prevScore += parseInt(e.target.value) 
            setScore(prevScore);
        }
    };
    return(
        <Layout>
            <div>
               <h1 className="text-xl mt-2">
                    { userLocation ? 
                        "Be the hero of " + {userLocation} :
                        "Be the hero of your Community"
                    }
                </h1>
                <div className="border p-2 rounded-full lg:p-8 ">
                    <h1 className="text-center">{score}</h1>
                </div>
                <form className="mt-6">
                    {
                        goals.map((goal, id)=>
                        <div key={id}>
                        <label>
                            <input className="mr-2 w-[20px]" name="goal" onChange={addScore} value={30} type="checkbox"/>
                            {goal}
                        </label>
                        </div>)
                    }
                    <button onClick={addScore} className="rounded-sm">
                        Hang your cape for today
                    </button>
                </form>
            </div>
        </Layout>
    )
}