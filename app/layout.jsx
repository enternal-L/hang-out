import Nav from "@components/Nav"
import '@styles/globals.css';

const layout = ({ children }) => {
  return (
    <html lang = "en">
        <body>
            <div>
                {children}
            </div>
        </body>
    </html>
  )
}

export default layout