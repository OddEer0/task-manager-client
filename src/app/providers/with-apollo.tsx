import { ApolloProvider } from "@apollo/client"
import { FC, PropsWithChildren } from "react"

import { apolloClient } from "../apollo/client"

export const WithApolloProvider: FC<PropsWithChildren> = ({ children }) => (
	<ApolloProvider client={apolloClient}>{children}</ApolloProvider>
)
