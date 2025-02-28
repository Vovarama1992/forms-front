import { BrowserRouter } from 'react-router-dom'
import Theme from '@/components/template/Theme'
import Layout from '@/components/layouts'
import { AuthProvider } from '@/auth'
import Views from '@/views'
import appConfig from './configs/app.config'
import SyncLogout from '@/auth/SyncLogout'

if (appConfig.enableMock) {
    import('./mock')
}

function App() {

    return (
        <Theme>
            <BrowserRouter>
                <AuthProvider>
                    <SyncLogout />
                    <Layout>
                        <Views />
                    </Layout>
                </AuthProvider>
            </BrowserRouter>
        </Theme>
    )
}

export default App
