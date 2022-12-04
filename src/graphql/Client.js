import {ApolloClient,InMemoryCache} from '@apollo/client'

export default new ApolloClient({
    uri:`${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}`,
    cache:new InMemoryCache(),
    credentials:'include',
    defaultOptions:{
        query:{fetchPolicy:'no-cache'}, //TODO 수정 예정
    }
})