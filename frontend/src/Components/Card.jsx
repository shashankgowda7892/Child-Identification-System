import React from "react";
// import photo from "../../../server/uploads/";
const Card = ({ cases }) => {
  console.log(cases);

  return (
    <>
      {
        cases.map((curEle) => {

        const {id,name,reg_date,status,image} = curEle
        const imageUrl = new URL(`../../../server/uploads/${image}`, import.meta.url).href;
        return (
          <>
            <div className="max-w-80 h-[500px] ml-12 bg-black border-solid  overflow-hidden p-2 cursor-pointer" key={id}>
              <img
                className="max-w-full max-h-[250px] object-cover overflow-hidden rounded-3xl cursor-pointer "
                src={imageUrl}
                alt=""
                width={300}
              />
              <div className="pt-3 p-2 flex flex-col gap-3">
                <p className="text-2xl text-white font-bold tracking-widest">
                  {name}
                </p>
                <p className="text-xl text-white font-bold tracking-widest">
                  {/* {reg_date} */}
                </p>
                
                
                if(status){
                  status == "solved" ? <p className="text-2xl text-green-800 font-bold tracking-widest">
                  {status}
                </p> :  <p className="text-xl text-red-400 font-bold tracking-widest">
                  {status}
                </p>
                }
                
                
              </div>
            </div>
          </>
        );
      })}
    </>
  );
};

export default Card;
