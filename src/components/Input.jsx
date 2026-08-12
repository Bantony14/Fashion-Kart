import { useId } from "react"

function Input({
type = "text",
classname = "",
...props

}){
    const id = useId()

    return(

        <input
        className={classname}
        type={type}
        id = {id}
        {...props}
        
        
        
        />
    )

}

export default Input