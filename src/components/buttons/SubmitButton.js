
import {useFormStatus} from 'react-dom'
export default function SubmitButton({children, className=''}) {
  const {pending} =  useFormStatus();
    return(
        <button type="submit" disabled={pending} className={"bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 transition " + className}>
{pending && (
  <span>Saving...</span>
)} {!pending && children}

</button>   
    )
};