import { Button } from "@chakra-ui/react"

export const GlobalButton = ({children,...rest})=>{
return(
    
    <Button boxShadow={'3px 4px 0px 1px rgba(0,0,0,1)'} fontWeight={700} borderRadius={50} p={4} {...rest} >{children}</Button>
    )
    
    }
    