'use server'
import Account from '@components/profile/Account'
import { getServerSession } from 'next-auth'
import { authOptions } from '@app/api/auth/[...nextauth]/route'

const profileServerPage = async() => {
    const session =await getServerSession(authOptions)
  return (
    <div>
      <Account user={session?.user} />
    </div>
  )
}

export default profileServerPage
