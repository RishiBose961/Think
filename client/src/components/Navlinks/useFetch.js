import { useState,useEffect,useContext } from "react"
import axios from "axios"
import { AuthContext } from "../../context/AuthContext"


const useFetch = (url) => {
  const {token} = useContext(AuthContext)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const res =await axios.get(url,{
                    headers: { Authorization: token }
                  })
                setData(res.data)
            } catch (error) {
                setError(error)
            }
            setLoading(false)
        }
        fetchData()
    }, [url])

    const reFetch = async () => {
        setLoading(true)
        try {
            const res = await axios.get(url)
            setData(res.data)
        } catch (error) {
            setError(error)
        }
        setLoading(false)
    }
    return {data,loading,error,reFetch}
}

export default useFetch