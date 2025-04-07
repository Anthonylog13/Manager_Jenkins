import { AuthProvider } from "./auth"
import { AppRouter } from "./router/AppRouter"


export const ProductHuntApp = () => {
  return (
   <AuthProvider>
    <AppRouter/>
   </AuthProvider>
  )
}
