import { FormControl, Input, InputLabel } from "@material-ui/core"
import TextMaskCustom from "./TextMaskCustom"

export const TextFieldPhone = ({label,...rest}) => {
    return <FormControl>
        <InputLabel htmlFor="formatted-text-mask-input">{label}</InputLabel>
        <Input
            {...rest}
            inputComponent={TextMaskCustom}
        />
    </FormControl>
}