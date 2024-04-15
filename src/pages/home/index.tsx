import Layout from "../../layout";

export default function Home (){
    return(
        <Layout>
            <div className="border w-auto rounded-full lg:p-8 ">
                <h1 className="">42</h1>
            </div>
            <p className={`text-lg`}>Bad</p>
            <div className="rounded-lg flex items-center space-x-3 ">
                <p className="flex flex-col items-center">
                    <span>Pollutant</span>
                    <span>O3</span>
                </p>
                <p className="flex flex-col items-center">
                    <span>Country</span>
                    <span>USA</span>
                </p>
                <p className="flex flex-col items-center">
                    <span>Pollutant</span>
                    <span>O3</span>
                </p>
            </div>
            <div>
                <p>Remark</p>
            </div>
        </Layout>
    )
}