import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Translations } from "./Translations"

const client = new QueryClient()

interface Props {
    children: React.ReactNode
}
const Providers = ({ children }: Props) => {
  return (
    <Translations>
      <QueryClientProvider client={client}>
        {children}
      </QueryClientProvider>
    </Translations>
  )
}

export default Providers