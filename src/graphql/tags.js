import { gql } from '@apollo/client';

export const getAllTags=gql`
    query tags{
        tags{
            tagname,
            count
    }
    }
`