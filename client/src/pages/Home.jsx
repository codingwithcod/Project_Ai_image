import React , {useState, useEffect} from 'react';
import {Card, FormField, Loader} from '../components'

import  dotenv from 'dotenv'
// dotenv.config()



// ================ card Render ======


const RenderCard = ({data, title}) => {
  
    if(data?.length > 0 ){
      return data.map((post) => <Card key={post._id} {...post} />)
    }

    return (
      <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">
        {title}
      </h2>
    )
}



// ================ card Render ======





const Home = () => {
  
  const BASE_URL = 'https://ai-image-s0zk.onrender.com';
  

  // 

  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);

  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState(null);
  const [searchTimeOut, setSearchTimeOut] = useState(null);








const fetchPosts = async () => {
  setLoading(true)

  try {
    const response = await fetch(`${BASE_URL}/api/v1/post`, {
      method: 'GET',
      headers: {
        'Content-Type' : 'application/json'
      }
    }) 

    if(response.ok){
      const result = await response.json();
     
      setAllPosts(result.data.reverse())
    }
    
  } catch (error) {
    alert(error)
    
  } finally{
    setLoading(false)
  }
}

  useEffect(() => {
    fetchPosts()
  },[]);



  const handleSearchChange = (e) => {
    clearTimeout(searchTimeOut)
    setSearchText(e.target.value);

    setSearchTimeOut(
    setTimeout(() => {
      const searchResults = allPosts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()));

      setSearchedResults(searchResults)
    }, 500)
    );
  }





 


  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className='font-extrabold text-[32px] text-[#222328]'>The Community showcase</h1>
        <p className=' mt-2 text-[#666e75] text-[16px] max-w-[500px]'> Browse through a collection of imaginative and visually stunnig images genereting by DALL E Ai</p>
      </div>

      <div className='mt-16'>
        <FormField 
          lableName="Search posts"
          type='text'
          name='text'
          placeholder='Search Posts'
          value={searchText}
          handleChange={handleSearchChange}
         />
      </div>

      <div className="mt-10">
        {
          loading ? (
            <div className="flex justify-center">
              <Loader />
            </div>
          ) : ( 
            <> 
            {
              searchText && (
                <h2 className='font-medium text-xl text-[#666e75] mb-3'>showing result for <span className='text-[#222328]'>{searchText}</span></h2>
              )
            }
            <div className='grid md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3'>
              {searchText ? (
                <RenderCard 
                  data={searchedResults}
                  title='No search result found'
                 />
              ) : (
                <RenderCard 
                  data={allPosts}
                  title='No posts found'

                />
              )}
            </div>
            </>
          )
        }
      </div>

    </section>
  )
}

export default Home