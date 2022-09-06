import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { addProducts } from '../redux/actions/productsActions'

const AddProduct = () => {
  const { register, handleSubmit, reset } = useForm()
  const dispatch = useDispatch()

  const onSubmit = (data) => {
    let updatedData = {
      ...data,
      price: parseInt(data.price),
      ratings: parseInt(data.ratings),
      stock: parseInt(data.stock),
    }

    dispatch(addProducts(updatedData))
    setTimeout(() => reset(), 5000)
  }

  return (
    <div
      style={{
        maxWidth: '800px',
        margin: 'auto',
        padding: '20px',
        marginBottom: '100px',
        height: 'auto',
      }}
    >
      <h4>Add a new Product</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Product Name:</label>
        <input type='text' id='productName' name='productName' ref={register} />
        <label>Image: </label>
        <input type='file' id='image' name='image' ref={register} />
        <div></div>
        <label>Brand: </label>
        <input type='text' id='brand' name='brand' ref={register} />
        <label>Price:</label>
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
        <label>Ratings: </label>
        <input type='number' id='ratings' name='ratings' ref={register} />
        <select name='ratings' id='ratings' ref={register}>
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
          <option value='4'>4</option>
          <option value='5'>5</option>
        </select>
        <label>Category: </label>
        <input type='text' id='category' name='category' ref={register} />

        <select name='category' id='category' ref={register}>
          <option value='drinks'>Drinks</option>
          <option value='noodles'>Noodles</option>
          <option value='snacks'>Snacks</option>
          <option value='bottleAndCanned'>Bottle and Canned</option>
          <option value='saucesAndSeasonings'>Sauces and Seasonings</option>
        </select>
        <div></div>
        <button class='btn waves-effect waves-light' type='submit'>
          Submit
        </button>
      </form>
    </div>
  )
}

export default AddProduct
