'use client'
import { useRouter } from "next/navigation"
import { FiRefreshCcw } from "react-icons/fi"

const ButtonRefresh = () => {
    const router = useRouter()
  return (
    <button className="bg-slate-300 rounded-md px-4 py-1" onClick={()=>router.refresh()}>
        <FiRefreshCcw size={24} color="#FFF"/>
    </button>
  )
}

export default ButtonRefresh