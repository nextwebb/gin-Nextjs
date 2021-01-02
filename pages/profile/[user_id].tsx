import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../../styles/Home.module.scss'
import { useState } from 'react'

const Post: React.FC<{ }> = (props) => {
    

	const router = useRouter()
    console.log(router)
    let user = router.query
    
	if (router.isFallback) {
		return <h1>Loading...</h1>
	}


	return (
		<div className={styles.container}>
			<p className={styles.goback}>
				<Link href="/" >
					<a>Go back</a>
				</Link>
			</p>
           
			<h1>{user.user_name} Profile</h1>
            <p>
                <strong>Email:</strong> {user.email}
            </p>
            <p>
                <strong>Short Bio:</strong> {user.bio}
            </p>
            

			

			<div id="disqus_thread"></div>
		</div>
	)
}

export default Post
