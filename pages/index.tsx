import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import Link from 'next/link'
import { useState } from 'react'
import { type } from 'os'

const { API_URL} = process.env

// types
type User = {
  user_id: string
	email: string
  user_name: string
  password:string
}

// anonymous function
async function getUsers() {
	// curl ""
   const res = await fetch(`${API_URL}/readUsers`)
  //convert and return json
  .then((res) => res.json())

  // console.log(res)
	return res.users // type object[]
}


// Nextjs will fetch data at build time and cached
// getStaticProps // Data fetching feature
export const getStaticProps = async ({ params }) => {
  const users = await getUsers() 
 
	return {
		revalidate: 10, // revalidate this data , from the backend every 10 seconds
		props: { users } //syntax props:{} 
						 // but Users is actually an array 
	}
}

// results = [ {key1:val1}, {key2:val2}, {key3:val3} ]//

// type IResult = {
// 	key1: string,
// 	key2: string,
// 	key3: string
// }

// React.FC<{data:IResult}> = (results) => {

// }

// React.FunctionComponent
// Users is an object
// User[] - array of objects
const Home: React.FC<{ users: User[] }> = (props) => {
  const { users} = props

	return (
		<div className={styles.container}>
			<h1>Hello Welcome to my User Collections 😃 </h1>
			<ul>
				{users.map((user, index) => {
					return (
						<li className={styles.Useritem} key={user.user_id}>
              {/* {//dynamic routing- Incompatible href and as values} */}
              <Link 
                href={{ 
                  pathname: '/profile/[user_id]', 
                  query: {
                      user_id: user.user_id,
                      user_name:user.user_name,
                      email:user.email,
                      bio: "Everyone realizes why a new common language would be desirable: one could refuse to pay expensive translators. To achieve this, it would be necessary to have uniform grammar, pronunciation and more common words."
                    } 
                 }}
                
                >

								<a>{user.user_name.toUpperCase() }  </a>
							</Link>
						</li>
          //   <Link href={{ pathname: '/about', query: { data: JSON.stringify(episode) } }}>
          //   <a>About us</a>
          // </Link>
					)
				})}
			</ul>
		</div>
	)
}

export default Home
