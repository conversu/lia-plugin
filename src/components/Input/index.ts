import { CnpjInput } from "./inputs/CnpjInput";
import { CpfInput } from "./inputs/CpfInput";
import { MaskedInput } from "./inputs/MaskedInput";
import { TextInput } from "./inputs/TextInput";




export const Input = {
    Masked: {
        CPF: CpfInput,
        CNPJ: CnpjInput,
        Custom: MaskedInput
    },
    Text: TextInput
}