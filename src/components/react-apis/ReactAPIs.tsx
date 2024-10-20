// import { useId } from "react";
// import useFetch from "../hooks/useFetch";
import ContextData from "./ContextData";
import MyContextProvider from "./MyContextProvider";


const ReactAPIs = () => {

  // const id = useId()
  // // console.log({ id });

  //custom Hooks
  // const fetcher = useFetch().fetcher
  // fetcher({ url: 'https://fakestoreapi.com/products/1', type: 'GET' }).then(data => {
  //   console.log(data);

  // })

  return <MyContextProvider>
    <>
      <ContextData />
    </>
  </MyContextProvider>
};

export default ReactAPIs;
