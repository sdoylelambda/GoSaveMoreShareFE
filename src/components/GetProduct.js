import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { getProduct } from '../redux/actions/productsActions'

const GetProduct = () => {
  const { register, handleSubmit } = useForm()
  const dispatch = useDispatch()

  const onSubmit = (data) => {
    dispatch(getProduct(data))
  }

  return (
    <div style={{ maxWidth: '800px', margin: 'auto' }}>
      <h4>Get product by name</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Product Name</label>
        <input type='text' id='productName' name='productName' ref={register} />

        <button class='btn waves-effect waves-light' type='submit'>
          Submit
        </button>
      </form>
    </div>
  )
}

export default GetProduct
