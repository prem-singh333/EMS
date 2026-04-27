import { useNavigate } from "react-router-dom";

function Headings({heading}) {
    const navigate = useNavigate()
    
  return (
    <>
      <div className="flex items-center justify-between border-b border-b-gray-200 py-1.5">
        <h3 className="text-xl font-medium text-gray-700">{heading}</h3>
        <button className="text-sm font-medium px-2 py-1 cursor-pointer bg-blue-400 text-white rounded hover:bg-blue-500" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    </>
  );
}

export default Headings;
