import Nav from "@components/Nav"
import '@styles/globals.css';

const layout = ({ children }) => {
  return (
    <html lang = "en">
        <body>
            <div>
                <Nav />
                {children}
            </div>
        </body>
    </html>
  )
}

export default layout