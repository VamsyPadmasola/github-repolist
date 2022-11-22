import ReactDom from "react-dom";


export const NotFound = () => {
    return (
        <div className="flex flex-col space-y-4 relative top-36 items-center justify-center">
            <img src="noresults.png" className="w-72 h-72" />
            <span className="text-2xl">No Account Found with this username.</span>
        </div>
    )
}