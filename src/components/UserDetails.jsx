import { MdLocationPin } from "react-icons/md"


export const UserDetails = (props) => {
    return (
        <div className="p-2 flex space-x-5 ml-20 mt-3 items-center">
            <div className="border-2 border-[#757575] rounded-full p-1.5">
                <img src={props.avatar_url} className=" rounded-full w-48 h-48 object-contain" />
            </div>
            <div className="flex flex-col space-y-1">
                <span className="text-2xl text-left font-bold">{props.login}</span>
                {
                    props.bio &&
                    <span className="text-left">{props.bio}</span>
                }
                {
                    props.location &&
                    <div className="flex space-x-1 items-center">
                        <MdLocationPin size={20} />
                        <span>{props.location}</span>
                    </div>
                }
                {
                    props.twitter_username &&
                    <div className="flex space-x-2 items-center">
                        <span>Twitter: </span>
                        <span>https://twitter.com/{props.twitter_username}</span>
                    </div>
                }
            </div>
        </div>
    )
}