export const getToken=async()=>{
   const data=await JSON.parse(localStorage.getItem("userData"));
   console.log(data)
    return data;
}