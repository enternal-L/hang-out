import Nav from '@components/Nav';
import '@styles/globals.css';

const layout = ({ children }) => {
  return (
    <html lang = "en">
        <body>
            <main className='app w-full h-full'>

                {children}
            </main>
        </body>
    </html>
  )
}

export default layout