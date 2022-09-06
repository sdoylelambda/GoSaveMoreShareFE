import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { requestProduct } from '../redux/actions/productsActions'
import { useHistory } from 'react-router-dom'

const RequestProduct = () => {
  const { register, handleSubmit, reset } = useForm()
  const dispatch = useDispatch()
  const history = useHistory()

  const onSubmit = (data) => {
    dispatch(requestProduct(data))
    setTimeout(() => reset(), 5000)
    let path = `/requestSubmitted`
    history.push(path)
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
      <h4>Request a Product</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Product Name:</label>
        <input type='text' id='productName' name='productName' ref={register} />
        <label>Description</label>
        <input type='text' id='description' name='description' ref={register} />
        <label>Comments: </label>
        <input type='text' id='comments' name='comments' ref={register} />
        <label>First Name</label>
        <input type='text' id='firstName' name='firstName' ref={register} />
        <label>Last Name</label>
        <input type='text' id='lastName' name='lastName' ref={register} />
        <label>Email: </label>
        <input type='text' id='email' name='email' ref={register} />
        <label>Phone: </label>
        <input type='text' id='phone' name='phone' ref={register} />
        <div></div>
        <button class='btn waves-effect waves-light' type='submit'>
          Submit
        </button>
      </form>
    </div>
  )
}

export default RequestProduct
