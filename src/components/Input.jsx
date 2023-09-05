'use client'
import {SlCalender} from 'react-icons/sl'
import {CiLocationOn} from 'react-icons/ci'
import {BiSmile} from 'react-icons/bi'
import {BiPoll} from 'react-icons/bi'
import {AiOutlineGif} from 'react-icons/ai'
import {MdPermMedia} from 'react-icons/md'
import {useSession } from 'next-auth/react';
import { useState } from 'react'
import { serverTimestamp, addDoc, collection,} from 'firebase/firestore'
import { db } from '../../firebase'
import { useRef } from 'react'
import {ref , getDownloadURL, uploadString } from "firebase/storage"
import { storage} from "../../firebase" 
import {ImCross} from 'react-icons/im'

const Input = () => {
  const {data : session} = useSession()
  const [text , setText] = useState()
  const [image , setImage] = useState();

  const addPost = async () => {
    let ImageUrl =''
    if(image){
      const ImageRef = ref(storage,'image/'+session?.user?.uid)
      await uploadString(ImageRef,image,"data_url");
      alert('Picture uploaded successfully')
      ImageUrl = await getDownloadURL(ImageRef);
  }
  
   const postRef = await addDoc(collection(db,'posts'),{
    uid : session?.user?.uid,
    name:session?.user?.name,
    userImg: session?.user?.image,
    imageUrl : ImageUrl,
    text : text,
    username : session?.user?.username,
    timestamp: serverTimestamp(),
   });

   setText('')
   setImage('')

  }
  const postImage = useRef(null);

  const handleImage = (e) => {
    const file = e.target.files ? e.target.files[0] : null;
    const reader = new FileReader();
    if(file){
      reader.readAsDataURL(file)
    }
    reader.onload =(e) => {
      const result = e?.target?.result;
      if (typeof result === 'string') {
        setImage(result);
    }
  }
}

  return (
    <>
    {session && (
      <div className="flex-col  border-b border-gray-600 p-3 space-x-3" >
      <img
        src='https://cdn.geekwire.com/wp-content/uploads/2023/07/xlogo-300x300.jpeg'
        className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95"
      />
      <div className='w-full divide-y text-gray-600 divide-gray-200'>
        <div>
          <textarea
            className="w-full border-none focus:ring-0 text-lg text-white placeholder-gray-300 bg-black tracking-wide min-h-[50px]"
            rows={2}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What's happening"
          ></textarea>
        </div>
        {image && (
              <div className="relative">
                <ImCross
                  onClick={() => setImage(null)}
                  className="h-7 text-black absolute cursor-pointer shadow-md shadow-white rounded-full"
                />
                <img
                  src={image}
                />
              </div>)}
      </div>
       <div className='flex items-center justify-between pt-2.5 '>
                  <div className='flex'>
                    <div onClick={() => postImage.current?.click()}>
                      <MdPermMedia
                      className ="h-10 w-10 hoverEffect p-2 " 
                       style={{ color: '#2596be' }}  />
                       <input hidden onChange={handleImage} type='file' ref={postImage} />
                    </div>
                      <AiOutlineGif
                      className ="h-10 w-10 hoverEffect p-2 " 
                       style={{ color: '#2596be' }}  />
                      <BiPoll
                      className ="h-10 w-10 hoverEffect p-2 " 
                       style={{ color: '#2596be' }}  />
                      <BiSmile
                      className ="h-10 w-10 hoverEffect p-2 " 
                       style={{ color: '#2596be' }}   />
                      <SlCalender
                      className ="h-10 w-10 hoverEffect p-2 " 
                       style={{ color: '#2596be' }}  />
                      <CiLocationOn
                      className ="h-10 w-10 hoverEffect p-2 " 
                       style={{ color: '#2596be' }}  />
                  </div>
                  <button onClick={() => addPost()} className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50">
                      Post
                    </button>
              </div>
          </div>
    )}</>
   
  )
}

export default Input