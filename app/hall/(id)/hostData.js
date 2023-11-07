export async function getHost(id) {
    try {
        const hostRes=await fetch(`api/hosts/${id.data}`)
        const hostData= await hostRes.json()
        return hostData
    } catch (error) {
        return new Response(error.message)
    }
}
