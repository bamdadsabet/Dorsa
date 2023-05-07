import {axios} from "./axios.js";


const getAnimationsList = async(page: number, sortBy: string): Promise<[]> => {
    const animationList = await axios.get(`?page=${page}&sortby=${sortBy}`); 
    console.log(animationList)
    return animationList
}


export {getAnimationsList}