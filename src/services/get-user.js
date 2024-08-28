const getCurrentUser=()=>{


    return JSON.parse(localStorage.getItem('admin')) 


}
export default getCurrentUser