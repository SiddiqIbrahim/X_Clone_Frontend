import React from 'react'
import { baseUrl } from '../constant/url'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

const useUpdateUserProfile = () => {
    const queryClient = useQueryClient()
	
    const {mutateAsync : updateProfile, isPending:isUpdatingProfile} = useMutation({
		
		mutationFn : async ({coverImg, profileImg}) => {
			try {
			 const res = await fetch(`${baseUrl}/api/users/update`, {
				method: "POST",
				credentials : "include", 
				headers :{
					"Content-Type" : "application/json"
				},
				body:JSON.stringify({coverImg, profileImg})
			 }) 

			 const data = await res.json()
			 if(!res.ok) {
				throw new Error(data.error || "Something went Wrong")
			 }
			 return data

			} catch (error) {
				throw error
			}
		},
		onSuccess : () => {
			toast.success("Profile Updated SuccessFully")
			Promise.all([
				queryClient.invalidateQueries({queryKey : ["authUser"]}),
				queryClient.invalidateQueries({queryKey : ["userProfile"]}),
			])
		},
		onError : (error) => {
			toast.error(error)
		}
	})

  return {updateProfile, isUpdatingProfile}
}

export default useUpdateUserProfile