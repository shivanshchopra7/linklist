import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faGoogle} from "@fortawesome/free-brands-svg-icons"
import LoginWithGoogle from "@/components/buttons/LoginWithGoogle";
export default function LoginPage() {
    return (
        <div className=" p-4  max-w-xs mx-auto" >
            <div>
            <h1 className="text-4xl font-bold text-center text-white mb-4">Sign In</h1>
             <p className="text-center mb-8 text-white">Sign in to your account using one of the methods below</p>
           <LoginWithGoogle/>
            </div>
            
        </div>
    )
}