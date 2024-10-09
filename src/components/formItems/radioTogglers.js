import { faImage, faPalette } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function RadioTogglers({options}) {
    return (
        <div className="radio-togglers shadow">
            {options.map((option) => (
                 <label>
                 <input type="radio" name="bgType"   value={option.value} />
                 <div>
                     <FontAwesomeIcon icon={option.icon} />
                     <span>{option.label}</span>
                     
                     </div>
                 </label>
            ))}
       
           
    </div>
    )
}