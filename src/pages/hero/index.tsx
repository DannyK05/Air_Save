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

    const addScore = (e) => {
        const value = parseInt(e.target.value, 10);
        setScore(prevScore => e.target.checked ? prevScore + value : prevScore - value);
    };

    return (
        <Layout>
            <div>
                <h1 className="text-xl mt-2">
                    Be the hero of your Community
                </h1>
                <div className="border p-2 rounded-full lg:p-8">
                    <h1 className="text-center">{score}</h1>
                </div>
                <form className="mt-6">
                    {goals.map((goal, id) =>
                        <div key={id}>
                            <label>
                                <input className="mr-2 w-[20px]" name="goal" onChange={addScore} value={30} type="checkbox" />
                                {goal}
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
