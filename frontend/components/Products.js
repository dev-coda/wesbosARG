import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Product from './Product';
import { perPage } from '../config';

export const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY($skip: Int = 0, $first: Int) {
    allProducts(first: $first, skip: $skip) {
      id
      name
      price
      description
      photo {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const ProductsListStyles = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;

// eslint-disable-next-line react/prop-types
const Products = ({ page }) => {
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY, {
    variables: { skip: page * perPage - perPage, first: perPage },
  });
  if (loading) {
    return <h3>Loading...</h3>;
  }
  if (error) {
    return <h3>Error</h3>;
  }
  return (
    <ProductsListStyles>
      {data.allProducts.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </ProductsListStyles>
  );
};
export default Products;
