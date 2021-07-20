import {useEffect, useState} from 'react'

const PREFIX = 'amazon-clone-2'

function useLocalStorage(key, intialValue) {
    const prefixKey = `${PREFIX} ${key}`
    const [value, setValue] = useState(() => {
        if (typeof window !== "undefined") {
            const jsonValue = localStorage.getItem(prefixKey)
            if (jsonValue != null) return JSON.parse(jsonValue)
            if (intialValue instanceof Function) {
                return intialValue()
            } else {
                return intialValue
            }
            }
        })

    useEffect(() => {
        localStorage.setItem(prefixKey, JSON.stringify(value))
    }, [value, setValue])
    return (
       [value, setValue]
    )
}

export default useLocalStorage
