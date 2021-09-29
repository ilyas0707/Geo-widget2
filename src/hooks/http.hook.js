import { useCallback, useState } from 'react'
import { useSuccess } from './success.hook'
import { useError } from './error.hook'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const useHttp = () => {
    toast.configure({
        position: 'top-right',
        autoClose: 3000,
        draggable: true
    })

    const [loading, setLoading] = useState(false)
    const successMessage = useSuccess()
    const errorMessage = useError()

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        try {
            if (body) {
                body = JSON.stringify(body)
                headers["Content-Type"] = "application/json"
            }
    
            const response = await fetch(url, { method, body, headers })
                .then(setLoading(true))
            const data = await response.json()
                .then(setLoading(false))
    
            if (!response.ok) {
                errorMessage('Что-то пошло не так!')
            } else {
                successMessage('Совпадения по локации получены!')
            }
    
            return data
        } catch (error) {
            setLoading(false)
            errorMessage('Совпадения не найдены!')
        }
    }, [errorMessage, successMessage])

    return { loading, request }
}