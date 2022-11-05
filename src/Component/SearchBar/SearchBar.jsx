import React from 'react'
import './SearchBar.css'
import {useState} from 'react'
import axios from '../../axios'
import ShortLink from '../ShortLink/ShortLink'



function SearchBar() {

 
  const [shortLinks, setShortLinks] = useState([])

  const [url, setUrl] = useState("");

   const shortLink = (url)=>{  
     axios.get(`v2/shorten?url=${url}`).then((response)=>{
      const shorten = response.data.result.short_link
      setShortLinks([...shortLinks,{ id:Date.now(), shortenLink:shorten , inputUrl:url} ]) 
      // console.log("shortLinks:",shortLinks)    
     })       
   }

  return (
    <div className='searchBar'>
     <div className='searchBarSec'>
     <input type="text"
              name="url"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Shorten a link here..."/>
                       
     <button onClick={()=>{
      shortLink(url)
     }}>Shorten It</button>
     </div>  

     {
      shortLinks.map((object,index)=>{  
        return(
          <ShortLink key= {index} data={object}/>
            )
         })
     }
    
    </div>

  )
}

export default SearchBar