import Nav from '@components/Nav';
import '@styles/globals.css';
import { AuthProvider } from './Providers';

export const metadata = {
  title: "hangout!",
  description: "A place to create and share hangouts"
}

const layout = ({ children }) => {
  return (
    <html lang = "en">
        <link rel="icon" href="/favicon.ico"/>
        <body>
            <main className='app w-full h-full'>
                <AuthProvider>{children}</AuthProvider>
            </main>
        </body>
    </html>
  )
}

export default layout