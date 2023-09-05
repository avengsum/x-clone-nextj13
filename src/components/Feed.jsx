'use client'
import { use, useEffect, useState } from "react";
import Input from "./Input"
import Post from "./Post";
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../firebase'
import {onSnapshot, orderBy, query } from "firebase/firestore";


const Feed = () => {
  const [posts ,setPost] = useState();

useEffect(() =>{
  const q = query(collection(db, "posts"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatedPosts= [];
      snapshot.forEach((doc) => {
        updatedPosts.unshift({ 
            id: doc.id,
            name: doc.data().name,
            time: doc.data().timestamp,
            text: doc.data().text,
            userImg: doc.data().userImg,
            username: doc.data().username,
            img : doc.data().img
        });
      });
      setPost(updatedPosts);
      console.log(updatedPosts)
    });

    return () => unsubscribe();
  },
[])

  return (
    <div className="bg-black">
    <div className="xl:ml-[376px]  border-l border-r border-gray-800  xl:min-w-[576px] sm:pl-[73px] flex-grow max-w-xl">
      <div className="flex pb-8 pt-2 px-3 sticky top-0 z-50  border-b border-gray-600">
        <h2 className="text-lg text-white sm:text-xl font-bold cursor-pointer">Home</h2>
        </div>
        <Input />
        {posts?.map((x) => (
            <Post userImg={x?.userImg}
             username={x?.username}
             name={x?.name}
             img={x.imageUrl}
             text={x?.text}
             key={x?.id}
             id = {x?.id}
            />
        ))}
    </div>
    </div>
  )
}

export default Feed