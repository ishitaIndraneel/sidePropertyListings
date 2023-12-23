const simplyRetsService = async(url) => {
    const api_key = "simplyrets"
    const secret = "simplyrets"
    try{
        const response = await fetch(url, {
            headers: {
                Authorization: `Basic ${btoa(`${api_key}:${secret}`)}`
            }
        })
        const data = await response.json()
        return data
    }catch(err) {
        console.log(err)
    }
} 

export default simplyRetsService