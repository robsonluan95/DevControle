"use client"

import { createContext,ReactNode,useState } from "react"
import ModalTicket from "@/components/modal"
import { TicketProps } from "@/utils/ticket.type"
import { CustomerProps } from "@/utils/customer.type"

interface ModalContextData{
    visible:boolean;
    handleModalVisible:()=> void;
    ticket:TicketInfo | undefined;
    setDetailTicket:()=> void;

}
interface TicketInfo{
    ticket:TicketProps;
    customer:CustomerProps| null;
}

export const ModalContext = createContext({} as ModalContextData )
export const ModalProvider = ({children}:{children : ReactNode}) =>{

    const [visible , setVisible] = useState(false);
    const [ticket,setTicket]=useState<TicketInfo>();

    function setDetailTicket(detail:TicketInfo){
        console.log(detail)
        setTicket(detail)
    }
    function handleModalVisible(){
        setVisible(!visible)
    }

    return (
        <ModalContext.Provider value={{visible,handleModalVisible,ticket,setDetailTicket }}>
            {visible && <ModalTicket/>} 
            {children}
        </ModalContext.Provider>
    )
}