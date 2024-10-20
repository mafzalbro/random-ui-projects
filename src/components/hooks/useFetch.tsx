// import { useEffect, useState } from "react"
// import { data } from "../react-apis/data"

const useFetch = () => {
    // const [my_data, setData] = useState({})

    // useEffect(() => {
    //     setData(data)
    // }, [])


    const fetcher = async ({ url = '', type = 'GET', body = [], headers = [] }) => {
        // console.log(url, type, body, headers);

        const my_data = await (await fetch(url, { method: type, body: type !== 'GET' ? JSON.stringify([...body]) : null, ...headers })).json()
        // setData(data)
        return my_data
    }

    return { fetcher }
}

export default useFetch