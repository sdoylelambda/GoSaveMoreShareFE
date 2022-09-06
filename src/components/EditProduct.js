import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { editProducts } from '../redux/actions/productsActions'

const EditProduct = () => {
  const { register, handleSubmit } = useForm()
  const dispatch = useDispatch()

  const onSubmit = (data) => {
    let updatedData = {
      ...data,
      price: parseInt(data.price),
      stock: parseInt(data.stock),
    }
    let productName = data.productName

    dispatch(editProducts(productName, updatedData))
  }

  return (
    <div>
      <h1>Edit a Product</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Product Name</label>
        <input type='text' id='productName' name='productName' ref={register} />
        <label>Price</label>
        <input type='number' id='price' name='price' ref={register} />
        <label>Short Description</label>
        <input
          type='text'
          id='shortDescription'
          name='shortDescription'
          ref={register}
        />
        <label>Description</label>
        <input type='text' id='description' name='description' ref={register} />
        <label>Stock: </label>
        <input type='number' id='stock' name='stock' ref={register} />
        <button class='btn waves-effect waves-light' type='submit'>
          Submit
        </button>
      </form>
    </div>
  )
}

export default EditProduct
