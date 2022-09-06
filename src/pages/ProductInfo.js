import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getProduct } from '../redux/actions/productsActions'
import { MediaBox, Button } from 'react-materialize'
import './ProductInfo.scss'
import { addToCart } from '../redux/actions/cartActions'

const ProductInfo = (props) => {
  let id = props.match.params.id

  const dispatch = useDispatch()
  const item = useSelector((state) => state.products.item)

  const handleClick = () => {
    dispatch(addToCart(item))
  }

  useEffect(() => {
    dispatch(getProduct(id))
  }, [])

  return (
    <>
      <div className='product-info-container'>
        <MediaBox>
          <img alt={item.productName} src={item.image} />
        </MediaBox>
        <div className='product-info-details'>
          <h3>{item.productName}</h3>
          <h4>${item.price}</h4>
          <h4>Description: </h4>
          <p>{item.description}</p>
          <h4>Stocks: </h4>
          <p>{item.stock}</p>
          <h4>Ratings: </h4>
          <p>{item.ratings}</p>
          <Button
            waves='light'
            className='product-info-button'
            onClick={handleClick}
          >
            Add
          </Button>
        </div>
      </div>
    </>
  )
}

export default ProductInfo
