import { useState, useEffect } from "react";
import axios from "axios";

const useAxios = (url, options = {method:"get", data:null}) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios({url, ...options});
            setData(response.data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const startFetch = async () => {
            await fetchData();
        }
        startFetch();
    }, [url,options.method,options.data])
    
    return {data, error, loading}
}

export default useAxios;