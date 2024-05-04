import { useEffect, useState } from "react";
import Layout from "../../layout";

export default function HeroPage() {
    const [score, setScore] = useState(0);
    const [goals, setGoals] = useState([
        "Pick up some trash",
        "Service your exhaust",
        "Clean the sea",
        "Buy Light saving bulbs"
    ]);
    const [darkMode, setDarkMode] = useState(false)

    const activateDarkMode = () =>{
        setDarkMode(!darkMode)
    }

    useEffect(() => {

        const prompt = `Give 5 goals someone can do to contribute to reducing pollution without numbering and bulleting on a single line. Return it in a js array alone`
        const fetchGoals = async () => {
            try {
                const response = await fetch(`https://air-save-proxy-server.onrender.com/gemini?prompt=${prompt}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json()
                console.log(data)
                data ? setGoals(data) : console.log(data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchGoals();
    }, []);

    const addScore = (e : any) => {
        const value = parseInt(e.target.value, 10);
        setScore(prevScore => e.target.checked ? prevScore + value : prevScore - value);
    };

    return (
        <Layout darkMode= {darkMode} activateDarkMode ={activateDarkMode}>
            <div className="flex flex-col items-center space-y-2">
                <h2 className="text-xl mt-2">
                    Be the hero of your Community
                </h2>
                <div className="border py-6 px-8 w-auto rounded-full lg:p-8">
                <span className={`text-center ${darkMode ? "text-[#14ADF9]" : "text-[#108CCA]"}`}>{score}</span>
                </div>
                <form className="mt-6">
                    {goals.map((goal, id) =>
                        <div key={id}>
                            <label>
                                <div className="flex items-center space-x-2">
                                    <input className="mr-2 w-[20px]" name="goal" onChange={addScore} value={30} type="checkbox" />
                                    <p>{goal}</p>
                                </div>
                            </label>
                        </div>
                    )}
                    <button onClick={addScore} className="rounded-sm">
                        Hang your cape for today
                    </button>
                </form>
            </div>
        </Layout>
    );
}
