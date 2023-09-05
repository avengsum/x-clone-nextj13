import Nav from '../components/Nav'
 import Feed from '@/components/Feed'
 import Extra from '@/components/Extra'
// import Login from '@/app/login/page'
 import CommentContainer from '@/components/CommentContainer'

export const getNewsServer = async() => {
    const res = await fetch('https://saurav.tech/NewsAPI/top-headlines/category/sports/in.json')
    const data = await res.json()
    return data
    
}

export const getRandom = async () => {
  const res = await fetch("https://randomuser.me/api/?nat=gb&results=20&inc=name,login,picture")
  const data = await res.json();

  return data
}

export default async function Home() {
  const news = await getNewsServer();
  const data = await getRandom();
  const random = data.results
  return (
    <main className='flex min-h-screen mx-auto"'>
    <Nav />
     <Feed />
    <Extra data={news.articles} user = {random} />
     <CommentContainer /> 

    </main>
  );
}
