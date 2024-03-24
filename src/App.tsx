import './App.css'
import AuthProvider from './contexts/AuthContext/AuthProvider'
import CardListProvider from './contexts/CardListContext/CardListProvider'
import ThemeProvider from './contexts/ThemeContext'
import ToastProvider from './contexts/ToastContext/ToastProvider'
import Default from './layouts/Default/Default'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CardListProvider>
          <ToastProvider>
            <Default/>
          </ToastProvider>
        </CardListProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
