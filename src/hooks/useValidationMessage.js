import { InputType } from "../utils/ComponentEnums";
let result = "";
function validationMessage(type) {
    switch (type) {
        case InputType.Text:
            result = "Please enter at least three letters."
            break;
        case InputType.Password:
            result = "Alphanumeric characters and, must be at least one number and at least one letter."
            break;
        default:
            break;
    }
    return result;
}
export default validationMessage;