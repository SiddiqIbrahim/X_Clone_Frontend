import { useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { RiLockPasswordFill } from 'react-icons/ri'
import Xsvg from '../../../componentes/svgs/x.jsx'
import { Link } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { baseUrl } from '../../../constant/url.jsx'
import toast from 'react-hot-toast'
import LoadingSpinner from '../../../componentes/common/LoadingSpinner.jsx'
const Login = () => {
  const [formData, setFormData] = useState({
    username:"",
    password:""
  })

  const queryClient = useQueryClient()
  const {mutate : login, isPending, isError, error} = useMutation({
      mutationFn : async ({username, password}) => {
        try {
          const res = await fetch(`${baseUrl}/api/auth/login`, {
            method : "POST",
            credentials: "include",
            headers : {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({username, password})
          })
          const data = await res.json()
          console.log("data", data);      
          
          if(!res.ok){
            throw new Error(data.error||"Somthing went Wrong")
          }
        } catch (error) {
          throw error
        }
      },
      
      onSuccess : ()=> {
        toast.success("Login Successfull")
        queryClient.invalidateQueries({
          queryKey:["authUser"]
        })
      }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    login(formData)
    
  }

  const handleInputChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  
  return (
    <div className='max-w-screen-xl mx-auto flex h-screen'>
     <div className="flex-1 hidden lg:flex items-center  justify-center">
        <Xsvg className="lg:w-2/3 fill-white" />
      </div>
           <div className="flex-1 flex flex-col justify-center items-center">
        <form
          action=""
          className="lg:w-2/3  mx-auto md:mx-20 flex gap-4 flex-col"
          onSubmit={handleSubmit}
        >
          <Xsvg className="w-24 lg:hidden fill-white" />
          <h1 className="text-4xl font-extrabold text-white">{"Let,s"}go.</h1>
          <label htmlFor=""  className="input input-bordered rounded flex items-center gap-2">
            <FaUser />
            <input type="text" className='grow' placeholder='username' name='username' onChange={handleInputChange} value={formData?.username}/>
          </label>

          <label htmlFor="" className='input input-bordered rounded flex items-center gap-2'>
             <RiLockPasswordFill />
            <input type="password" placeholder='Password' className='grow' name='password'onChange={handleInputChange} value={formData?.password} />
          </label>
          <button className="btn rounded-full btn-primary text-white">
            {isPending ? <LoadingSpinner/> : "Login"}
          </button>
          {isError && <p className="text-red-500">{error.message}</p>}
          </form>
          <div className='flex flex-col gap-2 mt-4'>
					<p className='text-white text-lg'>{"Don't"} have an account?</p>
					<Link to='/signup'>
						<button className='btn rounded-full btn-primary text-white btn-outline w-full'>Sign up</button>
					</Link>
				</div>
          </div>
    </div>
  )
}

export default Login