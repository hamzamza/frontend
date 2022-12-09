import "./propertyList.css";
import useFetch from "../../hooks/useFetch";
import { server } from "../../Backedn";

const PropertyList = () => {
  const { data, loading, error } = useFetch(
    server+"/api/hotel/countByType"
  );
  const prop = ["https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o="
,"https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg"
  ,"https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg"
  ,"https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg"
  ,"https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg"
    
]
  return (
    <>
      {loading ? (
        "loading ..."
      ) : (    <div className="  container my-4 m-auto bg-gray-100 shadow-lg rounded-lg p-2  ">   
    <h1 className="m-1 text-2xl font-mono font-bold text-gray-400">All we have </h1>
  <div className=" grid grid-cols-1 md:grid-cols-2 gap-2 lg:flex justify-center" >
  { prop.map((item,index ) => 
      <div className=" p-2 col-span-1 flex-1">
      <img
        src={item}
        className=" w-full rounded-lg bg-cover h-40"
      />
      <div className="pListTitles">
        <h1>{data[index].type}</h1>
        <h2>
          {data[index].number  +"  "+ data[index].type}
        </h2>
      </div>
    </div> )}
  </div>
    </div>  )
   
      }  
    </>
  );
};

export default PropertyList;
