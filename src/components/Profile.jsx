import ReactDom from "react-dom";


export const Profile = (props) => {
    return (
        <>
            <article className="p-5 bg-red rounded-lg shadow-sm shadow-emerald-300">
                <img src={props.owner.avatar_url} alt={props.owner.login} />
                <h2>
                    {props.owner.login}
                </h2>
                <p>{props.name}</p>

                {
                    props.private
                        ?
                        <p>Private</p>
                        :
                        <p>Public</p>
                }
                <div>
                    {props.language &&
                        <p>
                            {props.language}</p>}
                    <ul>
                        {props.topics.map((topic, index) => (
                            <li key={index}>{topic}</li>
                        ))}
                    </ul>
                </div>
            </article>
        </>
    )
}