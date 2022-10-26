import { useQuery } from "@apollo/client"
import { getCategories } from "../graphql/categories"

const useCategories = () => {
    const { loading, data } = useQuery(getCategories)
    return {loading,categories:data}
}

export default useCategories