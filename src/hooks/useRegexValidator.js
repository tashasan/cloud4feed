import { InputType } from "../utils/ComponentEnums";
import { REGEX } from "../utils/RegexEnums";
let result = true;
function regexValidator(type, text) {
    switch (type) {
        case InputType.Text:
            result = REGEX.TEXT.test(text)
            break;
        case InputType.Password:
            result = REGEX.PASSWORD.test(text)
            break;
        default:
            break;
    }
    return result;
}
export default regexValidator;