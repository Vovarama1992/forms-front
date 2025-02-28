import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/auth'

const SyncLogout = () => {
    const navigate = useNavigate()
    const { signOut } = useAuth()

    useEffect(() => {
        const syncLogout = (event: StorageEvent) => {
            if (event.key === 'logout') {
                signOut()
                navigate('/login')
            }
        }

        window.addEventListener('storage', syncLogout)

        return () => {
            window.removeEventListener('storage', syncLogout)
        }
    }, [navigate, signOut])

    return null
}

export default SyncLogout