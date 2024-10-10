
import {useFormStatus} from 'react-dom'
export default function SubmitButton({children, className=''}) {
  const {pending} =  useFormStatus();
    return(
        <button type="submit" disabled={pending} className={"flex bg-blue-500 disabled:bg-blue-300 disabled:text-gray-200  text-white gap-2 items-center justify-center py-2 px-4  mx-auto w-full" + className}>
{pending && (
  <span>Saving...</span>
)} {!pending && children}

</button>   
    )
};