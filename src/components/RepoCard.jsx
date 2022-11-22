import ReactDom from "react-dom";

const topicCount = 3
export const RepoCard = (props) => {
    const newTopics = props.topics


    return (
        <>
            <div className="p-2 border-2 border-black flex flex-col space-y-1 shadow-lg rounded-lg">
                <span className="text-xl text-[#3e89cc] font-bold">{props.name}</span>
                {
                    props.description &&
                    <p className="text-sm">{props.description}</p>
                }
                <div className="mt-2">
                    {props.topics &&
                        <ul className="flex flex-wrap">

                            {newTopics.map((topic, index) => (
                                <li className="bg-[#428aca] text-xs text-white rounded p-1.5 mb-1 mr-2 font-bold"
                                    key={index}>{topic}</li>
                            ))}
                        </ul>
                    }
                </div>
            </div>
        </>
    )
}