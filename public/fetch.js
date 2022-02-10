export const fetchData = async (url)=>{
    try{
        const res =  await fetch(url);
        if(!res.ok)
        {
            throw {error : res.status , statusText : res.statusText}
        }
        let data = await res.json();
        return data;
    }
    catch(error){
        console.error(error);
    }
}

export const postData = async (url, item)=>{
    try{
        console.log('xd')
        const options  =  {
            method:"POST",
            headers:{"Content-Type":"application/json; charset=utf-8"},
            body:JSON.stringify(item)
        };

        const res =  await fetch(url, options);
        if(!res.ok)
        {
            throw {error : res.status , statusText : res.statusText}
        }
        let data = await res.json();
        
        return data;
    }
    catch(error){
        console.error(error);
    }
};

