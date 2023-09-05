import Extra from "@/components/Extra"
import Nav from "@/components/Nav"

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

const layout = async ({children}) => {
  const news = await getNewsServer();
  const data = await getRandom();
  const random = data.results
  return (
    <div className="flex">
      <Nav />
      {children}
      <Extra data={news.articles} user = {random} />
    </div>
  )
}

export default layout